import React from "react";
import {
    faArrowRight,
    faEnvelope,
    faPhone,
    faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Contact() {
    return (
        <section className="contact">
            <div className="intro-contact text-center">
                <h1 className="heading">
                    <span className="text-blue-500">Contact</span> us
                </h1>
                <div class="mx-auto flex w-24 mt-1 mb-10 overflow-hidden rounded">
                    <div class="flex-1 h-2 bg-blue-200"></div>
                    <div class="flex-1 h-2 bg-blue-400"></div>
                    <div class="flex-1 h-2 bg-blue-600"></div>
                </div>
                <div className="desc mx-auto">
                    If you have any questions about mindmap ltd or want to
                    partner with us, join our community or simply want to share
                    your story, drop us a message below and we will be sure to
                    get back to you as soon as possible!
                </div>
            </div>
            <div className="info-contact">
                <div className="email sub-contact border border-solid border-indigo-400">
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ color: "#ffffff" }}
                        />
                    </div>
                    <h2 className="heading">Email</h2>
                    <Link href="mailto: countduck4819@gmail.com">
                        countduck4819@gmail.com
                    </Link>
                </div>
                <div className="phone sub-contact border border-solid border-indigo-400">
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={faPhone}
                            style={{ color: "#ffffff" }}
                        />
                    </div>
                    <h2 className="heading">Email</h2>
                    <Link href="tel: 0123456789">+123456789</Link>
                </div>
                <div className="social sub-contact border border-solid border-indigo-400">
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={faTableCells}
                            style={{ color: "#ffffff" }}
                        />
                    </div>
                    <h2 className="heading">Email</h2>
                    <div className="socials">
                        <Link href="#!"></Link>
                        <Link href="#!"></Link>
                        <Link href="#!"></Link>
                    </div>
                </div>
            </div>
            <div className="form-info">
                <form action="">
                    <h2 className="heading">
                        Please send message for futher information!
                    </h2>
                    <input type="text" placeholder="First Name..." />
                    <input type="text" placeholder="Last Name..." />
                    <input type="text" placeholder="abc@gmail.com" />
                    <textarea placeholder="Write a message"></textarea>
                    <button className="btn-submit">Send Message</button>
                </form>
            </div>
            <div className="need-support">
                <div className="info">
                    <h2 className="heading">Need Support?</h2>
                    <div className="desc">
                        Head over to the MindMeister Help Center! If you’re
                        still stuck, a Customer Success agent will be waiting to
                        help you.
                    </div>
                </div>
                <div className="action">
                    <Link href="#!">
                        Help Center <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Contact;
