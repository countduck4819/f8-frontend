import React from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddMessage from './AddMessage/AddMessage';
import ListMessage from './ListMessage';
import { useSelector } from 'react-redux';
function SortableColumn({dataColumn, dataMessages}) {
    const listMessage = useSelector(state => state.input.dataMessage)
    const { attributes, listeners, setNodeRef, transform, transition , isDragging } =
    useSortable({ id: dataColumn._id , data: {...dataColumn}});
const style = {
    touchAction: "none",
    transition: "opacity 0.2s ease-in",
    transform: CSS.Translate.toString(transform),
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
};
return (
    <div ref={setNodeRef} style={style} {...attributes}>
        <div {...listeners}
        className="sub-column"
    >
        <div className="header">
            <div className="title">{dataColumn.columnName}</div>
            <div className="remove">
                <i className="fa-solid fa-trash"></i>
            </div>
        </div>
        <div className="messages">
            <ListMessage dataMessages={dataMessages} statusCol={dataColumn.column} listMessage={listMessage}/>
        </div>
        <AddMessage columnName={dataColumn.columnName} statusCol={dataColumn.column}/>
    </div>
    </div>

);
}

export default SortableColumn