import React from "react";
// import Header from "@templates/PaymentTemplate/Header";
// import { weEventTrack } from "@analytics/webengage/user/userLog";
// import MentionedBy from "@templates/LandingPage/V2/components/MentionedBy";
// import Link from "next/link";
// import { WomenImg } from "@templates/WomenTemplate/components/Background";
import clsx from "clsx";
import { planContent } from "@templates/joinBoatTemplate/utils";
import ProPlanCard from "./ProPlanCard";
const GetAccess = () => {
  return (
    <div className="w-full max-w-screen-xl flex flex-col justify-center items-center mx-auto h-screen bg-red-300  relative z-0">
      <img
        src={
          "https://ik.imagekit.io/socialboat/tr:w-1440,c-maintain_ratio,fo-auto/_removal_1_cdMMXvaBx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669216723067"
        }
        alt="women workout"
        className={clsx("absolute right-0 -z-10 h-full object-cover")}
      />
      <p
        className="text-[#FFFFFF] text-xl text-center font-baib"
        style={{
          paddingTop: "1rem",
        }}
      >
        Our Plans
      </p>
      {/* <div className="w-full min-h-[50%] flex  z-10 relative"> */}
      <div className=" w-full flex   justify-center bg-black items-center  ">
        {planContent.map((plan) => (
          <div key={plan.id} className="w-full  flex justify-center flex-1">
            <ProPlanCard plan={plan} key={plan.id} />
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default GetAccess;
