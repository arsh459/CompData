import { useEffect, useState } from "react";
import { Task } from "@models/Tasks/Task";
import {
  checkForAvailStatus,
  // getAUserActivitiesFirestore,
  getNearestProgramDay,
  getSoonestDay,
  getActivitiiesMain,
} from "../../../utils/task/utils";
import { SelectedType } from "../../../hooks/program/useProgramTasks";
import {
  canUserCheckin,
  getTaskProgress,
} from "../../../utils/task/taskProgress";
import { gameTypes } from "@models/Event/Event";
import { reviewStatus } from "@models/Activity/Activity";

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
  | "COMPLETED_TEAM_MEMBER"
  | "PARENT_COMPLETED"
  | "UNLOCKED"
  | "IMPROVEMENT"
  | "IMPROVEMENT_TEAM_MEMBER"
  | "FUTURE_LOCKED"
  | "PAST_LOCKED"
  | "IN_REVIEW"
  // | "PROGRESS"
  | "PENDING";

export const useIsTaskAllowedV2 = (
  userLevel: number,
  task: Task | undefined,
  dayStartProgram: number | undefined,
  roundStartProgram: number | undefined,
  //   weekEndUnix: number | undefined,
  userRank: number,

  uid: string,
  gameId?: string,
  isAdmin?: boolean,
  isFinaleActive?: boolean,
  currentDayNumber?: number,
  borwseBy?: SelectedType,
  gameType?: gameTypes,
  teamId?: string,
  gameStarts?: number
) => {
  // const [taskAvailable, setTaskAvailable] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState<userTaskStatus>("PENDING");
  const [userCheckedIn, toggleCheckIn] = useState<boolean>(false);
  const [checkinOption, setCheckinOption] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [earnedFP, setEarnedFP] = useState<number>(0);
  const [unlocksNext, setUnlocksNext] = useState<number | undefined>();
  const [actAuthorUID, setActivityAuthorUID] = useState<string | undefined>();

  /**
   * lockingCrit
   * present - completed
   * future - locked / unlocked
   * past - locked / unlocked / completed
   */

  useEffect(() => {
    const getTaskState = async () => {
      if (isAdmin || (gameStarts && gameStarts > Date.now())) {
        setTaskStatus("UNLOCKED");
      } else if (task) {
        // finale && rank lock
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
        const dayEnd = dayStart + 24 * 60 * 60 * 1000 - 1;

        // all view tasks
        if (borwseBy === "all") {
          if (task.programDays && task.programDays.length) {
            // program not started
            if (typeof currentDayNumber !== "number") {
              const soonestDay = getSoonestDay(task.programDays);
              setUnlocksNext(
                (dayStartProgram ? dayStartProgram : dayStart) +
                  soonestDay * 24 * 60 * 60 * 1000
              );
              setTaskStatus("FUTURE_LOCKED");

              return;
            }

            const { diff, day } = getNearestProgramDay(
              task.programDays,
              currentDayNumber
            );

            if (day !== -1 && diff > 0) {
              setTaskStatus("FUTURE_LOCKED");
              setUnlocksNext(dayStart + diff * 24 * 60 * 60 * 1000);

              return;
            } else if (day === -1 && task.programDays) {
              setTaskStatus("PAST_LOCKED");
              return;
            }
          } else {
            setTaskStatus("PAST_LOCKED");
            return;
          }
        } else {
          // program future locking
          if (dayStartProgram && dayStartProgram > dayEnd) {
            setTaskStatus("FUTURE_LOCKED");
            setUnlocksNext(dayStartProgram);
            return;
          }

          // PAST LOCKED // check configuration
        }

        const actStartPeriod =
          task.taskFrequency === "weekly" && roundStartProgram
            ? roundStartProgram
            : dayStartProgram;

        const { acts, parentActs } = await getActivitiiesMain(
          {
            taskIds: [
              task.id,
              ...(task.parentTaskIds ? task.parentTaskIds : []),
            ],
            player: uid,
            reviewStatus: ["TRY_AGAIN", "NEED_MORE_DATA"],
            dS: `${actStartPeriod}`,
            game: gameId,
            teamId: teamId,
          },
          task.id,
          task.name,
          gameType
        );

        if (parentActs.length > 0) {
          setTaskStatus("PARENT_COMPLETED");
        } else {
          const { currentPts, selectedAct } = getTaskProgress(
            acts,
            task.fitPoints ? task.fitPoints : 0
            // uid
          );
          const { alreadyCheckedIn, canCheckIn } = canUserCheckin(
            acts,
            task.canCheckIn
          );

          // const currentFps = getFitPointsForActivity(acts);
          const delFps = (task.fitPoints ? task.fitPoints : 0) - currentPts;

          //  else

          //  else
          if (
            acts.length > 0 &&
            delFps === 0 &&
            selectedAct?.authorUID &&
            selectedAct.authorUID !== uid
          ) {
            setTaskStatus("COMPLETED_TEAM_MEMBER");
            setActivityAuthorUID(selectedAct?.authorUID);
            setEarnedFP(currentPts);
          } else if (acts.length > 0 && delFps === 0) {
            setTaskStatus("COMPLETED");
            setActivityAuthorUID(selectedAct?.authorUID);
            setEarnedFP(currentPts);
            // setUnlocksNext(
            //   task.taskFrequency === "weekly" ? weekEndUnix : dayEnd
            // );
          } else if (
            selectedAct?.reviewStatus === "PENDING" ||
            selectedAct?.reviewStatus === "IN_REVIEW"
          ) {
            setProgress(0);
            setEarnedFP(0);

            setTaskStatus("IN_REVIEW");

            setActivityAuthorUID(selectedAct?.authorUID);
          } else if (
            acts.length > 0 &&
            selectedAct?.authorUID &&
            selectedAct?.authorUID !== uid
          ) {
            const p = currentPts / (task.fitPoints ? task.fitPoints : 1);

            setProgress(p);
            setEarnedFP(currentPts);

            setTaskStatus("IMPROVEMENT_TEAM_MEMBER");

            setActivityAuthorUID(selectedAct?.authorUID);
          } else if (dayStartProgram && dayStartProgram < dayStart) {
            const p = currentPts / (task.fitPoints ? task.fitPoints : 1);

            setProgress(p);
            setEarnedFP(currentPts);

            setTaskStatus("PAST_LOCKED");
            return;
          } else if (acts.length > 0 && delFps) {
            setTaskStatus("IMPROVEMENT");

            const p = currentPts / (task.fitPoints ? task.fitPoints : 1);

            setEarnedFP(currentPts);
            setProgress(p);
            toggleCheckIn(alreadyCheckedIn);
            setCheckinOption(canCheckIn);
            setActivityAuthorUID(selectedAct?.authorUID);
          } else if (acts.length === 0) {
            setTaskStatus("UNLOCKED");
            setCheckinOption(canCheckIn);
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
    dayStartProgram,
    uid,
    gameId,
    currentDayNumber,
    borwseBy,
    roundStartProgram,
    gameType,
    teamId,
    gameStarts,
  ]);

  return {
    taskStatus,
    unlocksNext,
    progress,
    userCheckedIn,
    earnedFP,
    checkinOption,
    actAuthorUID,
  };
};
