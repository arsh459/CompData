import { awardTypes, Prize } from "./Prize";
import { v4 as uuid } from "uuid";
import { firestore } from "firebase-admin";

const getPrizeName = (
  prizeType: awardTypes,
  eventSize: number,
  rank?: number,
) => {
  if (prizeType === "rank") {
    return `${rank} / ${eventSize}`;
  } else if (prizeType === "streak") {
    return "Hot";
  } else if (prizeType === "weeklyRank") {
    return `Weekly ${rank}`;
  } else if (prizeType === "monthlyRank") {
    return `Monthly ${rank}`;
  } else {
    return "Tree";
  }
};

export const createPrize = (
  parentId: string,
  coachCommunityId: string,
  coachEventId: string,
  userRank: number,
  eventSize: number,
  coachName: string,
  awardedToUID: string,
  awardedToName: string,
  isAtStake: boolean,
  prizeType: awardTypes,
  isTeamAward: boolean,
  streakStartTime?: number,
  streakLength?: number,
  numTrees?: number,
  week?: string,
): Prize => {
  return {
    id: uuid(),
    parentId: parentId,
    earnedInCommunityId: coachCommunityId,
    eventId: coachEventId,

    prizeName: getPrizeName(prizeType, eventSize, userRank),

    awardedToUID: awardedToUID,
    awardedToName: awardedToName,

    awardedByUID: coachCommunityId,
    awardedByName: coachName,
    isTeamAward,

    createdOn: Date.now(),
    isAtStake,

    prizeType,

    rank: userRank,
    priority:
      prizeType === "rank"
        ? 1
        : prizeType === "monthlyRank"
        ? 1.5
        : prizeType === "weeklyRank"
        ? 2
        : prizeType === "streak"
        ? 3
        : 4,

    ...(typeof week === "string" ? { week } : {}),
    ...(typeof numTrees === "number" ? { numTrees } : {}),

    ...(typeof streakStartTime === "number" ? { streakStartTime } : {}),
    ...(typeof streakLength === "number" ? { streakLength } : {}),
  };
};

export const updatePrize = (
  previousPrize: Prize,
  coachCommunityId: string,
  userRank: number,
  eventSize: number,
  coachName: string,
  awardedToUID: string,
  awardedToName: string,
  isAtStake: boolean,
  eventId: string,
  earnedInCommunityId: string,
  prizeType: awardTypes,
  streakStartTime?: number,
  streakLength?: number,
  numTrees?: number,
): Prize => {
  return {
    ...previousPrize,

    prizeName: `${userRank} / ${eventSize}`,

    awardedToUID: awardedToUID,
    awardedToName: awardedToName,

    awardedByUID: coachCommunityId,
    awardedByName: coachName,

    createdOn: Date.now(),
    isAtStake,
    eventId,
    earnedInCommunityId,

    prizeType: prizeType,

    rank: userRank,

    ...(typeof numTrees === "number" ? { numTrees } : {}),

    ...(typeof streakStartTime === "number" ? { streakStartTime } : {}),
    ...(typeof streakLength === "number" ? { streakLength } : {}),
  };
};

export const savePrize = async (prize: Prize) => {
  await firestore().collection("prizes").doc(prize.id).set(prize, {
    merge: true,
  });
};

export const deletePrize = async (prize: Prize) => {
  await firestore().collection("prizes").doc(prize.id).delete();
};

export const getEventRankPrize = async (
  rank: number,
  parentId: string,
  isTeamAward: boolean,
) => {
  const remotePrize = await firestore()
    .collection("prizes")
    .where("rank", "==", rank)
    .where("parentId", "==", parentId)
    .where("isTeamAward", "==", isTeamAward)
    .get();

  if (remotePrize.docs.length > 0) {
    return remotePrize.docs[0].data() as Prize;
  }

  return undefined;
};

export const getWeeklyPrizeFromDb = async (
  rank: number,
  parentId: string,
  isTeamAward: boolean,
  week: string,
) => {
  const remotePrize = await firestore()
    .collection("prizes")
    .where("rank", "==", rank)
    .where("parentId", "==", parentId)
    .where("isTeamAward", "==", isTeamAward)
    .where("week", "==", week)
    .where("prizeType", "==", "weeklyRank")
    .get();

  if (remotePrize.docs.length > 0) {
    return remotePrize.docs[0].data() as Prize;
  }

  return undefined;
};

export const getMonthlyPrizeFromDb = async (
  rank: number,
  parentId: string,
  isTeamAward: boolean,
  month: string,
) => {
  const remotePrize = await firestore()
    .collection("prizes")
    .where("rank", "==", rank)
    .where("parentId", "==", parentId)
    .where("isTeamAward", "==", isTeamAward)
    .where("week", "==", month)
    .where("prizeType", "==", "monthlyRank")
    .get();

  if (remotePrize.docs.length > 0) {
    return remotePrize.docs[0].data() as Prize;
  }

  return undefined;
};

export const getEventTreePrizes = async (
  parentId: string,
  prizeType: awardTypes,
) => {
  const remotePrizes = await firestore()
    .collection("prizes")
    .where("parentId", "==", parentId)
    .where("prizeType", "==", prizeType)
    .get();

  const treePrizes: { [uid: string]: Prize } = {};
  if (remotePrizes.docs.length > 0) {
    for (const remPrize of remotePrizes.docs) {
      const prize = remPrize.data() as Prize;
      treePrizes[prize.awardedToUID] = prize;
    }
  }

  return treePrizes;
};

export const getUserPrizes = async (uid: string) => {
  const remotePrizes = await firestore()
    .collection("prizes")
    .where("awardedToUID", "==", uid)
    .get();

  const prizes: Prize[] = [];

  for (const remPrize of remotePrizes.docs) {
    const prize = remPrize.data() as Prize;
    prizes.push(prize);
  }

  return prizes;
};
