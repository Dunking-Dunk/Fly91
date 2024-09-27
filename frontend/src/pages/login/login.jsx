import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import logo from '@/assets/images/logo.png'
import aero from '@/assets/images/aero-1.png'
import city from '@/assets/images/city.png'
import cab from '@/assets/images/cab.png'
import OtpLogin from "@/components/global/otp"

export default function LoginPage() {
    const [isOtpSent, setIsOtpSent] = useState(false)

    const formSchema = z.object({
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values) {
        console.log(values)
        setIsOtpSent(true)
        // Here you would typically send a request to your backend to generate and send the OTP
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side with logo and illustration */}
            <div className="hidden w-1/3 bg-white lg:flex flex-col px-8 py-20 z-10">
                <div className="mb-8 self-center">
                    <img src={logo} alt="fly91 logo" className="h-20 w-50" />
                </div>
                <div className="mt-32 relative w-96 h-96 self-end flex justify-end items-center">
                    <div className="absolute left-20 w-full h-full bg-[#FFA500] rounded-full"></div>
                    <img
                        src={aero}
                        alt="Airplane silhouette"
                        className="absolute left-24 w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* Right side with login form */}
            <div className="w-full bg-[#ECF3F9] flex flex-col items-center justify-center p-8 relative">
                <h1 className="text-3xl font-bold mb-14 text-gray-700">Login</h1>
                {/* <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14 w-full max-w-xl flex flex-col">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} className="bg-transparent border-[#C9C9C9] h-16" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="self-center w-1/2 h-16 bg-[#006A8D] hover:bg-[#006666] text-white">
                            {isOtpSent ? "Resend OTP" : "Generate OTP"}
                        </Button>
                    </form>
                </Form> */}

                {isOtpSent && (
                    <p className="mt-4 text-green-600">OTP has been sent to your email address.</p>
                )}

                <OtpLogin />

                <div className="text-center absolute bottom-32">

                    <div className="flex justify-center space-x-4">
                        <div className="bg-[#FFA500] p-3 rounded-full">
                            <img
                                src={aero}
                                alt="Airplane silhouette"
                                className="h-10 w-10"
                            />
                        </div>
                        <div className="bg-[#003056] p-3 rounded-full">
                            <img
                                src={city}
                                alt="Airplane silhouette"
                                className="h-10 w-10"
                            />
                        </div>
                        <div className="bg-[#0C263C] p-3 rounded-full">
                            <img
                                src={cab}
                                alt="Airplane silhouette"
                                className="h-10 w-10"
                            />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600">One stop Flight, Cab, and Hotel Booking Platform</p>
                </div>
            </div>
        </div>
    )
}