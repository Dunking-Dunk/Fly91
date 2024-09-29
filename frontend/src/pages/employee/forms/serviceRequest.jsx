import ServiceForm from "@/components/form/employee/serviceRequest/ServiceForm";
import PassengerForm from "@/components/form/employee/serviceRequest/PassengerForm";
import { useState } from "react";

const ServiceRequest = () => {
  const [userDetail, setUserDetail] = useState(null);

  return (
    <div className="w-full h-full">
      {!userDetail ? (
        <PassengerForm setDetail={setUserDetail} />
      ) : (
        <ServiceForm />
      )}
    </div>
  );
};
export default ServiceRequest;
