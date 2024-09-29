import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schemas
const passengerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const serviceSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  departure: z.string().min(1, "Departure is required"),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
});

const formSchema = z.object({
  passengers: z
    .array(passengerSchema)
    .length(3, "Exactly 3 passengers are required"),
  service: serviceSchema,
});

export default function FlightBooking() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServiceEditMode, setIsServiceEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: [{}, {}, {}],
      service: {},
    },
  });

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Service Request Box */}
          <div className="flex justify-between items-center   border border-gray-200 rounded-lg p-4 mb-2 bg-[#fafafa]">
            <h3 className="text-md font-normal">Service Request</h3>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-[#fafafa]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center justify-end w-full">
                <input
                  type="checkbox"
                  id="edit-service"
                  className="mr-2"
                  checked={isServiceEditMode}
                  onChange={() => setIsServiceEditMode(!isServiceEditMode)}
                />
                <label htmlFor="edit-service" className="text-sm text-gray-500">
                  Edit
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                  disabled={!isServiceEditMode}
                  {...register("service.origin")}
                />
                {errors.service?.origin && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service.origin.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State"
                  className="w-full border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                  disabled={!isServiceEditMode}
                  {...register("service.departure")}
                />
                {errors.service?.departure && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service.departure.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pickup Address"
                  className="w-full  border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                  disabled={!isServiceEditMode}
                  {...register("service.departureDate")}
                />
                {errors.service?.departureDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service.departureDate.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Drop Address"
                  className="w-full  border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                  disabled={!isServiceEditMode}
                  {...register("service.arrivalDate")}
                />
                {errors.service?.arrivalDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service.arrivalDate.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="time"
                  placeholder="Time Preference"
                  className="w-full  border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                  disabled={!isServiceEditMode}
                  {...register("service.mobileNumber")}
                />
                {errors.service?.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service.mobileNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
