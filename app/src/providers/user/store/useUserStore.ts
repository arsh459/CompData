import { create } from "zustand";
import { UserInterface, dayRecommendation } from "@models/User/User";
import {
  RoundInterface,
  UserRankV2,
  dailyReward,
} from "@models/Rounds/interface";
import { dailyRewardUserState } from "@hooks/rounds/useDailyRewardProgress";
import { LevelInterface } from "@models/Level/interface";
import { controlsTypes } from "@components/Swiper/Controls";

export interface tkProgressInterface {
  progressNumber: number;
  done: number;
  total: number;
}

export interface individualTaskProgress {
  done: number;
  target: number;
}

export interface taskProgressInterface {
  [taskId: string]: individualTaskProgress;
}

export interface dayTaskProgress {
  [day: string]: taskProgressInterface;
}

interface UserStore {
  user?: UserInterface;
  setUser: (newUser: UserInterface) => void;

  myRank?: UserRankV2;
  setUserRank: (newUserRank: UserRankV2) => void;

  // recs
  recCache: { [id: string]: dayRecommendation };
  progress: { [badgeIdDate: string]: tkProgressInterface };
  challengeDayProgress: dayTaskProgress;
  addToRecCache: (rec: dayRecommendation) => void;
  addToRecsCache: (rec: { [badgeKey: string]: dayRecommendation }) => void;
  addChallengeDayProgress: (
    day: string,
    taskId: string,
    value: number,
    target: number
  ) => void;

  levelsCache: { [id: string]: LevelInterface };
  levelsArray: LevelInterface[];
  selectedLevelNumString: string;
  updateLevelNum: (type: controlsTypes) => void;
  updateLevelIndex: (newIndex: number) => void;
  setLevelsCache: (
    newLevel: { [id: string]: LevelInterface },
    newLevelsArray: LevelInterface[]
  ) => void;
  goToMyLeague: () => number;

  currentRound?: RoundInterface;
  setCurrentRound: (newRound: RoundInterface) => void;

  dailyRewardStatus: dailyRewardUserState;
  setDailyRewardStatus: (newState: dailyRewardUserState) => void;
  dailyRewardObjs: { [date: string]: dailyReward };
  setDailyReward: (newDailyReward: dailyReward) => void;
}

// progressMap: {[`${badgeId}-${date}`: string]: number}

export const useUserStore = create<UserStore>((set, get) => ({
  user: undefined,
  recCache: {},
  progress: {},
  challengeDayProgress: {},
  setUserRank: (myUserRank?: UserRankV2) => {
    set((prev) => ({ ...prev, myRank: myUserRank }));
  },

  addChallengeDayProgress: (
    day: string,
    taskId: string,
    value: number,
    target: number
  ) => {
    set((state) => ({
      ...state,
      challengeDayProgress: {
        ...state.challengeDayProgress,
        [day]: {
          ...(state.challengeDayProgress[day]
            ? state.challengeDayProgress[day]
            : {}),
          [taskId]: {
            done: value,
            target: target,
          },
        },
      },
    }));
  },

  addToRecCache: (rec: dayRecommendation) => {
    let progressNumber = 0;
    let done = 0;
    let total = 1;

    if (typeof rec.doneFP === "number") {
      progressNumber = rec.doneFP / (rec.taskFP ? rec.taskFP : 1);
      done = rec.doneFP ? rec.doneFP : 0;
      total = rec.taskFP ? rec.taskFP : 1;
    }

    set((state) => ({
      ...state,
      recCache: {
        ...state.recCache,
        [`${rec.badgeId}-${rec.date}`]: rec,
      },
      progress: {
        ...state.progress,
        [`${rec.badgeId}-${rec.date}`]: {
          progressNumber,
          done,
          total,
        },
      },
    }));
  },

  addToRecsCache(recsObj) {
    const updatedProgressValues: { [badgeKey: string]: tkProgressInterface } =
      {};
    Object.keys(recsObj).map((item) => {
      const rec = recsObj[item];
      if (rec && rec.doneFP) {
        const progressNumber = rec.doneFP / (rec.taskFP ? rec.taskFP : 1);
        const done = rec.doneFP ? rec.doneFP : 0;
        const total = rec.taskFP ? rec.taskFP : 1;

        updatedProgressValues[item] = {
          progressNumber,
          done,
          total,
        };
      }
    });

    set((state) => ({
      ...state,
      recCache: {
        ...state.recCache,
        ...recsObj,
      },
      progress: {
        ...state.progress,
        ...updatedProgressValues,
      },
    }));
  },

  levelsCache: {},
  levelsArray: [],
  selectedLevelNumString: "1",

  updateLevelNum: (type: controlsTypes) => {
    const { selectedLevelNumString, levelsArray } = get();
    const selectedLevelNum = parseInt(selectedLevelNumString);

    if (type === "next" && selectedLevelNum < levelsArray.length) {
      set((state) => ({
        ...state,
        selectedLevelNumString: `${selectedLevelNum + 1}`,
      }));
    } else if (type === "prev" && selectedLevelNum > 1) {
      set((state) => ({
        ...state,
        selectedLevelNumString: `${selectedLevelNum - 1}`,
      }));
    }
  },
  updateLevelIndex(newIndex) {
    const { levelsArray } = get();
    const updatedItem = levelsArray[newIndex];
    if (updatedItem) {
      set((state) => ({
        ...state,
        selectedLevelNumString: `${updatedItem.lvlNumber}`,
      }));
    }
  },

  goToMyLeague: () => {
    // console.log("goToMyLeague");
    const { user } = get();
    const usrLevel = user?.userLevelV2 ? user?.userLevelV2 : 1;
    // console.log("goToMyLeague", usrLevel);
    set((state) => ({ ...state, selectedLevelNumString: `${usrLevel}` }));

    return usrLevel - 1;
  },

  setLevelsCache: (
    lvlObj: { [lvlNum: string]: LevelInterface },
    newLevelsArray: LevelInterface[]
  ) => {
    set((state) => ({
      ...state,
      levelsArray: newLevelsArray,
      levelsCache: { ...state.levelsCache, ...lvlObj },
    }));
  },

  setCurrentRound: (newRound: RoundInterface) =>
    set((state) => ({
      ...state,
      currentRound: newRound,
    })),

  // daily reward status
  dailyRewardStatus: "unknown",
  setDailyRewardStatus: (newStatus: dailyRewardUserState) =>
    set((state) => ({ ...state, dailyRewardStatus: newStatus })),

  // daily reward cache
  dailyRewardObjs: {},

  setDailyReward: (newDailyReward: dailyReward) => {
    set((state) => ({
      ...state,
      dailyRewardObjs: {
        ...state.dailyRewardObjs,
        [newDailyReward.date]: newDailyReward,
      },
    }));
  },

  setUser: (newUser: UserInterface) =>
    set((state) => ({
      ...state,
      user: newUser,
      // init selected level
      selectedLevelNumString: newUser?.userLevelV2
        ? `${newUser.userLevelV2}`
        : "1",
    })),
}));
