import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  baseImageKit,
  fPointsBlack,
  watchIcon,
} from "@constants/icons/iconURLs";
import { EventInterface } from "@models/Event/Event";
import { useIsTaskAllowed } from "@hooks/tasks/access/useIsTaskAllowed";
// import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { Task } from "@models/Tasks/Task";
// import { isTaskAvailable } from "@models/Tasks/taskValidity";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import Overlay from "./Overlay";
import { getTaskPoints } from "./utils";

interface Props {
  task: Task;
  uid: string;
  userLevel: number;
  isAdmin: boolean;
  // eventStarts?: number;
  // roundLength?: number;
  userRank: number;
  roundStartUnix?: number;
  roundEndUnix?: number;
  onWorkoutClick: () => void;
  game: EventInterface;
  isFinaleActive?: boolean;
  activeFitPointsV2?: number;
  leaderKey: string;
}

const TaskCard: React.FC<Props> = ({
  task,
  // eventStarts,
  activeFitPointsV2,
  // roundLength,
  roundEndUnix,
  roundStartUnix,
  uid,
  userLevel,
  userRank,
  onWorkoutClick,
  game,
  isAdmin,
  isFinaleActive,
  leaderKey,
}) => {
  const { taskStatus, unlocksNext, deltaFps, userCheckedIn } = useIsTaskAllowed(
    userLevel,
    task,
    roundStartUnix,
    roundEndUnix,
    userRank,
    uid,
    game.id,
    isAdmin,
    isFinaleActive
  );

  const fp = getTaskPoints(
    task.fitPoints,
    task.levelBoosterTask,
    activeFitPointsV2
  );

  // console.log(task.taskFrequency, task.name, deltaFps, fp, taskStatus);

  // const taskAvailable = isTaskAvailable(task, userLevel, userRank, isAdmin);

  // const isLocked =
  // !task.level || userLevel >= task.level || isAdmin ? false : true;

  // const { loadingState } = usePreviousActivities(
  //   taskAvailable,
  //   roundStartUnix,
  //   roundEndUnix,
  //   task.id,
  //   uid,
  //   task.taskFrequency,
  //   // eventStarts,
  //   // roundLength,
  //   // sprintLength,
  //   gameId,
  //   task.oneTimeOnly
  // );

  // console.log(
  //   "isLocked",
  //   isLocked,
  //   userLevel,
  //   task.level,
  //   task.name,
  //   unlocksNext
  // );

  // console.log("unlocksNext", unlocksNext);

  return (
    <div
      className="cursor-pointer"
      onClick={
        taskStatus !== "PENDING" && taskStatus !== "FINALE_LOCKED"
          ? () => {
              onWorkoutClick();
              weEventTrack("startWorkout_previewWorkoutTaskClick", {
                taskName: task.name ? task.name : "no_taskName",
                gameName: game.name,
                teamName: leaderKey,
                taskLevel: task.level ? task.level : "no_level",
                taskFPs: task.fitPoints ? task.fitPoints : "no_taskFPs",
                taskFrequency: task.taskFrequency
                  ? task.taskFrequency
                  : "no_taskFrequency",
              });
            }
          : () => {
              weEventTrack("startWorkout_previewWorkoutTaskClick", {
                taskName: task.name ? task.name : "no_taskName",
                gameName: game.name,
                teamName: leaderKey,
                taskLevel: task.level ? task.level : "no_level",
                taskFPs: task.fitPoints ? task.fitPoints : "no_taskFPs",
                taskFrequency: task.taskFrequency
                  ? task.taskFrequency
                  : "no_taskFrequency",
              });
            }
      }
    >
      {task.thumbnails ? (
        <div className="aspect-w-4 aspect-h-5 relative">
          <MediaTile
            media={task.thumbnails}
            width={372}
            height={474}
            alt="task"
            roundedString="rounded-2xl"
          />

          <Overlay
            unlocksNext={unlocksNext}
            taskLevel={task.level ? task.level : 0}
            userCheckedIn={userCheckedIn}
            // isLocked={taskStatus === "UNLOCKED" ? false : true}
            // taskStatus={taskStatus}
            taskStatus={taskStatus}
            frequency={task.taskFrequency}
          />
        </div>
      ) : (
        <div className="aspect-w-3 aspect-h-4">
          <div className="w-full h-full bg-gray-100" />
        </div>
      )}

      <p className="text-sm line-clamp-2 text-center capitalize py-1">
        {task.name}
      </p>
      <div className="flex justify-evenly items-center text-xs">
        <div className="flex items-center">
          <img src={`${baseImageKit}/tr:w-12,c-maintain_ratio/${watchIcon}`} />
          <p className="pl-1 pt-0.5">{task.durationMinutes}mins</p>
        </div>

        <div className="bg-[#335E7D] w-px py-1.5" />

        <div className="flex items-center">
          <img
            src={`${baseImageKit}/tr:w-12,c-maintain_ratio/${fPointsBlack}`}
          />
          <p className="pl-1 pt-0.5">
            {task.levelBoosterTask ? fp : deltaFps}FP
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
