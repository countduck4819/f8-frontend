import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App.jsx";
import "./css/style.css"
import "./css/loaded.css"
import Provider from "./reducers/Provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-jc0jm574owm6kigd.us.auth0.com"
            clientId="i9h9w302W2V82Vu1bloOE8UuqkfoF16G"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
        {/* <Auth0Provider
    domain="dev-jc0jm574owm6kigd.us.auth0.com"
    clientId="LWiU8L5xetHZPczappS8sGdLMggaghEV"
    authorizationParams={{
      redirect_uri: window.location.origin
    }} */}
  {/* > */}
            <Provider>
                <App/>
            </Provider>
        </Auth0Provider>
    </React.StrictMode>
);
