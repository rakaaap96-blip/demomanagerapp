import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error(
    "Root element #root tidak ditemukan. Pastikan index.html memiliki <div id='root'></div>.",
  );
}
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
