import React from "react";
import Mainpage from "../src/components/Mainpage";
import GraphPage from "./components/GraphPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "antd";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="buttonContainer">
        <Button className="mr-2" type="primary" onClick={() => navigate("/")}>
          Anasayfa
        </Button>
        <Button type="primary" onClick={() => navigate("/graphpage")}>
          Grafik
        </Button>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Mainpage />}></Route>
          <Route path="/graphpage" element={<GraphPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
