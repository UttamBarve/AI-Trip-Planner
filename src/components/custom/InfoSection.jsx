import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiShareForwardFill } from "react-icons/ri";
import { GetPlaceDetails } from "@/service/GlobalApi";

export const InfoSection = ({ trip }) => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  useEffect(() => {
    if (photoUrls.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === photoUrls.length - 1 ? 0 : prev + 1
        );
      }, 3000); // change every 3s
      return () => clearInterval(interval);
    }
  }, [photoUrls]);

  const PHOTO_REF_URL =
    "https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1600&key=" +
    import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

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
      return Math.abs(currRatio - targetRatio) < Math.abs(prevRatio - targetRatio)
        ? curr
        : prev;
    }, photos[0]);

    const bestUrl = PHOTO_REF_URL.replace("{NAME}", bestPhoto.name);
    setPhotoUrls([bestUrl]); // single photo
    console.log("Selected photo:", bestPhoto);

  } catch (err) {
    console.error("Google API Error:", err.response?.data || err.message);
  }
};
 

  return (
    <div>
      <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photoUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              className="w-full h-[300px] object-cover flex-shrink-0"
            />
          ))}
        </div>
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
        <Button>
          <RiShareForwardFill />
        </Button>
      </div>
    </div>
  );
};
// export const InfoSection = ({ trip }) => {

//   const [photoUrl, setPhotoUrl] = useState('')
//   useEffect(()=>{
//     trip&&GetPlacePhoto();
//   },[trip])
//   const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
//   const GetPlacePhoto = async () => {
//   const data = { textQuery: trip?.userSelection?.location };
//   try {
//     const resp = await GetPlaceDetails(data);
//     const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//     setPhotoUrl(PhotoUrl);

//   } catch (err) {
//     console.error("Google API Error:", err.response?.data || err.message);
//   }
// };

//   return (
//     <div>
//       <img
//         src={photoUrl}
//         className="h-[300px] w-full object-cover rounded-xl"
//       />

//       <div className="flex justify-between items-center">
//         <div className="my-5 flex flex-col gap-2">
//           <h2 className="font-bold text-2xl">
//             {trip?.userSelection?.location}
//           </h2>
//           <div className="flex gap-4">
//             <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-600 md:text-sm text-xs ">
//               {trip?.userSelection?.days} Day(s)
//             </h2>
//             <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-600 md:text-sm text-xs">
//               Budget: {trip?.userSelection?.budget}{" "}
//             </h2>
//             <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-600 md:text-sm text-xs">
//               Traveler(s): {trip?.userSelection?.traveler}
//             </h2>
//           </div>
//         </div>
//         <Button><RiShareForwardFill /></Button>
//       </div>
//     </div>
//   );
// };
