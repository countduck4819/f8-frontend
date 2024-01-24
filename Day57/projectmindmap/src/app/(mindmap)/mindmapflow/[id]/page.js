import React from "react";
import MindmapAction from "@/app/components/MindmapAction";
import { getSession } from "@auth0/nextjs-auth0";
async function Mindmap({ params }) {
    console.log(params);
    const user = await getSession();
    return <MindmapAction id={params.id} sub={user.user.sub} />;
}

export default Mindmap;
