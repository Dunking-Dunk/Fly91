import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfirmationBanner({ onClose, onContinue }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <h2 className="text-lg font-semibold text-center mb-4">
          As you enabled calendar from tomorrow, your copy will be sent to the
          CEO!
        </h2>
        <div className="flex justify-center space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Cancel
          </Button>
          <Button
            onClick={onContinue}
            className="bg-green-500 hover:bg-green-600"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
