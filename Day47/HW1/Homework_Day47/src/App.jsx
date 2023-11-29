import React, { Fragment, useEffect } from "react";
import { app } from "./js/app";
import { client } from "./js/client";
function App() {
    const [todos,setTodo] = React.useState([]);
    const [form,setForm] = React.useState({
        name: ""
    })
    const getData = async function () {
        const {apiKey} = app.convertCookieToObject(document.cookie);
        client.setApiKey(apiKey)
        const {data,response} = await client.get("/todos");
        console.log(data)
        if (!response.ok) {
            throw new Error("Error in GET Todo")
        }
        if (JSON.stringify(todos) !== JSON.stringify(data.data.listTodo)) {
            setTodo(function () {
                return data.data.listTodo
            })
        }
    }
    const handleChange = (e) => {
        setForm({name: e.target.value})
        console.log(form)
    }
    const addTodo = async function(e) {
        e.preventDefault()
        const {apiKey} = app.convertCookieToObject(document.cookie);
        client.setApiKey(apiKey);
        const {data,response} = await client.post("/todos",{
            todo: form.name
        });
        if (!response.ok) {
            throw new Error("Error in POST Todo")
        }
        console.log(form)
        setForm({
            name: ""
        })
        console.log(data);
         

    }
    const updateTodo = async function (e) {

    }
    const removeTodo = async function (e) {
        const {apiKey} = app.convertCookieToObject(document.cookie);
        client.setApiKey(apiKey);
        const {data,response} = await client.delete("/todos")
    }
    useEffect(() => {
    getData();
    },[todos,form])
    return (
        <Fragment>
            <div className="container">
                <h1>Welcome to Todo App !</h1>
                <form action="" onSubmit={addTodo}>
                    <input
                        type="text"
                        size="30"
                        placeholder="Thêm 1 việc làm mới"
                        onChange={handleChange}
                        value={form.name}
                    />
                    <button className="btn">
                        Thêm mới
                    </button>
                </form>
                <div className="todolist">
                    {todos.map(({_id,todo}) => {
                        return (<div key={_id} className="sub-todo">
                        <div className="text">{todo}</div>
                        <div className="action">
                            <button className="btn fixed">Sửa</button>
                            <button className="btn remove">Xóa</button>
                        </div>
                    </div>)
                    })}
                </div>
            </div>
        </Fragment>
    );
}

export default App;
