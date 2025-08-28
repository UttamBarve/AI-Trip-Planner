import { Hotels } from "@/components/custom/Hotels";
import { InfoSection } from "@/components/custom/InfoSection";
import { PlacesToVisit } from "@/components/custom/PlacesToVisit";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ViewTrip = () => {
    const {tripId} =useParams();
    const [tripData, setTripData] = useState([]);

    useEffect(()=>{
        tripId&&GetTripData();
    }, [tripId])
    const GetTripData=async()=>{
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
    
        if(docSnap.exists()){
            console.log(docSnap.data());
            setTripData(docSnap.data());
        }
        else{
            console.log("no docs")
        }
    }
    
    return (
   
      <div className="p-10 md:px-20 lg:px-48 xl:px-56">
        {/* Information Section */}
        <InfoSection trip={tripData} />

        {/* Recommended Hotels */}
        <Hotels trip={tripData}/>

        {/* Daily Plan */}
        <PlacesToVisit trip={tripData}/>

        {/* Footer */}
      </div>
   
  );
};
