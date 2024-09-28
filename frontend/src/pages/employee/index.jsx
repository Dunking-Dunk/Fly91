import React from "react";
import { Routes, Route } from "react-router-dom";
import Dasboard from "./Dasboard";
import Status from "./status";
import Sidebar from "@/components/global/sidebar";
import Header from "@/components/global/header";

import Service from "./forms/service";
import Error from "@/pages/error";
import Rflight from "./review/flight";
import Rhotel from "./review/hotel";
import Rcab from "./review/cab";
import BookingForm from "./status";
import ServiceForm from "@/components/form/employee/serviceforms/ServiceForm";

const index = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <Routes>
        <Route path="/" element={<Dasboard />} />
        <Route path="/status" element={<Status />} />
        <Route path="/create/service" element={<Service />} />
        <Route path="/error" element={<Error />} />
        <Route path="/rflight" element={<Rflight />} />
        <Route path="/rhotel" element={<Rhotel />} />
        <Route path="/rcab" element={<Rcab />} />
        <Route path="/sbook" element={<BookingForm />} />
        <Route path="/serviceform" element={<ServiceForm />} />
      </Routes>
    </div>
  );
};

export default index;
