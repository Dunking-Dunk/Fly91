import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  AlertCircle,
  Paperclip,
} from "lucide-react";

// ConfirmationPopup component (unchanged)
const ConfirmationPopup = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full ">
        <div className="flex flex-col items-center">
          <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BookingForm() {
  const [openSection, setOpenSection] = useState("passengerDetails");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleSaveChanges = () => {
    setConfirmationType("save");
    setIsConfirmationOpen(true);
  };

  const handleCancelRequest = () => {
    setConfirmationType("cancel");
    setIsConfirmationOpen(true);
  };

  const handleConfirm = () => {
    if (confirmationType === "save") {
      console.log("Changes saved!");
    } else if (confirmationType === "cancel") {
      console.log("Request cancelled!");
    }
    setIsConfirmationOpen(false);
  };

  const handleCheckboxChange = (e) => {
    setIsEditable(e.target.checked);
  };

  // Define the steps array
  const steps = [
    {
      label: "Submitted",
      completed: true,
      date: "24 Sep 24",
      time: "10:30 AM",
    },
    { label: "In Progress", completed: false },
    { label: "Confirmed", completed: false },
    { label: "Completed", completed: false },
  ];

  // Calculate progress
  const completedSteps = steps.filter((step) => step.completed).length;
  const progress = (completedSteps / (steps.length - 1)) * 100;

  return (
    <div className="">
      <div className=" mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between mx-3 mt-3 py-4 px-3 rounded-lg border-2">
          <div className="flex">
            <p className="mx-2 text-sm">SRN-FLT-000722</p>
            <p className="mx-2 text-sm">Flight</p>
            <p className="mx-2 text-sm">24 Sep 24</p>
          </div>
          <div className="flex">
            <p className="mx-2 text-sm">Submitted</p>
          </div>
        </div>

        <div className="flex justify-between items-center m-3 px-6">
          <span className="text-sm text-gray-500">
            Per Day allowance: ₹2500
          </span>
          <span className="text-sm text-gray-500">Trip Type: ONE WAY</span>
        </div>

        {/* Form Section */}
        <div className="mt-0  border-2 m-4  rounded-2xl">
          {/* Passenger Details */}
          <div className="bg-gray-50 rounded-2xl rounded-b-none  border-b-2">
            <div className="flex justify-between items-center p-4">
              <button
                className="w-full text-left flex justify-between items-center"
                onClick={() => toggleSection("passengerDetails")}
              >
                <h3 className="text-base font-medium">Passenger Details</h3>
                {openSection === "passengerDetails" ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>

            {openSection === "passengerDetails" && (
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="edit-checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={isEditable}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="edit-checkbox" className="text-sm font-base">
                    Edit
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="First Name"
                    disabled={!isEditable}
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Last Name"
                    disabled={!isEditable}
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Employee ID"
                    disabled={!isEditable}
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Department"
                    disabled={!isEditable}
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Mobile Number"
                    disabled={!isEditable}
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Email"
                    disabled={!isEditable}
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Reason for Travel"
                    disabled={!isEditable}
                  />

                  {/* Document Upload Section */}
                  <div className="flex flex-col items-start">
                    <button
                      className={`bg-white text-blue-500 px-4 py-2 rounded flex flex-col items-center justify-center w-full border-2 ${
                        !isEditable ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!isEditable}
                    >
                      <div className="flex items-center justify-center">
                        <Paperclip size={16} className="mr-2" />
                        <span className="text-sm">Add Document</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        Max size 5MB
                      </span>
                    </button>
                    <p className="text-right w-full text-xs text-gray-500 mt-2">
                      *Can be doc, docx, png, jpg, jpeg, pdf
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Service Request */}
          <div className="bg-gray-50 rounded-2xl rounded-b-none  border-b-2">
            <button
              className="w-full p-4 text-left flex justify-between items-center"
              onClick={() => toggleSection("serviceRequest")}
            >
              <h3 className="text-base font-medium">Service Request</h3>
              {openSection === "serviceRequest" ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {openSection === "serviceRequest" && (
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="edit-checkbox-service"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={isEditable}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="edit-checkbox-service"
                    className="text-sm font-medium"
                  >
                    Edit
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Origin"
                    disabled={!isEditable}
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Destination"
                    disabled={!isEditable}
                  />
                  <div className="relative">
                    <input
                      className="w-full p-2 pr-10 border border-gray-300 rounded"
                      placeholder="Departure Date"
                      disabled={!isEditable}
                    />
                    <Calendar
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                  <div className="relative">
                    <input
                      className="w-full p-2 pr-10 border border-gray-300 rounded"
                      placeholder="Time Preference"
                      disabled={!isEditable}
                    />
                    <Clock
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Request Tracking */}
          <div className="bg-gray-50 rounded-2xl rounded-b-none  border-b-2 ">
            <button
              className="w-full p-4 text-left flex justify-between items-center"
              onClick={() => toggleSection("requestTracking")}
            >
              <h3 className="text-base font-medium">Request Tracking</h3>
              {openSection === "requestTracking" ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {openSection === "requestTracking" && (
              <div className="p-4">
                <div className="flex items-center justify-between space-x-4">
                  {steps.map((step, index) => (
                    <React.Fragment key={index}>
                      {/* Circle Indicator */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-6 w-6 rounded-full ${
                            step.completed ? "bg-green-500" : "bg-gray-300"
                          } flex items-center justify-center`}
                        >
                          {step.completed && (
                            <span className="text-white font-bold">✓</span>
                          )}
                        </div>
                        <span className="mt-1 text-xs text-gray-600">
                          {step.label}
                        </span>
                        {step.date && (
                          <span className="mt-1 text-xs text-gray-400">
                            {step.date}
                            <br />
                            {step.time}
                          </span>
                        )}
                      </div>

                      {/* Line between steps */}
                      {index !== steps.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 ${
                            steps[index + 1].completed
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end p-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mx-4"
              onClick={handleCancelRequest}
            >
              Cancel Request
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ml-4"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
        title={
          confirmationType === "save"
            ? "Are you sure you want to save changes?"
            : "Are you sure you want to cancel the request?"
        }
      />
    </div>
  );
}
