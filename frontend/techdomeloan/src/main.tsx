import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserauthProvider } from "./contexts/UserContext.tsx";
import { AdminauthProvider } from "./contexts/AdminContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdminauthProvider>
      <UserauthProvider>
        <App />
      </UserauthProvider>
    </AdminauthProvider>
  </React.StrictMode>
);
