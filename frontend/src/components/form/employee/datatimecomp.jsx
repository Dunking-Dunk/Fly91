import React from 'react'

function datatimecomp() {

    
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
    
    <>
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
            </div></>
  )
}

export default datatimecomp
