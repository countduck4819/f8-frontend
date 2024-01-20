import React from "react";
import Header from "../component/Header";

function layout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default layout;
