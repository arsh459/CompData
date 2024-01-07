import clsx from "clsx";
import React from "react";
// import {
//   live,
//   numClasses,
//   durationInWeeks,
//   oneLiner,
//   durationEachClassMinutes,
// } from "./constants";
import Divider from "@components/divider/Divider";

interface Props {
  oneLiner: string;
  live: boolean;
  durationEachClassMinutes: number;
  numClasses: number;
  durationInWeeks: number;
}
const HeaderImage: React.FC<Props> = ({
  oneLiner,
  live,
  durationEachClassMinutes,
  numClasses,
  durationInWeeks,
}) => {
  return (
    <div className={clsx("")}>
      <Divider />

      <div className="pt-4 pb-4">
        <p className="italic text-gray-700 text-sm font-semibold">
          "{oneLiner}"
        </p>
        <div className="pt-4 flex items-center">
          <p className="text-red-500 text-sm font-semibold pr-1">
            {live ? "Live class" : "Recorded course"}
          </p>
          <p className="text-gray-700 text-sm font-medium">
            · {durationEachClassMinutes}mins · {numClasses} Classes
          </p>
          <p className="text-gray-700 text-sm font-light pl-1">
            ({durationInWeeks} Weeks)
          </p>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default HeaderImage;
