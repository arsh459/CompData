import * as admin from "firebase-admin";
import {
  AchievementPathData,
  AchievementPathDataItem,
  AchievementPathDataItemStatusType,
  Cycle,
  UserInterface,
  goalActionType,
} from "./User";
import {
  dailyEnergyObj,
  dailyMoodObj,
  dailySleepObj,
  dailyWeightObj,
} from "../dailyKPIs/interface";

const filterActiveMonths = (achievementPathToFilter: AchievementPathData[]) => {
  const now = Date.now();
  return achievementPathToFilter.filter(
    (item) =>
      item.endTime &&
      item.startTime &&
      now <= item.endTime &&
      now >= item.startTime,
  );
};

export const getCurrentMonthAchievementPaths = async (uid: string) => {
  const now = Date.now();
  const achievementPathDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("goalAchievementPath")
    .where("startTime", "<=", now)
    .get();

  const achievementPaths: AchievementPathData[] = [];

  for (const doc of achievementPathDocs.docs) {
    const data = doc.data() as AchievementPathData;
    console.log("data", data);
    achievementPaths.push(data);
  }

  return filterActiveMonths(achievementPaths);
};

export const getAllAchievmentPaths = async (
  userId: string,
  orderBy: "asc" | "desc",
) => {
  const achievementPathDocs = await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("goalAchievementPath")
    .orderBy("startTime", orderBy)
    .get();

  const achievementPaths: AchievementPathData[] = [];

  for (const doc of achievementPathDocs.docs) {
    const data = doc.data() as AchievementPathData;
    achievementPaths.push(data);
  }

  return achievementPaths;
};

export const saveGoalAchievementPath = async (
  uid: string,
  monthsData: AchievementPathData[],
) => {
  for (const month of monthsData) {
    if (month.id)
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("goalAchievementPath")
        .doc(month.id)
        .set(month, { merge: true });
  }
};

export const deleteGoalAchievementPath = async (
  uid: string,
  monthsData: AchievementPathData[],
) => {
  for (const month of monthsData) {
    if (month.id)
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("goalAchievementPath")
        .doc(month.id)
        .delete();
  }
};

export const getCurrentAcivementGoal = (
  achievementPaths: AchievementPathData[],
) => {
  const nowUnix = Date.now();

  for (const path of achievementPaths) {
    if (
      path.startTime &&
      path.startTime <= nowUnix &&
      path.endTime &&
      path.endTime > nowUnix
    ) {
      return path;
    }
  }

  return undefined;
};

export const saveCurrentAcivementGoal = async (
  userId: string,
  currGoalAchievementPath: AchievementPathData,
) => {
  try {
    if (currGoalAchievementPath.id) {
      await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("goalAchievementPath")
        .doc(currGoalAchievementPath.id)
        .update({ items: currGoalAchievementPath.items });
    }
  } catch (error) {
    console.log("error in saving goalAchivementPath", error);
  }
};

export const roadmapUpdateFunc = async (
  user: UserInterface,
  currAchievementGoalItem: AchievementPathDataItem,
): Promise<AchievementPathDataItemStatusType | undefined> => {
  switch (currAchievementGoalItem.type) {
    case "customised_plan":
      return hasCustomisedPlan(user);
    case "weight":
      return await compareWeightGoal(user.uid, currAchievementGoalItem);
    case "energy":
      return await compareEnergyGoal(user.uid, currAchievementGoalItem);
    case "mood":
    case "bad_mood":
      return await compareMoodGoal(user.uid, currAchievementGoalItem);
    case "cycleLength":
      return await compareCycleGoal(user.uid, currAchievementGoalItem);
    default:
      return undefined;
  }
};

export const hasCustomisedPlan = (user: UserInterface) => {
  if (user.nutritionBadgeId && user.badgeId) {
    return "DONE";
  }
  return "PENDING";
};

export const compareWeightGoal = async (
  userId: string,
  currAchievementGoalItem: AchievementPathDataItem,
): Promise<AchievementPathDataItemStatusType | undefined> => {
  const lastWeightLog = await getLastWeightLog(userId);

  if (
    lastWeightLog?.weight &&
    currAchievementGoalItem.target &&
    currAchievementGoalItem.comparisonType
  ) {
    return numberCompareForRoadmapItemStatus(
      lastWeightLog.weight,
      currAchievementGoalItem.target,
      currAchievementGoalItem.comparisonType,
    );
  }

  return undefined;
};

