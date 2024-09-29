import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UserProfile() {
  const [userData] = useState({
    firstName: "Sanjana",
    lastName: "Nair",
    employeeId: "EMP12345",
    department: "Engineering",
    mobileNumber: "+91 94373 34344",
    email: "sanjana@fly91.com",
    managerName: "Ravi Kumar",
    managerEmail: "ravi.kumar@fly91.com",
  });

  useEffect(() => {
    // Simulate fetching data from the backend
    // In real case, you'd fetch from API and set the userData accordingly
    // setUserData(fetchedData);
  }, []);

  return (
    <Card className="max-w-4xl mx-auto ">
      <CardContent className="p-6">
        <div className="flex  mt-6 mx-5 mb-6">
          <div className="w-1/3 bg-gray-50 mr-4 p-6 border rounded-s border-gray-200 flex flex-col items-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage
                src="/placeholder.svg?height=128&width=128"
                alt="Sanjana"
              />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
            <div className="text-center mt-4">
              <h2 className="text-xl text-gray-500 font-semibold">
                {userData.firstName}
              </h2>
              <p className="text-sm text-gray-400 mb-4">Employee</p>
              <p className="text-sm text-gray-400">{userData.mobileNumber}</p>
              <p className="text-sm text-gray-400">{userData.email}</p>
              <p className="text-sm text-gray-400">{userData.department}</p>
            </div>
          </div>

          <div className="w-3/4">
            <div className="mb-8 p-6 bg-gray-50 border rounded-sm border-gray-200">
              <h2 className="text-gray-600 mb-3">Personal Details</h2>
              <div className="grid grid-cols-2 gap-10">
                <div className="w-full bg-white mt-2 p-3 text-gray-500 border border-gray-300 rounded-s">
                  {userData.firstName}
                </div>
                <div className="w-full bg-white mt-2 p-3 text-gray-500 border border-gray-300 rounded-s">
                  {userData.lastName}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="w-full mt-6 p-3 border bg-white text-gray-500 border-gray-300 rounded-s">
                  {userData.employeeId}
                </div>
                <div className="w-full mt-6 p-3 border bg-white text-gray-500 border-gray-300 rounded-md">
                  {userData.department}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="w-full mt-6 p-3 border bg-white text-gray-500 border-gray-300 rounded-md">
                  {userData.mobileNumber}
                </div>
                <div className="w-full mt-6 p-3 border bg-white text-gray-500 border-gray-300 rounded-s">
                  {userData.email}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-gray-600 mb-3">Reporting Manager Details</h2>
              <div className="grid grid-cols-2 gap-10">
                <div className="bg-white p-3 text-gray-500 border border-gray-300 rounded-md">
                  {userData.managerName}
                </div>
                <div className="bg-white p-3 text-gray-500 border border-gray-300 rounded-md">
                  {userData.managerEmail}
                </div>
              </div>
            </div>

            <div className="flex justify mt-6 space-x-3 rounded-s">
              <Button
                type="button"
                variant="outline"
                className="bg-yellow-500 pl-10 pr-10 text-white hover:bg-yellow-600"
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
