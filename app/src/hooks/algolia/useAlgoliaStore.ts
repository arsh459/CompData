import { AlgoliaAppSearch, algoliaType } from "@models/AppSearch/interface";
import { create } from "zustand";
import {
  algoliaFetch,
  createRecommendedFuse,
  dietFetch,
  fuseSearch,
  getTagQuery,
} from "./utils";
import { MealTypes, Task } from "@models/Tasks/Task";
import Fuse, { FuseResult } from "fuse.js";

const debounceDelay = 300;

export type searchActionType = "typing" | "fetching" | "none";
export type indexName = "appsearch" | "dietsearch";

interface AlgoliaState {
  action: searchActionType;
  query: string;
  page: number;
  data: AlgoliaAppSearch[];
  filter?: algoliaType;
  index: indexName;
  recommended?: boolean;
  recommendedFuse?: Fuse<Task>;
  fuseData: FuseResult<Task>[];
  baseTaskData: Task[];
  mealType?: MealTypes;
  debounceTimer: ReturnType<typeof setTimeout> | null;
  overridedMealType?: MealTypes;
}

interface AlgoliaAction {
  onFetch: () => Promise<void>;
  onQueryChange: (val: string, index: indexName, meal?: MealTypes) => void;
  onFilterChange: (val?: algoliaType, noSearchUpdate?: boolean) => void;
  onMealUpdate: (val?: MealTypes) => void;
  onNext: () => Promise<void>;
  onReset: () => void;
  toggleRecommended: (newVal: boolean) => void;
  // onInitDietIndex: (mealType: MealTypes) => void;
  // onInitAppSearch: () => void;
  changeIndex: (
    newIndex: indexName,
    meal?: MealTypes,
    badgeId?: string
  ) => Promise<void>;
  setOverridedMealType: (newMealType?: MealTypes) => void;
}

const intialState: AlgoliaState = {
  filter: undefined,
  // fetching: false,
  index: "appsearch",
  recommended: false,
  action: "none",
  query: "",
  data: [],
  fuseData: [],
  baseTaskData: [],
  page: 0,
  debounceTimer: null,
  overridedMealType: undefined,
};

export const useAlgoliaStore = create<AlgoliaState & AlgoliaAction>(
  (set, get) => ({
    ...intialState,

    setOverridedMealType: (newMealType?: MealTypes) => {
      set((state) => ({ ...state, overridedMealType: newMealType }));
    },

    toggleRecommended: (newVal: boolean) => {
      set((prev) => ({ ...prev, recommended: newVal }));
    },

    onFetch: async () => {
      const { query, filter, index, mealType } = get();

      if (index === "appsearch") {
        const res = await algoliaFetch(query, filter, 0);
        set((state) => ({ ...state, data: res, page: 0 }));
      } else {
        const res = await dietFetch(query, mealType, 0);
        set((state) => ({ ...state, data: res, page: 0 }));
      }

      setTimeout(() => set((state) => ({ ...state, action: "none" })), 1000);
    },

    changeIndex: async (
      newIndex: indexName,
      meal?: MealTypes,
      badgeId?: string
    ) => {
      if (newIndex === "appsearch") {
        set((state) => ({
          ...state,
          index: "appsearch",
          query: "",
          filter: "all",
          recommended: false,
        }));
      } else if (badgeId && newIndex === "dietsearch") {
        const { fuse, tasks } = await createRecommendedFuse(badgeId, meal);

        set((state) => ({
          ...state,
          query: "",
          recommendedFuse: fuse,
          mealType: meal,
          baseTaskData: tasks,
          recommended: true,
          index: "dietsearch",
        }));
      } else {
        set((state) => ({
          ...state,
          query: "",
          mealType: meal,
          recommended: false,
          index: "dietsearch",
        }));
      }
    },

    onQueryChange: (val: string, index: indexName, meal?: MealTypes) => {
      const state = get();

      // console.log("meal 2", meal);

      if (index !== state.index) {
        state.changeIndex(index, meal);
      }

      if (meal !== state.mealType) {
        set((state) => ({ ...state, mealType: meal }));
      }

      if (index === "dietsearch" && state.recommended) {
        // console.log("searching", val);
        set((state) => ({
          ...state,
          query: val,
          action: "typing",
        }));

        if (val === "") {
          set((state) => ({
            ...state,
            fuseData: state.baseTaskData.map((taskItem, i) => ({
              item: taskItem,
              refIndex: i,
            })),
            action: "none",
          }));
          return;
        } else {
          const results = fuseSearch(state.query, state.recommendedFuse);
          set((state) => ({
            ...state,
            fuseData: results,
            action: "none",
          }));

          // console.log("results", results.length);
          return;
        }
      }

      if (state.debounceTimer) {
        clearTimeout(state.debounceTimer);
      }

      const timer = setTimeout(state.onFetch, debounceDelay);

      set((state) => ({
        ...state,
        query: val,
        action: "typing",
        debounceTimer: timer,
      }));
    },

    onFilterChange: (val?: algoliaType, noSearchUpdate?: boolean) => {
      if (val === "all") {
        set((state) => ({
          ...state,
          filter: val,
        }));
      } else {
        const state = get();

        // if (state.)

        set((state) => ({
          ...state,
          filter: val,
          action: "fetching",
          query: noSearchUpdate ? state.query : getTagQuery(val, state.query),
        }));

        if (state.debounceTimer) {
          clearTimeout(state.debounceTimer);
        }

        set((state) => ({
          ...state,
          debounceTimer: setTimeout(state.onFetch, debounceDelay),
        }));
      }
    },

    onMealUpdate: (newMeal?: MealTypes) => {
      set((state) => ({ ...state, mealType: newMeal }));
    },

    onNext: async () => {
      const { query, page, filter, index, mealType } = get();
      if (index === "appsearch") {
        const res = await algoliaFetch(query, filter, page + 1);

        set((state) => ({
          ...state,
          page: page + 1,
          data: [...state.data, ...res],
        }));
      } else {
        const res = await dietFetch(query, mealType, page + 1);

        set((state) => ({
          ...state,
          page: page + 1,
          data: [...state.data, ...res],
        }));
      }
    },

    onReset: () => {
      set((state) => ({ ...state, ...intialState }));
    },
  })
);
