import Link from "next/link";
import React from "react";

function ConvertLink() {
    return (
        <>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/blogs">Blogs</Link>
            </li>
            <li>
                <Link href="/contact">Contact</Link>
            </li>
            <li>
                <Link href="/profile">Profile</Link>
            </li>
        </>
    );
}

export default ConvertLink;
