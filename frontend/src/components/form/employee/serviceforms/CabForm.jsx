"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock } from "lucide-react";

const cabFormSchema = z
  .object({
    bookingType: z.enum(["fullDay", "transfers"], {
      required_error: "Booking type is required",
    }),
    city: z
      .string()
      .min(1, "City is required")
      .max(50, "City name is too long"),
    state: z
      .string()
      .min(1, "State is required")
      .max(50, "State name is too long"),
    pickupAddress: z
      .string()
      .min(1, "Pickup address is required")
      .max(100, "Pickup address is too long"),
    dropAddress: z
      .string()
      .min(1, "Drop address is required")
      .max(100, "Drop address is too long"),
    startTime: z
      .string()
      .optional()
      .refine((val) => !val || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
        message: "Invalid time format. Use HH:MM",
      }),
    endTime: z
      .string()
      .optional()
      .refine((val) => !val || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
        message: "Invalid time format. Use HH:MM",
      }),
    pickupTime: z
      .string()
      .optional()
      .refine((val) => !val || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
        message: "Invalid time format. Use HH:MM",
      }),
  })
  .refine(
    (data) => {
      if (data.bookingType === "fullDay") {
        return !!data.startTime && !!data.endTime;
      } else {
        return !!data.pickupTime;
      }
    },
    {
      message:
        "Please fill in the required time fields based on your booking type",
      path: ["startTime"],
    }
  );

export default function CabForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cabFormSchema),
    defaultValues: {
      bookingType: "fullDay",
      city: "",
      state: "",
      pickupAddress: "",
      dropAddress: "",
      startTime: "",
      endTime: "",
      pickupTime: "",
    },
  });

  const bookingType = watch("bookingType");

  const onSubmit = (data) => {
    console.log("Cab form submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-6">
      <Controller
        name="bookingType"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex space-x-4 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fullDay" id="fullDay" />
              <Label htmlFor="fullDay">Full Day</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="transfers" id="transfers" />
              <Label htmlFor="transfers">Transfers</Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors.bookingType && (
        <p className="text-red-500 text-xs">{errors.bookingType.message}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-6 py-7" placeholder="City" />
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-6 py-7" placeholder="State" />
            )}
          />
          {errors.state && (
            <p className="text-red-500 text-xs">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Controller
            name="pickupAddress"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-6 py-7"
                placeholder="Pickup address"
              />
            )}
          />
          {errors.pickupAddress && (
            <p className="text-red-500 text-xs">
              {errors.pickupAddress.message}
            </p>
          )}
        </div>
        <div>
          <Controller
            name="dropAddress"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-6 py-7"
                placeholder="Drop address"
              />
            )}
          />
          {errors.dropAddress && (
            <p className="text-red-500 text-xs">{errors.dropAddress.message}</p>
          )}
        </div>
      </div>

      {bookingType === "fullDay" ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="p-6 py-7"
                  placeholder="Start time"
                />
              )}
            />
            <Clock
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            {errors.startTime && (
              <p className="text-red-500 text-xs">{errors.startTime.message}</p>
            )}
          </div>
          <div className="relative">
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <Input {...field} className="p-6 py-7" placeholder="End time" />
              )}
            />
            <Clock
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            {errors.endTime && (
              <p className="text-red-500 text-xs">{errors.endTime.message}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-1/2">
          <Controller
            name="pickupTime"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-6 py-7"
                placeholder="Pickup Time"
              />
            )}
          />
          <Clock
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          {errors.pickupTime && (
            <p className="text-red-500 text-xs">{errors.pickupTime.message}</p>
          )}
        </div>
      )}

      <div className="flex pl-4 ml-auto w-1/2 space-x-4">
        <Button
          type="button"
          className="flex-1 p-6 bg-yellow-500 hover:bg-yellow-600"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 p-6 bg-green-500 hover:bg-green-600"
        >
          Review
        </Button>
      </div>
    </form>
  );
}
