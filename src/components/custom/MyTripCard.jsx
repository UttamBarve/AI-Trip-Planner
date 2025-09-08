import React, { useEffect, useState } from "react";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const MyTripCard = ({trip, idx}) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(trip)
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: trip?.userSelection?.location };
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
    <div
      key={idx}
      onClick={() => {
        navigate("/view-trip/" + trip?.id);
      }}
      className="border hover:scale-105 rounded-lg hover:shadow-xl  transition-all duration-500 cursor-pointer p-5"
    >
      <img
        className="w-[200px] rounded-xl"
        src={photoUrl || "/placeholder.jpg"}
        alt=""
      />

      <div className="my-3 flex gap-1 flex-col">
        <h2 className="font-medium text-lg">{trip?.userSelection?.location}</h2>
        <h2 className="text-sm text-gray-700 flex gap-1 items-center">
          <IoPricetagsOutline className="mt-0.5 shrink-0  text-green-700" />
          {trip?.userSelection?.budget} budget
        </h2>
        <h2 className="text-sm text-gray-700 flex gap-1 items-start ">
          <MdPeopleAlt className="mt-0.5 shrink-0 text-blue-600" />
          {trip?.userSelection?.traveler}
        </h2>
        <h2 className="text-sm text-gray-700 flex gap-1 items-start">
          <LuCalendarDays className="mt-0.5 shrink-0 text-red-900" />
          {trip?.userSelection?.days} day(s)
        </h2>
        <h2 className="text-sm text-gray-700 flex gap-1 items-start">
          <MdCreate className="mt-0.5 shrink-0" />
          {trip?.created}
        </h2>
      </div>
    </div>
  );
};
