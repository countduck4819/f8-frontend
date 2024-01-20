import {
    faLinkedin,
    faSquareFacebook,
    faTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "@/image/logo-2.svg";
import logo_white from "@/image/white-logo.png";
import Link from "next/link";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import clsx from "clsx";
const quicksand = Quicksand({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});
function Footer() {
    return (
        <footer className="footer">
            <ul className="footer-links">
                <li>
                    <Link href="/">
                        <Image src={logo} alt="logo-2" />
                        <Image
                            width="50"
                            height="50"
                            src={logo_white}
                            alt="white-logo-2"
                        />
                    </Link>
                </li>
                <li>
                    <div className={clsx("heading-name", quicksand.className)}>
                        MindMeister
                    </div>
                    <ul className="sub_links">
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Mind Mapping
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Education
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Integrations
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Apps
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={clsx("heading-name", quicksand.className)}>
                        About us
                    </div>
                    <ul className="sub_links">
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Company
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Jobs
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Partners
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Affiliate Program
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Developers
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Press
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={clsx("heading-name", quicksand.className)}>
                        Support
                    </div>
                    <ul className="sub_links">
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Tutorial Videos
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Training
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Security
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                FAQs
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={clsx("heading-name", quicksand.className)}>
                        Useful Links
                    </div>
                    <ul className="sub_links">
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Public Maps
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                Videos
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                MeisterTask
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                MeisterNote
                            </a>
                        </li>
                        <li>
                            <a href="#!" className={clsx(quicksand.className)}>
                                MindMaps.com
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="box"></div>
            <div className="sub-footer">
                <div className="sub-footer-left">
                    <a href="#!">Compliance</a>
                    <a href="#!">Terms of Service</a>
                    <a href="#!">Imprint</a>
                    <a href="#!">Privacy</a>
                    <div className="option-lang hover:cursor-pointer">
                        English
                    </div>
                </div>
                <div className="sub-footer-right">
                    <a className="social" href="">
                        <FontAwesomeIcon icon={faSquareFacebook} />
                    </a>
                    <a className="social" href="">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a className="social" href="">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <a className="social" href="">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
            </div>
            <div className="border-b-4 border-solid border-indigo-500"></div>
            <div className={clsx("license text-center", quicksand.className)}>
                &copy; 2024 countduck4819. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
