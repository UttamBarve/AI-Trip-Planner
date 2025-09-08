import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { MyTripCard } from "@/components/custom/MyTripCard";

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
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    setUserTrips(trips);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-10 flex flex-col ">
      <h2 className="font-bold text-2xl mb-4 border-b-2">My Trip</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {userTrips.length>0?userTrips
          .slice()
          .reverse()
          .map((trip, idx) => (
            <MyTripCard trip={trip} idx={idx} />
          )):
          [1,2,3,4,5,6,7,8].map(()=>(
          <div className="h-[250px] w-full bg-slate-300 animate-pulse rounded-xl"></div>
          ))
          }
      </div>
    </div>
  );
};
