import React, { memo, useState } from "react";

function InputNumber() {
    const [input,setInputState] = useState("")
    function handleChange(e) {
        
    }
    function handleKeyDown(e) {
        // if (e.keyCode)
        if (e.keyCode >= 96 && e.keyCode <= 105) {
            
        }
        if (e.keyCode === 13) {
            console.log("di choi")
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
