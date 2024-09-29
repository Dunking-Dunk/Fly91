import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaPaperclip } from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  bookingType: z.enum(["self", "others"]),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  employeeId: z.string().min(1, { message: "Employee ID is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, {
    message: "Invalid mobile number, must be 10 digits",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  reasonForTravel: z.string().min(1, { message: "Reason for travel is required" }),
  hodApprovalDocument: z.any().optional(),
})

export default function PassengerDetails({setDetail}) {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingType: "self",
      firstName: "",
      lastName: "",
      employeeId: "",
      department: "",
      mobileNumber: "",
      email: "",
      reasonForTravel: "",
      hodApprovalDocument: undefined,
    },
  })

  function onSubmit(values) {
    setDetail(values)
    // Handle form submission
  }

  return (
    <Card className="w-full  mx-auto bg-white shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Passenger Details</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bookingType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="self" />
                        </FormControl>
                        <Label className="font-normal">Book for Self</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="others" />
                        </FormControl>
                        <Label className="font-normal">Book for Others</Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Employee ID" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Department" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Mobile Number" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reasonForTravel"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Reason for Travel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DGCA">DGCA</SelectItem>
                      <SelectItem value="Airport Visit">Airport Visit</SelectItem>
                      <SelectItem value="Audit">Audit</SelectItem>
                      <SelectItem value="Workshop/Seminar">Workshop/Seminar</SelectItem>
                      <SelectItem value="Sales Travel">Sales Travel</SelectItem>
                      <SelectItem value="Partner Visit">Partner Visit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hodApprovalDocument"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full p-4 border border-gray-200 rounded-lg bg-white">
                      <label
                        htmlFor="hodApprovalDocument"
                        className="flex items-center justify-center cursor-pointer"
                      >
                        <FaPaperclip className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-blue-600 hover:underline">
                          Add Document
                        </span>
                        <input
                          type="file"
                          id="hodApprovalDocument"
                          accept=".doc,.docx,.png,.jpg,.jpeg,.pdf"
                          className="hidden"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </label>
                      <span className="block text-center text-xs text-gray-500 mt-2">
                        Max size 5MB
                      </span>
                      <span className="block text-center text-xs text-gray-500">
                        *.doc, .docx, .png, .jpg, .jpeg, .pdf
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  navigate(-1)
                }}
                className="w-28 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Back
              </Button>
              <Button type="submit" className="w-28 bg-green-500 hover:bg-green-600 text-white">
                Proceed
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}