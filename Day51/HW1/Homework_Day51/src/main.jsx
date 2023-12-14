import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/style.scss"
import Provider from "./reducers/Provider";
ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <Provider>
            <App/>
        </Provider>
    </React.StrictMode>
);
