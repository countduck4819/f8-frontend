import React, { memo, useState } from "react";

function InputNumber() {
    const [input,setInputState] = useState("")
    const [change, setChange] = useState(false)
    function handleChange(e) {
        if (change === true) {
            setInputState(e.target.value)
            setChange(false)
        }
    }
    function handleKeyDown(e) {
        console.log([e])
        const param = /^[0-9]$/;
        if (param.test(e.key)) {
            setChange(true)
            console.log([e])          
        }
        if (e.keyCode === 8) {
            if (e.target.value !== "") {
                console.log("??")
                setChange(true);
                e.target.value = e.target.value.slice(0,e.target.value.length - 1)
            }
        }
        if (e.keyCode === 13) {
            console.log(e.target.value)
            e.target.placeholder = +e.target.value;
            setInputState("")
        }
    }
    return (
        <div className="action">
            <label htmlFor="number-input" className="desc">
                Hãy thử nhập một số
            </label>
            <input
                type="text"
                placeholder="Thử một số"
                id="number-input"
                className="number-input"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default memo(InputNumber);
