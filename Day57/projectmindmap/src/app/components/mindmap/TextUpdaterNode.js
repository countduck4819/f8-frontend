import { memo, useCallback, useEffect, useState } from "react";
import ReactFlow, { Handle, Position, useNodes, useReactFlow } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode(object) {
    const { data, isConnectable, id, type } = object;
    const { setNodes, getNodes } = useReactFlow();
    const nodes = getNodes();
    const [name, setName] = useState(data.label);
    const onChange = useCallback((e) => {
        setName(e.target.value);
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setNodes((nodes) => {
                return nodes.map((node) => {
                    if (node.id === id) {
                        return {
                            ...node,
                            data: {
                                label: name,
                            },
                            type: `${id === "0" ? "input" : ""}`,
                        };
                    }
                    return node;
                });
            });
        },
        [name]
    );

    useEffect(() => {
        if (type === "textUpdater") {
            window.addEventListener("click", (e) => {
                if (
                    !e.target.getAttribute("id") ||
                    !e.target.getAttribute("id") === "text-update"
                ) {
                    setNodes((nodes) => {
                        return nodes.map((node) => {
                            if (node.id === id) {
                                return {
                                    ...node,
                                    data: {
                                        label: name,
                                    },
                                    type: `${id === "0" ? "input" : ""}`,
                                };
                            }
                            return node;
                        });
                    });
                }
            });
        }
    });
    return (
        <div className="text-updater-node" id={object.id}>
            {object.id !== "0" ? (
                <Handle
                    type="target"
                    position={Position.Top}
                    isConnectable={isConnectable}
                />
            ) : (
                <></>
            )}

            <div>
                {/* <label htmlFor="text">Text:</label> */}
                <form action="" onSubmit={handleSubmit}>
                    <input
                        id="text-update"
                        name="text"
                        onChange={onChange}
                        className="nodrag pl-[6px] pt-[2px] pb-[2px]"
                        value={name}
                    />
                </form>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                isConnectable={isConnectable}
            />
        </div>
    );
}

export default memo(TextUpdaterNode);
