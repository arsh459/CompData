import { Activity } from "@models/Activity/Activity";
import { gameSprintProgress } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";
import crashlytics from "@react-native-firebase/crashlytics";

export const getInProgressTasks = async (uid: string, taskId?: string) => {
  try {
    if (taskId && uid) {
      const pendingTasks = await firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .where("taskId", "==", taskId)
        .where("state", "==", "PENDING")
        .get();

      if (pendingTasks.docs.length) {
        return true;
      }
    }
  } catch (error: any) {
    crashlytics().recordError(error);
  }

  return false;
};

export const getUserFP = (
  gameId: string,
  currentSprintId?: string,
  sbProgress?: gameSprintProgress
): number => {
  if (
    sbProgress &&
    currentSprintId &&
    sbProgress[gameId] &&
    sbProgress[gameId][currentSprintId] &&
    sbProgress[gameId][currentSprintId].fit_points
  ) {
    // @ts-ignore
    return sbProgress[gameId][currentSprintId].fit_points;
  }

  return 0;
};

export const getUserAttempts = (
  gameId: string,
  sbProgress?: gameSprintProgress
): number => {
  if (sbProgress && sbProgress[gameId]) {
    return Object.keys(sbProgress[gameId]).length;
  }

  return 0;
};

export const hasUserDoneInSprint = (
  gameId: string,
  currentSprintId?: string,
  sbProgress?: gameSprintProgress
): boolean => {
  if (
    sbProgress &&
    currentSprintId &&
    sbProgress[gameId] &&
    sbProgress[gameId][currentSprintId] &&
    sbProgress[gameId][currentSprintId].fit_points
  ) {
    return true;
  }

  return false;
};

export const hasUserDoneBefore = (
  gameId: string,

  sbProgress?: gameSprintProgress
): boolean => {
  if (
    sbProgress &&
    sbProgress[gameId] &&
    Object.keys(sbProgress[gameId]).length
  ) {
    return true;
  }

  return false;
};

export const isStepsTaskActive = (userActs: Activity[]) => {
  for (const act of userActs) {
    const created = act.createdOn;
    if (
      created &&
      act.stepsActive &&
      format(new Date(created), "yyyy-MM-dd") ===
        format(new Date(), "yyyy-MM-dd")
    ) {
      return true;
    }
  }

  return false;
};
