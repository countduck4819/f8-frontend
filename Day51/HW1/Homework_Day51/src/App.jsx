import React, { useState } from "react";
import { useDispatch, useSelector } from "./hook/createHook";
import ConvertMode from "./components/ConvertMode";
import DragInput from "./components/DragInput";
import InfoGame from "./components/InfoGame";
import InputNumber from "./components/InputNumber";
import Result from "./components/Result";
function App() {
    console.log("fkdsafasfj123123")
    const state = useSelector((state) => state);
    const [statusLight, setStatusLight] = useState(false);
    const dispatch = useDispatch();
    if (!localStorage.getItem("light")) {
      localStorage.setItem("light",JSON.stringify({
        light: state.checkLight
      }))
      setStatusLight(true);
    }else if (!statusLight) {
      dispatch({
        type: "convert/light",
        payload: JSON.parse(localStorage.getItem("light")).light
      })
      setStatusLight(true);
    }

    return (
        <div className={state.checkLight ? "dark" : "light"}>
            <div className="container">
                <div className="border-top"></div>
                <ConvertMode></ConvertMode>
                <InfoGame number={state.slot}></InfoGame>
                <DragInput></DragInput>
                <InputNumber slot={state.slot} result={state.result}></InputNumber>
                <Result></Result>
            </div>
        </div>
    );
}

export default App;
