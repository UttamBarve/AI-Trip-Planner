import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Daily Plan</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary?.map((day, idx) => (
          <div key={idx} className="flex flex-col p-4 m-4">
            <div className=" border rounded-lg hover:shadow-xl transition-all duration-500 cursor-pointer p-5">
              <h2 className="font-medium text-lg">
                Day {day.day}: {day.theme}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
                {day.activities?.map((plan, id) => (
                  <Link
                    key={id}
                    to={`https://www.google.com/maps/search/${plan.placeName}, ${trip?.tripData?.travelPlan?.destination}`}
                    target="_blank"
                  >
                    <div
                      
                      className=" border hover:scale-105 rounded-lg hover:shadow-xl transition-all duration-500 cursor-pointer p-5 m-2"
                    >
                      <div>
                        <img
                          className="w-[200px] rounded-xl"
                          src="/placeholder.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex gap-1 flex-col">
                        <h2 className="font-medium ">{plan.placeName}</h2>
                        <h2 className="text-xs text-gray-500 flex gap-1 items-start">
                          <IoMdTime className="mt-0.5 shrink-0 text-yellow-600" />
                          {plan.bestTimeToVisit}
                        </h2>
                        <h2 className="text-xs text-gray-500 flex gap-1 items-start">
                          <IoIosInformationCircleOutline className="mt-0.5 shrink-0 text-blue-600 " />
                          {plan.placeDetails}
                        </h2>
                        <h2 className="text-xs text-gray-500 flex gap-1 items-center">
                          <FaRegStar className="mt-0.5 shrink-0  text-yellow-500" />
                          {plan.rating}
                        </h2>
                        <h2 className="text-xs text-gray-500 flex gap-1 items-start ">
                          <FaRupeeSign className="mt-0.5 shrink-0 text-green-500" />
                          {plan.ticketPricing}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
