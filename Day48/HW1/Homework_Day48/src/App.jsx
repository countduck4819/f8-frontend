import React, { Fragment, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app } from "./js/app";
import { client } from "./js/client";
import Remove from "./components/Remove";
import Update from "./components/Update";
function App() {
    const [todos,setTodo] = React.useState([]);
    const [form,setForm] = React.useState({
        name: ""
    })
    const [count,setCount] = React.useState(0);
    const [checkSearch,setCheckSearch] = React.useState(false);
    const getData = async function () {
            const {apiKey} = app.convertCookieToObject(document.cookie);
            client.setApiKey(apiKey)
            const {data,response} = await client.get("/todos");
            setCount(1)
            if (!response.ok) {
                if (response.status === 401) {
                    app.start(response.status);
                    toast.error("Vui lòng reset lại")
                    getData();
                }
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
        else {
            toast.success("Add todo success");
        }
        getData();
        setForm({
            name: ""
        })
    }
    const search = async function () {
        const {apiKey} = app.convertCookieToObject(document.cookie);
        client.setApiKey(apiKey);
        const {data,response} = await client.get(`/todos?q=${form.name}`);
        setCount(0)
        const todoList = data.data.listTodo;
        if (JSON.stringify(todoList) !== JSON.stringify(todos)) {
            setTodo(todoList);
        }
        if (!response.ok) {
            toast.error("Search không tìm thấy")
            throw new Error("Search không tìm thấy")
        }
    }
    const setRemove = function() {
        if (checkSearch) {
            search()
        }else {
            getData()
        }
    }
    const updateTodo = function (todo) {
        setTodo(todo);
    }
    const notTodo = function() {
        return (
            <div className="sub-todo">Không có Todo</div>
        )
    }
    // const runTodo = function() {
    //     return {todos.map((value,_) => {
    //         return (<div key={value._id} className="sub-todo">
    //         <div className="text">{value.todo}</div>
    //         <div className="action">
    //             <Update dataId={value._id} setRemove={setRemove} todoList={value} updateTodo={updateTodo}></Update>
    //             <Remove id={value._id} setRemove={setRemove}></Remove>
    //         </div>
    //     </div>)
    //     })}
    // }
    const convertSearch = function(check) {
        setCheckSearch(check)
    }
    useEffect(() => {
    if (checkSearch) {
        search()
    }else {
        if (count === 0) {
            getData()
        }
    }
    },[form,checkSearch])
    return (
        <Fragment>
            
            <div className="container">
                <h1>Welcome to Todo App !</h1>
                <form action="" className="input-search">
                    <div className="box">
                        <input
                            type="text"
                            size="30"
                            placeholder="Thêm 1 việc làm mới"
                            onChange={handleChange}
                            value={form.name}
                        />
                        <button className="btn-add btn" onClick={addTodo}>
                            Thêm mới
                        </button>
                    </div>
                    <button className="btn-search btn" onClick={(e) => {
                        if (!checkSearch) {
                            toast.success("convert to Search")
                        }
                        else {
                            toast.success("convert to Add")
                        }
                        e.preventDefault();
                        convertSearch(!checkSearch)
                    }}>Search</button>
                </form>
                <div className="todolist">
                    {todos.length ? todos.map((value,_) => {
                        return (<div key={value._id} className="sub-todo">
                        <div className="text" id={value.isCompleted ? "completed":"normal"}>{value.todo}</div>
                        <div className="action">
                            <Update dataId={value._id} setRemove={setRemove} todoList={value} updateTodo={updateTodo}></Update>
                            <Remove id={value._id} setRemove={setRemove}></Remove>
                        </div>
                    </div>)
                    }) : notTodo()}
                </div>
            </div>
        </Fragment>
    );
}

export default App;
