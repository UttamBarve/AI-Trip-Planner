import React from "react";
import { HotelsCards } from "./HotelsCards";
export const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {trip?.tripData?.travelPlan?.hotelOptions?.map((hotel, index) => (
        <HotelsCards hotel={hotel}/>
        ))}
      </div>
    </div>
  );
};
