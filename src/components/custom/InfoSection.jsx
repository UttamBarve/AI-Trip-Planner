import React from "react";
import { Button } from "../ui/button";
import { RiShareForwardFill } from "react-icons/ri";


export const InfoSection = ({ trip }) => {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[300px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex gap-4">
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-600 md:text-sm text-xs ">
              {trip?.userSelection?.days} Day(s)
            </h2>
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-600 md:text-sm text-xs">
              Budget: {trip?.userSelection?.budget}{" "}
            </h2>
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-600 md:text-sm text-xs">
              Traveler(s): {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button><RiShareForwardFill /></Button>
      </div>
    </div>
  );
};
