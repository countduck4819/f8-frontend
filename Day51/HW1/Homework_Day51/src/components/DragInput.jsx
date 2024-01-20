import React, { memo, useLayoutEffect, useRef } from "react";
import { useDispatch } from "../hook/createHook";

function DragInput() {
    const rangeRef = useRef();
    // const currentNumber = u
    const dispatch = useDispatch(); 
    const handleMouseDown = function (e) {
        const width = rangeRef.current.clientWidth;
        let percent = ((e.clientX - 25) /width) * 100;
        let number = Math.floor(percent / 100 * 2048);
        rangeRef.current.children[0].style.width = `${percent}%`;
        rangeRef.current.querySelector(".visible span").innerText = `${number}`
        const takeWidth = function(e) {
            e.preventDefault()
            percent = ((e.clientX - 25) / width) * 100;
            if (percent > 100) {
                percent = 100;
            }
            if (percent < 0) {
                percent = 0;
            }
            number = Math.floor(percent / 100 * 2048);
            rangeRef.current.querySelector(".visible span").innerText = `${number}`
            rangeRef.current.children[0].style.width = `${percent}%`
        }

        const mouseUp = function() {
            console.log(number)
            window.removeEventListener("mousemove",takeWidth)
            const result = [...Array(9).keys()].map((index) => {
                return [index + 3, 2 ** (index + 3)];
            });
            console.log(result)
            result.forEach((value,index) => {
                if (number <= 8) {
                    dispatch({
                        type: "slot/input",
                        payload: 3
                    })
                    dispatch({
                        type: "currentSlot/input",
                        payload: 3
                    })
                    dispatch({
                        type: "number/random",
                        payload: Math.floor(Math.random() * number)
                    })
                }
                else if (number > value[1] && number <= result[index + 1][1]) {
                    dispatch({
                        type: "number/random",
                        payload: Math.floor(Math.random() * number)
                    })
                    dispatch({
                        type: "slot/input",
                        payload: value[0] + 1
                    })
                    dispatch({
                        type: "currentSlot/input",
                        payload: value[0] + 1
                    })
                }
            })
            dispatch({
                type: "drag/input",
                payload: number
            })
            document.body.removeEventListener("mouseup",mouseUp)
        }
        window.addEventListener("mousemove", takeWidth)
        document.body.addEventListener("mouseup",mouseUp)
    }
    useLayoutEffect(() => {
        // let number = Math.floor(10 / 100 * 2048);
        // rangeRef.current.querySelector(".visible span").innerText = `${number}`
    })
    return (
        <>
            <div onMouseDown={handleMouseDown} ref={rangeRef} className="range">
                <div className="drag-input">
                    <div className="btn-drag"></div>
                    <div className="visible">
                        <span>204</span>
                        <div className="box"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(DragInput);
