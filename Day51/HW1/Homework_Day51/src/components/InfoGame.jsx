import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "../hook/createHook";
function InfoGame({number}) {
    const state = useSelector(state => state)
    // const slotRef = useRef();
    // const result = [...Array(9).keys()].map((index) => {
    //     return [index + 3, 2 ** (index + 3)];
    // });
    // useLayoutEffect(() => {
    //     result.forEach((value,index) => {
    //         if (number > value[1] && number < result[index + 1][1]) {
    //             slotRef.current.innerText = value[0]
    //         }
    //     })
    // });
    return (
        <>
            <h1 className="heading">Chào mừng bạn đến với trò chơi đoán số!</h1>
            <div className="slot">
                Còn <span className="input-slot">{state.currentSlot}</span>/
                <span className="total-slot">{number}</span> lần
            </div>
            <div className="desc">
                Bạn cần tìm kiếm một số từ 1 đến
                <span className="count"> {state.number}</span>
            </div>
        </>
    );
}

export default memo(InfoGame);
