import React from "react";
import { PlaceCards } from "./PlaceCards";

export const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-14 -mb-5">Daily Plan</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary?.map((day, idx) => (
          <div key={idx} className="flex flex-col p-4 m-4">
            <div className=" border rounded-lg hover:shadow-xl transition-all duration-500 cursor-pointer p-5">
              <h2 className="font-medium text-lg">
                Day {day.day}: {day.theme}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {day.activities?.map((plan, id) => (
                  <PlaceCards plan={plan} id={id} trip={trip} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
