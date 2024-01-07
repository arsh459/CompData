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
// import { format } from "date-fns";

interface Props {
  // userLevel: number;
  //   taskStatus: userTaskStatus;
  //   unlocksNext?: number;
  //   isLocked: boolean;
  frequency?: taskFrequency;
}

const FrequencyElement: React.FC<Props> = ({
  // userLevel,
  //   taskStatus,
  //   unlocksNext,
  //   isLocked,
  frequency,
}) => {
  // console.log("loading", userStreams, loading);

  return (
    <>
      {frequency === "weekly" ? (
        <div
          className={clsx(
            "w-full flex items-start absolute h-1/6 rounded-t-2xl left-0 right-0 top-2 px-1.5 z-50",
            "bg-gradient-to-b to-transparent from-smoke-750"
          )}
        >
          <div className="flex w-full text-white items-center font-medium cursor-pointer justify-center">
            <span className="whitespace-nowrap text-xs font-bold">
              Once a week
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FrequencyElement;
