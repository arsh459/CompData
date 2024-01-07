import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { Activity } from "@models/Activity/Activity";
import { startStepsTask, switchStepsTask } from "./changeStepsTask";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { getTeamId } from "@utils/utills";
import firestore from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export type stepTaskType = "CAN_DO" | "SWITCH_TASK" | "ACTIVE" | "PENDING";

export const useStepActivities = (selectedDay: number, taskIdToAdd: string) => {
  const { state } = useAuthContext();
  const { task } = useWorkoutTask(taskIdToAdd);

  const [activeTaskIds, setActiveTaskIds] = useState<{
    [taskId: string]: Activity;
  }>({});
  const [uiState, setTaskState] = useState<stepTaskType>("PENDING");
  const [selectedAct, setSelectedAct] = useState<Activity>();
  const [refresh, setRefresh] = useState<number>(0);

  const participatingInGameWithTeam = useUserStore(
    ({ user }) => user?.participatingInGameWithTeam,
    shallow
  );

  useEffect(() => {
    if (state.uid) {
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

      const list = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("activities")
        .where("createdOn", ">=", dayStart)
        .where("createdOn", "<=", now.getTime())
        .where("stepsActive", "==", true)
        .onSnapshot((docs) => {
          const userTaskActs: { [taskId: string]: Activity } = {};
          const stepsTasksToday: { [taskId: string]: Activity } = {};

          if (docs) {
            for (const doc of docs.docs) {
              const remoteDoc = doc.data() as Activity | null;

              if (
                remoteDoc &&
                remoteDoc?.stepsActive &&
                remoteDoc.taskId &&
                remoteDoc.taskDay === selectedDay
              ) {
                userTaskActs[remoteDoc.taskId] = remoteDoc;
              }

              if (remoteDoc && remoteDoc.stepsActive && remoteDoc.taskId) {
                stepsTasksToday[remoteDoc.taskId] = remoteDoc;
              }
            }
          }

          const stepState: stepTaskType = userTaskActs[taskIdToAdd]
            ? "ACTIVE"
            : !userTaskActs[taskIdToAdd] && Object.keys(stepsTasksToday).length
            ? "SWITCH_TASK"
            : "CAN_DO";

          setTaskState(stepState);
          setSelectedAct(
            userTaskActs[taskIdToAdd] ? userTaskActs[taskIdToAdd] : undefined
          );
          setActiveTaskIds(stepsTasksToday);
        });

      return () => {
        list();
      };
    }
  }, [state.uid, selectedDay, refresh, taskIdToAdd]);

  const onStartWorkout = async () => {
    if (uiState === "CAN_DO" && task && state.uid) {
      const teamId = getTeamId(participatingInGameWithTeam);
      await startStepsTask(task, state.gameId, teamId, state.uid, selectedDay);
      setRefresh((p) => p + 1);
    } else if (uiState === "SWITCH_TASK" && task && state.uid) {
      const teamId = getTeamId(participatingInGameWithTeam);
      await switchStepsTask(
        activeTaskIds,
        state.uid,
        task,
        state.gameId,
        teamId,
        selectedDay
      );
      setRefresh((p) => p + 1);
    }
  };

  return {
    uiState,
    onStartWorkout,
    selectedAct,
  };
};
