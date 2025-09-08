import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiShareForwardFill } from "react-icons/ri";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

export const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: trip?.userSelection?.location };
    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp.data.places[0]?.photos || [];

      if (photos.length === 0) return;

      // Desired ratio
      const targetRatio = 3 / 1;

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
    <div>
      <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={trip?.userSelection?.location || "Place photo"}
            className="w-full h-[300px] object-cover"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-xl">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
      </div>

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
        
      </div>
    </div>
  );
};
