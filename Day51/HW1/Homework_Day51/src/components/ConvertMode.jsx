import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "../hook/createHook";

function ConvertMode() {
    const state = useSelector((state) => state.checkLight);
    const dispatch = useDispatch();
    function handleClick() {
        dispatch({
            type: "convert/light",
            payload: !state,
        })
        localStorage.setItem("light",JSON.stringify({
            light: !state
          }))
    }
    return (
        <div className="mode" onClick={handleClick}>
            <i className="fa-solid fa-moon"></i>
            <i className="fa-regular fa-sun"></i>
        </div>
    );
}

export default memo(ConvertMode);
