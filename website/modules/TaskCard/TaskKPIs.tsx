import {
  baseImageKit,
  calendarIcon,
  //   lockIcon,
} from "@constants/icons/iconURLs";
// import { userTaskStatus } from "@hooks/tasks/access/useIsTaskAllowed";
import { taskFrequency } from "@models/Tasks/Task";
import clsx from "clsx";
// import { format } from "date-fns";

interface Props {
  taskLevel: number;
  // userLevel: number;
  //   taskStatus: userTaskStatus;
  //   unlocksNext?: number;
  //   isLocked: boolean;
  overlay?: boolean;
  frequency?: taskFrequency;
}

const TaskKPIs: React.FC<Props> = ({
  taskLevel,
  // userLevel,
  //   taskStatus,
  //   unlocksNext,
  //   isLocked,
  overlay,
  frequency,
}) => {
  // console.log("loading", userStreams, loading);

  return (
    <div
      className={clsx(
        "w-full flex justify-between items-end absolute h-1/4 top-3/4 rounded-b-2xl left-0 right-0 bottom-0 pb-2 px-4 z-50",
        overlay ? " bg-gradient-to-b from-transparent to-smoke-750" : ""
      )}
      // className="w-full flex justify-between items-end absolute h-1/3 top-2/3 rounded-b-2xl left-0 right-0 bottom-0 pb-2 px-4 bg-gradient-to-b from-transparent to-smoke-750 z-50"
    >
      <div className="flex items-center">
        {frequency ? (
          <>
            <img
              src={`${baseImageKit}/tr:w-18,c-maintain_ratio/${calendarIcon}`}
            />
            <p className="text-white pl-2 text-xs capitalize">{frequency}</p>
          </>
        ) : (
          <div />
        )}
      </div>
      <p className="text-xs text-white">Lvl {taskLevel}</p>
    </div>
  );
};

export default TaskKPIs;
