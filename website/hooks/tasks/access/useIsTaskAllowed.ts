// import { WorkoutActivity } from "@models/Workouts/WorkoutActivity";
import { useEffect, useState } from "react";
// import { db } from "config/firebase";
// import { doc, onSnapshot, query, where, collection } from "firebase/firestore";
// import { getCurrentWeek } from "@hooks/community/challengeWeekUtils/utils";
import { reviewStatus } from "@models/Activities/Activity";

import { Task } from "@models/Tasks/Task";
import {
  checkForAvailStatus,
  getAUserActivitiesFirestore,
  // getFitPointsForActivity,
  // hasParentTask,
} from "./utils";
import {
  canUserCheckin,
  getTaskProgress,
} from "@modules/WorkoutsV3/utils/taskProgress";

export interface activityQuery {
  taskIds?: string[];
  player?: string;
  reviewStatus?: reviewStatus[];
  dS?: string;
  game?: string;
  teamId?: string;
}

export type userTaskStatus =
  | "LEVEL_LOCKED" // dep
  | "LEVEL_ONCE_LOCKED" // dep
  | "FINALE_LOCKED"
  | "RANK_LOCKED"
  | "FREQUENCY_LOCKED" // dep
  | "COMPLETED"
  | "PARENT_COMPLETED"
  | "UNLOCKED"
  | "IMPROVEMENT"
  | "IMPROVEMENT_TEAM_MEMBER"
  | "FUTURE_LOCKED"
  | "PAST_LOCKED"
  | "IN_REVIEW"
  // | "PROGRESS"
  | "PENDING";

export const useIsTaskAllowed = (
  userLevel: number,
  task: Task,
  weekStartsUnix: number | undefined,
  weekEndUnix: number | undefined,
  userRank: number,

  uid: string,
  gameId: string,
  isAdmin?: boolean,
  isFinaleActive?: boolean
) => {
  // const [taskAvailable, setTaskAvailable] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState<userTaskStatus>("PENDING");
  const [userCheckedIn, toggleCheckIn] = useState<boolean>(false);
  const [deltaFps, setDeltaFps] = useState<number>(
    task.fitPoints ? task.fitPoints : 0
  );
  const [unlocksNext, setUnlocksNext] = useState<number | undefined>();
  // const [unlockRank, setUnlockRank] = useState<number | undefined>();
  // const [loadingState, setLoading] = useState<"PENDING" | "DONE" | "FAILED">(
  //   "PENDING"
  // );
  // console.log("i", isAdmin);

  useEffect(() => {
    const getTaskState = async () => {
      if (isAdmin) {
        setTaskStatus("UNLOCKED");
      } else {
        const status = checkForAvailStatus(
          task,
          userLevel,
          userRank,
          isFinaleActive
        );

        if (status) {
          setTaskStatus(status);
          return;
        }

        /**
         * lockingCrit
         * present - completed
         * future - locked / unlocked
         * past - locked / unlocked / completed
         */

        // if (
        // (task.parentTaskIds && task.parentTaskIds?.length >= 0) ||
        // task.taskFrequency === "daily" ||
        // task.taskFrequency === "weekly"
        // ) {
        // console.log("here ", task.taskFrequency);
        // console.log("task.parentTaskIds", task.parentTaskIds);
        const now = new Date();
        const dayStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0,
          0,
          0
        ).getTime();
        const dayEnd = dayStart + 24 * 60 * 60 * 1000;

        const { acts, parentActs } = await getAUserActivitiesFirestore(
          {
            taskIds: [
              task.id,
              ...(task.parentTaskIds ? task.parentTaskIds : []),
            ],
            player: uid,
            reviewStatus: ["TRY_AGAIN", "NEED_MORE_DATA"],
            dS:
              task.taskFrequency === "weekly"
                ? `${weekStartsUnix}`
                : `${dayStart}`,
            game: gameId,
          },
          task.id,
          task.name
        );

        if (parentActs.length > 0) {
          setTaskStatus("PARENT_COMPLETED");
        } else {
          const { currentPts } = getTaskProgress(
            acts,
            task.fitPoints ? task.fitPoints : 0,
            uid
          );
          const { alreadyCheckedIn } = canUserCheckin(acts, task.canCheckIn);

          // const currentFps = getFitPointsForActivity(acts);
          // console.log(task.name, acts);
          const delFps = (task.fitPoints ? task.fitPoints : 0) - currentPts;

          if (acts.length === 0) {
            setTaskStatus("UNLOCKED");
          } else if (acts.length > 0 && delFps) {
            setTaskStatus("IMPROVEMENT");
            setDeltaFps(delFps);
            toggleCheckIn(alreadyCheckedIn);
          } else if (acts.length > 0 && delFps === 0) {
            setTaskStatus("COMPLETED");
            setUnlocksNext(
              task.taskFrequency === "weekly" ? weekEndUnix : dayEnd
            );
          } else {
            setTaskStatus("PENDING");
          }
        }
      }
    };

    getTaskState();
  }, [
    task,
    userLevel,
    userRank,
    isAdmin,
    isFinaleActive,
    weekStartsUnix,
    uid,
    gameId,
    weekEndUnix,
  ]);

  return {
    taskStatus,
    unlocksNext,
    deltaFps,
    userCheckedIn,
  };
};

/**
 * isTaskAllowed()
 * // level check
 *
 * // frequency check
 *
 * // rank check
 *
 * // parentCheck
 *
 *
 *
 *
 */
