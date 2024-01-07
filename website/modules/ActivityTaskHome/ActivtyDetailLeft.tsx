import { refreshIcon } from "@constants/icons/iconURLs";
import { Task } from "@models/Tasks/Task";
import TaskActKeyPoints from "@modules/VideoPage/DayHolderV2/TaskActKeyPoints";
import clsx from "clsx";
import React from "react";

const ActivtyDetailLeft: React.FC<{
  task: Task;
}> = ({ task }) => (
  <div className="flex w-1/3 flex-col">
    <TaskActKeyPoints item={task} />
    <div className="flex gap-4 pt-11">
      <div className="rounded-xl border border-white flex justify-center flex-1 pl-2 h-6 md:h-8 bg-white">
        <div className="h-full flex items-center ">
          <img src={refreshIcon} className=" w-3 aspect-1" />
          <p
            className={clsx(
              "text-[#252525E5] truncate pl-2 text-sm font-popM ",
              ""
            )}
          >
            Workout again
          </p>
        </div>
      </div>
      <div className="rounded-xl flex justify-center flex-1 pl-2 h-6 md:h-8 bg-[#171717]">
        <div className="h-full flex items-center ">
          <p
            className={clsx("text-[#fff] truncate pl-2 text-sm font-popM ", "")}
          >
            Go Back
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ActivtyDetailLeft;
