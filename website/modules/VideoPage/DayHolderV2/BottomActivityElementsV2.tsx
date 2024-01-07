import { refreshIcon } from "@constants/icons/iconURLs";
import { statusTypes } from "@hooks/tasks/useIsTaskAllowedV4";
import { Task } from "@models/Tasks/Task";
import clsx from "clsx";
import React from "react";
import ActivityKeyPoints from "./ActivityKeyPoints";
interface Props {
  earnedFP: number;
  item: Task;
  taskStatus: statusTypes | undefined;
  userRelevantActsCount: number;
  unlocksIn: string;
  progress?: number;
}
const BottomActivityElementsV2: React.FC<Props> = ({
  earnedFP,
  item,
  taskStatus,
  userRelevantActsCount,
  unlocksIn,
  progress,
}) => {
  // console.log({ earnedFP, item, userRelevantActsCount });

  return (
    <div
      className={clsx(
        "  mt-2 rounded-3xl py-2",

        "rounded-3xl group-hover:bg-[#9E9E9E]  px-4 py-0  group-hover:text-[#252525E5] text-[#FFFFFFE5]"
      )}
    >
      {userRelevantActsCount && taskStatus === "done" ? (
        <div className=" flex items-center    h-full ">
          <div className="h-full hidden items-center  relative z-0  group-hover:flex">
            <img src={refreshIcon} className=" w-4 aspect-1 " />
            <p className="absolute inset-0 flex items-center justify-center text-xs">
              {userRelevantActsCount}
            </p>
          </div>
          <p className={clsx(" truncate pl-2 text-lg font-popM ", "")}>
            {item.name}
          </p>
        </div>
      ) : (
        <p
          className="text-lg  font-popM  truncate   
          "
        >
          {item.name}
        </p>
      )}
      {earnedFP ? null : (
        <ActivityKeyPoints item={item} unlocksIn={unlocksIn} />
      )}
    </div>
  );
};

export default BottomActivityElementsV2;
