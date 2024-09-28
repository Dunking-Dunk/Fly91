import React, { useState } from 'react';
import { ChevronDown, Hotel, Car } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import taxi from '@/assets/images/taxi.png'

// Import Header and Sidebar components
import Header from '../../../components/global/header';
import Sidebar from '../../../components/global/sidebar';

// Import Employee details component
import Details from '../../../components/form/passengerDetails';

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
  passengers: z.array(passengerSchema).length(3, "Exactly 3 passengers are required"),
  service: serviceSchema,
});

export default function FlightBooking() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPassengerEditMode, setIsPassengerEditMode] = useState(false);
  const [isServiceEditMode, setIsServiceEditMode] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
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
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

    <div className="flex-1">
        {/* Header */}
        <Header />
    <div className="flex justify-between items-center py-5 px-5 mb-6 border border-gray-200 rounded-lg bg-[#E4F6FD]">
      <div className="flex-1 p-5">
        <div className="bg-white ml-[15%] mt-[2.5%] py-10 px-10 rounded-lg shadow-sm">
          {/* Top layer */}
          <div className="flex justify-between items-center mb-6, border border-gray-200 rounded-lg p-4 mb-2 bg-[#fafafa]">
            <h2 className="text-md font-normal">Review Passenger Details</h2>
            <div className="flex justify-between items-center mb-6, border border-gray-200 rounded-lg p-2 bg-[#E4F6FD]">
              <img src={taxi} className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor" />
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              <span className="text-sm text-gray-500">Cab</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Passenger Details Box */}
            <Details 
                  isPassengerEditMode={isPassengerEditMode}
                  setIsPassengerEditMode={setIsPassengerEditMode}
                  register={register}
                  errors={errors}
            />

            {/* Service Request Box */}
            <div className="flex justify-between items-center mb-2 border border-gray-200 rounded-lg p-4 mb-2 bg-[#fafafa]">
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
                  <label htmlFor="edit-service" className="text-sm text-gray-500">Edit</label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                    disabled={!isServiceEditMode}
                    {...register('service.origin')}
                  />
                  {errors.service?.origin && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.origin.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                    disabled={!isServiceEditMode}
                    {...register('service.departure')}
                  />
                  {errors.service?.departure && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.departure.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Pickup Address"
                    className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                    disabled={!isServiceEditMode}
                    {...register('service.departureDate')}
                  />
                  {errors.service?.departureDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.departureDate.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Drop Address"
                    className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                    disabled={!isServiceEditMode}
                    {...register('service.arrivalDate')}
                  />
                  {errors.service?.arrivalDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.arrivalDate.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="time"
                    placeholder="Time Preference"
                    className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                    disabled={!isServiceEditMode}
                    {...register('service.mobileNumber')}
                  />
                  {errors.service?.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.mobileNumber.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button type="button" className="w-48 bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-4 rounded">
                Back
              </button>
              <button type="submit" className="w-48 bg-green-500 hover:bg-green-600 text-white py-4 px-4 rounded">
                Place Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}