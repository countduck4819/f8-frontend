import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { forwardRef, memo, useLayoutEffect } from "react";
import "./ConfigTrello.scss";

function Message({ dataMessage }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: dataMessage._id, data: { ...dataMessage } });
    const style = {
        transition: "opacity 0.5s linear",
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
        border: isDragging ? "2px solid tomato" : undefined,
        // display: checkHidden ? "none" : "block",
    };
    const handleClick = (e) => {};
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            style={style}
            {...attributes}
            className="message"
        >
            <div className="content-text">{dataMessage.content}</div>
            <div className="remove" onClick={handleClick}>
                <i className="fa-solid fa-trash"></i>
            </div>
        </div>
    );
}

export default memo(Message);
