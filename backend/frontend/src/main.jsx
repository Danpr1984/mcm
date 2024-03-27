import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import ColorContextProvider from "./context/ColorContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <AuthContextProvider>
    <ColorContextProvider>
      <App />
    </ColorContextProvider>
  </AuthContextProvider>,
  // </React.StrictMode>,
);
