import React, { useState } from "react";
import { useDispatch, useSelector } from "./hook/createHook";
import ConvertMode from "./components/ConvertMode";
import DragInput from "./components/DragInput";
import InfoGame from "./components/InfoGame";
import InputNumber from "./components/InputNumber";
function App() {
    const state = useSelector((state) => state);
    const [statusLight, setStatusLight] = useState(false);
    const dispatch = useDispatch();
    if (!localStorage.getItem("light")) {
        console.log(123)
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
                <InputNumber></InputNumber>
                <div className="results">
                    <div className="remove">
                      <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-onkibi" aria-hidden="true"><g fill="currentColor"><path d="M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zM22 4h-4.75a.25.25 0 01-.25-.25V2.5A2.5 2.5 0 0014.5 0h-5A2.5 2.5 0 007 2.5v1.25a.25.25 0 01-.25.25H2a1 1 0 000 2h20a1 1 0 000-2zM9 3.75V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1.25a.25.25 0 01-.25.25h-5.5A.25.25 0 019 3.75z"></path></g></svg>
                    </div>
                    <div className="result">
                        <table className="table">
                            <thead>
                                <tr className="row">
                                    <th>Số lần nhập</th>
                                    <th>Số nhập vào</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="row bd">
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="total-result">
                            <div className="slot-play">
                                Lần chơi thứ{" "}
                                <span className="result-slot">2</span> /{" "}
                                <span className="total-slot">3</span>
                            </div>
                            <div className="max-slot">
                                Số nhập tối đa: <span className="max">10</span>
                            </div>
                            <div className="percent">
                                Tỷ lệ đúng: <span className="figure">0</span>%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
