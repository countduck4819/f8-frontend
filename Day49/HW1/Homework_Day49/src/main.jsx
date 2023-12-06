import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/Login";
import Provider from "./reducers/Provider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConvertAfterLogin from "./components/convertAfterLogin";
ReactDOM.createRoot(document.querySelector("#root")).render(
    // <React.StrictMode>
        <Provider>
            <ConvertAfterLogin/>
            <ToastContainer/>
        </Provider>
    // </React.StrictMode>
);
