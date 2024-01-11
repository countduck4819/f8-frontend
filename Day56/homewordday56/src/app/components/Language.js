"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Language({ children }) {
    const router = useRouter();
    const [lang, setLang] = useState(children);
    function handleClick(e) {
        if (lang === "vi") {
            setLang("en");
        } else {
            setLang("vi");
        }
    }

    useEffect(() => {
        document.cookie = `lang=${lang}`;
        router.refresh();
    }, [lang]);
    return (
        <div className="language" onClick={handleClick}>
            {lang === "en" || lang === "vi" ? lang : ""}
        </div>
    );
}

export default Language;
