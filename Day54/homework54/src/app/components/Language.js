"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Language({ children }) {
    const check = useState(true);
    const [lang, setLang] = useState(children.lang);
    const route = useRouter();
    function handleClick(e) {
        if (lang === "vi") {
            setLang("en");
        } else {
            setLang("vi");
        }
    }
    useEffect(() => {
        route.push(lang);
    }, [lang]);
    return (
        <div className="language" onClick={handleClick}>
            {lang === "en" || lang === "vi" ? lang : ""}
        </div>
    );
}

export default Language;
