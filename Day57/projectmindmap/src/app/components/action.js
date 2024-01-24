"use server";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
export const handleClickAdd = async function (sub) {
    const response = await fetch(
        `${process.env.SERVER_API}/${sub.replace("|", "-")}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: uuidv4(),
                name: "Không có tên",
                dataNodes: [
                    {
                        id: "0",
                        position: {
                            x: 0,
                            y: 0,
                        },
                        data: {
                            label: "1",
                        },
                        type: "input",
                        deletable: false,
                    },
                ],
                dataEdges: [],
            }),
        }
    );

    if (response.ok) {
        revalidatePath("/(mindmap)/mindmapflow");
    }
};

export const handleClickRemove = async (sub, id) => {
    const response = await fetch(
        `${process.env.SERVER_API}/${sub.replace("|", "-")}/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.ok) {
        revalidatePath("/(mindmap)/mindmapflow");
    }
};
