import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/sass/style.scss"
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.querySelector("#root")).render(
  // <React.StrictMode>
    <Fragment>
      <App/>
    <ToastContainer/>
    </Fragment>
  // </React.StrictMode>
)