import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

const cabFormSchema = z.object({
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  dropAddress: z.string().min(1, "Drop address is required"),
  timePreference: z.string().optional(),
})

export default function CabForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(cabFormSchema),
    defaultValues: {
      city: "",
      state: "",
      pickupAddress: "",
      dropAddress: "",
      timePreference: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Cab form submitted", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4 mt-8 mb-6">
        <div>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" placeholder="City" />
            )}
          />
        </div>
        <div>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" placeholder="State" />
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Controller
            name="pickupAddress"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" placeholder="Pickup address" />
            )}
          />
        </div>
        <div>
          <Controller
            name="dropAddress"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" placeholder="Drop address" />
            )}
          />
        </div>
      </div>
      <div className="mb-8">
        <div className="relative w-1/2">
          <Controller
            name="timePreference"
            control={control}
            render={({ field }) => (
              <Input {...field} className="p-5" placeholder="Time Preference" />
            )}
          />
          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="flex ml-auto w-1/2 space-x-4">
        <Button type="button" className="flex-1 p-6 bg-yellow-500 hover:bg-yellow-600">Book</Button>
        <Button type="submit" className="flex-1 p-6 bg-green-500 hover:bg-green-600">Place Request</Button>
      </div>
    </form>
  )
}
