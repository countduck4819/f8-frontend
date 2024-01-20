"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import Loading from "./Loading";

function Login() {
    const { user, error, isLoading } = useUser();
    console.log(user);
    if (isLoading) {
        return <Loading />;
    }
    if (error || user === undefined) {
        return (
            <>
                <button className="btn-log-in">
                    <a href="/api/auth/login">Login</a>
                </button>
                <button className="btn-sign-up">
                    <span>Sign Up</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </>
        );
    }
    return (
        user && (
            <>
                <div className="user">
                    <div className="username">
                        <div className="img">
                            <img
                                width="100%"
                                height="100%"
                                src={user.picture}
                                alt="user"
                            />
                        </div>
                        <div className="name">Hi, {user.name}</div>
                    </div>
                    <div className="mindmap">
                        <Link href="/mindmapflow">Mindmap</Link>
                    </div>
                    <div className="logout">
                        <a href="/api/auth/logout">Logout</a>
                    </div>
                </div>
            </>
        )
    );
}

export default Login;
