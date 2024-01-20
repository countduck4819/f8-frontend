"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { memo, useEffect, useRef, useState } from "react";

function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        const mode = document.querySelector(".dark-light");
        async function removeHidden(e) {
            e.stopPropagation();
            const mode = document.querySelector(".dark-light");
            await mode.querySelector("ul").classList.add("hidden");
            window.removeEventListener("click", removeHidden);
        }
        mode.querySelector("ul").classList.toggle("hidden");
        if (!mode.querySelector("ul").classList.contains("hidden")) {
            window.addEventListener("click", removeHidden);
        }
    }
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return (
        <div className="dark-light" onClick={onClick}>
            {theme === "dark" ? (
                <FontAwesomeIcon icon={faMoon} />
            ) : (
                <FontAwesomeIcon icon={faSun} />
            )}
            <ul className="option-mode hidden">
                <li
                    onClick={(e) => {
                        setTheme("light");
                    }}
                >
                    Light
                </li>
                <li
                    onClick={(e) => {
                        setTheme("dark");
                    }}
                >
                    Dark
                </li>
                <li
                    onClick={(e) => {
                        setTheme("system");
                    }}
                >
                    System
                </li>
            </ul>
        </div>
        // <div>

        //     <button onClick={() => setTheme("dark")}>
        //         <FontAwesomeIcon icon={faSun} />
        //     </button>
        // </div>
    );
}

export default memo(ThemeSwitcher);
