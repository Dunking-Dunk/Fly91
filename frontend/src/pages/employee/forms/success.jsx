import { Button } from "@/components/ui/button";
import success from "../../../assets/images/success-new.svg";
import successgif from "../../../assets/images/green-tick.gif";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[83.5vh]   bg-white ">
      <div className="text-center ">
        <img
          src={success}
          alt="Success character"
          className="mx-auto mb-6"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-bold text-green-600 mb-0">Submitted!</h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your request is successfully placed.
        </p>

        <p className="text-gray-800 mb-2">
          Track your request :{" "}
          <span className="text-green-600">SNR-FLT-000122</span>
        </p>

        <div className="flex mt-6    ">
          <Button className="m-auto  w-fit p-6 px-12 bg-yellow-400 hover:bg-yellow-500 text-white">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
