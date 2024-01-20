"use client";
import React, { memo } from "react";
import imgnotfound from "@/image/notfound.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
function NotFound() {
    const route = useRouter();
    const handleClick = (e) => {
        e.preventDefault();
        route.push("/");
    };
    return (
        <div className="not_found">
            <div className="text-center info">
                <Image priority src={imgnotfound} alt="not_found" />
                <div className="action">
                    <button
                        onClick={handleClick}
                        className="text-white py-5 px-20 bg-indigo-500"
                    >
                        Go back home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(NotFound);
