import { weEventTrack } from "@analytics/webengage/user/userLog";
import React from "react";

const LogoName = () => {
  const onClick = () => {
    weEventTrack("landingPage_clickLogo", {});
  };

  return (
    <div className="flex" onClick={onClick}>
      <img
        src={
          "https://ik.imagekit.io/socialboat/Component_6__1__CgPWY-2O0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663242315232"
        }
        alt="socialboat icon"
        className="w-5 aspect-1 object-contain"
      />
      <p
        className="text-white pl-1.5 text-xl md:text-2xl font-bold"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        SocialBoat
      </p>
    </div>
  );
};

export default LogoName;
