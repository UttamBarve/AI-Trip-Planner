import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";
export const PlaceCards = ({ plan, id, trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    plan && GetPlacePhoto();
  }, [plan]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: `${plan.placeName}, ${trip?.userSelection?.location}`,
    };
    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp.data.places[0]?.photos || [];

      if (photos.length === 0) return;

      // Desired ratio
      const targetRatio = 1.5;

      const bestPhoto = photos.reduce((prev, curr) => {
        const prevRatio = prev.widthPx / prev.heightPx;
        const currRatio = curr.widthPx / curr.heightPx;
        return Math.abs(currRatio - targetRatio) <
          Math.abs(prevRatio - targetRatio)
          ? curr
          : prev;
      }, photos[0]);

      const PHOTO_REF_URL =
        "https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1600&key=" +
        import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

      const bestUrl = PHOTO_REF_URL.replace("{NAME}", bestPhoto.name);
      setPhotoUrl(bestUrl);
    } catch (err) {
      console.error("Google API Error:", err.response?.data || err.message);
    }
  };

  return (
    <Link
      key={id}
      to={`https://www.google.com/maps/search/${plan.placeName}, ${trip?.tripData?.travelPlan?.destination}`}
      target="_blank"
    >
      <div className=" border hover:scale-105 rounded-lg hover:shadow-xl transition-all duration-500 cursor-pointer p-5 m-2">
        <div>
          <img
            className="w-full h-40 sm:h-48 object-cover rounded-xl"
            src={photoUrl || "/placeholder.jpg"}
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
  );
};
