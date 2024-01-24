import Listmindmap from "@/app/components/Listmindmap";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
    const user = await getSession();

    if (!user) {
        redirect("/api/auth/login");
    }
    return <Listmindmap sub={user.user.sub} />;
}

export default page;
