import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Clock } from "lucide-react";

const routeSchema = z
  .object({
    origin: z.string().min(1, "Origin is required"),
    destination: z.string().min(1, "Destination is required"),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination must be different",
    path: ["destination"],
  });

const flightFormSchema = z
  .object({
    tripType: z.enum(["oneWay", "roundTrip", "multicity"]),
    routes: z.array(routeSchema).min(1, "At least one route is required"),
    enableCalendar: z.boolean(),
    departureDate: z.string().min(1, "Departure date is required"),
    returnDate: z.string().optional(),
    departureTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.tripType === "roundTrip" && !data.returnDate) {
        return false;
      }
      return true;
    },
    {
      message: "Return date is required for round trips",
      path: ["returnDate"],
    }
  )
  .refine(
    (data) => {
      if (data.tripType === "multicity" && data.routes.length < 2) {
        return false;
      }
      return true;
    },
    {
      message: "At least two routes are required for multicity trips",
      path: ["routes"],
    }
  );

export default function Component({ onShowBanner }) {
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
      returnDate: "",
      departureTime: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "routes",
  });

  const tripType = watch("tripType");
  const enableCalendar = watch("enableCalendar");

  React.useEffect(() => {
    if (tripType === "multicity" && fields.length < 2) {
      append({ origin: "", destination: "" });
    } else if (tripType !== "multicity" && fields.length > 1) {
      setValue("routes", [fields[0]]);
    }
  }, [tripType, fields, append, setValue]);

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
        {errors.tripType && (
          <p className="text-red-500 text-xs">{errors.tripType.message}</p>
        )}
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Controller
                name={`routes.${index}.origin`}
                control={control}
                render={({ field }) => (
                  <Input className="p-6 py-7" {...field} placeholder="Origin" />
                )}
              />
              {errors.routes?.[index]?.origin && (
                <p className="text-red-500 text-xs">
                  {errors.routes[index].origin.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Controller
                  name={`routes.${index}.destination`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="p-6 py-7"
                      {...field}
                      placeholder="Destination"
                    />
                  )}
                />
                {tripType === "multicity" && index > 0 && (
                  <>
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => append({ origin: "", destination: "" })}
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              {errors.routes?.[index]?.destination && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.routes[index].destination.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {errors.routes && (
        <p className="text-red-500 text-xs">{errors.routes.message}</p>
      )}

      <div className="flex justify-between items-center space-x-2">
        <div className="flex items-center">
          <Controller
            name="enableCalendar"
            control={control}
            render={({ field }) => (
              <Checkbox
                className="mr-2"
                id="enableCalendar"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="enableCalendar">Enable Calendar from Tomorrow</Label>
        </div>
        {enableCalendar && (
          <p className="text-red-500 text-xs">
            *The copy of this request will be sent to CEO
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Controller
            name="departureDate"
            control={control}
            render={({ field }) => (
              <Input
                className="p-6 py-7 flex justify-end"
                {...field}
                type="date"
                placeholder="Departure"
              />
            )}
          />
          {errors.departureDate && (
            <p className="text-red-500 text-xs">
              {errors.departureDate.message}
            </p>
          )}
        </div>
        <div>
          <Controller
            name="returnDate"
            control={control}
            render={({ field }) => (
              <Input
                className="p-6 py-7 flex justify-end"
                {...field}
                type="date"
                placeholder="Return Date"
                disabled={tripType === "oneWay"}
              />
            )}
          />
          {errors.returnDate && (
            <p className="text-red-500 text-xs">{errors.returnDate.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4 relative w-1/2">
        <Label>Time Preference</Label>
        <Controller
          name="departureTime"
          control={control}
          render={({ field }) => (
            <Input className="p-6 py-7" {...field} placeholder="Departure" />
          )}
        />
        <Clock
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      <div className="flex w-1/2 pl-4 ml-auto space-x-4">
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
