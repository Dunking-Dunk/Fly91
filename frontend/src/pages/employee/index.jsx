import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Status from "./status";
import Sidebar from "@/components/global/sidebar";
import SuccessPage from "./forms/success";
import Profile from "./profile";

import Rflight from "./review/flight";
import Rhotel from "./review/hotel";
import Rcab from "./review/cab";
import BookingForm from "./status";
import ServiceForm from "./forms/serviceRequest";

const index = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex flex-row gap-1">
      <div className="w-1/5 ">
        <Sidebar />
      </div>
      <div className="w-full h-full pr-4 pl-1 py-4">
        <div className="space-y-4 bg-white rounded-xl px-6 py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/service/create" element={<ServiceForm />} />
            <Route path="/service/success" element={<SuccessPage />} />


            {/* <Route path="/status" element={<Status />} /> */}
            {/* <Route path="/review-flight" element={<Rflight />} />
            <Route path="/review-hotel" element={<Rhotel />} />
            <Route path="/review-cab" element={<Rcab />} /> */}
            {/* <Route path="/booking-summary" element={<BookingForm />} /> */}
            {/* <Route path="/data" element={<Data />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default index;
