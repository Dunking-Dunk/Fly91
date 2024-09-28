import React from "react";
import TableComponent from "@/components/global/table";
import { employeeDashboardColumn } from "@/lib/columns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const mockData = [
  {
    srn: "SRN-CAB-000122",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "Completed",
  },
  {
    srn: "SRN-CAB-000123",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "In Progress",
  },
  {
    srn: "SRN-CAB-000124",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "Rejected",
  },
  {
    srn: "SRN-CAB-000125",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "Submitted",
  },
  {
    srn: "SRN-CAB-000122",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "Completed",
  },
  {
    srn: "SRN-CAB-000123",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "In Progress",
  },
  {
    srn: "SRN-CAB-000124",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "Rejected",
  },
  {
    srn: "SRN-CAB-000125",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "Submitted",
  },
  {
    srn: "SRN-CAB-000122",
    service: "Cab",
    requestRaised: "24-Sep-2024",
    fulfilled: "-",
    status: "Completed",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full gap-y-2">
      <h2 className="text-3xl font-semibold">Dashboard</h2>
      <TableComponent data={mockData} columns={employeeDashboardColumn} />
      <div className="mt-4 flex justify-end">
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-5"
          onClick={() => navigate("/create/service")}
        >
          Raise New Request
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
