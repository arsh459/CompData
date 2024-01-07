import {
  springIconWhiteFrame16,
  timeIconWhiteFrame16,
} from "@constants/icons/iconURLs";
import { Task } from "@models/Tasks/Task";
import { getImgUrlByDifficulty } from "@utils/levelImg/util";
import React from "react";
interface Props {
  item: Task;
  unlocksIn: string;
}
const ActivityKeyPoints: React.FC<Props> = ({ item, unlocksIn }) => (
  <div className="flex flex-1 gap-1 md:gap-2 pt-1">
    <div className="flex items-center bg-[#3C3C3C] text-gray-200 rounded-full px-1 md:px-2">
      <img className="w-2 h-2 md:w-3 md:h-3" src={springIconWhiteFrame16} />
      <p className="text-[10px] md:text-xs font-nunitoR pl-1 whitespace-nowrap">
        {item.fitPoints} FPs
      </p>
    </div>
    <div className="flex items-center bg-[#3C3C3C] text-gray-200 rounded-full px-1 md:px-2">
      <img className="w-2 h-2 md:w-3 md:h-3" src={timeIconWhiteFrame16} />

      <p className="text-[10px] md:text-xs font-nunitoR pl-1 whitespace-nowrap">
        {item.durationMinutes} mins
      </p>
    </div>
    {item?.difficultyLevels?.length && (
      <div className="flex items-center bg-[#3C3C3C] text-gray-200 rounded-full px-1 md:px-2">
        <img
          className="w-2 h-2 md:w-3 md:h-3"
          src={
            item.difficultyLevels
              ? getImgUrlByDifficulty(item?.difficultyLevels)
              : ""
          }
        />
        <p className="capitalize text-[10px] md:text-xs font-nunitoR pl-1 whitespace-nowrap">
          {item.difficultyLevels}
        </p>
      </div>
    )}
  </div>
);

export default ActivityKeyPoints;
