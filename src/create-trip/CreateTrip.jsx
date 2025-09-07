import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../constants/options";
import { toast } from "sonner";
import { model, config, getContents, ai } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const OnGenerateTrip = async () => {
    if (!localStorage.getItem("user")) {
      setOpenDialog(true);
      return;
    }

    if (Object.keys(formData).length < 4) {
      toast("Please fill all the details");
      return;
    }
    if (formData?.days > 7 || formData?.days < 1) {
      toast("Please Enter Trip Days Between 0 to 8 Days");
      return;
    }

    const userPrompt = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{days}", formData?.days)
      .replace("{days}", formData?.days)
      .replace("{budget}", formData?.budget)
      .replace("{traveler}", formData?.traveler);

    setLoading(true);

    const contents = getContents(userPrompt);

    try {
      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });
      const AIResponse = response.candidates[0].content.parts[1].text;
      console.log(AIResponse);
      saveAITrip(AIResponse);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Getting Error While Genrating Response! Please Try Again!");
    }
    setLoading(false);
  };

  const saveAITrip = async (tripData) => {
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
    const docId = Date.now().toString();

    // Step 1: Clean up
    let cleanTripData = tripData.trim();
    cleanTripData = cleanTripData.replace(/```json|```/g, "");

    // Step 2: Try to extract JSON with regex
    const jsonMatch = cleanTripData.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("AI response did not contain valid JSON:", cleanTripData);
      toast.error("Invalid AI response, please try again!");
      return;
    }

    const parsedTrip = JSON.parse(jsonMatch[0]);

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: parsedTrip,
      userEmail: userEmail,
      id: docId,
    });
    navigate("/view-trip/" + docId);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp.access_token),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-10 flex flex-col ">
      <div>
        <h2 className="font-bold text-2xl">Tell us your travel preference🏝️</h2>
        <p className="mt-3 text-gray-500">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <div className="">
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (val) => {
                setPlace(val);
                handleChange("location", val.label);
              },
              placeholder: "Search location...",
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How may days are you planning your trip?
          </h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => {handleChange("days", day); setSelectedDay(day)}}
                className={`px-4 py-2 rounded-lg border hover:shadow-xl  transition-all duration-200 cursor-pointer hover:scale-110 ${
                  selectedDay === day ? "border-black" : ""
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl mt-3 font-medium">What is your budget?</h2>
          <p className="text-gray-500 mb-3 text-sm">
            The budget is exclusively allocated for activities and dining
            purposes.
          </p>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={` hover:scale-110 p-4 border rounded-lg hover:shadow-xl  transition-all duration-500 cursor-pointer ${
                  formData?.budget == item.title && "shadow-xl border-black"
                }`}
                onClick={() => {
                  handleChange("budget", item.title);
                }}
              >
                <h1 className="text-3xl">{item.icon}</h1>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl mt-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`hover:scale-110 p-4 border rounded-lg hover:shadow-xl transition-all duration-500 cursor-pointer 
                  ${
                    formData?.traveler == item.title && "shadow-xl border-black"
                  }`}
                onClick={() => {
                  handleChange("traveler", item.title);
                }}
              >
                <h1 className="text-3xl">{item.icon}</h1>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-end">
          <Button onClick={() => OnGenerateTrip()} disabled={loading}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              <>Generate Trip </>
            )}
          </Button>
        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-4">Sign In With Google</h2>
            </DialogTitle>
            <DialogDescription>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-2 flex gap-4 items-center"
              >
                <FcGoogle className="!h-6 !w-6" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
