import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import logo from "@/image/logo.png";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { usePathname } from "next/navigation";
import Login from "./Login";
import ThemeSwitcher from "./ThemeSwitch";

const roboto = Roboto({
    subnets: "latin",
    weight: ["400", "500", "700"],
    preload: false,
    display: "swap",
});
function Header() {
    const pathname = usePathname();
    const backToTop = (e) => {
        const backTop = document.querySelector(".header .back-top");
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    };
    useLayoutEffect(() => {
        const backTop = document.querySelector(".header .back-top");
        if (window.scrollY > 720) {
            backTop.classList.remove("invisible");
        } else {
            backTop.classList.add("invisible");
        }
    }, []);
    useEffect(() => {
        const header = document.querySelector(".header");
        document.addEventListener("scroll", (e) => {
            const backTop = document.querySelector(".header .back-top");
            if (backTop) {
                if (window.scrollY > 0) {
                    header.classList.add("scroll-shadow");
                    backTop.addEventListener("click", backToTop);
                } else {
                    header.classList.remove("scroll-shadow");
                    backTop?.removeEventListener("click", backToTop);
                }

                if (window.scrollY > 720) {
                    backTop.classList.remove("invisible");
                } else {
                    backTop.classList.add("invisible");
                }
            }
        });
    });
    return (
        <>
            <header className="header">
                <div className="logo">
                    <Image className="object-cover" src={logo} alt="logo" />
                    <span className="font-logo">Mindmap</span>
                </div>
                <div className="primary-menu">
                    <Link href="/" className={pathname === "/" ? "active" : ""}>
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={pathname === "/about" ? "active" : ""}
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className={pathname === "/contact" ? "active" : ""}
                    >
                        Contact
                    </Link>
                    <Link
                        href="/feature"
                        className={pathname === "/feature" ? "active" : ""}
                    >
                        Feature
                    </Link>
                    <Link
                        href="/price"
                        className={pathname === "/price" ? "active" : ""}
                    >
                        Price
                    </Link>
                </div>
                <div className={`action ${roboto}`}>
                    <Login />
                    <ThemeSwitcher />
                </div>
                <div className="back-top rotate-90 invisible">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
            </header>
        </>
    );
}

export default Header;
