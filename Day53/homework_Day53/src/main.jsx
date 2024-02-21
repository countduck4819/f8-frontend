import React from "react";
import "./assets/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import theme from "./theme.js";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <CssVarsProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline />
            <App />
            <ToastContainer />
        </Provider>
    </CssVarsProvider>
    // </React.StrictMode>,
);
