import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function OtpLogin() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value))) return false;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted OTP:", otp.join(""));
    navigate("/");
    // Here you would typically validate the OTP with your backend
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full p-8 space-y-8 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6"
        >
          <div className="flex justify-between space-x-2">
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                className="w-16 h-16 text-center text-xl font-semibold border-[#C9C9C9]"
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
            className="w-2/3 h-16 bg-[#006A8D] hover:bg-[#006666] text-white"
          >
            Submit
          </Button>
        </form>
        <div className="text-center">
          {/* <Button
                        variant="link"
                        onClick={handleResendClick}
                        disabled={isResendDisabled}
                        className="text-[#008080] hover:text-[#006666]"
                    >
                        Resend OTP
                    </Button> */}
          <p className="mt-4 text-green-600">
            OTP has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtpLogin;
