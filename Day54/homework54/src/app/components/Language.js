"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Language({ children }) {
    let language = children.lang;
    const [lang, setLang] = useState(language);
    const route = useRouter();
    function handleClick(e) {
        if (lang === "vi") {
            setLang("en");
        } else {
            setLang("vi");
        }
    }

    useEffect(() => {
        document.cookie = `lang=${lang}`;
        route.push(lang);
    }, [lang]);
    return (
        <div className="language" onClick={handleClick}>
            {lang === "en" || lang === "vi" ? lang : ""}
        </div>
    );
}

export default Language;
