import React from "react";
import logo from "@/image/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
async function HeaderSuccess() {
    const user = await getSession();
    // if (!user) {
    //     return (
    //         <header className="header-success">
    //             <div className="header-left">
    //                 <Link href="/" className="come_back_home">
    //                     <Image className="object-cover" src={logo} alt="logo" />
    //                     <span className="font-logo">Mindmap</span>
    //                 </Link>
    //                 <button className="px-5 py-3 text-[16px] rounded-lg items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 hover:bg-indigo-600/90 hidden md:block text-white dark:bg-[#5e43f3] dark:text-neutral-100">
    //                     Create
    //                 </button>
    //             </div>

    //             <div className="header-right">
    //                 <div className="content">
    //                     <FontAwesomeIcon icon={faUser} />
    //                 </div>

    //                 <ThemeSwitch />
    //             </div>
    //         </header>
    //     );
    // }
    return (
        <header className="header-success">
            <div className="header-left">
                <Link href="/" className="come_back_home">
                    <Image className="object-cover" src={logo} alt="logo" />
                    <span className="font-logo">Mindmap</span>
                </Link>
                <button className="px-5 py-3 text-[16px] rounded-lg items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 hover:bg-indigo-600/90 hidden md:block text-white dark:bg-[#5e43f3] dark:text-neutral-100">
                    Create
                </button>
            </div>

            <div className="header-right">
                <div className="content">
                    <div className="name">{user.user.name}</div>
                    <div className="img">
                        <img
                            src={user.user.picture}
                            width="100%"
                            height="100%"
                            alt="user"
                        />
                    </div>
                </div>

                <ThemeSwitch />
            </div>
        </header>
    );
}

export default HeaderSuccess;
