import { MealTypes, SubTask, Task } from "@models/Tasks/Task";
import { gptPrompts } from "@models/config/config";
import {
  getNutrientsFromGpt,
  retryCalls,
} from "@modules/AddNewItemLoading/utils/gpt";
import { useUserStore } from "@providers/user/store/useUserStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { create } from "zustand";
import * as Sentry from "@sentry/react-native";

export type CookingType = "At_Home" | "At_Restaurant";
export const cookingTypeArr: CookingType[] = ["At_Home", "At_Restaurant"];
export type FetchingStatus = "fetching" | "done" | "error";
export interface generatedTask {
  taskObj: Task;
  subTaskArray: SubTask[];
}

export interface AddNewItem {
  queryItem: string;

  mealType?: MealTypes;
  setMealType: (newMealType: MealTypes) => void;
  setQueryItem: (query: string) => void;

  cookingType: CookingType;
  setCookingType: (cookingType: CookingType) => void;

  fetchingStatus: FetchingStatus;
  setFetchingStatus: (fetchStatus: FetchingStatus) => void;

  genTask?: Task;
  genSubTasks?: SubTask[];

  onInit: (queryItem: string, mealType?: MealTypes) => void;
  onAddItem: (apiKey: string, gptPrompt?: gptPrompts) => Promise<void>;
}
const useAddNewItem = create<AddNewItem>((set, get) => ({
  queryItem: "",
  mealType: undefined,
  cookingType: "At_Home",
  fetchingStatus: "fetching",
  genTask: undefined,
  genSubTasks: undefined,

  setMealType: (newMealType: MealTypes) => {
    set((state) => ({ ...state, mealType: newMealType }));
  },

  setCookingType: (cookingType: CookingType) => {
    set((state) => ({ ...state, cookingType: cookingType }));
  },

  setQueryItem: (query) => {
    set((state) => ({ ...state, queryItem: query ? query : "" }));
  },
  onInit: (queryItem: string, mealType?: MealTypes) => {
    set((state) => ({
      ...state,
      queryItem: queryItem ? queryItem : "",
      mealType: mealType ? mealType : "Breakfast",
    }));
  },
  setFetchingStatus: (fetchStatus: FetchingStatus) => {
    set((state) => ({ ...state, fetchingStatus: fetchStatus }));
  },
  onAddItem: async (apiKey: string, gptPrompt?: gptPrompts) => {
    const uid = useUserStore.getState().user?.uid;

    const { queryItem, cookingType, mealType } = get();
    weEventTrack("taskGenerationRequest", {
      queryItem,
      cookingType,
      mealType: mealType ? mealType : "na",
    });

    console.log(
      `queryItem:${queryItem} | cookingType:${cookingType} | mealType:${mealType}`
    );
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "info",
      message: `queryItem:${queryItem} | cookingType:${cookingType} | mealType:${mealType}`,
    });

    if (uid) {
      set((state) => ({
        ...state,
        fetchingStatus: "fetching",
      }));

      const data = await getNutrientsFromGpt(
        queryItem,
        cookingType,
        apiKey,
        uid,
        gptPrompt ? gptPrompt.type : "na",
        gptPrompt && gptPrompt.model,
        gptPrompt,
        mealType
      );

      if (data) {
        set((state) => ({
          ...state,
          fetchingStatus: "done",
          genTask: data.taskObj,
          genSubTasks: data.subTaskArray,
        }));
        weEventTrack("taskGenerated", {
          taskId: data.taskObj.id,
        });
      } else {
        const dataV2 = await retryCalls(async () => {
          return await getNutrientsFromGpt(
            queryItem,
            cookingType,
            apiKey,
            uid,
            gptPrompt ? gptPrompt.type : "na",
            "gpt-4",
            gptPrompt,
            mealType
          );
        }, 2);
        if (dataV2) {
          set((state) => ({
            ...state,
            fetchingStatus: "done",
            genTask: dataV2.taskObj,
            genSubTasks: dataV2.subTaskArray,
          }));
        } else {
          set((state) => ({
            ...state,
            fetchingStatus: "error",
          }));
        }
      }
    }
  },
}));

export default useAddNewItem;
