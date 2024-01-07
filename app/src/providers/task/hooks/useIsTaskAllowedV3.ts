import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore"; // FirebaseFirestoreTypes,
import {
  Task,
  // TaskProgress
} from "@models/Tasks/Task";
// import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import {
//   getInProgressTasks,
//   getUserAttempts,
//   getUserFP,
//   hasUserDoneBefore,
//   hasUserDoneInSprint,
// } from "./utils";
import { useGameContext } from "@providers/game/GameProvider";
// import { getUserActivitiesForDay } from "@utils/task/utils";
import {
  // getTaskProgress,
  getTaskProgressV2,
} from "@utils/task/taskProgress";
import { Activity } from "@models/Activity/Activity";
import { isStepsTaskActive } from "./utils";
// import { reviewStatus } from "@models/Activity/Activity";

export type TaskStatusV2 =
  | "PENDING"
  | "UNLOCKED"
  | "LOCKED"
  | "IN_REVIEW"
  | "COMPLETED"
  | "IMPROVEMENT"
  | "COMPLETED_BEFORE"
  | "PRO"
  | "LIVE"
  | "UNKNOWN";

export const useIsTaskAllowedV3 = (
  selectedDay: number,
  // taskProgress?: TaskProgress,
  task?: Task
) => {
  // const [taskAvailable, setTaskAvailable] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState<TaskStatusV2>("UNKNOWN");

  const [progress, setProgress] = useState<number>(0);
  const [earnedFP, setEarnedFP] = useState<number>(0);
  const [numAttempts, setAttempts] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [stepsActive, setStepsTaskState] = useState<boolean>(false);
  //   const [unlocksNext, setUnlocksNext] = useState<number | undefined>();
  //   const [actAuthorUID, setActivityAuthorUID] = useState<string | undefined>();

  // const { badgeProgress } = useBadgeProgressContext();
  const { state } = useAuthContext();
  const { params } = useGameContext();

  useEffect(() => {
    const getTaskState = async () => {
      if (task?.id && state.uid) {
        const unsub = firestore()
          .collection("users")
          .doc(state.uid)
          .collection("activities")
          .where("taskId", "==", task?.id)
          .where("taskDay", "==", selectedDay)
          .where("games", "array-contains", state.gameId)
          .onSnapshot((userRelevantActsDocs) => {
            if (userRelevantActsDocs) {
              const userRelevantActs: Activity[] = [];
              for (const doc of userRelevantActsDocs.docs) {
                const remoteDoc = doc.data() as Activity | null;

                if (task.taskType === "steps" && remoteDoc?.stepsActive) {
                  userRelevantActs.push(remoteDoc);
                } else if (task.taskType !== "steps" && remoteDoc) {
                  userRelevantActs.push(remoteDoc);
                }
              }

              if (userRelevantActs.length > 0) {
                const { genProg, sprintProg } = getTaskProgressV2(
                  userRelevantActs,
                  task.fitPoints ? task.fitPoints : 0,
                  params?.sprintStartUnix
                );

                const sprintDelPts =
                  (task.fitPoints ? task.fitPoints : 0) - sprintProg.currentPts;
                const genPts =
                  (task.fitPoints ? task.fitPoints : 0) - genProg.currentPts;

                setStepsTaskState(isStepsTaskActive(userRelevantActs));

                if (sprintDelPts === 0 && sprintProg.selectedAct) {
                  setTaskStatus("COMPLETED");
                  setEarnedFP(sprintProg.currentPts);
                  setProgress(1);
                  setSelectedActivity(sprintProg.selectedAct);
                } else if (
                  sprintDelPts > 0 &&
                  sprintProg.selectedAct?.reviewStatus === "PENDING"
                ) {
                  setTaskStatus("IN_REVIEW");
                  setSelectedActivity(sprintProg.selectedAct);
                  // setEarnedFP(sprintProg.currentPts);
                  // setProgress(
                  //   sprintProg.currentPts / (task.fitPoints ? task.fitPoints : 1)
                  // );
                } else if (sprintDelPts > 0 && sprintProg.selectedAct) {
                  setTaskStatus("IMPROVEMENT");
                  setEarnedFP(sprintProg.currentPts);

                  setSelectedActivity(sprintProg.selectedAct);
                  // setProgress(0.5)
                  setProgress(
                    sprintProg.currentPts /
                      (task.fitPoints ? task.fitPoints : 1)
                  );
                } else if (genPts >= 0) {
                  setTaskStatus("COMPLETED_BEFORE");
                  setAttempts(sprintProg.numActs);
                  setSelectedActivity(sprintProg.selectedAct);
                }
              } else {
                if (selectedDay === 0) {
                  setTaskStatus("UNLOCKED");
                }

                // else if (
                //   typeof badgeProgress?.currentDay === "number" &&
                //   badgeProgress.currentDay + 1 >= selectedDay
                // ) {
                //   setTaskStatus("UNLOCKED");
                // } else if (
                //   typeof badgeProgress?.currentDay === "number" &&
                //   badgeProgress.currentDay + 1 < selectedDay
                // ) {
                //   setTaskStatus("LOCKED");
                // } else if (!badgeProgress && selectedDay) {
                //   setTaskStatus("LOCKED");
                // }
              }
            }
          });

        // unsub
        return () => {
          unsub();
        };
      }
    };

    getTaskState();
  }, [
    task?.id,
    state.gameId,
    state.uid,
    selectedDay,
    // badgeProgress?.currentDay,

    task?.fitPoints,
    params?.sprintStartUnix,
  ]);

  return {
    taskStatus,
    progress,
    earnedFP,
    numAttempts,
    stepsActive,
    selectedActivity,
  };
};
