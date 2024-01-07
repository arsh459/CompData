import { Activity } from "@models/Activity/Activity";
import { MealTypes, NutritionFacts, SubTask, Task } from "@models/Tasks/Task";
import { create } from "zustand";
import {
  calculateTotalNutrition,
  getActivity,
  getIsLocked,
  getSubTasks,
  getSubTasksState,
  getTask,
} from "./utils";
import {
  saveNutritionActivity,
  updateNutritionActivity,
} from "@utils/post/createUtils";
import { getStbTaskStateSeprated } from "@utils/post/utils";
import { getTeamId } from "@utils/utills";
import { ParticipatingWithTeamObj } from "@models/User/User";

export interface SubTaskState {
  subTaskScore: number;
  subTaskQty: number;
  macros?: NutritionFacts;
  totalKcalConsumed?: number;
}

interface MealStoreValues {
  initializing: boolean;
  task?: Task;
  isLocked: boolean;
  activity?: Activity;
  subTasks: { [id: string]: SubTask };
  localFP: number;
  totalFP: number;
  subTaskState: { [id: string]: SubTaskState };
  currentNutritionFacts: NutritionFacts;
  currentKCal: number;
  modification: { [id: string]: number };
  changes: { [subTaskId: string]: boolean };
  dayRecommendationId?: string;
  overridedMealType?: MealTypes;
}

export type NutrientKey = keyof NutritionFacts;

export type mealTrackNav = "Progress" | "BACK" | "FAILED";

export interface MealStoreInterface extends MealStoreValues {
  onInit: (uid: string, taskId: string, selectedUnix: number) => void;
  dayStartUnix?: number;

  onUpdateQty: (
    subTaskId: string,
    step: number,
    type: "add" | "remove"
  ) => void;

  setChanges: (subTaskId: string) => void;
  setTask: (task: Task) => void;
  setSubTask: (subTask: SubTask) => void;

  onTrackMeal: (
    uid?: string,
    gameId?: string,
    participatingInGameWithTeam?: {
      [gameId: string]: ParticipatingWithTeamObj;
    }
  ) => Promise<mealTrackNav>;
  onReset: () => void;
  setDayRecommendationId: (newDayRecommendationId?: string) => void;
  setOverridedMealType: (newMealType?: MealTypes) => void;
}

const initialVal: MealStoreValues = {
  initializing: true,
  task: undefined,
  isLocked: false,
  activity: undefined,
  subTasks: {},
  localFP: 0,
  totalFP: 0,
  currentKCal: 0,
  subTaskState: {},
  modification: {},
  changes: {},
  currentNutritionFacts: {},
  dayRecommendationId: undefined,
};

