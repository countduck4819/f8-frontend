import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SigninButton from "@/app/components/SigninButton";
import Test from "@/app/components/Test";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

async function Contact() {
    console.log("hello vao di ma");
    const session = await getServerSession(authOptions);
    console.log("session", session);
    if (!session) {
        redirect("/auth");
    }
    return (
        <>
            <main className="main contact-page"></main>
            <Test />
        </>
    );
}

export default Contact;
