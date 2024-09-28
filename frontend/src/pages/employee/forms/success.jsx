import { Button } from "@/components/ui/button"
import success from "../../../assets/images/Success.png"

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center max-w-md">
        <img
          src={success}
          alt="Success character"
          className="mx-auto mb-6"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-bold text-green-600 mb-4">Submit Sent!</h1>
        <p className="text-gray-600 mb-2">Thank you! Your request is successfully placed.</p>
        <p className="text-gray-600 mb-6">The travel desk is processing your request and will update with details soon.</p>
        <p className="text-gray-800 font-semibold mb-2">Track your request: <span className="text-green-600">SRN-FLY-500022</span></p>
        <p className="text-gray-800 font-semibold mb-8">Allocated per diem: <span className="text-green-600">25000/-</span></p>
        <div className="flex space-x-4">
          <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">
            Raise another Request
          </Button>
          <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">
            Track your Request
          </Button>
        </div>
      </div>
    </div>
  )
}