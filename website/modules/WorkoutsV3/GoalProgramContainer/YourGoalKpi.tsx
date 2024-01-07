// import { UserRank } from "@models/Activities/Activity";
// import { SystemKPIs } from "@models/Tasks/SystemKPIs";
import React from "react";
// import DistanceIconSvg from "../DistanceIconSvg";
// import PaceIconSvg from "../PaceIconSvg";
// import TimeIconSvg from "../TimeIconSvg";
import SingleKPI from "./SingleKPI";
import { GoalKPIList } from "./utils";

interface Props {
  // time?: number;
  // pace?: number;

  kpis: GoalKPIList[];
  // userRank?: UserRank;
  // data: GoalKPIList[];
}
const YourGoalKpi: React.FC<Props> = ({ kpis }) => {
  return (
    <div className="w-full h-full flex flex-col justify-evenly rounded-2xl flex-1">
      {kpis.map((item, index) => {
        return (
          <div key={`${item}-${index}`} className="py-1">
            <SingleKPI
              kpiValue={item}
              // value={val}
              // kpi={kpi}
              // target={target}
              // index={index}
            />
          </div>
        );
      })}

      {/* <div className="text-[#2096E8] pb-4">
        <div className="flex ">
          <TimeIconSvg />
          <span className="ml-2">{time ? time : 0}%</span>
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
      <div className="text-[#F15454]">
        <div className="flex ">
          <DistanceIconSvg />
          <span className="ml-2">{distance ? distance : 0}km</span>
        </div>
        <h6 className="text-[10px] font-normal leading-4">
          Your Average Distance
        </h6>
      </div> */}
    </div>
  );
};

export default YourGoalKpi;
