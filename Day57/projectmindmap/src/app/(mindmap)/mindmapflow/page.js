import HeaderSuccess from "@/app/components/HeaderSuccess";
import Listmindmap from "@/app/components/Listmindmap";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
    const user = await getSession();
    // console.log(user);
    if (!user) {
        redirect("/api/auth/login");
    }
    return (
        <>
            <HeaderSuccess />
            <Listmindmap />
        </>
    );
}

export default page;
