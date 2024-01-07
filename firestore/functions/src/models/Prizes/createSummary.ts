import { CoachRank } from "../Activity/Activity";
import { EventPrizeSummary, Prize, PrizeSummary } from "./Prize";
import { firestore } from "firebase-admin";

export const createPrizeSummary = (
  communityId: string,
  numTeamGold?: number,
  numTeamSilver?: number,
  numTeamBronze?: number,

  numMemberGold?: number,
  numMemberSilver?: number,
  numMemberBronze?: number,

  trees?: number,
  numConsistent?: number,
): PrizeSummary => {
  return {
    communityId,
    ...(numTeamGold ? { numTeamGold } : {}),
    ...(numTeamSilver ? { numTeamSilver } : {}),
    ...(numTeamBronze ? { numTeamBronze } : {}),

    ...(numMemberGold ? { numMemberGold } : {}),
    ...(numMemberSilver ? { numMemberSilver } : {}),
    ...(numMemberBronze ? { numMemberBronze } : {}),

    ...(trees ? { numTrees: trees } : {}),
    ...(numConsistent ? { numConsistent } : {}),
  };
};

export const savePrizeSummary = async (prizeSummary: PrizeSummary) => {
  await firestore()
    .collection("prizeSummary")
    .doc(prizeSummary.communityId)
    .set(prizeSummary);
};

export const saveEventPrizeSummary = async (
  eventId: string,
  prizeSummary: EventPrizeSummary,
) => {
  await firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("prizeSummary")
    .doc("prizeSummary")
    .set(prizeSummary);
};

export const saveStreakReward = async (prize: Prize) => {
  await firestore()
    .collection("users")
    .doc(prize.awardedToUID)
    .collection("prizes")
    .doc(prize.id)
    .set(prize);
};

export const createCoachSummaries = async (
  coachRanks: CoachRank[],
  goldId: string,
  silverId: string,
  bronzeId: string,
  goldMemberCommunityId: string,
  silverMemberCommunityId: string,
  bronzeMemberCommunityId: string,
  treesByCommunity: { [communityId: string]: number },
  streaksInCommunity: { [communityId: string]: number },
) => {
  for (const coachRank of coachRanks) {
    const prizeSummary = createPrizeSummary(
      coachRank.uid,
      goldId === coachRank.uid ? 1 : 0,
      silverId === coachRank.uid ? 1 : 0,
      bronzeId === coachRank.uid ? 1 : 0,
      goldMemberCommunityId === coachRank.uid ? 1 : 0,
      silverMemberCommunityId === coachRank.uid ? 1 : 0,
      bronzeMemberCommunityId === coachRank.uid ? 1 : 0,
      treesByCommunity[coachRank.uid] ? treesByCommunity[coachRank.uid] : 0,
      streaksInCommunity[coachRank.uid] ? streaksInCommunity[coachRank.uid] : 0,
    );

    await savePrizeSummary(prizeSummary);
  }
};
