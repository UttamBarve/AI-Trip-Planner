import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineTextsms } from "react-icons/md";
import { Link } from "react-router-dom";
export const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {trip?.tripData?.travelPlan?.hotelOptions?.map((hotel, index) => (
         <Link key={index} to={`https://www.google.com/maps/search/${hotel.hotelName}, ${hotel.hotelAddress}`} target="_blank">
          <div className="border hover:scale-105 rounded-lg hover:shadow-xl  transition-all duration-500 cursor-pointer p-5">
            <img
              className="w-[200px] rounded-xl"
              src="/placeholder.jpg"
              alt=""
            />
            <div className="my-3 flex gap-1 flex-col">
              <h2 className="font-medium ">{hotel.hotelName}</h2>
              <h2 className="text-xs font-medium text-cyan-800">{hotel.price}</h2>
              <h2 className="text-xs text-gray-500 flex gap-1 items-center">
                <FaRegStar className="mt-0.5 shrink-0  text-yellow-500" />
                {hotel.rating}
              </h2>
              <h2 className="text-xs text-gray-500 flex gap-1 items-start ">
                <MdOutlineTextsms className="mt-0.5 shrink-0 text-blue-600" />
                {hotel.description}
              </h2>
              <h2 className="text-xs text-gray-500 flex gap-1 items-start">
                <CiLocationOn  className="mt-0.5 shrink-0 text-orange-950"/>
                {hotel.hotelAddress}
              </h2>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
