import React, { useEffect, useState } from 'react'
import { app } from '../js/app'
import Remove from './Remove'
import InputUpdate from './InputUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update({dataId:id,todoList,updateTodo,setRemove}) {
    // const [check,setCheck] = todoList.isCompleted;
    console.log(todoList)
    const [checkCom,setCheckCom] = useState(todoList.isCompleted);
    const defaultTodo = todoList.todo;
    const [quantity,setQuantity] = useState(app.quantity);
    // function checkedT() {
    //     setCheck(true)
    //     return "checked"
    // }
    // function checkedF() {
    //     setCheck(false);
    //     return ""
    // }
    function handleChange(e) {
        if (checkCom) {
            setCheckCom(false);
        }else {
            setCheckCom(true);
        }
    }
    function convertUpdate() {
        setQuantity(1);
    }
    function buttonUpdate() {
        setQuantity(0);
    }
    function checked() {
        setCheckCom()
    }
    function unchecked () {

    }
    useEffect(() => {
        console.log(checkCom)
    })
  if (quantity === 0) {
    return (
        <button className="btn fixed" onClick={convertUpdate}>Sửa</button>
      )
  }
  else {
    return (
        <div className="update">
            <div>
                <label htmlFor="completed" >Not Completed</label>
                <input onChange={handleChange} type="checkbox" id="completed" defaultChecked={checkCom ? "checked":""}/>
            </div>
            <div>
                <button className="btn cancel" onClick={buttonUpdate}>Hủy</button>
                <InputUpdate todo={defaultTodo} dataId={id} setRemove={setRemove} checki={checkCom}></InputUpdate>
            </div>
        </div>
    )
  }
}

export default Update