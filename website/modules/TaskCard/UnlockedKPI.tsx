// import {
// baseImageKit,
// calendarIcon,
//   lockIcon,
// } from "@constants/icons/iconURLs";
// import { userTaskStatus } from "@hooks/tasks/access/useIsTaskAllowed";
// import { taskFrequency } from "@models/Tasks/Task";
// import ProgressBarDynamic from "@modules/WorkoutsV3/ProgressBarDynamic";
import { taskFrequency } from "@models/Tasks/Task";
import clsx from "clsx";
import FrequencyElement from "./FrquencyElement";
// import { format } from "date-fns";

interface Props {
  // userLevel: number;
  //   taskStatus: userTaskStatus;
  //   unlocksNext?: number;
  //   isLocked: boolean;
  frequency?: taskFrequency;
  overlay?: boolean;
}

const UnlockedKPIs: React.FC<Props> = ({
  // userLevel,
  //   taskStatus,
  //   unlocksNext,
  //   isLocked,
  frequency,
  overlay,
}) => {
  // console.log("loading", userStreams, loading);

  return (
    <>
      <FrequencyElement frequency={frequency} />
      <div
        className={clsx(
          "w-full flex  items-end  justify-center absolute h-1/2 top-1/2 rounded-b-2xl left-0 right-0 bottom-0 pb-1.5 px-1.5 z-50",
          overlay ? " bg-gradient-to-b from-transparent to-smoke-750" : ""
        )}
      >
        <div className="flex py-2 w-full bg-[#6EC576] text-white items-center rounded-xl cursor-pointer  justify-center">
          <img
            src={
              "https://ik.imagekit.io/socialboat/Polygon_187_5M8FZue5s.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656866851205"
            }
            alt="start-button"
          />
          <span className="pl-1 iphoneX:pl-2 whitespace-nowrap text-xs iphoneX:text-sm font-medium ">
            View Task
          </span>
        </div>
      </div>
    </>
  );
};

export default UnlockedKPIs;
