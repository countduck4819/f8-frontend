import React from "react";
import "./assets/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
        <ToastContainer />
    </Provider>
    // </React.StrictMode>,
);
