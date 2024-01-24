"use client";
import React from "react";
import { handleClickAdd } from "./action";
function CreateMindMap({ sub }) {
    return (
        <>
            <div
                className="create-mindmap"
                onClick={(e) => {
                    handleClickAdd(sub);
                }}
            >
                <span>Create new Mindmap</span>
            </div>
        </>
    );
}

export default CreateMindMap;
