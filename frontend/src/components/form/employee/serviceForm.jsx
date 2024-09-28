import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Clock, X } from "lucide-react" 


export default function ServiceForm() {
  const [tripType, setTripType] = useState("oneWay")
  const [routes, setRoutes] = useState([
    { origin: "", destination: "" },
  ])
  const [showWarningHotel, setShowWarningHotel] = useState(false)
  const [showWarningFlight, setShowWarningFlight] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [activeTab, setActiveTab] = useState("flight")
  const [isCalendarEnabledFlight, setIsCalendarEnabledFlight] = useState(false)
  const [isCalendarEnabledHotel, setIsCalendarEnabledHotel] = useState(false)

  useEffect(() => {
    if (tripType === "oneWay") {
      setRoutes([{ origin: "", destination: "" }])
    } else if (tripType === "multicity" && routes.length < 2) {
      setRoutes([{ origin: "", destination: "" }, { origin: "", destination: "" }])
    }
  }, [tripType])

  const addRoute = () => {
    setRoutes([...routes, { origin: "", destination: "" }])
  }

  const deleteRoute = (index) => {
    if (routes.length > 2) {
      const newRoutes = routes.filter((_, i) => i !== index)
      setRoutes(newRoutes)
    }
  }

  const updateRoute = (index, field, value) => {
    const newRoutes = routes.map((route, i) => {
      if (i === index) {
        return { ...route, [field]: value }
      }
      return route
    })
    setRoutes(newRoutes)
  }

  const handleEnableCalendarFlight = (checked) => {
    setIsCalendarEnabledFlight(checked)
    setShowWarningFlight(checked)
  }

  const handleEnableCalendarHotel = (checked) => {
    setIsCalendarEnabledHotel(checked)
    setShowWarningHotel(checked)
  }

  const handleReviewClick = (e) => {
    e.preventDefault()
    if ((activeTab === "flight" && showWarningFlight) || (activeTab === "hotel" && showWarningHotel)) {
      setShowBanner(true)
    } else {
      console.log("Proceeding with review")
    }
  }

  const handleContinue = () => {
    setShowBanner(false)
    console.log("Proceeding with review after confirmation")
  }

  const handleTabChange = (value) => {
    setActiveTab(value)
    if (value === "flight") {
      setIsCalendarEnabledHotel(false)
      setShowWarningHotel(false)
    } else if (value === "hotel") {
      setIsCalendarEnabledFlight(false)
      setShowWarningFlight(false)
    }
  }

  return (
    
    <div className="w-full max-w-3xl mx-auto py-10 px-16 bg-white text-[#939393] rounded-lg shadow relative">
      {showBanner && (
        <div className="fixed inset-0 m bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-end">
              <button onClick={() => setShowBanner(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <h2 className="text-lg font-semibold text-center mb-4">
              As you enabled calendar from tomorrow, your copy will be sent to the CEO!
            </h2>
            <div className="flex justify-center space-x-4 mt-6">
              <Button variant="outline" onClick={() => setShowBanner(false)} className="bg-yellow-500 text-white hover:bg-yellow-600">
                Cancel
              </Button>
              <Button onClick={handleContinue} className="bg-green-500 hover:bg-green-600">
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
      <Tabs defaultValue="flight" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="flex w-1/3 bg-white rounded-none">
          <TabsTrigger 
            value="flight" 
            className="flex-1 px-4 py-2 text-sm rounded-none font-medium border-[#939393] !text-[#939393] !shadow-none data-[state=active]:border-b-[3px]"
          >
            Flight
          </TabsTrigger>
          <TabsTrigger 
            value="hotel" 
            className="flex-1 px-4 py-2 text-sm rounded-none font-medium border-[#939393] !text-[#939393] !shadow-none data-[state=active]:border-b-[3px]"
          >
            Hotel
          </TabsTrigger>
          <TabsTrigger 
            value="cab" 
            className="flex-1 px-4 py-2 text-sm font-medium rounded-none border-[#939393] !text-[#939393] !shadow-none data-[state=active]:border-b-[3px]"
          >
            Cab
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flight" className="mt-8">
          <form onSubmit={handleReviewClick}>
            <RadioGroup value={tripType} className="flex space-x-4 mb-6" onValueChange={setTripType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oneWay" id="oneWay" />
                <Label htmlFor="oneWay">One Way</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roundTrip" id="roundTrip" />
                <Label htmlFor="roundTrip">Round Trip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multicity" id="multicity" />
                <Label htmlFor="multicity">Multicity</Label>
              </div>
            </RadioGroup>

            {routes.map((route, index) => (
              <div key={index} className="mb-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <Input 
                      className="p-5"
                      id={`origin-${index}`} 
                      value={route.origin}
                      onChange={(e) => updateRoute(index, "origin", e.target.value)}
                      placeholder="Origin" 
                    />
                  </div>
                  <div>
                    <Input 
                      className="p-5"
                      id={`destination-${index}`} 
                      value={route.destination}
                      onChange={(e) => updateRoute(index, "destination", e.target.value)}
                      placeholder="Departure" 
                    />
                  </div>
                </div>
              </div>
            ))}

            {tripType === "multicity" && (
              <div className="flex space-x-4 mb-6">
                <Button type="button" variant="outline" onClick={addRoute}>+ ADD</Button>
                <Button type="button" variant="outline" onClick={() => deleteRoute(routes.length - 1)}>DELETE</Button>
              </div>
            )}

            <div className="flex justify-between items-center space-x-2 mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enableCalendarFlight" 
                  onCheckedChange={handleEnableCalendarFlight}
                  checked={isCalendarEnabledFlight}
                />
                <Label htmlFor="enableCalendarFlight">Enable Calendar from Tomorrow</Label>
              </div>
              <div>
              {showWarningFlight && (
                <span className="text-red-500 text-xs">*The copy of this request will be sent to CEO</span>
              )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Input className="p-5" id="departureDate" type="date" />
              </div>
              <div>
                <Input className="p-5" id="arrivalDate" type="date" disabled={tripType === "oneWay"} />
              </div>
            </div>

            <div className="mb-4">
              <Label>Time Preference</Label>
              <div className="w-1/2 gap-4 mt-2">
                <Input className="p-5 mb-4" placeholder="Departure" />
                <Input className="p-5" placeholder="Arrival" />
              </div>
            </div>

            <div className="flex ml-auto w-1/2 py-6 space-x-4">
              <Button type="button" className="flex-1 p-6 bg-yellow-500 hover:bg-yellow-600">Book</Button>
              <Button type="submit" className="flex-1 p-6 bg-green-500 hover:bg-green-600">Review</Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="hotel">
          <form onSubmit={handleReviewClick}>
            <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
              <div>
                <Input className="p-5" id="origin" placeholder="Origin" />
              </div>
              <div>
                <Input className="p-5" id="departure" placeholder="Departure" />
              </div>
            </div>

            <div className="flex justify-between items-center space-x-2 mb-4">
             <div className="flex items-center space-x-2">
              <Checkbox 
                id="enableCalendarHotel" 
                onCheckedChange={handleEnableCalendarHotel}
                checked={isCalendarEnabledHotel}
              />
             <Label htmlFor="enableCalendarHotel">Enable Calendar from Tomorrow</Label>
            </div>
              {showWarningHotel && (
             <span className="text-red-500 text-xs">*The copy of this request will be sent to CEO</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Input className="p-5" id="departureDate" type="date" />
              </div>
              <div>
                <Input className="p-5" id="arrivalDate" type="date" />
              </div>
            </div>

            <div className="mb-4">
              <Label>Time Preference</Label>
              <div className="w-1/2 gap-4 mt-2">
                <Input className="mb-4 p-5" placeholder="Departure" />
                <Input className="p-5" placeholder="Arrival" />
              </div>
            </div>

            <div className="flex ml-auto w-1/2 space-x-4">
              <Button type="button" className="flex-1 p-6 bg-yellow-500 hover:bg-yellow-600">Book</Button>
              <Button type="submit" className="flex-1 p-6 bg-green-500 hover:bg-green-600">Review</Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="cab">
          <div className="grid grid-cols-2 gap-4 mt-8 mb-6">
            <div>
              <Input className="p-5" id="city" placeholder="City" />
            </div>
            <div>
              <Input className="p-5" id="state" placeholder="State" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Input className="p-5" id="pickupAddress" placeholder="Pickup address" />
            </div>
            <div>
              <Input className="p-5" id="dropAddress" placeholder="Drop address" />
            </div>
          </div>
          <div className="mb-8">
            <div className="relative w-1/2">
              <Input className="p-5" id="timePreference" placeholder="Time Preference" />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex ml-auto w-1/2 space-x-4">
            <Button className="flex-1 p-6 bg-yellow-500 hover:bg-yellow-600">Book</Button>
            <Button className="flex-1 p-6 bg-green-500 hover:bg-green-600">Place Request</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}