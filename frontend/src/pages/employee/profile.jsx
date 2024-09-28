import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  department: z.string().min(1, "Department is required"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  managerName: z.string().min(1, "Manager name is required"),
  managerEmail: z.string().email("Invalid manager email address"),
});

export default function UserProfile() {
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
    setIsSubmitted(true); // Set submission status to true
  };

  return (
    <div className="flex justify-center min-h-screen rounded-s m-2 mt-9">
      {/* Main content */}
      <div className="flex-1 ">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex  mt-5 mx-3 mb-5">
              <div className="w-1/3 bg-gray-50 mr-4 p-6 border rounded-sm border-gray-200 flex flex-col items-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage
                    src="/placeholder.svg?height=128&width=128"
                    alt="Sanjana"
                  />
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>
                <div className="text-center mt-4">
                  <h2 className="text-xl text-gray-500 font-semibold">
                    Sanjana
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">Employee</p>
                  <p className="text-sm text-gray-400">+91 94373 34344</p>
                  <p className="text-sm text-gray-400">sanjana@fly91.com</p>
                  <p className="text-sm text-gray-400">Chennai</p>
                </div>
              </div>

              <div className="w-3/4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="mb-8 p-6 bg-gray-50 border rounded-sm border-gray-200">
                    <h2 className="text-gray-500 mb-3">Personal Details</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Input
                          placeholder="First Name"
                          {...register("firstName")}
                          className="w-full bg-white mt-2  p-6 border border-gray-300 rounded-s focus:outline-none focus:ring-2 focus:ring-black-400"
                          onChange={() => setIsSubmitted(false)} // Reset submission status
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Last Name"
                          {...register("lastName")}
                          className="w-full mt-2 p-6 border bg-white border-gray-300 rounded-s focus:outline-none focus:ring-2 focus:ring-black-400"
                          onChange={() => setIsSubmitted(false)} // Reset submission status
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Input
                          placeholder="Employee ID"
                          {...register("employeeId")}
                          className="w-full mt-6 p-6 border bg-white border-gray-300 rounded-s focus:outline-none focus:ring-2 focus:ring-black-400"
                          onChange={() => setIsSubmitted(false)} // Reset submission status
                        />
                        {errors.employeeId && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.employeeId.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Department"
                          {...register("department")}
                          className="w-full mt-6 p-6 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-400"
                          onChange={() => setIsSubmitted(false)} // Reset submission status
                        />
                        {errors.department && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.department.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Input
                          placeholder="Mobile Number"
                          {...register("mobileNumber")}
                          className="w-full mt-6 p-6 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-400"
                          onChange={() => setIsSubmitted(false)} // Reset submission status
                        />
                        {errors.mobileNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.mobileNumber.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Email"
                          type="email"
                          {...register("email")}
                          className="w-full mt-6 p-6 border bg-white border-gray-300 rounded-s focus:outline-none focus:ring-2 focus:ring-black-400"
                          onChange={() => setIsSubmitted(false)} // Reset submission status
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h2 className="text-gray-500 mb-3">
                      Reporting Manager Details
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Input
                          placeholder="Manager Name"
                          {...register("managerName")}
                          className="bg-white p-6"
                          onChange={() => setIsSubmitted(false)} // Reset submission status
                        />
                        {errors.managerName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.managerName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Email"
                          type="email"
                          {...register("managerEmail")}
                          className="bg-white p-6"
                          onChange={() => setIsSubmitted(false)} // Reset submission status
                        />
                        {errors.managerEmail && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.managerEmail.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify space-x-3 rounded-s">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-yellow-500 pl-10 pr-10 text-white hover:bg-yellow-600"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-500 pl-10 pr-10 text-white  hover:bg-green-600"
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            {isSubmitted && (
              <div className="text-right text-green-500 text-sm mt-2">
                *Profile Updated
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
