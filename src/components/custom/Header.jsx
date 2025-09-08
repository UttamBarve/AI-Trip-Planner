import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { X } from "lucide-react";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  useEffect(() => {
    console.log(user);
  });

  return (
    <div className="p-3 px-5 shadow-sm flex justify-between items-center">
      <img src="/logo.svg" alt="" />
      <div>
        {user ? (
          <div className="flex gap-5 items-center justify-center">
            <Button variant="outline" className="cursor-pointer ">
              My Trips
            </Button>
            <HoverCard>
              <HoverCardTrigger>
                <img
                  className="h-[38px] w-[38px] rounded-full hover:scale-90 cursor-pointer"
                  src={user?.picture}
                  alt=""
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-[20px] h-[10px] flex items-center justify-center">
                <Button
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                  variant="destructive"
                  className="cursor-pointer "
                >
                  LogOut
                </Button>
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Sign in
          </Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogClose asChild>
            <Button
              className="hover:bg-black bg-black absolute right-4 top-4 "
              onClick={() => setOpenDialog(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
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

export default Header;
