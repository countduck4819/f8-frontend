import React from "react";
import { GlobalContext } from "../reducers/Provider";
import App from "../App";
import { app } from "../js/app";

function Login() {
    const { state, dispatch } = React.useContext(GlobalContext);
    const [text, setText] = React.useState("");
    const handleChange = function (e) {
        setText(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const patten = /^[a-z0-9A-Z-._]+@[a-z0-9A-Z.-_]+\.[a-z]{2,}$/;
        if (patten.test(text)) {
            const result = await app.start(text)
            if (result.res) {
                dispatch({
                    type: "login/input",
                    payload: text,
                });
                console.log("wait 8948289")
                dispatch({
                    type: "login/checkLogin",
                    payload: true,
                });
                dispatch({
                    type: "products/list",
                    payload: result.result,
                })
                if (result.dataProducts) {
                    dispatch({
                        type: "products/addlist",
                        payload: result.dataProducts,
                    })
                }

            }else {
                
            }
            setText("");
        } else {
            setText("");
            throw new Error("Yeu cau nhap lai");
        }
    };
    return (
        <>
            <div className="login">
                <div className="form-login">
                    <form action="" onSubmit={handleSubmit}>
                        <h2>Email</h2>
                        <input
                            value={text}
                            type="email"
                            placeholder="example@example.com"
                            className="input-login"
                            onChange={handleChange}
                        />
                        <button className="btn-submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
