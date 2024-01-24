"use client";
import React, { useEffect, useRef } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    addEdge,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "reactflow";
import { applyEdgeChanges, applyNodeChanges } from "reactflow";
import { useState, useCallback } from "react";
import "reactflow/dist/style.css";
import CustomEdge from "./mindmap/CustomEdge";
import TextUpdaterNode from "./mindmap/TextUpdaterNode";
import useSWR from "swr";
import Loading from "./Loading";

// const initialNodes = [
//     {
//         id: "0",
//         position: {
//             x: 0,
//             y: 0,
//         },
//         data: {
//             label: "1",
//         },
//         type: "input",
//         deletable: false,
//     },
//     {
//         id: "1",
//         position: {
//             x: 0,
//             y: 100,
//         },
//         data: {
//             label: "di choi",
//         },
//     },
// ];
let id = 3;
const getId = () => `${id++}`;
// const initialEdges = [
//     // {
//     //     id: "1-2",
//     //     source: "1",
//     //     target: "2",
//     //     type: "default",
//     //     label: "to the",
//     // },
// ];

const nodeTypes = { textUpdater: TextUpdaterNode };
const edgeTypes = { customEdge: CustomEdge };
const fetcher = (url) => fetch(url).then((res) => res.json());
function MindmapAction({ initialEdges, initialNodes }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const { screenToFlowPosition } = useReactFlow();
    // console.log(nodes, edges);

    const onConnect = useCallback((params) => {
        // reset the start node on connections
        connectingNodeId.current = null;
        setEdges((eds) => addEdge(params, eds));
    }, []);
    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onHandleNodesChange = (changes) => {
        const nextChanges = changes.reduce((acc, change) => {
            console.log(acc);
            if (change.type === "remove") {
                if (shouldNodeBeRemoved(change.id)) {
                    return [...acc, change];
                }

                return acc;
            }

            return [...acc, change];
        }, []);

        onNodesChange(nextChanges);
    };

    const nodeDoubleClick = useCallback((e, node) => {
        setNodes((nds) =>
            nds.map((nd) => {
                if (node.id === nd.id) {
                    nd.type = "textUpdater";
                }
                return nd;
            })
        );
    });

    const onConnectEnd = useCallback(
        (event) => {
            if (!connectingNodeId.current) return;

            const targetIsPane =
                event.target.classList.contains("react-flow__pane");

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const id = getId();
                const newNode = {
                    id,
                    position: screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                    data: { label: `Node ${id}` },
                    origin: [0.5, 0.0],
                };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({
                        id,
                        source: connectingNodeId.current,
                        target: id,
                    })
                );
            }
            // console.log(edges);
        },
        [screenToFlowPosition]
    );
    // useEffect(() => {
    //     setNodes(data?.dataNodes);
    //     setEdges(data?.dataEdges);
    // });
    return (
        <div
            style={{ width: "100vw", height: "calc(100vh - 63px)" }}
            className="wrapper mt-[63px] relative"
            ref={reactFlowWrapper}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                deleteKeyCode={"Delete"}
                // onNodesChange={onHandleNodesChange}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnectStart={onConnectStart}
                onNodeDoubleClick={nodeDoubleClick}
                onConnectEnd={onConnectEnd}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={{ padding: 2 }}
                zoomOnDoubleClick={false}
                nodeOrigin={[0.5, 0]}
            >
                <Background />
                <Controls />
                <MiniMap nodeColor="red" pannable zoomable />
            </ReactFlow>
            <div className="absolute top-[20px] left-[20px]">
                <input type="text" />
                <div>Go vao day</div>
            </div>
        </div>
    );
}

export default (props) => {
    const { sub, id } = props;
    const { data, isLoading, error } = useSWR(
        `${process.env.NEXT_PUBLIC_SERVER_API}/${sub.replace("|", "-")}/${id}`,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );

    if (error) {
        return <h3>Da co error</h3>;
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <ReactFlowProvider>
                    <MindmapAction
                        {...props}
                        initialEdges={data.dataEdges}
                        initialNodes={data.dataNodes}
                    />
                </ReactFlowProvider>
            )}
        </>
    );
};
