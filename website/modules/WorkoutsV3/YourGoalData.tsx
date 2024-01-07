import React from "react";
import DistanceIconSvg from "./GoalProgramContainer/SvgIcons/DistanceIconSvg";
import PaceIconSvg from "./GoalProgramContainer/SvgIcons/PaceIconSvg";
import TimeIconSvg from "./GoalProgramContainer/SvgIcons/TimeIconSvg";
interface Props {
  time?: number;
  pace?: number;
  distance?: number;
}
const YourGoalData: React.FC<Props> = ({ distance, pace, time }) => {
  return (
    <div className="px-5 py-2 bg-gradient-to-b from-[#313131] to-[#262626] rounded-lg ">
      <div className="text-[#2096E8] pb-4">
        <div className="flex ">
          <TimeIconSvg />
          <span className="ml-2">{time ? time : 0} %</span>
        </div>
        <h6 className="text-[10px] leading-4">Your Average Time</h6>
      </div>
      <div className="text-[#F19B38] pb-4">
        <div className="flex ">
          <PaceIconSvg />
          <span className="ml-2">{pace ? pace : 0}Km/hr</span>
        </div>
        <h6 className="text-[10px] leading-4">Your Average Pace</h6>
      </div>
      <div className="text-[#F15454] ">
        <div className="flex ">
          <DistanceIconSvg />
          <span className="ml-2">{distance ? distance : 0} km</span>
        </div>
        <h6 className="text-[10px] font-normal leading-4">
          Your Average Distance
        </h6>
      </div>
    </div>
  );
};

export default YourGoalData;
