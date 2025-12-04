import React from "react";
import "animate.css";

import { Route, Routes } from "react-router-dom";
import { Navbar } from "./component/Navbar";
import { Home } from "./page/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};
export default App;
