import HeaderSuccess from "@/app/components/HeaderSuccess";
import React from "react";

function layout({ children }) {
    return (
        <>
            <HeaderSuccess />
            {children}
        </>
    );
}

export default layout;
