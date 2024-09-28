import React from "react";
import { Routes, Route } from "react-router-dom";
import Dasboard from "./Dasboard";
import Status from "./status";
import Sidebar from "@/components/global/sidebar";
import Header from "@/components/global/header";

const index = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <Routes>
        <Route path="/" element={<Dasboard />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </div>
  );
};

export default index;
