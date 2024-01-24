"use client";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { handleClickRemove } from "./action";

function Project({ project, sub }) {
    const pathname = usePathname();
    const route = useRouter();
    const handleClick = (e) => {
        e.preventDefault();
        route.push(`${pathname}/${project.id}`);
    };

    const handleClickEdit = function (e) {
        e.preventDefault();
        route.push(`${pathname}/${project.id}`);
    };

    return (
        <div
            className="project relative [&>.actions]:hover:flex"
            id={project.id}
            data-id={project.id}
            onClick={handleClick}
        >
            <div data-id={project.id} className="name-project">
                {project.name}
            </div>
            <div className="actions hidden transition-all absolute gap-[30px] items-center justify-center inset-0 bg-slate-900 ">
                <div
                    className="edit hover:opacity-70"
                    onClick={handleClickEdit}
                    data-id={project.id}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div
                    className="delete hover:opacity-70"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleClickRemove(sub, project.id);
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
        </div>
    );
}

export default Project;
