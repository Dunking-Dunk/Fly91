import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FaPaperclip } from "react-icons/fa";

// Define the Zod schema for validation
const formSchema = z.object({
  firstName1: z.string().min(1, { message: "First name is required" }),
  firstName2: z.string().min(1, { message: "First name is required" }),
  lastName1: z.string().min(1, { message: "Last name is required" }),
  lastName2: z.string().min(1, { message: "Last name is required" }),
  employeeId1: z.string().min(1, { message: "Employee ID is required" }),
  employeeId2: z.string().min(1, { message: "Employee ID is required" }),
  department1: z.string().min(1, { message: "Department is required" }),
  department2: z.string().min(1, { message: "Department is required" }),
  mobileNumber1: z
    .string()
    .regex(/^[0-9]{10}$/, {
      message: "Invalid mobile number, must be 10 digits",
    }),
  mobileNumber2: z
    .string()
    .regex(/^[0-9]{10}$/, {
      message: "Invalid mobile number, must be 10 digits",
    }),

  email1: z.string().email({ message: "Invalid email address" }),
  email2: z.string().email({ message: "Invalid email address" }),

  reasonForTravel1: z
    .string()
    .min(1, { message: "Reason for travel is required" }),
  reasonForTravel2: z
    .string()
    .min(1, { message: "Reason for travel is required" }),

  hodApprovalDocument1: z.any().refine((file) => file instanceof File, {
    message: "A valid document is required",
  }),
  hodApprovalDocument2: z.any().refine((file) => file instanceof File, {
    message: "A valid document is required",
  }),
});

