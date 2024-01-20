import { app } from "../js/config/app"
import { client } from "../js/config/client";

export const fetchInput = (email) => {
    return async (dispatch,getState) => {
        const data = await app.getData(email)
        localStorage.setItem("apiKey",JSON.stringify(data.data.apiKey));
        client.setApiKey(data.data.apiKey)
        dispatch({
            type: "input/submit",
            payload: data.data.apiKey
        })
    }
}

export const getApiKey = () => {
    return async (dispatch,getState) => {
        const {data,res} = await client.get("/tasks");
        if (!res.ok) {
            localStorage.removeItem("apiKey")
            await dispatch({
                type: "input/submit",
                payload: ""
            })
        }
        else {
            dispatch({
                type: "data/submit",
                payload: data.data.columns
            })
            dispatch({
                type: "data/message",
                payload: data.data.tasks
            })
        }
    }
}

export const updateApi = (columnName,column,content,_id) => {
    return async (dispatch,getState) => {
        await dispatch({
            type: "create/id",
        })
        await dispatch({
            type: "add/task",
            payload: {
                _id,
                column,
                content, 
            }
        })
        const newData = [];
        for (var i = 0; i < getState().input.dataMessage.length; i++) {
            const object = getState().input.dataBlog.find((value, index) => {
                return getState().input.dataMessage[i].column === value.column
            })
            newData.push({
                columnName: object.columnName,
                column: getState().input.dataMessage[i].column,
                content: getState().input.dataMessage[i].content
            })
        }
        const {data,res} = await client.post("/tasks",newData)
    }
}