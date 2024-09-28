import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { z } from "zod";

// Define the Zod schema for validation
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  employeeId1: z.string().min(1, { message: "Employee ID is required" }),
  department1: z.string().min(1, { message: "Department is required" }),
  employeeId: z.string().min(1,{ message: "employeeId is Required"}),
  department: z.string().min(1,{message: "Department is required" }),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Invalid mobile number, must be 10 digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  reasonForTravel: z.string().min(1, { message: "Reason for travel is required" }),
  hodApprovalDocument: z.any().refine((file) => file instanceof File, {
    message: "A valid document is required",
  }),
});

export default function PassengerDetails() {
  const [bookingType, setBookingType] = useState("self");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeId1: "",
    department1: "",
    employeeId: "",
    department: "",
    mobileNumber: "",
    email: "",
    reasonForTravel: "",
    hodApprovalDocument: null,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data with Zod
    try {
      formSchema.parse(formData);
      setErrors({});
      console.log("Form submitted:", formData);
      // Handle form submission logic here
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-8 bg-slate-100">
        <Card>
          <div className="p-10">
            <div className="w-full mt-7 p-20 bg-gray-100 rounded">
              <Card className="w-full max-w-4xl mx-auto max-h6 mt-12 bg-gray-50 rounded-md">
                <CardHeader>
                  <CardTitle>Passenger Details</CardTitle>
                </CardHeader>
              </Card>

              <Card className="w-5x max-w-4xl mx-auto mt-2 bg-gray-50 rounded-md">
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <RadioGroup
                      defaultValue="self"
                      className="flex space-x-4 mb-6"
                      onValueChange={setBookingType}
                    >
                      <div className="flex items-center space-x-2 mt-4">
                        <RadioGroupItem value="self" id="self" />
                        <Label htmlFor="self">Book for Self</Label>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <RadioGroupItem value="others" id="others" />
                        <Label htmlFor="others">Book for Others</Label>
                      </div>
                    </RadioGroup>

                    {bookingType === "self" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.firstName && (
                            <span className="text-red-600">{errors.firstName}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.lastName && (
                            <span className="text-red-600">{errors.lastName}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="employeeId1"
                            name="employeeId1"
                            placeholder="Employee ID"
                            value={formData.employeeId1}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.employeeId1 && (
                            <span className="text-red-600">{errors.employeeId1}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="department1"
                            name="department1"
                            placeholder="Department"
                            value={formData.department1}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.department1 && (
                            <span className="text-red-600">{errors.department1}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="mobileNumber"
                            name="mobileNumber"
                            type="tel"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.mobileNumber && (
                            <span className="text-red-600">{errors.mobileNumber}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email && <span className="text-red-600">{errors.email}</span>}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-20"
                            id="reasonForTravel"
                            name="reasonForTravel"
                            placeholder="Reason for Travel"
                            value={formData.reasonForTravel}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.reasonForTravel && (
                            <span className="text-red-600">{errors.reasonForTravel}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-20"
                            id="hodApprovalDocument"
                            name="hodApprovalDocument"
                            type="file"
                            placeholder="Upload Document"
                            onChange={handleInputChange}
                            accept=".pdf,.doc,.docx"
                            required
                          />
                          {errors.hodApprovalDocument && (
                            <span className="text-red-600">{errors.hodApprovalDocument}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {bookingType === "others" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.firstName && (
                            <span className="text-red-600">{errors.firstName}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.lastName && (
                            <span className="text-red-600">{errors.lastName}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="employeeId"
                            name="employeeId"
                            placeholder="Employee ID"
                            value={formData.employeeId}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.employeeId && (
                            <span className="text-red-600">{errors.employeeId}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="department"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.department && (
                            <span className="text-red-600">{errors.department}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="mobileNumber"
                            name="mobileNumber"
                            type="tel"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.mobileNumber && (
                            <span className="text-red-600">{errors.mobileNumber}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-14"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email && <span className="text-red-600">{errors.email}</span>}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fff" }}>
                          <Input
                            className="h-20"
                            id="reasonForTravel"
                            name="reasonForTravel"
                            placeholder="Reason for Travel"
                            value={formData.reasonForTravel}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.reasonForTravel && (
                            <span className="text-red-600">{errors.reasonForTravel}</span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md" style={{ backgroundColor: "#fee" }}>
                          <Input
                            className="h-20"
                            id="hodApprovalDocument"
                            name="hodApprovalDocument"
                            type="file"
                            placeholder="Upload Document"
                            onChange={handleInputChange}
                            accept=".pdf,.doc,.docx"
                            required
                          />
                          {errors.hodApprovalDocument && (
                            <span className="text-red-600">{errors.hodApprovalDocument}</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end items-center space-x-4 mt-5 mr-5 h-10">
        <Button 
              className="w-40 flex bg-yellow-500 hover:bg-yellow-600 rounded p-6 "
              onClick={() =>
                setFormData({
                  firstName: "",
                  lastName: "",
                  employeeId: "",
                  department: "",
                  mobileNumber: "",
                  email: "",
                  reasonForTravel: "",
                  hodApprovalDocument: null,
                })
              }
            >
              Back
            </Button>
            <Button onClick={handleSubmit}
              className="w-40 flex bg-green-500 hover:bg-green-600 h-full rounded p-6" >Proceed</Button>
        </div>



                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
