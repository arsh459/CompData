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
  isPro?: boolean;
}

const BottomActivityElements: React.FC<Props> = ({
  earnedFP,
  item,
  taskStatus,
  userRelevantActsCount,
  unlocksIn,
  progress,
  isPro,
}) => {
  const canView = isPro || taskStatus === "play";

  return (
    <div
      className={clsx(
        "mt-2 rounded-3xl px-4 py-2",
        canView && taskStatus === "done"
          ? "group-hover:bg-[#17EA5F] group-hover:text-[#252525E5] text-[#17EA5F]"
          : (canView && !userRelevantActsCount && !unlocksIn) ||
            (canView && progress)
          ? "group-hover:bg-[#F2F2F2] group-hover:text-[#252525E5] text-[#FFFFFFE5]"
          : ""
      )}
    >
      <div className="flex items-center">
        {userRelevantActsCount && taskStatus === "done" ? (
          <div className="hidden relative z-0 group-hover:block mr-2">
            <img src={refreshIcon} className="w-5 md:w-6 aspect-1" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[10px] md:text-xs font-popR">
                {userRelevantActsCount}
              </p>
            </div>
          </div>
        ) : null}
        <p className="truncate text-base md:text-lg font-popM">{item.name}</p>
      </div>

      <ActivityKeyPoints item={item} unlocksIn={unlocksIn} />
    </div>
  );
};

export default BottomActivityElements;
