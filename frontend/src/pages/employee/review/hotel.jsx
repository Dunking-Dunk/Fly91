import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import hotel from '@/assets/images/hotel.png'

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
  destination: z.string().min(1, "Destination is required"),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  checkoutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  departureTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  checkoutTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
});

const formSchema = z.object({
  passengers: z.array(passengerSchema).length(3, "Exactly 3 passengers are required"),
  service: serviceSchema,
});

export default function HotelBooking() {
  const [isPassengerEditMode, setIsPassengerEditMode] = useState(false);
  const [isServiceEditMode, setIsServiceEditMode] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: [{}, {}, {}],
      service: {},
    },
  });

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
        <Header/>
        <div className="flex justify-between items-center py-5 px-5 mb-6 border border-gray-200 rounded-lg bg-[#E4F6FD]">
          <div className="flex-1 p-5">
            <div className="bg-white ml-[15%] mt-[2.5%] py-10 px-10 rounded-lg shadow-sm">
              {/* Top layer */}
              <div className="flex justify-between items-center mb-6 border border-gray-200 rounded-lg p-4 mb-2 bg-[#fafafa]">
                <h2 className="text-md font-normal">Review Passenger Details</h2>
                <div className="flex justify-between items-center mb-6 border border-gray-200 rounded-lg p-2 bg-[#E4F6FD]">
                  <img src={hotel} alt="Hotel" className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">Hotel</span>
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
                        placeholder="Origin"
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
                        placeholder="Destination"
                        className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                        disabled={!isServiceEditMode}
                        {...register('service.destination')}
                      />
                      {errors.service?.destination && (
                        <p className="text-red-500 text-sm mt-1">{errors.service.destination.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="date"
                        placeholder="Departure Date"
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
                        type="date"
                        placeholder="Checkout Date"
                        className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                        disabled={!isServiceEditMode}
                        {...register('service.checkoutDate')}
                      />
                      {errors.service?.checkoutDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.service.checkoutDate.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="time"
                        placeholder="Departure Time"
                        className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                        disabled={!isServiceEditMode}
                        {...register('service.departureTime')}
                      />
                      {errors.service?.departureTime && (
                        <p className="text-red-500 text-sm mt-1">{errors.service.departureTime.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="time"
                        placeholder="Checkout Time"
                        className="w-full p-2 border border-gray-300 rounded p-5 bg-[#F4F4F3]"
                        disabled={!isServiceEditMode}
                        {...register('service.checkoutTime')}
                      />
                      {errors.service?.checkoutTime && (
                        <p className="text-red-500 text-sm mt-1">{errors.service.checkoutTime.message}</p>
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