export default function PassengerDetails() {
  const [bookingType, setBookingType] = useState("self");
  const [formData, setFormData] = useState({
    firstName1: "",
    firstName2: "",
    lastName1: "",
    lastName2: "",
    employeeId1: "",
    employeeId2: "",
    department1: "",
    department2: "",
    mobileNumber1: "",
    mobileNumber2: "",
    email1: "",
    email2: "",
    reasonForTravel1: "",
    reasonForTravel2: "",
    hodApprovalDocument1: null,
    hodApprovalDocument2: null,
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Separate validation based on the booking type
      if (bookingType === "self") {
        // Validate only the 'self' form fields
        const selfSchema = z.object({
          firstName1: z.string().min(1, { message: "First name is required" }),
          lastName1: z.string().min(1, { message: "Last name is required" }),
          employeeId1: z
            .string()
            .min(1, { message: "Employee ID is required" }),
          department1: z.string().min(1, { message: "Department is required" }),
          mobileNumber1: z
            .string()
            .regex(/^[0-9]{10}$/, {
              message: "Invalid mobile number, must be 10 digits",
            }),
          email1: z.string().email({ message: "Invalid email address" }),
          // reasonForTravel1: z.string().min(1, { message: "Reason for travel is required" }),
          hodApprovalDocument1: z.any().refine((file) => file instanceof File, {
            message: "A valid document is required",
          }),
        });
        selfSchema.parse(formData); // Validate formData for self-booking
      } else {
        // Validate only the 'others' form fields
        const othersSchema = z.object({
          firstName2: z.string().min(1, { message: "First name is required" }),
          lastName2: z.string().min(1, { message: "Last name is required" }),
          employeeId2: z
            .string()
            .min(1, { message: "Employee ID is required" }),
          department2: z.string().min(1, { message: "Department is required" }),
          mobileNumber2: z
            .string()
            .regex(/^[0-9]{10}$/, {
              message: "Invalid mobile number, must be 10 digits",
            }),
          email2: z.string().email({ message: "Invalid email address" }),
          // reasonForTravel2: z.string().min(1, { message: "Reason for travel is required" }),
          hodApprovalDocument2: z.any().refine((file) => file instanceof File, {
            message: "A valid document is required",
          }),
        });
        othersSchema.parse(formData); // Validate formData for booking for others
      }

      setErrors({}); // Clear errors if validation is successful
      console.log("Form submitted:", formData);
      navigate("/serviceform"); // Proceed to next page
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Collect field-specific errors and update state
        const fieldErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
        console.log("Validation errors:", fieldErrors);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#E4F6FD] p-4 pt-20 ">
      <main className="flex-1 pl-64">
        <Card>
          <div className="p-25">
            <div className="w-full h- mb-8 bg-white  rounded">
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
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="firstName1"
                            name="firstName1"
                            placeholder="First Name"
                            value={formData.firstName1}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.firstName1 && (
                            <span className="text-red-600 bg-transperent">
                              {errors.firstName1}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="lastName1"
                            name="lastName1"
                            placeholder="Last Name"
                            value={formData.lastName1}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.lastName1 && (
                            <span className="text-red-600">
                              {errors.lastName1}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="employeeId1"
                            name="employeeId1"
                            placeholder="Employee ID"
                            value={formData.employeeId1}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.employeeId1 && (
                            <span className="text-red-600">
                              {errors.employeeId1}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12 text-gray-600"
                            id="department1"
                            name="department1"
                            placeholder="Department"
                            value={formData.department1}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.department1 && (
                            <span className="text-red-600 size-4">
                              {errors.department1}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="mobileNumber1"
                            name="mobileNumber1"
                            type="tel"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber1}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.mobileNumber1 && (
                            <span className="text-red-600">
                              {errors.mobileNumber1}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="email1"
                            name="email1"
                            type="email"
                            placeholder="Email"
                            value={formData.email1}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email1 && (
                            <span className="text-red-600">
                              {errors.email1}
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 rounded-md w-full">
                          <select
                            id="reasonForTravel1"
                            name="reasonForTravel1"
                            value={formData.reasonForTravel1}
                            onChange={handleInputChange}
                            className="h-12 bg-white mt-4 rounded w-full" // Adjust the width here
                            required
                          >
                            <option value="">Select reason</option>
                            <option value="DGCA">DGCA</option>
                            <option value="Airport Visit">Airport Visit</option>
                            <option value="Audit">Audit</option>
                            <option value="Workshop/Seminar">
                              Workshop/Seminar
                            </option>
                            <option value="Sales Travel">Sales Travel</option>
                            <option value="Partner Visit">Partner Visit</option>
                          </select>
                          {/* {<errors className="reasonForTravel1"></errors> && (
                            <span className="text-red-600">{errors.reasonForTravel1}</span>
                          )} */}
                        </div>

                        <div className="w-full p-4 border-2 border-gray-200 rounded-lg bg-white h-20">
                          <label
                            htmlFor="hodApprovalDocument1"
                            className="flex items-center justify-center cursor-pointer"
                          >
                            <FaPaperclip className="w-4 h-4 text-cyan-800 mr-2" />
                            <span className="text-cyan-800 hover:underline">
                              {formData.hodApprovalDocument2
                                ? "Change file"
                                : "Add Document"}
                            </span>
                            <input
                              type="file"
                              id="hodApprovalDocument1"
                              name="hodApprovalDocument1"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={handleInputChange}
                            />
                          </label>
                          <span className="block text-center text-xs text-gray-500 mt-2">
                            Max size 5 MB
                          </span>
                          {errors.hodApprovalDocument1 && (
                            <span className="text-red-600">
                              {errors.hodApprovalDocument1}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {bookingType === "others" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="firstName2"
                            name="firstName2"
                            placeholder="First Name"
                            value={formData.firstName2}
                            onChange={handleInputChange}
                            required
                          />

                          {errors.firstName2 && (
                            <span className="text-red-600">
                              {errors.firstName2}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="lastName2"
                            name="lastName2"
                            placeholder="Last Name"
                            value={formData.lastName2}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.lastName2 && (
                            <span className="text-red-600">
                              {errors.lastName2}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="employeeId2"
                            name="employeeId2"
                            placeholder="Employee ID"
                            value={formData.employeeId2}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.employeeId2 && (
                            <span className="text-red-600">
                              {errors.employeeId2}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="department2"
                            name="department2"
                            placeholder="Department"
                            value={formData.department2}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.department2 && (
                            <span className="text-red-600">
                              {errors.department2}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="mobileNumber2"
                            name="mobileNumber2"
                            type="tel"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber2}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.mobileNumber2 && (
                            <span className="text-red-600">
                              {errors.mobileNumber2}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md">
                          <Input
                            className="bg-white h-12"
                            id="email2"
                            name="email2"
                            type="email"
                            placeholder="Email"
                            value={formData.email2}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email2 && (
                            <span className="text-red-600">
                              {errors.email2}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 rounded-md w-full">
                          <select
                            id="reasonForTravel2"
                            name="reasonForTravel2"
                            value={formData.reasonForTravel2}
                            onChange={handleInputChange}
                            className="h-12 bg-white mt-4 rounded w-full" // Adjust the width here
                            required
                          >
                            <option value="">Select reason</option>
                            <option value="DGCA">DGCA</option>
                            <option value="Airport Visit">Airport Visit</option>
                            <option value="Audit">Audit</option>
                            <option value="Workshop/Seminar">
                              Workshop/Seminar
                            </option>
                            <option value="Sales Travel">Sales Travel</option>
                            <option value="Partner Visit">Partner Visit</option>
                          </select>
                          {/* {<errors className="reasonForTravel2"></errors> && (
                            <span className="text-red-600">{errors.reasonForTravel2}</span>
                          )} */}
                        </div>

                        <div className="w-full p-4 border-2 border-gray-200 rounded-lg bg-white h-20">
                          <label
                            htmlFor="hodApprovalDocument2"
                            className="flex items-center justify-center cursor-pointer"
                          >
                            <FaPaperclip className="w-4 h-4 text-cyan-800 mr-2" />
                            <span className="text-cyan-800 hover:underline">
                              {formData.hodApprovalDocument2
                                ? "Change file"
                                : "Add Document"}
                            </span>
                            <input
                              type="file"
                              id="hodApprovalDocument2"
                              name="hodApprovalDocument2"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={handleInputChange}
                            />
                          </label>
                          <span className="block text-center text-xs text-gray-500 mt-2">
                            Max size 5 MB
                          </span>
                          {errors.hodApprovalDocument2 && (
                            <span className="text-red-600">
                              {errors.hodApprovalDocument2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end items-center space-x-4 mt-5 mr-5 h-10"></div>
                  </form>
                </CardContent>
              </Card>

              <div className="flex justify-end items-center space-x-4 mt-5 mr-14">
                <Button
                  className="w-40 bg-yellow-500 hover:bg-yellow-600 rounded p-6"
                  onClick={() =>
                    setFormData({
                      firstName1: "",
                      firstName2: "",
                      lastName1: "",
                      lastName2: "",
                      employeeId1: "",
                      employeeId2: "",
                      department1: "",
                      department2: "",
                      mobileNumber1: "",
                      mobileNumber2: "",
                      email1: "",
                      email2: "",
                      reasonForTravel1: "",
                      reasonForTravel2: "",
                      hodApprovalDocument1: null,
                      hodApprovalDocument2: null,
                    })
                  }
                >
                  Back
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="w-40 bg-green-500 hover:bg-green-600 rounded p-6"
                >
                  Proceed
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
