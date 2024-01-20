import React, { useState } from "react";
import { client } from "../js/client";
import { app } from "../js/app";

function InputUpdate({todo,dataId,checki,updateIt,setRemove}) {
    const [checkInputUpdate, setCheckInputUpdate] = useState(0);
    const [textInput, setTextInput] = useState({
        name: todo
    });
    console.log(dataId)
    function convertInputUpdate() {
        setCheckInputUpdate(1);
    }
    function convertButtonUpdate() {
        setCheckInputUpdate(0);
    }
    function updateIn (e) {
        e.preventDefault()
        setTextInput({
            name: e.target.value,
        })
    }
    async function updateSubmit (e) {
        e.preventDefault()
        console.log(1)
        console.log(e.target)
        setTextInput({
            name: textInput.name
        })
        const question = confirm("bạn chắc chắn muốn thay đổi chứ ?");
        if (question) {
            const {apiKey} = app.convertCookieToObject(document.cookie);
            client.setApiKey(apiKey);
            const {data,response} = await client.patch(`/todos/${dataId}`,{
                todo: textInput.name
            });
            setRemove()
        }
    }
    if (checkInputUpdate === 0) {
        return <button className="btn updated" onClick={convertInputUpdate}>Update</button>;
    } else {
        return (
            <>
                <button className="btn updated">Update</button>
                <div className="input-updated">
                    <div className="updated-box">
                        <form action="" onSubmit={updateSubmit}>
                        <div><input type="text" onChange={updateIn} value={textInput.name}/></div>
                    <div className="action">
                        <button type="button" className="btn cancel" onClick={convertButtonUpdate}>Hủy</button>
                        <button type="submit" className="btn updated">Update</button>
                    </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default InputUpdate;
