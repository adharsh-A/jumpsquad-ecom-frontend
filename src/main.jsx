import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-s0ppday46g0vb2ff.us.auth0.com"
      clientId="yB7RqhvF6DTVB73Kfwqkv0tpJHEDGSP2"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
