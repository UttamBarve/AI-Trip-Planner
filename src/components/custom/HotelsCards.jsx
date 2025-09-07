import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineTextsms } from "react-icons/md";
import { Link } from "react-router-dom";

export const HotelsCards = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: `${hotel.hotelName}, ${hotel.hotelAddress}` };
    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp.data.places[0]?.photos || [];

      if (photos.length === 0) return;

      // Desired ratio
      const targetRatio = 1.5;

      // Pick the photo closest to 3:1 ratio
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
      to={`https://www.google.com/maps/search/${hotel.hotelName}, ${hotel.hotelAddress}`}
      target="_blank"
    >
      <div className="border hover:scale-105 rounded-lg hover:shadow-xl  transition-all duration-500 cursor-pointer p-5">
        <img
          className="w-[200px] rounded-xl"
          src={photoUrl || "/placeholder.jpg"}
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
            <CiLocationOn className="mt-0.5 shrink-0 text-orange-950" />
            {hotel.hotelAddress}
          </h2>
        </div>
      </div>
    </Link>
  );
};
