"use client";
import React from "react";
import "@/sass/logout.scss";
import { signOut } from "next-auth/react";
function Logout() {
    return (
        <button
            className="btn-logout"
            onClick={() =>
                signOut({
                    redirect: true,
                    callbackUrl: "/auth",
                })
            }
        >
            Sign out
        </button>
    );
}

export default Logout;
