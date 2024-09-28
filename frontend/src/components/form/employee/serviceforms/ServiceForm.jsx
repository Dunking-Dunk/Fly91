import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlightForm from "./FlightForm";
import HotelForm from "./HotelForm";
import CabForm from "./CabForm";
import ConfirmationBanner from "./ConfirmationBanner";

export default function ServiceForm() {
  const [activeTab, setActiveTab] = useState("flight");
  const [showBanner, setShowBanner] = useState(false);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleShowBanner = () => {
    setShowBanner(true);
  };

  const handleHideBanner = () => {
    setShowBanner(false);
  };

  const handleContinue = () => {
    setShowBanner(false);
    console.log("Proceeding with review after confirmation");
  };

  return (
    <div className="w-full max-w-3xl ml-1 mt-4 h-fit py-10 px-16 bg-white text-[#939393] rounded-lg shadow relative">
      {showBanner && (
        <ConfirmationBanner
          onClose={handleHideBanner}
          onContinue={handleContinue}
        />
      )}
      <Tabs
        defaultValue="flight"
        className="w-full"
        onValueChange={handleTabChange}
      >
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
          <FlightForm onShowBanner={handleShowBanner} />
        </TabsContent>
        <TabsContent value="hotel">
          <HotelForm onShowBanner={handleShowBanner} />
        </TabsContent>
        <TabsContent value="cab">
          <CabForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
