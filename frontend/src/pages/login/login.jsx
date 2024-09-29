import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import logo from "@/assets/images/logo.png";
import aero from "@/assets/images/aero-1.png";
import city from "@/assets/images/city.png";
import cab from "@/assets/images/cab.png";
import OtpLogin from "@/components/form/otp";
import loginImg from "@/assets/images/loginImg.png";
import { FaRegCopyright } from "react-icons/fa6";

export default function LoginPage() {
  const [isOtpSent, setIsOtpSent] = useState(false);

  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    setIsOtpSent(true);
    // Here you would typically send a request to your backend to generate and send the OTP
  }

  return (
    <>
    <div className="flex flex-row h-full">
    <div   >
      <img src={loginImg} alt="City" className="" />
      </div>
      {/* Right side with login form */}
      <div className="w-full bg-[#ECF3F9] flex flex-col items-center justify-center p-8 relative">
        <h1 className="text-3xl font-bold mb-14 text-gray-700">Login</h1>
        {!isOtpSent ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-14 w-full max-w-xl flex flex-col"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="bg-transparent border-[#C9C9C9] h-16"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="self-center w-1/2 h-16 bg-[#006A8D] hover:bg-[#006666] text-white"
              >
                {isOtpSent ? "Resend OTP" : "Generate OTP"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-cente">
            <OtpLogin />
          </div>
        )}

        
          <p className="mb-0 text-gray-600 bg-slate-300 flex text-center  absolute bottom-4 text-center">
            <span><FaRegCopyright/></span> Copyright 2024 FLY91
          </p>
        
      </div></div>
    </>
  );
}
