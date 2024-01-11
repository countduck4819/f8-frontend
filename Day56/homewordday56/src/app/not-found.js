import Image from "next/image";
import image from "./assets/error404.png";
import React from "react";
import "@/sass/error.scss";
import Link from "next/link";
import { cookies } from "next/headers";

function NotFound() {
    return (
        <div className="not-found">
            <Image src={image} alt="error-404" />
            <Link href="/">
                {cookies().get("lang")?.value
                    ? cookies().get("lang").value === "en"
                        ? "Go Home"
                        : "Về Trang chủ"
                    : "Go Home"}
            </Link>
        </div>
    );
}

export default NotFound;
