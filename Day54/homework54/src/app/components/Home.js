import Link from "next/link";
import React from "react";

function Home() {
    return (
        <div className="list-page">
            <li>
                <Link href="/en">Home</Link>
            </li>
        </div>
    );
}

export default Home;
