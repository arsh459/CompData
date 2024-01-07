import {
  AchievementPathData,
  // AchievementPathDataItem,
  // AchievementPathDataItemTypes,
  UserInterface,
  // pcosSymptoms,
  // transformationIconTypes,
  // workType,
} from "../../../../models/User/User";
// import { getWeightLossValue } from "../goal/createUserPath";
// import {
//   betterSleepObj,
//   customisedPlanObj,
//   icons,
//   lowerNormalCycleLength,
//   lowerNormalSleepTime,
//   normalWeightDelta,
//   pcosSymptomsObject,
//   upperNormalCycleLength,
//   upperNormalSleepTime,
// } from "./constants";
// import { v4 as uuid } from "uuid";
// import {
// createAchiverForGoal,
// getRoadmapMonths
// } from "./utils";
import { getMonthsNeeded, handleIncMonth } from "./createRoadmapUtils";
import { createAchievementPath, needsMonthInc } from "./createAchievementPath";
import { format } from "date-fns";
import { getProgressValueForTargetStatus } from "../../updateRoadmap/main/handleProgressUpdate";

export const genrateMonthsData = async (
  user?: UserInterface,
): Promise<AchievementPathData[]> => {
  const data: AchievementPathData[] = [];

  // const today = getTodayMidnightDate();
  // const todayMonth = today.getMonth();

  const transformationGoal = user?.thingsToWorkOn;
  if (transformationGoal) {
    // let stTime = Date.now();
    // console.log("");
    // console.log("");
    const monthIncNeeded = needsMonthInc();
    const interim = getMonthsNeeded(transformationGoal);
    const { totalMonths, updatedMonthObj } = handleIncMonth(
      interim.totalMonths,
      interim.monthsObj,
      monthIncNeeded,
    );

    // console.log("");
    // console.log("");
    // console.log("");
    // console.log("");
    // console.log("");
    // console.log("");

    const achievementPaths: AchievementPathData[] = [];
    for (let i: number = 0; i < totalMonths; i++) {
      // // console.log("monthsObj[i]", monthsObj[i]);

      if (updatedMonthObj[i]) {
        console.log();
        const achievementPath = createAchievementPath(
          updatedMonthObj[i],
          false,
          totalMonths + (monthIncNeeded ? 1 : 0),
        );
        achievementPaths.push(achievementPath);
        // console.log("monthsObj[i]", i, monthsObj[i]);
        // console.log("achievementPath", achievementPath);
        // console.log("");
      } else {
        // console.log("no work", i);
        // console.log("");
      }
    }

    // make x month plan
    // month 1
    // month 2
    // month 3

    return achievementPaths;

    // throw new Error("hi");
    // loop over total months
    // const { totalMonths } = getMonthsNeeded(transformationGoal);
    // for (let i: number = 0; i < totalMonths; i++) {
    //   // monthObj[i] = 'weightloss'
    // }
    // roadmapMonths.forEach(async (month, index) => {
    // const monthCount = index + 1;

    // const monthData = await getMonthData(
    //   month.title,
    //   new Date(today.setMonth(todayMonth + index)).getTime(),
    //   new Date(today.setMonth(todayMonth + monthCount)).getTime(),
    //   monthCount,
    //   user,
    //   month.types,
    // );

    // data.push(monthData);
    // });

    // return data;
  }

  return data;

  // const roadmapMonths = getRoadmapMonths(user);

  // console.log("roadmapMonths", roadmapMonths);
};

export const handleRoadmapUpdateToUser = async (
  user: UserInterface,
  monthItems: AchievementPathData[],
) => {
  let completedTargets: number = 0;
  for (const month of monthItems) {
    console.log("");
    console.log("");
    console.log("");
    console.log(
      "monthStart",
      month.startTime ? format(new Date(month.startTime), "dd-MMM-yyyy") : "",
    );

    if (month.items) {
      for (const monthItem of month.items) {
        const st = await getProgressValueForTargetStatus(
          user,
          monthItem,
          month.startTime,
          month.endTime,
        );

        if (st) {
          monthItem.status = st.status;
        }

        if (st?.status === "DONE") {
          completedTargets++;
        }

        console.log(
          `type:${monthItem.type} | target:${monthItem.target} | targetCount:${monthItem.countNeeded} | comp:${monthItem.comparisonType} | status:${st?.status} | progress:${st?.progressText} | completed:${completedTargets}`,
        );
        console.log();
      }
    }
  }

  return {
    monthItems,
    completedTargets,
  };
};

// const getMonthData = async (
//   title: string,
//   startTime: number,
//   endTime: number,
//   monthCount: number,
//   user?: UserInterface,
//   types?: AchievementPathDataItemTypes[],
// ): Promise<AchievementPathData> => {
//   const data: AchievementPathData = {
//     id: uuid(),
//     startTime,
//     endTime,
//     title: { text: title },
//   };

//   if (user && types) {
//     const items = getMonthDataItems(user, types, monthCount);
//     if (items.length) {
//       data.items = items;
//     }

//     const itemTypes: AchievementPathDataItemTypes[] = [];
//     items.forEach((each) => {
//       if (each.target && each.comparisonType && each.type) {
//         itemTypes.push(each.type);
//       }
//     });
//     await createAchiverForGoal(user, startTime, endTime, itemTypes);
//   }

