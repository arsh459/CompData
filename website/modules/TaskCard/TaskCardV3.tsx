import {
  baseImageKit,
  fpIconBlue,
  // fPointsBlack,
  levelIconBlue,
  watchIcon,
} from "@constants/icons/iconURLs";
// import { useIsTaskAllowed } from "@hooks/tasks/access/useIsTaskAllowed";
import { useIsTaskAllowedV2 } from "@hooks/tasks/access/useIsTaskAllowedV2";
import { SelectedType } from "@hooks/tasks/program/useProgramTasks";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { gameTypes } from "@models/Event/Event";
// import { usePreviousActivityByFrequency } from "@hooks/tasks/usePreviousActivityByFrequency";
// import { usePreviousActivities } from "@hooks/tasks/usePreviousActivities";
import { Task } from "@models/Tasks/Task";
// import ProgressBarDynamic from "@modules/WorkoutsV3/ProgressBarDynamic";
// import ProgressBarDynamic from "@modules/WorkoutsV3/ProgressBarDynamic";
// import { getTaskProgress } from "@modules/WorkoutsV3/utils/taskProgress";
// import { isTaskAvailable } from "@models/Tasks/taskValidity";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import Overlay from "./Overlay";
import OverlayV2 from "./OverlayV2";
// import { getTaskPoints } from "./utils";

interface Props {
  task: Task;
  uid: string;
  userLevel: number;
  isAdmin: boolean;
  // eventStarts?: number;
  // roundLength?: number;
  userRank: number;
  roundStartUnix?: number;
  dayStartProgram?: number;
  roundEndUnix?: number;
  onWorkoutClick: () => void;
  gameId: string;
  isFinaleActive?: boolean;
  activeFitPointsV2?: number;
  currentDayNumber?: number;
  browseBy?: SelectedType;
  gameType?: gameTypes;
  teamId?: string;
  gameStarts?: number;
}

const TaskCardV3: React.FC<Props> = ({
  task,
  // eventStarts,
  activeFitPointsV2,
  gameStarts,
  dayStartProgram,
  // roundLength,
  roundEndUnix,
  roundStartUnix,
  currentDayNumber,
  uid,
  userLevel,
  userRank,
  onWorkoutClick,
  gameId,
  isAdmin,
  isFinaleActive,
  browseBy,
  gameType,
  teamId,
}) => {
  //   const { userActivities } = usePreviousActivityByFrequency(
  //     true,
  //     task.id,
  //     uid,
  //     task.taskFrequency,
  //     roundStartUnix
  //   );

  //   const { currentPts, progress } = getTaskProgress(
  //     userActivities,
  //     task?.fitPoints ? task.fitPoints : 0
  //   );

  const {
    taskStatus,
    unlocksNext,
    progress,
    userCheckedIn,
    earnedFP,
    actAuthorUID,
  } = useIsTaskAllowedV2(
    userLevel,
    task,
    dayStartProgram,
    roundStartUnix,
    // roundEndUnix,
    userRank,
    uid,
    gameId,
    false,
    isFinaleActive,
    currentDayNumber,
    browseBy,
    gameType,
    teamId,
    gameStarts
  );

  const { leader } = useLeaderboard(
    uid !== actAuthorUID ? actAuthorUID : undefined
  );

  // console.log("task", task.name, taskStatus);

  // console.log("actAuthorUID", actAuthorUID, gameType);

  //   const fp = getTaskPoints(
  //     task.fitPoints,
  //     task.levelBoosterTask,
  //     activeFitPointsV2
  //   );

  // console.log(task.name, taskStatus);

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

  // console.log(task.name, taskStatus, unlocksNext);

  //   console.log("unlocksNext", unlocksNext);

  return (
    <div
      className="cursor-pointer"
      onClick={
        taskStatus !== "PENDING" &&
        taskStatus !== "FINALE_LOCKED" &&
        taskStatus !== "FUTURE_LOCKED" &&
        taskStatus !== "IMPROVEMENT_TEAM_MEMBER" &&
        taskStatus !== "RANK_LOCKED"
          ? // taskStatus !== "PAST_LOCKED" &&

            onWorkoutClick
          : () => {}
      }
    >
      {task.thumbnails ? (
        <div className="bg-gray-200 rounded-2xl">
          <div className="aspect-w-4 aspect-h-5 relative z-0 ">
            <MediaTile
              media={task.thumbnails}
              width={372}
              height={474}
              alt="task"
              roundedString="rounded-2xl"
            />
            <OverlayV2
              unlocksNext={unlocksNext}
              taskLevel={task.level ? task.level : 0}
              userCheckedIn={userCheckedIn}
              taskFitPoints={task.fitPoints ? task.fitPoints : 0}
              taskStatus={taskStatus}
              earnedFP={earnedFP}
              progress={progress}
              unlocksAtRank={task.unlocksAtRank}
              frequency={task.taskFrequency}
              doneBy={leader?.name}
            />
          </div>
        </div>
      ) : (
        <div className="aspect-w-3 aspect-h-4 ">
          <div className="w-full h-full bg-gray-100" />
        </div>
      )}

      <p className="text-sm line-clamp-1 break-all text-left text-[#417EAA] capitalize py-1">
        {task.name}
      </p>
      <div className="flex justify-between whitespace-nowrap scrollbar-hide items-center text-[10px] iphoneX:text-xs text-[#417EAA]">
        <div className="flex items-center ">
          <img src={`${baseImageKit}/tr:w-12,c-maintain_ratio/${watchIcon}`} />
          <p className="pl-[0.1rem] iphoneX:pl-1 pt-0.5">
            {task.durationMinutes} mins
          </p>
        </div>

        <div className="bg-[#417EAA] w-px py-1.5 " />

        <div className="flex items-center ">
          <img src={`${baseImageKit}/tr:w-12,c-maintain_ratio/${fpIconBlue}`} />
          <p className="pl-[0.1rem] iphoneX:pl-1 pt-0.5 ">
            {task.fitPoints} FP
          </p>
        </div>
        <div className="bg-[#417EAA] w-px py-1.5" />
        <div className="flex items-center ">
          <img
            src={`${baseImageKit}/tr:w-12,c-maintain_ratio/${levelIconBlue}`}
          />
          <p className="pl-[0.1rem] iphoneX:pl-1 pt-0.5">Lvl {task.level}</p>
        </div>
      </div>
      {/* <div className="pt-2">
        {taskStatus === "IMPROVEMENT" ? (
          <div className="flex items-center justify-center  gap-2 py-2.5 h-9 bg-[#6EC576] rounded-lg text-white">
            <img
              src="https://ik.imagekit.io/socialboat/Polygon_141_gi_T2T56c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656238358603"
              alt="star-exercise-button"
            />

            <span>{taskStatus === 'IMPROVEMENT' ? "Ca"}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center  gap-2 py-2.5 h-9 bg-[#6EC576] rounded-lg text-white">
            <img
              src="https://ik.imagekit.io/socialboat/Polygon_141_gi_T2T56c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656238358603"
              alt="star-exercise-button"
            />
            <span>Finish</span>
          </div>
          //   <ProgressBarDynamic
          //     backGround="#0073C1"
          //     width={progress}
          //     bgEmptyColor="#9B9B9B"
          //   />
        )}
      </div> */}
      {/* <ProgressBarDynamic
        backGround="#0073C1"
        width={58}
        bgEmptyColor="#9B9B9B"
      /> */}
    </div>
  );
};

export default TaskCardV3;
