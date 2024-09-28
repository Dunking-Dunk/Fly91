import React from 'react';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Define the Zod schema for a single route
const routeSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
}).refine(data => data.origin !== data.destination, {
  message: "Origin and destination must be different",
  path: ["destination"], // This will attach the error to the destination field
});

// Define the main Zod schema for the flight form
const flightFormSchema = z.object({
  tripType: z.enum(["oneWay", "roundTrip", "multicity"]),
  routes: z.array(routeSchema).min(1, "At least one route is required"),
  enableCalendar: z.boolean(),
  departureDate: z.string().min(1, "Departure date is required"),
  arrivalDate: z.string().optional(),
  departureTime: z.string().optional(),
  arrivalTime: z.string().optional(),
}).refine(data => {
  if (data.tripType === "roundTrip" && !data.arrivalDate) {
    return false;
  }
  return true;
}, {
  message: "Arrival date is required for round trips",
  path: ["arrivalDate"],
}).refine(data => {
  if (data.tripType === "multicity" && data.routes.length < 2) {
    return false;
  }
  return true;
}, {
  message: "At least two routes are required for multicity trips",
  path: ["routes"],
});

export default function FlightForm({ onShowBanner }) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(flightFormSchema),
    defaultValues: {
      tripType: "oneWay",
      routes: [{ origin: "", destination: "" }],
      enableCalendar: false,
      departureDate: "",
      arrivalDate: "",
      departureTime: "",
      arrivalTime: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "routes",
  });

  const tripType = watch("tripType");
  const enableCalendar = watch("enableCalendar");

  const onSubmit = (data) => {
    if (enableCalendar) {
      onShowBanner();
    } else {
      console.log("Form submitted:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label>Trip Type</Label>
        <Controller
          name="tripType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oneWay" id="oneWay" />
                <Label htmlFor="oneWay">One Way</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roundTrip" id="roundTrip" />
                <Label htmlFor="roundTrip">Round Trip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multicity" id="multicity" />
                <Label htmlFor="multicity">Multicity</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.tripType && <p className="text-red-500">{errors.tripType.message}</p>}
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`routes.${index}.origin`}>Origin</Label>
              <Controller
                name={`routes.${index}.origin`}
                control={control}
                render={({ field }) => (
                  <Input {...field} id={`routes.${index}.origin`} placeholder="Origin" />
                )}
              />
              {errors.routes?.[index]?.origin && (
                <p className="text-red-500">{errors.routes[index].origin.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor={`routes.${index}.destination`}>Destination</Label>
              <Controller
                name={`routes.${index}.destination`}
                control={control}
                render={({ field }) => (
                  <Input {...field} id={`routes.${index}.destination`} placeholder="Destination" />
                )}
              />
              {errors.routes?.[index]?.destination && (
                <p className="text-red-500">{errors.routes[index].destination.message}</p>
              )}
            </div>
          </div>
          {index > 0 && (
            <Button type="button" onClick={() => remove(index)} variant="outline">
              Remove Route
            </Button>
          )}
        </div>
      ))}

      {tripType === "multicity" && (
        <Button type="button" onClick={() => append({ origin: "", destination: "" })} variant="outline">
          Add Route
        </Button>
      )}

      {errors.routes && <p className="text-red-500">{errors.routes.message}</p>}

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Controller
            name="enableCalendar"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="enableCalendar"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="enableCalendar">Enable Calendar from Tomorrow</Label>
        </div>
        {enableCalendar && (
          <p className="text-yellow-500">*The copy of this request will be sent to CEO</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="departureDate">Departure Date</Label>
          <Controller
            name="departureDate"
            control={control}
            render={({ field }) => (
              <Input {...field} id="departureDate" type="date" />
            )}
          />
          {errors.departureDate && <p className="text-red-500">{errors.departureDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="arrivalDate">Arrival Date</Label>
          <Controller
            name="arrivalDate"
            control={control}
            render={({ field }) => (
              <Input {...field} id="arrivalDate" type="date" disabled={tripType === "oneWay"} />
            )}
          />
          {errors.arrivalDate && <p className="text-red-500">{errors.arrivalDate.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Time Preference</Label>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="departureTime"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Departure Time" />
            )}
          />
          <Controller
            name="arrivalTime"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Arrival Time" />
            )}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="button" className="flex-1 bg-yellow-500 hover:bg-yellow-600">
          Book
        </Button>
        <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
          Review
        </Button>
      </div>
    </form>
  );
}