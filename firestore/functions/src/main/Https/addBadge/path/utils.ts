import {
  AchievementPathDataItemTypes,
  UserInterface,
} from "../../../../models/User/User";
import {
  // createBaseAchiever,
  getAwardByType,
  // getUpdatedAwardIdForKPIs,
  targetMonthFormat,
} from "../../../../models/awards/getUtils";
import { Achiever } from "../../../../models/awards/interface";
import * as admin from "firebase-admin";
import { getFitnessGoal, getWeightLossValue } from "../goal/createUserPath";
import {
  lowerNormalCycleLength,
  lowerNormalPeriodLength,
  normalCycleDaysDeltaForMonth,
  normalPeriodDaysDeltaForMonth,
  normalWeightDelta,
  upperNormalCycleLength,
  upperNormalPeriodLength,
} from "./constants";
// import { getUserTimezone } from "../../taskGenerator/generateReminders";
// import { createProgressReportKPIs } from "../../awardBadge/createUtils";

export const createAchieverForGoal = async (
  user: UserInterface,
  startTime: number,
  endTime: number,
  types: AchievementPathDataItemTypes[],
) => {
  await Promise.all(types.map((type) => getAwardByType(type)));

  const achivers: Achiever[] = [];

  // for (const award of awards) {
  //   if (award) {
  //     // achiever on <- uid, awardType, month
  //     const achiever = await getAchiver(user.uid, startTime, endTime, award.id);

  //     const tzString = getUserTimezone(
  //       user.recommendationConfig?.timezone?.tzString,
  //     );

  //     const kpis = await createProgressReportKPIs(
  //       tzString,
  //       user.uid,
  //       startTime,
  //       endTime,
  //       user.dailyStepTarget ? user.dailyStepTarget : 5000,
  //     );

  //     const updatedAwardId = await getUpdatedAwardIdForKPIs(kpis, award);

  //     achivers.push(
  //       updateBaseAchiever(
  //         achiever,
  //         kpis.workoutRegularity,
  //         kpis.dietRegularity,
  //         kpis.stepRegularity,
  //         kpis.wtChange,
  //         kpis.moodAvg,
  //         kpis.energyAvg,
  //         updatedAwardId,
  //       ),
  //     );
  //   }
  // }

  await Promise.all(achivers);
};

// export const getAchiver = async (
//   userId: string,
//   startTime: number,
//   endTime: number,
//   awardId: string,
// ): Promise<Achiever> => {
//   const achiever = await getAchieverTargetMonth(
//     userId,
//     startTime,
//     endTime,
//     awardId,
//   );

//   return (
//     achiever || {
//       ...createBaseAchiever(userId, startTime, endTime, awardId),
//       unlockOn: startTime,
//       targetMonth: startTime,
//     }
//   );
// };

export const getAchieverForType = async (uid: string, awardId: string) => {
  const achiverDocs = await admin
    .firestore()
    .collection("achievers")
    .where("uid", "==", uid)
    .where("awardId", "==", awardId)

    .get();

  const achievers: Achiever[] = [];
  for (const doc of achiverDocs.docs) {
    achievers.push(doc.data() as Achiever);
  }

  return achievers;
};

export const getAchieverForTypeMonth = async (
  uid: string,
  // awardId: string,
  targetMonth: number,
) => {
  const achiverDocs = await admin
    .firestore()
    .collection("achievers")
    .where("uid", "==", uid)
    // .where("awardId", "==", awardId)
    .where("targetMonth", "==", targetMonth)
    .get();

  const achievers: Achiever[] = [];
  for (const doc of achiverDocs.docs) {
    achievers.push(doc.data() as Achiever);
  }

  return achievers;
};

export const getAchieverInRange = async (
  uid: string,
  // awardId: string,
  timeStart: number,
  timeEnd: number,
) => {
  const achiverDocs = await admin
    .firestore()
    .collection("achievers")
    .where("uid", "==", uid)
    // .where("awardId", "==", awardId)
    .where("targetMonth", ">=", timeStart)
    .where("targetMonth", "<=", timeEnd)
    .get();

  const achievers: Achiever[] = [];
  for (const doc of achiverDocs.docs) {
    achievers.push(doc.data() as Achiever);
  }

  return achievers;
};

export const deleteAchievers = async (ids: string[]) => {
  for (const id of ids) {
    await admin.firestore().collection("achievers").doc(id).delete();
  }
};

export const getAchieverForUser = async (uid: string) => {
  const achiverDocs = await admin
    .firestore()
    .collection("achievers")
    .where("uid", "==", uid)
    .get();

  const achievers: Achiever[] = [];
  for (const doc of achiverDocs.docs) {
    achievers.push(doc.data() as Achiever);
  }

  return achievers;
};

