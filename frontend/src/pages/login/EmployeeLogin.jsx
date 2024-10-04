import React from 'react';

import logo from '@/assets/images/logo.png';
import plane from '@/assets/images/fly91-flight.png';
import loginBackground from "@/assets/images/loginBackground.png";
import LoginForm from '@/components/form/employee/LoginForm';

const EmployeeLogin = () => {
    return (
        <div className="flex max-h-screen">
            <div className="w-[45%] hidden xl:block relative">
                <img
                    src={logo}
                    alt="fly91 logo"
                    className="absolute top-16  left-1/2 -translate-x-1/2"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-2/4 w-[700px]">
                    <img
                        src={plane}
                        alt="fly91 flight"
                        className="w-full"
                    />
                </div>

                <img
                    src={loginBackground}
                    alt="fly91 img"
                    className=" object-cover -top w-full h-full"
                />
            </div>

            {/* Right side with login form */}
            <div className="w-full bg-[#ECF3F9] flex flex-col items-center justify-center p-8 h-screen">
                <h1 className="text-3xl font-bold mb-14 text-gray-600">Login</h1>
                <LoginForm />
                <p className=" text-gray-600 absolute bottom-6">
                    @Copyright 2024 FLY91
                </p>
            </div>
        </div>
    );
}


export default EmployeeLogin