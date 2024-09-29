import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Status from "./status";
import Sidebar from "@/components/global/sidebar";
import SuccessPage from "./forms/success";
import Profile from "./profile";

import BookingForm from "./status";
import ServiceForm from "./forms/serviceRequest";

import Reflight from "../../components/form/employee/review/reviewFlight";
import Rehotel from "../../components/form/employee/review/reviewHotel";
import Recab from "../../components/form/employee/review/reviewCab";

const index = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex flex-row gap-1">
      <div className="w-1/5 ">
        <Sidebar />
      </div>
      <div className="w-full h-full pr-4 pl-1 py-4">
        <div className="space-y-4 -ml-2 bg-white rounded-xl px-4 py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/service/create" element={<ServiceForm />} />
            <Route path="/service/success" element={<SuccessPage />} />

            <Route path="/status" element={<Status />} />
            <Route path="/review-flight" element={<Reflight />} />
            <Route path="/review-hotel" element={<Rehotel />} />
            <Route path="/review-cab" element={<Recab />} />
            {/* <Route path="/booking-summary" element={<BookingForm />} /> */}
            {/* <Route path="/data" element={<Data />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default index;
