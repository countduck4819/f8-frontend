import React, { useState } from 'react'
import { app } from '../js/app'
import Remove from './Remove'
import InputUpdate from './InputUpdate';

function Update({dataId:id,todoList,updateTodo,setRemove}) {
    console.log(id)
    // const [check,setCheck] = todoList.isCompleted;
    const check = todoList.isCompleted;
    const defaultTodo = todoList.todo;
    console.log(defaultTodo)
    const [quantity,setQuantity] = useState(app.quantity);
    // function checkedT() {
    //     setCheck(true)
    //     return "checked"
    // }
    // function checkedF() {
    //     setCheck(false);
    //     return ""
    // }
    function convertUpdate() {
        setQuantity(1);
    }
    function buttonUpdate() {
        setQuantity(0);
    }
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
                <input type="checkbox" id="completed" defaultChecked={check ? "checked":""}/>
            </div>
            <div>
                <button className="btn cancel" onClick={buttonUpdate}>Hủy</button>
                <InputUpdate todo={defaultTodo} dataId={id} setRemove={setRemove} checki={check}></InputUpdate>
            </div>
        </div>
    )
  }
}

export default Update