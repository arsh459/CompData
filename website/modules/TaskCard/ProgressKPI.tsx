// import {
// baseImageKit,
// calendarIcon,
//   lockIcon,
// } from "@constants/icons/iconURLs";
// import { userTaskStatus } from "@hooks/tasks/access/useIsTaskAllowed";
// import { taskFrequency } from "@models/Tasks/Task";
import { taskFrequency } from "@models/Tasks/Task";
import ProgressBarDynamic from "@modules/WorkoutsV3/ProgressBarDynamic";
import clsx from "clsx";
import FrequencyElement from "./FrquencyElement";
// import { format } from "date-fns";

interface Props {
  progress: number;
  // userLevel: number;
  //   taskStatus: userTaskStatus;
  //   unlocksNext?: number;
  earnedFP?: number;
  overlay?: boolean;
  frequency?: taskFrequency;
}

const ProgressKPIs: React.FC<Props> = ({
  // userLevel,
  //   taskStatus,
  //   unlocksNext,
  earnedFP,
  overlay,
  progress,
  frequency,
}) => {
  // console.log(progress);
  const progressA = progress ? progress * 100 : 10;

  return (
    <>
      <FrequencyElement frequency={frequency} />
      <div
        className={clsx(
          "w-full flex  items-end absolute h-1/2 top-1/2 rounded-b-2xl left-0 right-0 bottom-0 pb-4 px-4 z-50",
          overlay ? " bg-gradient-to-b from-transparent to-black" : ""
        )}
      >
        <div className="w-full relative z-0">
          <ProgressBarDynamic
            backGround="#16A0FF"
            width={progressA}
            bgEmptyColor="#FFFFFF"
            height="h-1 "
            pill="true"
          />

          <div
            className={clsx(
              "flex  flex-col  justify-end w-max absolute bottom-full pb-1",
              progressA > 90
                ? "-translate-x-full items-end"
                : progressA > 10
                ? "-translate-x-1/2 items-center"
                : ""
            )}
            style={{ left: `${progressA}%` }}
          >
            <p className="text-white text-[10px] font-semibold">
              {earnedFP ? earnedFP : 0} Fp
            </p>
            <div className="w-0 h-0 border-x-[5px] border-t-[5px] border-t-white border-x-transparent" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressKPIs;
