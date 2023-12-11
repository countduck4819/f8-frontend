import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import emailjs from "@emailjs/browser";
import Loaded from "./Loaded";
import { GlobalContext } from "../reducers/Provider";
const Profile = () => {
    const formRef = useRef();
    const {state,dispatch} = useContext(GlobalContext);
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(isAuthenticated)
    if (isLoading) {
        return <Loaded/>;
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target);
        console.log(formRef);
        const email = formRef.current.children[0].value;
        const address = window.location.origin;
        const pattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+\.[a-z]{2,}$/;
        const message = formRef.current.children[1].value;
        const serviceID = "service_5g3rqi4";
        const templateID = "template_ej4ianc";
        const publicKey = "D0ytTjCWcx4Eln5BM";
        if (pattern.test(email)) {
            const param = {
                name: user.name,
                email,
                message,
                address
            };
            emailjs.send(serviceID, templateID, param, publicKey).then(
                function (response) {
                    console.log("Success", response);
                },
                (error) => {
                    console.log("Error", error);
                }
            );
        }
        else {
          formRef.current.children[0].value = "";
          console.log("Yêu cầu nhập lại")
        }
    }
    return (
        isAuthenticated && (
            <div className="support-form">
                <div className="support">
                    <div className="img">
                        <img src={user.picture} alt={user.name} />
                    </div>
                    <div className="info">
                        <div className="hello">Xin Chào {user.name} !</div>
                        <div className="locale">Vị trí: {user.locale}</div>
                        <div className="email">
                            Email:{" "}
                            <a href={"mailto:" + user.email}>{user.email}</a>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        ref={formRef}
                        action=""
                        className="form"
                    >
                        <input
                            type="text"
                            className="input-email"
                            placeholder="Email của bạn *"
                        />
                        <textarea
                            placeholder="Tin nhắn *"
                            id=""
                            cols="30"
                            rows="10"
                            className="input-message"
                        ></textarea>
                        <button>YÊU CẦU HỖ TRỢ!</button>
                    </form>
                </div>
                <LogoutButton />
            </div>
        )
    );
};

export default Profile;
