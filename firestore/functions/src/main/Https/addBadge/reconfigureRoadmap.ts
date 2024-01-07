import {
  AchievementPathDataItemTypes,
  UserInterface,
  workType,
} from "../../../models/User/User";
import { getAllAchievmentPaths } from "../../../models/User/roadmap";
import { workOrder } from "./goal/constants";
import {
  getCurrentUserEstimatedCycleLength,
  getCurrentUserEstimatedPeriodLength,
  getWeightLossValue,
} from "./goal/createUserPath";

export const reconfigureRoadmap = async (userObj: UserInterface) => {
  const allAchievementPaths = await getAllAchievmentPaths(userObj.uid, "asc");

  //   console.log("all", allAchievementPaths);
  const values: Partial<Record<AchievementPathDataItemTypes, number>> = {};
  for (const path of allAchievementPaths) {
    if (path.items) {
      for (const pathEl of path.items) {
        if (pathEl.type && pathEl.comparisonType) {
          console.log();
          console.log(
            "type:",
            pathEl.type,
            " goal:",
            pathEl.text,
            " comparison:",
            pathEl.comparisonType,
            " target:",
            pathEl.target,
            " count:",
            pathEl.countNeeded,
            " status:",
            pathEl.status,
          );

          if (pathEl.comparisonType === "increase") {
            if (
              typeof pathEl.target === "number" &&
              //@ts-ignore
              (!values[pathEl.type] || values[pathEl.type] < pathEl.target)
            ) {
              values[pathEl.type] = pathEl.target;
            }
          } else if (pathEl.comparisonType === "reduce") {
            if (
              typeof pathEl.target === "number" &&
              //@ts-ignore
              (!values[pathEl.type] || values[pathEl.type] > pathEl.target)
            ) {
              values[pathEl.type] = pathEl.target;
            }
          } else if (pathEl.comparisonType === "maintain") {
            if (
              typeof pathEl.countNeeded === "number" &&
              //@ts-ignore
              (!values[pathEl.type] || values[pathEl.type] < pathEl.countNeeded)
            ) {
              values[pathEl.type] = pathEl.target;
            }
          } else {
            if (
              typeof pathEl.target === "number" &&
              (values[pathEl.type] || values[pathEl.type] === pathEl.target)
            ) {
              values[pathEl.type] = pathEl.target;
            }
          }
        }
      }
    }
  }

  console.log("values", values);
  const achievementMap = await createWorkFromGoals(userObj, values);
  return {
    totalGoal: reorderThingsToDoArray(achievementMap),
    allAchievementPaths,
  };
};

export const createWorkFromGoals = async (
  user: UserInterface,
  values: Partial<Record<AchievementPathDataItemTypes, number>>,
) => {
  const thingsToWordOn: Partial<
    Record<AchievementPathDataItemTypes, workType>
  > = {};
  for (const key of Object.keys(values)) {
    const keyStr = key as AchievementPathDataItemTypes;
    const value = values[keyStr];

    if (value)
      if (keyStr === "weight") {
        const { weightString, action, weightDelta, target } =
          getWeightLossValue(user, value);
        thingsToWordOn[keyStr] = {
          text: weightString,
          delta: weightDelta,
          target,
          countNeeded: 1,
          type: "weight",
          action: action === "lose" ? "reduce" : "increase",
        };
      } else if (keyStr === "cycleLength") {
        const estimatedCycleLength = await getCurrentUserEstimatedCycleLength(
          user,
        );

        if (estimatedCycleLength)
          thingsToWordOn[keyStr] = {
            text: "Regularise your cycle to 28 days",
            delta: Math.abs(estimatedCycleLength - 28),
            type: "cycleLength",
            target: value,
            action: "reduce",
            countNeeded: 1,
          };
      } else if (keyStr === "periodLength") {
        const estimatedPeriodLength = await getCurrentUserEstimatedPeriodLength(
          user,
        );

        if (estimatedPeriodLength)
          thingsToWordOn[keyStr] = {
            text: "Regularise period length to 5 days",
            delta: Math.abs(estimatedPeriodLength - 5),
            type: "periodLength",
            target: value,
            action: "reduce",
            countNeeded: 1,
          };
      } else if (keyStr === "bad_mood" || keyStr === "mood") {
        thingsToWordOn[keyStr] = {
          text: `Happy Mood`, //`25 Happy days/month`,
          delta: 4,
          type: "mood",
          target: value,
          minValue: 4,
          action: "maintain",
          countNeeded: 4,
        };
      } else if (keyStr === "fatigue" || keyStr === "energy") {
        thingsToWordOn[keyStr] = {
          text: `Make you Energetic`, //`25 Energetic days/month`,
          delta: 2,
          target: value,
          minValue: 2,
          action: "maintain",
          type: "energy",
          countNeeded: 4,
        };
      } else if (keyStr === "facial_and_excess_hair") {
        thingsToWordOn[keyStr] = {
          text: `Fix Facial Hair`,
          delta: 1,
          target: 0,
          minValue: 0,
          action: "maintain",
          type: keyStr,
          countNeeded: 4,
        };
      } else if (keyStr === "sleep") {
        thingsToWordOn[keyStr] = {
          text: `${value} hours sound sleep`,
          delta: 3,
          target: 8,
          minValue: 2,
          action: "maintain",
          type: "sleep",
          countNeeded: 4,
        };
      } else if (keyStr === "acne") {
        thingsToWordOn[keyStr] = {
          text: `Fix acne on face`,
          delta: 1,
          target: 0,
          minValue: 0,
          action: "maintain",
          type: "acne",
          countNeeded: 4,
        };
      } else if (keyStr === "darkening_skin") {
        thingsToWordOn[keyStr] = {
          text: `Fix Skin Darkening`,
          delta: 1,
          target: 0,
          minValue: 0,
          action: "maintain",
          type: keyStr,
          countNeeded: 4,
        };
      } else if (keyStr === "hairfall") {
        thingsToWordOn[keyStr] = {
          text: `Fix Hairfall`,
          delta: 1,
          target: 0,
          minValue: 0,
          action: "maintain",
          type: keyStr,
          countNeeded: 4,
        };
      }
  }

  return thingsToWordOn;
};

export const reorderThingsToDoArray = (
  thingsToWordOnMap: Partial<Record<AchievementPathDataItemTypes, workType>>,
) => {
  const thingsToWorkOn: workType[] = [];
  const thingsAdded: Partial<Record<AchievementPathDataItemTypes, boolean>> =
    {};
  for (const workOrderItem of workOrder) {
    const val = thingsToWordOnMap[workOrderItem];
    if (val) {
      thingsToWorkOn.push(val);
      thingsAdded[workOrderItem] = true;
    }
  }

  for (const workOrderItemKey of Object.keys(thingsToWordOnMap)) {
    const keyStr = workOrderItemKey as AchievementPathDataItemTypes;
    const achievItem = thingsToWordOnMap[keyStr];
    const valAd = thingsAdded[keyStr];
    if (!valAd && achievItem) {
      thingsToWorkOn.push(achievItem);
    }
  }

  return thingsToWorkOn;
};
