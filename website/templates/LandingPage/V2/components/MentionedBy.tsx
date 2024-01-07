import React from "react";
import LeftFeatherIcon from "./LeftFeatherIcon";

const MentionedBy = () => {
  return (
    <div className="flex flex-1 justify-center items-center font-bail  w-full px-4">
      <div className="flex text-center  text-white sm:w-fit justify-evenly items-center flex-1 mr-[12%] max-w-[172px]">
        <div className=" w-1/5  object-contain">
          <LeftFeatherIcon />
        </div>
        <div className="w-full">
          <p className="text-xs  w-full ">“Top 30 Startups to watch“ - INC42</p>
        </div>
        <div className="w-1/5 object-contain -scale-x-100">
          <LeftFeatherIcon />
        </div>
      </div>
      <div className="flex text-center max-w-[172px] text-white sm:w-fit justify-evenly items-center flex-1">
        <div className="w-1/5  object-contain">
          <LeftFeatherIcon />
        </div>
        <div className="w-full">
          <p className="text-xs w-full ">2nd Rank on Product hunt 2022</p>
        </div>
        <div className="w-1/5 object-contain -scale-x-100">
          <LeftFeatherIcon />
        </div>
      </div>
    </div>
  );
};

export default MentionedBy;
