// import { ClockIcon } from "@heroicons/react/solid";
// import { useIsTaskAllowed } from "@hooks/tasks/access/useIsTaskAllowed";
// import { UserRank } from "@models/Activities/Activity";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Task, TaskProgress } from "@models/Tasks/Task";
// import { UserInterface } from "@models/User/User";
// import { getTaskPoints } from "@modules/TaskCard/utils";
// import { getTaskProgress } from "../utils/taskProgress";
// import { usePreviousActivityByFrequency } from "@hooks/tasks/usePreviousActivityByFrequency";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import React from "react";
import ProgressBarDynamic from "../ProgressBarDynamic";
import { getTaskLabel } from "./utils";
interface Props {
  // user: UserInterface;
  // completed?: boolean;
  // start?: boolean;
  task: Task;
  // weekStartUnix?: number;
  // gameId: string;
  taskProgress?: TaskProgress;
  // weekEndUnix?: number;
  // userRank: number;
  // gameId: string;
  // isFinaleActive?: boolean;
}
const GoalProgramCard: React.FC<Props> = ({
  // gameId,
  // isFinaleActive,
  // user,
  // weekStartUnix,
  // gameId,
  taskProgress,
  // weekEndUnix,
  // userRank,
  // completed,
  // start,
  task,
}) => {
  // const progress = getAggregateProgress(task.goalKPIs, taskProgress);
  const progress = 0;

  // console.log("p", progress);

  // const media = task?.thumbnails;
  return (
    <div className="flex item-center">
      {task.thumbnails ? (
        <div className="flex-1 w-full rounded-lg relative">
          <MediaTile
            media={task.thumbnails}
            alt="goal-task"
            height={102}
            width={159}
            rounded={true}
          />
          <div className="bg-gradient-to-t h-1/4 flex justify-center items-center bottom-0 rounded-b-lg left-0 right-0 absolute from-smoke-750 to-transparent">
            <p className="text-white font-semibold text-center text-sm">
              {task.durationMinutes} min
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-600 h-[102px] w-[159px] rounded-lg" />
      )}

      <div className="flex flex-1 pl-2 flex-col justify-between text-[#e7e7e7]">
        <div>
          <p className="font-semibold text-base leading-4">{task?.name}</p>
        </div>
        <div>
          <p className="font-normal text-sm pb-0.5 text-color-[#c0c0c0]">
            Lvl {task?.level} {getTaskLabel(task?.level)} ·
            <span className="pl-1 font-light text-sm">
              {task?.fitPoints} FP
            </span>
          </p>
          <ProgressBarDynamic
            backGround="#0591F1"
            width={progress * 100}
            bgEmptyColor="#000"
          />
        </div>
        <div>
          <div className="flex items-center justify-center  gap-2 py-2.5 h-9 bg-[#4d4d4d] rounded-lg text-white">
            <img
              src="https://ik.imagekit.io/socialboat/Polygon_141_gi_T2T56c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656238358603"
              alt="star-exercise-button"
            />
            <span>Start</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalProgramCard;
