import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Zod validation schema
const hotelFormSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  departure: z.string().min(1, "Departure is required"),
  enableCalendar: z.boolean(),
  departureDate: z
    .string()
    .min(1, "Departure date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid departure date format",
    }),
  arrivalDate: z
    .string()
    .min(1, "Arrival date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid arrival date format",
    }),
  departureTime: z.string().optional(),
  arrivalTime: z.string().optional(),
});

export default function HotelForm({ onShowBanner }) {
  const [showWarning, setShowWarning] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      origin: "",
      departure: "",
      enableCalendar: false,
      departureDate: "",
      arrivalDate: "",
      departureTime: "",
      arrivalTime: "",
    },
  });

  const handleEnableCalendar = (checked) => {
    setValue("enableCalendar", checked);
    setShowWarning(checked);
  };

  const onSubmit = (data) => {
    if (showWarning) {
      onShowBanner();
    } else {
      console.log("Proceeding with review", data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
        <div>
          <Controller
            name="origin"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" placeholder="Origin" />
            )}
          />
        </div>
        <div>
          <Controller
            name="departure"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" placeholder="Departure" />
            )}
          />
        </div>
      </div>

      <div className="flex justify-between items-center space-x-2 mb-4">
        <div className="flex items-center space-x-2">
          <Controller
            name="enableCalendar"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="enableCalendarHotel"
                onCheckedChange={handleEnableCalendar}
                checked={field.value}
              />
            )}
          />
          <Label htmlFor="enableCalendarHotel">
            Enable Calendar from Tomorrow
          </Label>
        </div>
        {showWarning && (
          <span className="text-red-500 text-xs">
            *The copy of this request will be sent to CEO
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Controller
            name="departureDate"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" type="date" />
            )}
          />
        </div>
        <div>
          <Controller
            name="arrivalDate"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" type="date" />
            )}
          />
        </div>
      </div>

      <div className="mb-4">
        <Label>Time Preference</Label>
        <div className="w-1/2 gap-4 mt-2">
          <Controller
            name="departureTime"
            control={control}
            render={({ field }) => (
              <Input {...field} className="mb-4 p-5" placeholder="Departure" />
            )}
          />
          <Controller
            name="arrivalTime"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" placeholder="Arrival" />
            )}
          />
        </div>
      </div>

      <div className="flex ml-auto w-1/2 space-x-4">
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