export const getWeightInRange = async (
  userId: string,
  unix: number,
  end: number,
) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailyWeight")
      .where("unix", ">=", unix)
      .where("unix", "<=", end)
      .orderBy("unix", "desc")
      .get();

    if (achievementPathDocs.docs.length) {
      return achievementPathDocs.docs[0].data() as dailyWeightObj;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const getLastWeightLog = async (userId: string) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailyWeight")
      .orderBy("unix", "desc")
      .limit(1)
      .get();

    if (achievementPathDocs.docs.length) {
      return achievementPathDocs.docs[0].data() as dailyWeightObj;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const compareEnergyGoal = async (
  userId: string,
  currAchievementGoalItem: AchievementPathDataItem,
): Promise<AchievementPathDataItemStatusType | undefined> => {
  const lastEnergyLog = await getLastEnergyLog(userId);

  if (
    lastEnergyLog?.energy &&
    currAchievementGoalItem.target &&
    currAchievementGoalItem.comparisonType
  ) {
    return numberCompareForRoadmapItemStatus(
      lastEnergyLog.energy,
      currAchievementGoalItem.target,
      currAchievementGoalItem.comparisonType,
    );
  }

  return undefined;
};

export const getLastEnergyLog = async (userId: string) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailyEnergy")
      .orderBy("unix", "desc")
      .limit(1)
      .get();

    if (achievementPathDocs.docs.length) {
      return achievementPathDocs.docs[0].data() as dailyEnergyObj;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const getSleepDaysAfter = async (
  userId: string,
  unix: number,
  end: number,
) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailySleep")
      .where("unix", ">=", unix)
      .where("unix", "<=", end)
      .get();

    const docs: dailySleepObj[] = [];
    if (achievementPathDocs.docs.length) {
      for (const doc of achievementPathDocs.docs) {
        const el = doc.data() as dailySleepObj;
        docs.push(el);
      }
    }

    return docs;
  } catch (error) {
    return [];
  }
};

export const getWeightDaysAfter = async (userId: string, unix: number) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailyWeight")
      .where("unix", ">=", unix)
      .get();

    const docs: dailyWeightObj[] = [];
    if (achievementPathDocs.docs.length) {
      for (const doc of achievementPathDocs.docs) {
        const el = doc.data() as dailyWeightObj;
        docs.push(el);
      }
    }

    return docs;
  } catch (error) {
    return [];
  }
};

export const getMoodDaysAfter = async (
  userId: string,
  unix: number,
  end: number,
) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailyMood")
      .where("unix", ">=", unix)
      .where("unix", "<=", end)
      .get();

    const docs: dailyMoodObj[] = [];
    if (achievementPathDocs.docs.length) {
      for (const doc of achievementPathDocs.docs) {
        const el = doc.data() as dailyMoodObj;
        docs.push(el);
      }
    }

    return docs;
  } catch (error) {
    return [];
  }
};

export const getEnergyDaysAfter = async (
  userId: string,
  unix: number,
  end: number,
) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailyEnergy")
      .where("unix", ">=", unix)
      .where("unix", "<=", end)
      .get();

    // let count: number = 0;
    const docs: dailyEnergyObj[] = [];
    if (achievementPathDocs.docs.length) {
      for (const doc of achievementPathDocs.docs) {
        const el = doc.data() as dailyEnergyObj;
        docs.push(el);
      }
    }

    return docs;
  } catch (error) {
    return [];
  }
};

export const compareMoodGoal = async (
  userId: string,
  currAchievementGoalItem: AchievementPathDataItem,
): Promise<AchievementPathDataItemStatusType | undefined> => {
  const lastMoodLog = await getLastMoodLog(userId);

  if (
    lastMoodLog?.mood &&
    currAchievementGoalItem.target &&
    currAchievementGoalItem.comparisonType
  ) {
    return numberCompareForRoadmapItemStatus(
      lastMoodLog.mood,
      currAchievementGoalItem.target,
      currAchievementGoalItem.comparisonType,
    );
  }

  return undefined;
};

export const getLastSleepLog = async (userId: string) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailySleep")
      .orderBy("unix", "desc")
      .limit(1)
      .get();

    if (achievementPathDocs.docs.length) {
      return achievementPathDocs.docs[0].data() as dailySleepObj;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const getLastMoodLog = async (userId: string) => {
  try {
    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("dailyMood")
      .orderBy("unix", "desc")
      .limit(1)
      .get();

    if (achievementPathDocs.docs.length) {
      return achievementPathDocs.docs[0].data() as dailyMoodObj;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const compareCycleGoal = async (
  userId: string,
  currAchievementGoalItem: AchievementPathDataItem,
): Promise<AchievementPathDataItemStatusType | undefined> => {
  const lastCompletedCycle = await getLastCompletedCycle(userId);

  if (
    lastCompletedCycle?.length &&
    currAchievementGoalItem.target &&
    currAchievementGoalItem.comparisonType
  ) {
    return numberCompareForRoadmapItemStatus(
      lastCompletedCycle.length,
      currAchievementGoalItem.target,
      currAchievementGoalItem.comparisonType,
    );
  }

  return undefined;
};

export const getLastCompletedCycle = async (userId: string) => {
  try {
    const nowUnix = Date.now();

    const achievementPathDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("cycles")
      .orderBy("endUnix", "desc")
      .where("endUnix", "<=", nowUnix)
      .limit(1)
      .get();

    if (achievementPathDocs.docs.length) {
      return achievementPathDocs.docs[0].data() as Cycle;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const numberCompareForRoadmapItemStatus = (
  curr: number,
  target: number,
  comparisonType: goalActionType,
): AchievementPathDataItemStatusType | undefined => {
  switch (comparisonType) {
    case "reduce":
      return curr <= target ? "DONE" : "PENDING";
    case "increase":
      return curr >= target ? "DONE" : "PENDING";
    default:
      return undefined;
  }
};
