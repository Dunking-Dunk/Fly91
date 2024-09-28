import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dasboard";
import Status from "./status";
import Sidebar from "@/components/global/sidebar";
import SuccessPage from "./forms/success";
import Profile from "./profile";
import PassengerDetails from "./forms/passenger";

import Error from "@/pages/error";
import Rflight from "./review/flight";
import Rhotel from "./review/hotel";
import Rcab from "./review/cab";
import BookingForm from "./status";
import ServiceForm from "@/components/form/employee/serviceforms/ServiceForm";

const index = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex flex-row gap-4">
      <div className="w-1/5 ">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/status" element={<Status />} />
        {/* <Route path="/create/service" element={<Service />} /> */}
        <Route path="/error" element={<Error />} />
        {/* <Route path="/review-flight" element={<Rflight />} />
        <Route path="/review-hotel" element={<Rhotel />} />
        <Route path="/review-cab" element={<Rcab />} /> */}
        {/* <Route path="/booking-summary" element={<BookingForm />} /> */}
        <Route path="/create/service" element={<ServiceForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/data" element={<Data />} /> */}
        {/* <Route path="/details" element={<PassengerDetails />} /> */}
      </Routes>
    </div>
  );
};

export default index;
