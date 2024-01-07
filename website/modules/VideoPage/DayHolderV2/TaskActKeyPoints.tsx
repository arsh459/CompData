import {
  springIconWhiteFrame16,
  timeIconWhiteFrame16,
} from "@constants/icons/iconURLs";
import { Task } from "@models/Tasks/Task";
import { getImgUrlByDifficulty } from "@utils/levelImg/util";
import clsx from "clsx";
import React from "react";
interface Props {
  item: Task;
}
const TaskActKeyPoints: React.FC<Props> = ({ item }) => (
  <div className="flex flex-col">
    <p className="text-5xl font-popM  pb-6 text-white text-opacity-90">
      {item?.name}
    </p>
    <div className="flex h-fit gap-5 pt-1">
      <div
        className={clsx(
          "flex items-center bg-[#FFFFFF40] text-gray-200  rounded-full px-2 "
          // "group-hover:text-[#3C3C3C] group-hover:bg-[#0000000D]"
        )}
      >
        <img className="w-2 h-2 md:w-3 md:h-3" src={springIconWhiteFrame16} />
        <p className="text-[10px] md:text-sm font-nunitoR pr-4 pl-1">
          {item.fitPoints} FPs
        </p>
      </div>
      <div
        className={clsx(
          "flex items-center bg-[#FFFFFF40] text-gray-200    rounded-full px-3 py-1 "
          //    "group-hover:text-[#3C3C3C] group-hover:bg-[#0000000D]"
        )}
      >
        <img className="w-2 h-2 md:w-3 md:h-3" src={timeIconWhiteFrame16} />

        <p className="text-[10px] md:text-sm font-nunitoR pr-4 pl-1">
          {item.durationMinutes} mins
        </p>
      </div>
      {item?.difficultyLevels?.length && (
        <div
          className={clsx(
            "flex items-center bg-[#FFFFFF40] text-gray-200  rounded-full px-2 "
            // "group-hover:text-[#3C3C3C] group-hover:bg-[#0000000D]"
          )}
        >
          <img
            className="w-2 h-2 md:w-3 md:h-3"
            src={
              item.difficultyLevels
                ? getImgUrlByDifficulty(item?.difficultyLevels)
                : ""
            }
          />
          <p className="capitalize text-[10px] md:text-sm font-nunitoR pl-1">
            {item.difficultyLevels}
          </p>
        </div>
      )}
    </div>
  </div>
);

export default TaskActKeyPoints;