export const useMealStore = create<MealStoreInterface>((set, get) => ({
  ...initialVal,

  onInit: async (uid: string, taskId: string, selectedUnix: number) => {
    const remoteVal: MealStoreValues = { ...initialVal };

    const task = await getTask(taskId); // fetching task

    if (task) {
      remoteVal.task = task; // saving task remote

      if (task?.subTasks?.length) {
        const subTasks = await getSubTasks(
          task.subTasks?.map((each) => each.subTaskId)
        ); // fetching subTasks

        let totalFP: number = 0;
        Object.values(subTasks).forEach(
          (subTask) => (totalFP += subTask.fp || 0)
        ); // calculating totalFP

        let changes: { [subTaskId: string]: boolean } = {};
        Object.keys(subTasks).forEach((item) => (changes[item] = false));

        remoteVal.subTasks = subTasks; // saving subTasks remote
        remoteVal.totalFP = totalFP; // saving totalFP remote
        remoteVal.changes = changes;
      }

      remoteVal.isLocked = getIsLocked(selectedUnix); // cheking is task locked

      const selectedAct = await getActivity(uid, taskId, selectedUnix); // fetching selected activity
      if (selectedAct) {
        remoteVal.activity = selectedAct; // saving activity remote

        // add macros
        remoteVal.currentNutritionFacts = selectedAct?.macros
          ? selectedAct.macros
          : {};

        // add kCal
        remoteVal.currentKCal = selectedAct.totalKcalConsumed
          ? selectedAct.totalKcalConsumed
          : 0;

        if (remoteVal.subTasks && selectedAct.subTaskQty) {
          const { subTasksState, localFP } = getSubTasksState(
            selectedAct.subTaskQty,
            remoteVal.subTasks
          ); // fetching subTasksState and calculating localFP

          remoteVal.subTaskState = subTasksState; // saving subTasksState remote
          remoteVal.localFP = localFP; // saving localFP remote
        }
      } else {
        // console.log("no prior value");
        // task.subTasks?.map((item) => console.log("item", item));
      }
    }

    set((state) => ({
      ...state,
      ...remoteVal,
      initializing: false,
      dayStartUnix: selectedUnix,
    })); // setting values of meal store
  },

  setTask: (task: Task) => {
    set((state) => ({
      ...state,
      task: { ...(state.task ? state.task : {}), ...task },
    }));
  },

  setSubTask: (subTask: SubTask) => {
    set((state) => ({
      ...state,
      subTasks: {
        ...state.subTasks,
        [subTask.id]: {
          ...(subTask.id ? { ...state.subTasks[subTask.id] } : {}),
          ...subTask,
        },
      },
    }));
  },

  setChanges: (subTaskId) => {
    set((state) => ({
      ...state,
      changes: { ...state.changes, [subTaskId]: true },
    }));
  },

  onUpdateQty: (subTaskId: string, step: number, type: "add" | "remove") => {
    set((state) => {
      const { subTaskState, subTasks, localFP, modification, ...rest } = state;

      const targetSubTask = subTasks[subTaskId];

      let targetState = subTaskState[subTaskId];

      let targetModification = modification[subTaskId];
      let remoteLocalFP = localFP || 0;

      if (type === "add") {
        if (targetState) {
          targetState.subTaskQty += step;
        } else {
          if (targetSubTask) {
            targetState = {
              subTaskQty: step,
              subTaskScore: targetSubTask.fp || 0,
              macros: targetSubTask.nutrientValues,
              totalKcalConsumed: targetSubTask.kcal,
            };
            remoteLocalFP += targetSubTask.fp || 0;
          }
        }
        targetModification = (targetModification || 0) + step;
      } else if (type === "remove" && targetState) {
        targetState.subTaskQty -= step;
        if (targetState.subTaskQty <= 0) {
          remoteLocalFP -= targetSubTask.fp || 0;
        }
        targetModification = (targetModification || 0) - step;
      }

      const remotesubTaskState = { ...subTaskState };
      delete remotesubTaskState[subTaskId];
      if (targetState && targetState.subTaskQty > 0) {
        remotesubTaskState[subTaskId] = targetState;
      }

      const remoteModification = { ...modification };
      delete remoteModification[subTaskId];
      if (targetModification !== 0) {
        remoteModification[subTaskId] = targetModification;
      }

      // takes subTaskState && gives you nutrientFacts. dal, chawal, salad -> dal - 2g protein, chawal - 5g carbs. dal - 1unit. chawal - 2 unit. -> {protein: 2g carbs -> 10g}

      const totalNutrition = calculateTotalNutrition(remotesubTaskState);

      return {
        ...rest,
        subTasks,
        localFP: remoteLocalFP,
        subTaskState: remotesubTaskState,
        modification: remoteModification,
        currentKCal: totalNutrition.kcal,
        currentNutritionFacts: {
          carbs: totalNutrition.carbs,
          protein: totalNutrition.protein,
          fats: totalNutrition.fats,
          fibre: totalNutrition.fiber,
        },
        // currentNutritionFacts: totalNutrition,
      };
    });
  },

  onTrackMeal: async (
    uid?: string,
    gameId?: string,
    participatingInGameWithTeam?: {
      [gameId: string]: ParticipatingWithTeamObj;
    }
  ) => {
    if (uid) {
      const { task, activity, subTaskState, dayStartUnix } = get();

      const { fps, macros, subTaskQty, subTaskScore, totalKcalConsumed } =
        getStbTaskStateSeprated(subTaskState);

      if (activity?.id) {
        console.log("activityId", activity.id);
        await updateNutritionActivity(
          uid,
          activity.id,
          fps,
          subTaskScore,
          subTaskQty,
          macros,
          totalKcalConsumed
        );

        return "Progress";
      } else if (!activity && task?.id && gameId) {
        const teamId = getTeamId(participatingInGameWithTeam, gameId);

        // if ()

        // check if in past
        const initNowDate = new Date();
        const dayStartToday = new Date(
          initNowDate.getFullYear(),
          initNowDate.getMonth(),
          initNowDate.getDate(),
          0,
          0,
          0,
          0
        ).getTime();
        let unixToUse = Date.now();
        let nav: mealTrackNav = "Progress";
        if (dayStartUnix && dayStartToday > dayStartUnix) {
          unixToUse = dayStartUnix;
          nav = "BACK";
          console.log("SAVING IN BACKDATE");
        }

        await saveNutritionActivity(
          gameId,
          uid,
          task.id,
          task.name ? task.name : "Diet Task",
          fps,
          subTaskScore,
          subTaskQty,
          macros,
          totalKcalConsumed,
          task.avatar,
          teamId,
          unixToUse
        );

        return nav;
      }
    }

    return "FAILED";
  },

  onReset: () => {
    set((state) => ({ ...state, ...initialVal }));
  },
  setDayRecommendationId: (newDayRecommendationId?: string) => {
    set((state) => ({ ...state, dayRecommendationId: newDayRecommendationId }));
  },
  setOverridedMealType: (newMealType?: MealTypes) => {
    set((state) => ({ ...state, overridedMealType: newMealType }));
  },
}));
