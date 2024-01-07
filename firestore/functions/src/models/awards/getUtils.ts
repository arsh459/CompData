import * as admin from "firebase-admin";
import { Achiever, Award, achieverProgress, badgeGroups } from "./interface";
import { v4 as uuidv4 } from "uuid";
import {
  AchievementPathDataItemStatusType,
  AchievementPathDataItemTypes,
  // goalActionType,
} from "../User/User";
import {
  ProgressReportKPIs,
  // calculateAverageKPI,
  // getUpdatedAwardId,
} from "../../main/Https/awardBadge/createUtils";
import { format } from "date-fns";

export const getAwardById = async (id: string) => {
  const awardDoc = await admin.firestore().collection("awards").doc(id).get();
  if (awardDoc.data()) {
    return awardDoc.data() as Award;
  }

  return undefined;
};

export const getAwardByType = async (type: AchievementPathDataItemTypes) => {
  const awardDoc = await admin
    .firestore()
    .collection("awards")
    .where("type", "==", type)
    .limit(1)
    .get();

  if (awardDoc.docs.length) {
    return awardDoc.docs[0].data() as Award;
  }

  return undefined;
};

export const updateBaseAchiever = async (
  achiever: Achiever,
  workoutRegularity: number,
  dietRegularity: number,
  stepsRegularity: number,
  weightChange: number,
  moodAverage: number,
  energyAverage: number,
  updatedAwardId?: string,
) => {
  const newAchiever: Achiever = {
    ...achiever,
    // workoutRegularity,
    // dietRegularity,
    // stepsRegularity,
    // weightChange,
    // moodAverage: moodAverage,
    // energyAverage: energyAverage,
    // containsReport: true,
    ...(updatedAwardId ? { awardId: updatedAwardId } : {}),
  };

  await admin
    .firestore()
    .collection("achievers")
    .doc(achiever.id)
    .set(newAchiever);
};

// export const getBaseAchiever = async (
//   uid: string,
//   awardId: string,
//   startTime: number,
//   endTime: number,
// ) => {
//   const awardDoc = await admin
//     .firestore()
//     .collection("achievers")
//     .where("uid", "==", uid)
//     .where("awardId", "==", awardId)
//     .where("startTime", "==", startTime)
//     .where("endTime", "==", endTime)
//     .get();

//   if (awardDoc.docs.length) {
//     return awardDoc.docs[0].data() as Achiever;
//   } else {
//     return createBaseAchiever(uid, startTime, endTime, awardId);
//   }
// };

export const getAwardsForTier = async (badgeTier: badgeGroups) => {
  const awardDocs = await admin
    .firestore()
    .collection("awards")
    .where("groupId", "==", badgeTier)
    .get();

  const tierAwards: Award[] = [];
  for (const doc of awardDocs.docs) {
    tierAwards.push(doc.data() as Award);
  }

  return tierAwards;
};

export const createBaseAchiever = (
  uid: string,
  startTime: number,
  endTime: number,
  awardId: string,
  progress?: achieverProgress,
  // comparisonType?: goalActionType,
  // type?: AchievementPathDataItemTypes,
  // target?: number,
  // countNeeded?: number,
  targetMonth?: number,
  createdOn?: number,
  title?: string,
  status?: AchievementPathDataItemStatusType,
  progressText?: string,
  id?: string,
  steps?: number,
  stepSize?: number,
  totalCount?: number,
  mainLabel?: string,
  previousAchiever?: Achiever,
  unlockOn?: number,
): Achiever => {
  return {
    ...(previousAchiever ? { ...previousAchiever } : {}),

    id: id ? id : uuidv4(),
    createdOn: createdOn ? createdOn : Date.now(),
    uid,
    awardId,
    startTime,
    endTime,

    ...(unlockOn ? { unlockOn: unlockOn } : { unlockOn: null }),
    ...(progress ? { progress } : {}),
    ...(steps ? { steps } : {}),
    ...(stepSize ? { stepSize } : {}),
    ...(totalCount ? { totalCount } : {}),
    ...(mainLabel ? { mainLabel } : {}),

    // unlocksOn
    ...(targetMonth ? { targetMonth } : {}),
    // priority

    ...(title ? { title } : {}),
    ...(progressText ? { subtitle: progressText } : {}),

    ...(status === "DONE" || status === "PENDING"
      ? { awardStatus: status === "DONE" ? "WON" : "TARGET" }
      : {}),
  };
};

export const getUpdatedAwardIdForKPIs = async (
  kpis: ProgressReportKPIs,
  award?: Award,
): Promise<string | undefined> => {
  let updatedAwardId: string | undefined;
  // if (award?.groupId) {
  //   const tierOfAwards = await getAwardsForTier(award.groupId);

  //   const avgRegularity = calculateAverageKPI([
  //     kpis.workoutRegularity,
  //     kpis.dietRegularity,
  //     kpis.stepRegularity,
  //   ]);

  //   updatedAwardId = getUpdatedAwardId(avgRegularity, tierOfAwards);
  // }
  return updatedAwardId;
};

export const targetMonthFormat = (unix: number): string => {
  return format(unix, "MMM yy"); // Ex: 1685618246465 -> "Jun 23"
};

export const getStreakAchiever = async (uid: string, awardId: string) => {
  const docs = await admin
    .firestore()
    .collection("achievers")
    .where("uid", "==", uid)
    .where("awardId", "==", awardId)
    .where("awardStatus", "==", "TARGET")
    .get();

  if (docs.docs.length) {
    return docs.docs.map((item) => item.data() as Achiever);
  }

  return [];
};
