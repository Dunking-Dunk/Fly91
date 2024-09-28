import React from "react";
import { Routes, Route } from "react-router-dom";
import Dasboard from "./Dasboard";

const index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dasboard />} />
      </Routes>
    </div>
  );
};

export default index;
