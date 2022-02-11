import React from "react";
import ReactDOM from "react-dom";
import "../src/assets/css/style.css";
import App from "./App";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import trTR from "antd/lib/locale/tr_TR";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={trTR}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
