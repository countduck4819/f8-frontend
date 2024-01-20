import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../hook/createHook";

function InputNumber({slot}) {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [input,setInputState] = useState("")
    const [change, setChange] = useState(false)
    const [array, setArray] = useState([{
        maxTime: slot
    }])
    function createResult() {
        console.log("di choi")
        if (!localStorage.getItem("result")) {
            localStorage.setItem("result",JSON.stringify([array]))
        }
        else {
            const data = JSON.parse(localStorage.getItem("result"))
            const newData = [...data,array]
            console.log(newData)
            localStorage.setItem("result",JSON.stringify(newData))
        }
        
        setArray([{
            maxTime: slot
        }]);
        dispatch({
            type: "result/endgame",
            payload: true
        })
    }
    function handleChange(e) {
        if (change === true) {
            setInputState(e.target.value)
            setChange(false)
        }
    }
    function handleKeyDown(e) {
        const param = /^[0-9]$/;
        if (param.test(e.key)) {
            setChange(true)
            console.log([e])          
        }
        if (e.keyCode === 8) {
            if (e.target.value !== "") {
                setChange(true);
                e.target.value = e.target.value.slice(0,e.target.value.length - 1)
            }
        }
        if (e.keyCode === 13) {
            console.log(e.target.value)
            setArray([...array,{number: +e.target.value}])
            console.log("Enter",+state.numberRandom === +e.target.value)
            if (+state.numberRandom === +e.target.value) {
                createResult();
            }
            e.target.placeholder = +e.target.value;
            setInputState("")
        }
    }
    function handleButtonKeyDown() {
        if (e.keyCode === 13) {
            dispatch({
                type: "result/endgame",
                payload: false
            })
            dispatch({
                type: "number/random",
                payload: Math.floor(Math.random() * state.number)
            })
        }
    }

    function handleClickBtn() {
        dispatch({
            type: "result/endgame",
            payload: false
        })
        dispatch({
            type: "number/random",
            payload: Math.floor(Math.random() * state.number)
        })
        dispatch({
            type: "",
            payload: Math.floor(Math.random() * state.number)
        })
    }
    useEffect(() => {
        console.log(state.result)
        if (array.length - 1 === slot && state.result === false) {
            createResult()
        }
    })
    return (
        <div className="action">
            {state.result ? <button className="btn-reset" onClick={handleClickBtn} onKeyDown={handleButtonKeyDown}>Chơi lại</button>: <>
            <label htmlFor="number-input" className="desc">
                Hãy thử nhập một số
            </label><input
                type="text"
                placeholder="Thử một số"
                id="number-input"
                className="number-input"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            </>}
        </div>
    );
}

export default memo(InputNumber);
