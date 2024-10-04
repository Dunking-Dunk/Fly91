import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

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
import { useVerifyEmail } from '@/store/service/authService';


const LoginForm = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [countdown, setCountdown] = useState(120);
    const navigate = useNavigate();
    const verifyEmail = useVerifyEmail()
    // console.log(verifyEmail.error)

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCountdown((prevCountdown) => {
    //             if (prevCountdown <= 1) {
    //                 clearInterval(timer);
    //                 setIsResendDisabled(false);
    //                 return 0;
    //             }
    //             return prevCountdown - 1;
    //         });
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, []);


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

    //login otp
    const handleChange = (element, index) => {
        if (isNaN(Number(element.value))) return false;

        if (element.previousSibling && element.previousSibling.value === '') {
            element.previousSibling.focus()
            return
        }

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

    const handleResendClick = () => {
        setCountdown(120);
        setIsResendDisabled(true);
        // Here you would typically call an API to resend the OTP
        console.log("Resending OTP...");
    };


    async function onSubmitEmail(values) {
        console.log(values);
        await verifyEmail.mutate(values)
        // setIsOtpSent(true);
        // Here you would typically send a request to your backend to generate and send the OTP
    }


    function onSubmitOTP(values) {
        // here were the login happens
    }



    return (
        <>
            {!isOtpSent ?
                (<Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitEmail)}
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
                                            className="bg-transparent border-[#C9C9C9] h-16 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="self-center w-1/2 h-16 bg-primary hover:bg-secondary text-white  rounded-2xl"
                        >
                            {isOtpSent ? "Resend OTP" : "Generate OTP"}
                        </Button>
                    </form>
                </Form>) :
                <div className="flex flex-col items-center justify-center ">
                    <form
                        onSubmit={onSubmitOTP}
                        className="flex flex-col items-center space-y-6"
                    >
                        <div className="flex justify-between space-x-2">
                            {otp.map((data, index) => (
                                <Input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="w-16 h-16 text-center text-xl font-semibold border-[#C9C9C9]  rounded-2xl"
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onFocus={(e) => e.target.select()}
                                />
                            ))}
                        </div>
                        <div className="text-sm text-center text-gray-600">
                            OTP Send to the Email. Resend OTP in{" "}
                            <span className="font-semibold text-blue-600">
                                {Math.floor(countdown / 60)}:
                                {(countdown % 60).toString().padStart(2, "0")} mins
                            </span>
                        </div>
                        <Button
                            type="submit"
                            className="w-2/3 h-16 bg-primary hover:bg-secondary text-white  rounded-2xl"
                        >
                            Submit
                        </Button>
                    </form>
                    <div className="text-center">
                        <Button
                            variant="link"
                            onClick={handleResendClick}
                            disabled={isResendDisabled}
                            className="text-[#008080] hover:text-[#006666]"
                        >
                            Resend OTP
                        </Button>
                        <p className="mt-4 text-green-600">
                            OTP has been sent to your email address.
                        </p>
                    </div>
                </div>
            }

        </>
    )
}

export default LoginForm