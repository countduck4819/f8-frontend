"use client";
import React, { useEffect } from "react";
import octopus from "@/image/octopus.svg";
import googleImage from "@/image/google.svg";
import Image from "next/image";
import { Inter } from "next/font/google";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "900"],
    display: "swap",
});

function Home() {
    return (
        <div className="home">
            <section className="first">
                <div className="desc">It all starts with an idea.</div>
                <h1
                    className={clsx("heading", "text-red-500", inter.className)}
                >
                    Collaborative <span>Mind Mapping</span>
                </h1>
                <div className="img">
                    <Image
                        className="img-octopus"
                        src={octopus}
                        alt="octopus"
                    />

                    <div className="btn-login-gg">
                        <button className={clsx("btn google", inter.className)}>
                            <div className="image">
                                <Image
                                    className="img-google"
                                    src={googleImage}
                                    alt="google-image"
                                />
                            </div>
                            <div className="desc-login">
                                Continue with Google
                            </div>
                        </button>
                    </div>

                    <div
                        className={clsx(
                            "sign-up-email text-center font-light",
                            inter.className
                        )}
                    >
                        or sign up using your email
                    </div>
                    <div className="info-img">
                        <div className="stars">
                            <FontAwesomeIcon
                                className="star text-custom-yellow"
                                icon={faStar}
                            />
                            <FontAwesomeIcon
                                className="star text-custom-yellow"
                                icon={faStar}
                            />
                            <FontAwesomeIcon
                                className="star text-custom-yellow"
                                icon={faStar}
                            />
                            <FontAwesomeIcon
                                className="star text-custom-yellow"
                                icon={faStar}
                            />
                            <FontAwesomeIcon
                                className="star text-custom-yellow"
                                icon={faStar}
                            />
                        </div>
                        <div className="desc">
                            Trusted by <strong>25 million</strong>
                        </div>
                        <div className="desc">happy users worldwide</div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
