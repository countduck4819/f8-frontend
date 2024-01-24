import React, { useState } from "react";
import { useReactFlow } from "reactflow";

function ActionBtnMindMap({ sub, id, dataOrigin }) {
    const [name, setName] = useState(dataOrigin.name);

    const reactflow = useReactFlow();
    // console.log(reactflow.getNodes());
    async function handleClickSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const reactflow_pane = document.querySelector(".react-flow__pane");
        await reactflow_pane.click();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_API}/${sub.replace(
                "|",
                "-"
            )}/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dataNodes: [...reactflow.getNodes()],
                    dataEdges: [...reactflow.getEdges()],
                }),
            }
        );
    }

    const handleChange = function (e) {
        e.preventDefault();
        setName(e.target.value);
        document.title = e.target.value;
    };
    return (
        <>
            <div className="absolute top-[5px] rounded-lg px-3 py-3  left-[5px] flex gap-[15px] border-1 border-solid border-indigo-600 px-[10px]">
                <input
                    type="text"
                    style={{
                        width: "200px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        borderRadius: "6px",
                    }}
                    value={name}
                    className="outline-none pl-3"
                    onChange={handleChange}
                />
                <div
                    onClick={handleClickSave}
                    class="border-[2px] border-solid border-green-600 rounded-lg px-3 py-2 text-green-400 text-[16px] cursor-pointer hover:bg-green-600 hover:text-green-200"
                >
                    Save
                </div>

                <div class="border-[2px] border-solid border-blue-600 rounded-lg px-3 py-2 text-blue-400 text-[16px] cursor-pointer hover:bg-blue-600 hover:text-blue-200">
                    Shared
                </div>
            </div>
        </>
    );
}

export default ActionBtnMindMap;
