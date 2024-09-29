import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ReviewBack from "@/components/global/reviewBack";

const hotelFormSchema = z
  .object({
    city: z
      .string()
      .min(1, "City is required")
      .max(50, "City name is too long"),
    state: z
      .string()
      .min(1, "State is required")
      .max(50, "State name is too long"),
    enableCalendar: z.boolean(),
    checkInDate: z
      .string()
      .min(1, "Check-in date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid check-in date format",
      })
      .refine((val) => new Date(val) >= new Date(), {
        message: "Check-in date must be today or in the future",
      }),
    checkOutDate: z
      .string()
      .min(1, "Check-out date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid check-out date format",
      })
      .refine((val) => new Date(val) > new Date(), {
        message: "Check-out date must be in the future",
      }),
    checkInTime: z
      .string()
      .optional()
      .refine((val) => !val || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
        message: "Invalid time format. Use HH:MM",
      }),
    checkOutTime: z
      .string()
      .optional()
      .refine((val) => !val || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
        message: "Invalid time format. Use HH:MM",
      }),
  })
  .refine(
    (data) => {
      if (data.checkInDate && data.checkOutDate) {
        return new Date(data.checkOutDate) > new Date(data.checkInDate);
      }
      return true;
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOutDate"],
    }
  );

export default function HotelBookingForm({ onShowBanner }) {
  const [showWarning, setShowWarning] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      city: "",
      state: "",
      enableCalendar: false,
      checkInDate: "",
      checkOutDate: "",
      checkInTime: "",
      checkOutTime: "",
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
      set
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
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

      <div className="flex items-center space-x-2">
        <Controller
          name="enableCalendar"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="enableCalendar"
              onCheckedChange={handleEnableCalendar}
              checked={field.value}
            />
          )}
        />
        <Label htmlFor="enableCalendar">Enable Calendar from Tomorrow</Label>
      </div>
      {showWarning && (
        <p className="text-red-500 text-xs">
          *The copy of this request will be sent to CEO
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Controller
            name="checkInDate"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-6 py-7 justify-end"
                type="date"
                placeholder="Check-in Date"
              />
            )}
          />
          {errors.checkInDate && (
            <p className="text-red-500 text-xs">{errors.checkInDate.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="checkOutDate"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-6 py-7 justify-end"
                type="date"
                placeholder="Check-out Date"
              />
            )}
          />
          {errors.checkOutDate && (
            <p className="text-red-500 text-xs">
              {errors.checkOutDate.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label>Time Preference</Label>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Controller
              name="checkInTime"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="p-6 py-7"
                  placeholder="Check-in Time"
                />
              )}
            />
            {errors.checkInTime && (
              <p className="text-red-500 text-xs">
                {errors.checkInTime.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="checkOutTime"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="p-6 py-7"
                  placeholder="Check-out Time"
                />
              )}
            />
            {errors.checkOutTime && (
              <p className="text-red-500 text-xs">
                {errors.checkOutTime.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <ReviewBack/>
    </form>
  );
}
