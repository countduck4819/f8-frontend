import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
} from "reactflow";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    console.log(id);
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} animated />
            <EdgeLabelRenderer></EdgeLabelRenderer>
        </>
    );
}
