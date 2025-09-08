import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";

export const MyTrips = () => {
  useEffect(() => {
    getUserTrips();
  }, []);
  const [userTrips, setUserTrips] = useState([]);
  const navigate = useNavigate();
  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    setUserTrips([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };
  
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-10 flex flex-col ">
      <h2 className="font-bold text-2xl mb-4 border-b-2">My Trip</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {userTrips.slice().reverse().map((trip, idx) => (
          <div
            key={idx}
            onClick={() => {
              navigate("/view-trip/" + trip?.id);
            }}
            className="border hover:scale-105 rounded-lg hover:shadow-xl  transition-all duration-500 cursor-pointer p-5"
          >
            <img
              className="w-[200px] rounded-xl"
              src={"/placeholder.jpg"}
              alt=""
            />

            <div className="my-3 flex gap-1 flex-col">
              <h2 className="font-medium text-lg ">{trip?.userSelection?.location}</h2>
              <h2 className="text-sm text-gray-700 flex gap-1 items-center">
                <IoPricetagsOutline className="mt-0.5 shrink-0  text-yellow-500" />
                {trip?.userSelection?.budget}
              </h2>
              <h2 className="text-sm text-gray-700 flex gap-1 items-start ">
                <MdPeopleAlt className="mt-0.5 shrink-0 text-blue-600" />
                {trip?.userSelection?.traveler}
              </h2>
              <h2 className="text-sm text-gray-700 flex gap-1 items-start">
                <LuCalendarDays className="mt-0.5 shrink-0 text-orange-950" />
                {trip?.userSelection?.days}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
