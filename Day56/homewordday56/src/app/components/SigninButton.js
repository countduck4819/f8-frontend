"use client";
import "@/sass/auth.scss";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
// import { getServerSession } from "next-auth";
function SigninButton() {
    const router = useRouter();
    const [check, setCheck] = useState(false);
    const { data: session, status } = useSession({
        required: false,
        onUnauthenticated() {
            redirect("/auth");
        },
    });
    console.log(status, router, check);

    if (session && session.user) {
        if (check) {
            redirect("/auth");
            setCheck(false);
        }
    }

    return (
        <main className="main login-auth" id="login-auth">
            <div className="auth-login">
                <div className="span">© 2024 Khang portfolio</div>
                <div className="desc">
                    My name is Thanh Khang, this is my portfolio.
                </div>
                <div className="action-login">
                    <h2 className="heading">Login</h2>
                    <button
                        className="btn-login"
                        onClick={() =>
                            signIn("google", {
                                redirect: false,
                                callbackUrl: "/profile",
                            })
                        }
                    >
                        <span class="text">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 50 50"
                                class="w-6 h-6"
                                aria-hidden="true"
                                focusable="false"
                                tabindex="-1"
                            >
                                <path
                                    d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <i>Login with Google</i>
                        </span>
                    </button>
                    <button
                        className="btn-login"
                        onClick={() =>
                            signIn("github", {
                                redirect: false,
                                callbackUrl: "/profile",
                            })
                        }
                    >
                        <span class="text">
                            <svg
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                class="w-6 h-6"
                                aria-hidden="true"
                                focusable="false"
                                tabindex="-1"
                            >
                                <path
                                    clip-rule="evenodd"
                                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                            <i>Login with Github</i>
                        </span>
                    </button>
                </div>
                <div className="note">
                    &ldquo;
                    <em>
                        &nbsp;Login to contact, comment and explore more
                        exciting features.&nbsp;
                    </em>
                    &rdquo;
                </div>
            </div>
        </main>
    );
}

export default SigninButton;
