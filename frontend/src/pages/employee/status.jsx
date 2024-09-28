import React from "react";
export default function BookingForm() {
  // Assume this date is fetched from a database
  const submissionDate = new Date("2024-12-24T15:23:00");

  return (
    <div className="min-h-screen bg-[#E4F6FD] p-4 pt-16 ">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 bg-gray-200">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-medium">
                SRN-FLT-000722
              </span>
              <span className="text-sm text-gray-600 font-medium">Flight</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-800 font-medium">
                {submissionDate.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="text-sm text-gray-500">Submitted</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Per Day allowance: ₹2500</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 bg-white">
          <h3 className="bg-gray-100 p-6 rounded-lg shadow-sm text-lg mb-4">
            Passenger Details
          </h3>
          <form className="space-y-6">
            {/* Passenger Details */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  First Name
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Last Name
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Employee ID
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Department
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Mobile Number
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Email
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white col-span-1">
                  Reason for Travel
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white col-span-1">
                  HOD Approval Document
                </div>
              </div>
            </div>

            {/* Service Request */}
            <h3 className="bg-gray-100 p-6 shadow-sm text-lg mb-4">
              Service request
            </h3>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Origin
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Destination
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Departure Date
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Time Preference
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  Mobile Number
                </div>
                <div className="w-full p-3 border border-gray-300 text-sm bg-white">
                  ONE WAY
                </div>
              </div>
            </div>

            {/* Request Tracking */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg  mb-4">Request Tracking</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="relative">
                  {/* Progress Bar and Step Indicators */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-green-500 h-1 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                    <div className="absolute left-0 top-0 -mt-2 w-full flex justify-between">
                      <div className="relative">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="relative">
                        <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                      </div>
                      <div className="relative">
                        <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                      </div>
                      <div className="relative">
                        <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Step Labels */}
                  <div className="flex justify-between text-sm">
                    <div className="w-1/4 text-center">
                      <div className="font-medium">Submitted</div>
                      <div className="text-xs text-gray-500">
                        {submissionDate.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {submissionDate.toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <div className="w-1/4 text-center">
                      <div className="font-medium">In Progress</div>
                    </div>
                    <div className="w-1/4 text-center">
                      <div className="font-medium">Confirmed</div>
                    </div>
                    <div className="w-1/4 text-center">
                      <div className="font-medium">Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-6 py-2 bg-yellow-500 text-white rounded"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
