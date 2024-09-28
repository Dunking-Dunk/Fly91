import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function UserProfile() {
  const [email, setEmail] = useState("sanjana@fly91.com")

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-16">
      <main className="flex-1 max-w-screen-lg mx-auto p-10"> {/* Centered and shrunk with max-w-screen-lg */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex space-x-8 space-y-10"> {/* Space between sections */}
          {/* Profile Details Sidebar */}
          <div className="w-1/4 bg-gray-50 rounded-lg p-6 shadow-md flex flex-col items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/assets/avatar.png" alt="User Avatar" />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold mt-4">Sanjana</h3>
            <p className="text-gray-500 text-sm mb-4">Employee</p>
            <p className="text-gray-500 mt-2">+91 94373 34344</p>
            <p className="text-gray-500">{email}</p>
            <p className="text-gray-500">Chennai</p>
          </div>

          {/* Form Section */}
          <div className="w-3/4">
            {/* Personal Details Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-gray-600 mb-4">Personal Details</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="w-full mt-2 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="w-full mt-2 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Employee ID"
                    className="w-full mt-0 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Department"
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Mobile Number"
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
              </div>
            </div>

            {/* Password Update Section */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-gray-600 mb-4">Update Password</h4>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Input
                    type="password"
                    placeholder="Old Password"
                    className="w-full mt-2 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="New Password"
                    className="w-full mt-0 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-400"
                  />
                </div>
                <div className="mt-8 flex justify-start">
                  <Button className="py-2 px-6 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-200">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
