import React from "react";
import Project from "./Project";
import CreateMindMap from "./CreateMindMap";
const getProjects = async (url) => {
    const response = await fetch(
        `${process.env.SERVER_API}/${url.replace("|", "-")}`,
        {
            cache: "no-cache",
        }
    );

    console.log(
        "sao ko dc",
        `${process.env.SERVER_API}/${url.replace("|", "-")}`
    );
    return await response.json();
};
async function Listmindmap({ sub }) {
    const projects = await getProjects(sub);
    console.log(projects);

    return (
        <div className="listmindmap">
            <div className="navbar">
                <ul>
                    <li className="active">
                        <svg width="100%" height="100%" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M6 2a3 3 0 0 1 2.846 3.952A7.765 7.765 0 0 1 11.148 9h1.704a7.774 7.774 0 0 1 2.302-3.049A3 3 0 0 1 18 2h2a3 3 0 0 1 0 6h-2a2.99 2.99 0 0 1-2.022-.784 6.272 6.272 0 0 0-1.626 2.105 3 3 0 0 1 0 5.357 6.252 6.252 0 0 0 1.626 2.106A2.986 2.986 0 0 1 18 16h2a3 3 0 0 1 0 6h-2a3 3 0 0 1-2.846-3.952A7.765 7.765 0 0 1 12.852 15h-1.704a7.774 7.774 0 0 1-2.302 3.048A3 3 0 0 1 6 22H4a3 3 0 0 1 0-6h2c.78 0 1.489.297 2.022.784a6.272 6.272 0 0 0 1.626-2.105 3 3 0 0 1 0-5.357 6.252 6.252 0 0 0-1.626-2.106A2.986 2.986 0 0 1 6 8H4a3 3 0 1 1 0-6zm14 16h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 18H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM20 4h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 4H4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2z"
                            ></path>
                        </svg>
                        My Maps
                    </li>
                    <li>
                        <svg width="100%" height="100%" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M6 2a3 3 0 0 1 2.846 3.952A7.765 7.765 0 0 1 11.148 9h1.704a7.774 7.774 0 0 1 2.302-3.049A3 3 0 0 1 18 2h2a3 3 0 0 1 0 6h-2a2.99 2.99 0 0 1-2.022-.784 6.272 6.272 0 0 0-1.626 2.105 3 3 0 0 1 0 5.357 6.252 6.252 0 0 0 1.626 2.106A2.986 2.986 0 0 1 18 16h2a3 3 0 0 1 0 6h-2a3 3 0 0 1-2.846-3.952A7.765 7.765 0 0 1 12.852 15h-1.704a7.774 7.774 0 0 1-2.302 3.048A3 3 0 0 1 6 22H4a3 3 0 0 1 0-6h2c.78 0 1.489.297 2.022.784a6.272 6.272 0 0 0 1.626-2.105 3 3 0 0 1 0-5.357 6.252 6.252 0 0 0-1.626-2.106A2.986 2.986 0 0 1 6 8H4a3 3 0 1 1 0-6zm14 16h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 18H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM20 4h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 4H4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2z"
                            ></path>
                        </svg>
                        My Maps
                    </li>
                    <li>
                        <svg width="100%" height="100%" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M6 2a3 3 0 0 1 2.846 3.952A7.765 7.765 0 0 1 11.148 9h1.704a7.774 7.774 0 0 1 2.302-3.049A3 3 0 0 1 18 2h2a3 3 0 0 1 0 6h-2a2.99 2.99 0 0 1-2.022-.784 6.272 6.272 0 0 0-1.626 2.105 3 3 0 0 1 0 5.357 6.252 6.252 0 0 0 1.626 2.106A2.986 2.986 0 0 1 18 16h2a3 3 0 0 1 0 6h-2a3 3 0 0 1-2.846-3.952A7.765 7.765 0 0 1 12.852 15h-1.704a7.774 7.774 0 0 1-2.302 3.048A3 3 0 0 1 6 22H4a3 3 0 0 1 0-6h2c.78 0 1.489.297 2.022.784a6.272 6.272 0 0 0 1.626-2.105 3 3 0 0 1 0-5.357 6.252 6.252 0 0 0-1.626-2.106A2.986 2.986 0 0 1 6 8H4a3 3 0 1 1 0-6zm14 16h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 18H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM20 4h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 4H4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2z"
                            ></path>
                        </svg>
                        My Maps
                    </li>
                    <li>
                        <svg width="100%" height="100%" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M6 2a3 3 0 0 1 2.846 3.952A7.765 7.765 0 0 1 11.148 9h1.704a7.774 7.774 0 0 1 2.302-3.049A3 3 0 0 1 18 2h2a3 3 0 0 1 0 6h-2a2.99 2.99 0 0 1-2.022-.784 6.272 6.272 0 0 0-1.626 2.105 3 3 0 0 1 0 5.357 6.252 6.252 0 0 0 1.626 2.106A2.986 2.986 0 0 1 18 16h2a3 3 0 0 1 0 6h-2a3 3 0 0 1-2.846-3.952A7.765 7.765 0 0 1 12.852 15h-1.704a7.774 7.774 0 0 1-2.302 3.048A3 3 0 0 1 6 22H4a3 3 0 0 1 0-6h2c.78 0 1.489.297 2.022.784a6.272 6.272 0 0 0 1.626-2.105 3 3 0 0 1 0-5.357 6.252 6.252 0 0 0-1.626-2.106A2.986 2.986 0 0 1 6 8H4a3 3 0 1 1 0-6zm14 16h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 18H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM20 4h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 4H4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2z"
                            ></path>
                        </svg>
                        My Maps
                    </li>
                </ul>
            </div>

            <div className="workspace">
                <h2 className="heading">My Maps</h2>
                <div className="flex">
                    <div className="projects">
                        <CreateMindMap sub={sub} />
                        {projects.map((project) => {
                            return (
                                <Project
                                    sub={sub}
                                    key={project.id}
                                    project={project}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listmindmap;
