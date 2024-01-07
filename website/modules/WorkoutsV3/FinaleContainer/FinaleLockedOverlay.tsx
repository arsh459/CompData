import { baseImageKit, lockedIconNoKeyHole } from "@constants/icons/iconURLs";
import { format } from "date-fns";
import React from "react";
interface Props {
  taskFp?: number;
  unlocksNext?: number;
}
const FinaleLockedOverlay: React.FC<Props> = ({ taskFp, unlocksNext }) => {
  return (
    <div className="absolute flex flex-col text-white items-center justify-center inset-0 rounded-lg bg-[#1C1C1C]/20 backdrop-blur-xl z-10 border   border-[#A4A4A4]">
      <img
        src={`${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`}
      />
      <p className="border-b border-white pb-1.5 my-1.5">
        {unlocksNext
          ? `Unvieling on ${format(new Date(unlocksNext), "d MMM")}`
          : ""}
      </p>
      {/* <div className="h-px bg-white w-1/2"></div> */}
      <p>Earn {taskFp} Fitpoints</p>
    </div>
  );
};

export default FinaleLockedOverlay;