//   return data;
// };

// const getMonthDataItems = (
//   user: UserInterface,
//   types: AchievementPathDataItemTypes[],
//   monthCount: number,
// ): AchievementPathDataItem[] => {
//   const items: AchievementPathDataItem[] = [];

//   for (const type of types) {
//     const item = getMonthDataItem(user, type, monthCount);
//     if (item) {
//       items.push(item);
//     }
//   }

//   return items;
// };

// const getMonthDataItem = (
//   user: UserInterface,
//   type: AchievementPathDataItemTypes,
//   monthCount: number,
// ): AchievementPathDataItem | undefined => {
//   switch (type) {
//     case "customised_plan":
//       return customisedPlanObj;
//     case "acne":
//     case "facial_and_excess_hair":
//     case "bad_mood":
//     case "fatigue":
//       return addPcosSymptomIntervention(user, type);
//     case "weight":
//       return addWeightIntervention(user, monthCount);
//     case "sleep":
//       return addSleepQualityIntervention(user.sleepQuality);
//     case "cycleLength":
//       return addIrregularCycleIntervention(
//         user.periodTrackerObj?.inputCycleLength,
//       );
//     default:
//       return undefined;
//   }
// };

// const addPcosSymptomIntervention = (
//   user: UserInterface,
//   type: AchievementPathDataItemTypes,
// ): AchievementPathDataItem | undefined => {
//   const symptom = type as pcosSymptoms;
//   if (user.pcosSymptoms?.includes(symptom)) {
//     return pcosSymptomsObject[symptom];
//   }

//   return undefined;
// };

// const addWeightIntervention = (
//   user: UserInterface,
//   monthCount: number,
// ): AchievementPathDataItem => {
//   const { weightDelta, weightString, action } = getWeightLossValue(user);

//   const item: AchievementPathDataItem = {
//     icon: icons.weightChange,
//     type: "weight",
//     text: "Keep fit",
//   };

//   if (weightDelta < normalWeightDelta) {
//     if (monthCount === 1) {
//       item.text = `${weightString} in month 1`;
//       const obj = getTargetWeight(action, weightDelta, user.weight);
//       if (obj) {
//         item.target = obj.target;
//         item.comparisonType = obj.comparisonType;
//       }
//     } else if (monthCount > 1) {
//       item.text = "Convert fat to healthy muscle";
//     }
//   } else if (action !== "unknown") {
//     item.text = `${action} 2 kgs a month`;
//     const obj = getTargetWeight(action, 2, user.weight);
//     if (obj) {
//       item.target = obj.target;
//       item.comparisonType = obj.comparisonType;
//     }
//   }

//   return item;
// };

// const addIrregularCycleIntervention = (
//   inputCycleLength?: number,
// ): AchievementPathDataItem | undefined => {
//   if (
//     inputCycleLength &&
//     (inputCycleLength > upperNormalCycleLength ||
//       inputCycleLength < lowerNormalCycleLength)
//   ) {
//     const item: AchievementPathDataItem = {
//       icon: icons.cycleRegulation,
//       type: "cycleLength",
//       text: "",
//     };

//     if (inputCycleLength > upperNormalCycleLength && inputCycleLength <= 45) {
//       item.comparisonType = "<=";
//       item.target = upperNormalCycleLength;
//       item.text = "1 month for regularisation";
//     } else if (
//       inputCycleLength < lowerNormalCycleLength &&
//       inputCycleLength > 15
//     ) {
//       item.comparisonType = ">=";
//       item.target = lowerNormalCycleLength;
//       item.text = "1 month for regularisation";
//     } else if (inputCycleLength > 45 && inputCycleLength <= 60) {
//       item.comparisonType = "<=";
//       item.text = "1-3 month for regularisation";
//       item.target =
//         inputCycleLength - (inputCycleLength - upperNormalCycleLength) / 3;
//     } else if (inputCycleLength <= 15) {
//       item.comparisonType = ">=";
//       item.text = "1-3 month for regularisation";
//       item.target =
//         inputCycleLength + (lowerNormalCycleLength - inputCycleLength) / 3;
//     } else {
//       item.text = "3-6 month for regularisation";
//     }

//     return item;
//   }
//   return undefined;
// };

// const addSleepQualityIntervention = (
//   sleepQuality?: number,
// ): AchievementPathDataItem | undefined => {
//   if (
//     sleepQuality &&
//     (sleepQuality < lowerNormalSleepTime || sleepQuality > upperNormalSleepTime)
//   ) {
//     return betterSleepObj;
//   }
//   return undefined;
// };

// const getTargetWeight = (
//   action: "unknown" | "gain" | "lose",
//   weightDelta: number,
//   weight?: number,
// ): { target: number; comparisonType: "<=" | ">=" } | undefined => {
//   if (weight) {
//     return action === "gain"
//       ? { target: weight + weightDelta, comparisonType: ">=" }
//       : action === "lose"
//       ? { target: weight - weightDelta, comparisonType: "<=" }
//       : undefined;
//   }

//   return undefined;
// };

export const getTodayMidnightDate = (): Date => {
  const initNowDate = new Date();

  return new Date(
    initNowDate.getFullYear(),
    initNowDate.getMonth(),
    initNowDate.getDate(),
    0,
    0,
    0,
    0,
  );
};
