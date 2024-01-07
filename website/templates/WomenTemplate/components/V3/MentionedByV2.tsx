import React from "react";
import LeftFeatherIcon from "../../../LandingPage/V2/components/LeftFeatherIcon";

const MentionedByV2 = () => {
  return (
    <div className="flex justify-between w-full pb-6 lg:pb-0 lg:w-4/5 items-start font-bail z-10">
      <div className="flex text-center  text-white sm:w-fit justify-evenly items-center flex-1  max-w-[200px]">
        <div className=" w-1/5 aspect-[20/30]  object-contain">
          <LeftFeatherIcon />
        </div>
        <div className="w-full">
          <p className="text-xs lg:text-sm w-full">
            “Top 30 Startups to watch“ - INC42
          </p>
        </div>
        <div className="w-1/5 aspect-[20/30] object-contain -scale-x-100">
          <LeftFeatherIcon />
        </div>
      </div>
      <div className="flex text-center max-w-[220px] text-white sm:w-fit justify-evenly items-center flex-1">
        <div className="w-1/5 aspect-[20/30] object-contain">
          <LeftFeatherIcon />
        </div>
        <div className="w-full">
          <p className="text-xs lg:text-sm w-full">
            2nd Rank on Product hunt 2022
          </p>
        </div>
        <div className="w-1/5 aspect-[20/30] object-contain -scale-x-100">
          <LeftFeatherIcon />
        </div>
      </div>
    </div>
  );
};

export default MentionedByV2;