export const getAchieverForMonthAwardUID = async (
  uid: string,
  awardId: string,
  targetMonth: number,
) => {
  const achiverDocs = await admin
    .firestore()
    .collection("achievers")
    .where("uid", "==", uid)
    .where("awardId", "==", awardId)
    .where("targetMonth", "==", targetMonth)
    .get();

  const achievers: Achiever[] = [];
  for (const doc of achiverDocs.docs) {
    achievers.push(doc.data() as Achiever);
  }

  return achievers;
};

export const getAchieverTargetMonth = async (
  userId: string,
  startTime: number,
  endTime: number,
  awardId: string,
): Promise<Achiever | undefined> => {
  const targetMonth = targetMonthFormat(startTime);

  const achiverDocs = await admin
    .firestore()
    .collection("achievers")
    .where("uid", "==", userId)
    .where("awardId", "==", awardId)
    .get();

  for (const doc of achiverDocs.docs) {
    const data = doc.data() as Achiever;
    if (
      data.targetMonth &&
      targetMonthFormat(data.targetMonth) === targetMonth
    ) {
      return {
        ...data,
        startTime,
        endTime,
        unlockOn: startTime,
        targetMonth: startTime,
      };
    }
  }

  return undefined;
};

export const getRoadmapMonths = (
  user?: UserInterface,
): {
  title: string;
  types: AchievementPathDataItemTypes[];
}[] => {
  if (user) {
    const goal = getFitnessGoal(user);
    console.log("goal", goal);

    // const pcosArray = getArrForPCOS(user);
    // const weightlossArray = getArrForWeight(user);

    // weightloss - 15kgs
    // 65 length
    // month 1 - month 8 - weightloss
    // 3

    const arr =
      goal === "pcos_pcod" ? getArrForPCOS(user) : getArrForWeight(user);

    console.log("arr", arr);

    const objArr: {
      title: string;
      types: AchievementPathDataItemTypes[];
    }[] = [];

    arr.forEach((each, index) => {
      const obj = getRoadmapMonthObj(each, index, arr.length);
      goal !== "pcos_pcod" && obj.types.push("cycleLength");
      objArr.push(obj);
    });

    return objArr;
  }

  return [];
};

const getRoadmapMonthObj = (
  each: AchievementPathDataItemTypes,
  index: number,
  length: number,
): {
  title: string;
  types: AchievementPathDataItemTypes[];
} => {
  const progressStr = `${Math.floor((100 / length) * index)}-${Math.floor(
    (100 / length) * (index + 1),
  )}`;

  const obj = {
    title: `Month ${index + 1} (${progressStr}% goal achieved)`,
    types: [each],
  };

  if (index === 0) {
    obj.types = ["customised_plan", ...obj.types];
    obj.types.push("bad_mood");
    obj.types.push("fatigue");
  } else if (index === length - 1) {
    obj.types.push("facial_and_excess_hair");
    obj.types.push("acne");
  } else {
    obj.types.push("bad_mood");
    obj.types.push("fatigue");
    obj.types.push("facial_and_excess_hair");
    obj.types.push("acne");
    obj.types.push("sleep");
  }

  return obj;
};

const getArrForPCOS = (user: UserInterface): AchievementPathDataItemTypes[] => {
  const cycleLength = user.periodTrackerObj?.inputCycleLength || 28;
  const periodLength = user.periodTrackerObj?.inputPeriodLength || 5;

  const deltaCycle =
    cycleLength > upperNormalCycleLength
      ? upperNormalCycleLength - cycleLength
      : cycleLength < lowerNormalCycleLength
      ? lowerNormalCycleLength - cycleLength
      : 0;
  const deltaPeriod =
    periodLength > upperNormalPeriodLength
      ? upperNormalPeriodLength - periodLength
      : periodLength < lowerNormalPeriodLength
      ? lowerNormalPeriodLength - periodLength
      : 0;

  console.log(
    "user.periodTrackerObj?.inputCycleLength",
    user.periodTrackerObj?.inputCycleLength,
  );
  console.log("deltaCycle", deltaCycle);
  console.log("deltaPeriod", deltaPeriod);

  const arr: AchievementPathDataItemTypes[] = ["weight"];

  if (deltaCycle) {
    for (
      let index = 0;
      index < Math.ceil(deltaCycle / normalCycleDaysDeltaForMonth);
      index++
    ) {
      arr.push("cycleLength");
    }
  } else if (deltaPeriod) {
    for (
      let index = 0;
      index < Math.ceil(deltaPeriod / normalPeriodDaysDeltaForMonth);
      index++
    ) {
      arr.push("cycleLength");
    }
  }

  return arr;
};

const getArrForWeight = (
  user: UserInterface,
): AchievementPathDataItemTypes[] => {
  const { weightDelta } = getWeightLossValue(user);

  const arr: AchievementPathDataItemTypes[] = [];

  if (weightDelta) {
    for (
      let index = 0;
      index < Math.ceil(weightDelta / normalWeightDelta);
      index++
    ) {
      arr.push("weight");
    }
  }

  return arr.length ? arr : ["weight"];
};
