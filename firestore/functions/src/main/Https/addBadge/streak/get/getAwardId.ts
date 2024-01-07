import { Achiever } from "../../../../../models/awards/interface";
import { getAppConfiguration } from "../../../../../models/config/getUtils";

export const getAwardId = async (type: "workoutStreak" | "nutritionStreak") => {
  const appConfiguration = await getAppConfiguration();
  if (appConfiguration?.kpiAwardIds && appConfiguration.kpiAwardIds[type]) {
    return appConfiguration.kpiAwardIds[type];
  }

  return undefined;
};

export const splitActiveInactiveAchievers = (achievers: Achiever[]) => {
  let toDevalidate: Achiever[] = [];
  let validAchievers: Achiever[] = [];
  if (achievers.length) {
    for (const achiever of achievers) {
      if (achiever.endTime && achiever.endTime < Date.now()) {
        toDevalidate.push(achiever);
      } else {
        validAchievers.push(achiever);
      }
    }
  }

  return {
    toDevalidate,
    validAchievers,
  };
};

export const removeDuplicateAchievers = (achievers: Achiever[]) => {
  if (achievers.length) {
    return {
      duplicateAchievers: achievers.slice(1, achievers.length - 1),
      mainAchiever: achievers[0],
    };
  }

  return {
    duplicateAchievers: [],
  };
};
