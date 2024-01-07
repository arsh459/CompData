import {
  CoachPrizes,
  CoachRank,
  UserPrizes,
  UserRank,
} from "../../../models/Activity/Activity";
import {
  createPrize,
  deletePrize,
  getEventRankPrize,
  getEventTreePrizes,
  getWeeklyPrizeFromDb,
  savePrize,
  updatePrize,
} from "../../../models/Prizes/createUtils";
import { awardTypes } from "../../../models/Prizes/Prize";
import { getUserById } from "../../../models/User/Methods";
import { handleMonthlyCoachRankWrapper } from "./handleCoachMonthlyPrizes";
import { handleCoachWeeklyRankWrapper } from "./handleCoachRankPrizes";
import { handleMonthlyUserRankWrapper } from "./updateMonthlyRankWrapper";

export const updatePrizes = async (
  firstMember: UserRank | undefined,
  secondMember: UserRank | undefined,
  thirdMember: UserRank | undefined,
  firstCoach: CoachRank | undefined,
  secondCoach: CoachRank | undefined,
  thirdCoach: CoachRank | undefined,
  eventSize: number,
  isAtStake: boolean,
  parentId: string,
  treesByRanks: { [uid: string]: UserRank },
  streaksByRanks: { [uid: string]: UserRank },
  weeklyPrizes: UserPrizes,
  monthlyPrizes: UserPrizes,
  weeklyCoachPrizes: CoachPrizes,
  monthlyCoachPrizes: CoachPrizes,
) => {
  // console.log("firstMember", firstMember?.authorName);
  // console.log("secondMember", secondMember?.authorName);
  // console.log("thirdMember", thirdMember?.authorName);

  // console.log("eventSize", eventSize);
  // console.log("isAtStake", isAtStake);
  // console.log("treesByRanks", Object.keys(treesByRanks).length);

  // console.log("streaksByRanks", Object.keys(streaksByRanks).length);
  // console.log("streaksByRanks", streaksByRanks);
  // console.log("weeklyPrizes", weeklyPrizes);

  await handleRankPrizeWrapper(firstMember, eventSize, parentId, isAtStake, 1);

  await handleRankPrizeWrapper(secondMember, eventSize, parentId, isAtStake, 2);

  await handleRankPrizeWrapper(thirdMember, eventSize, parentId, isAtStake, 3);

  // weekly prizes
  await handleWeeklyRankWrapper(weeklyPrizes, parentId, false, eventSize);
  await handleCoachWeeklyRankWrapper(
    weeklyCoachPrizes,
    parentId,
    true,
    eventSize,
  );

  // monthly prizes
  await handleMonthlyUserRankWrapper(monthlyPrizes, parentId, false, eventSize);
  await handleMonthlyCoachRankWrapper(
    monthlyCoachPrizes,
    parentId,
    true,
    eventSize,
  );

  await handleCoachRankPrizeWrapper(
    firstCoach,
    eventSize,
    parentId,
    isAtStake,
    1,
  );

  await handleCoachRankPrizeWrapper(
    secondCoach,
    eventSize,
    parentId,
    isAtStake,
    2,
  );

  await handleCoachRankPrizeWrapper(
    thirdCoach,
    eventSize,
    parentId,
    isAtStake,
    3,
  );

  await handleTreePrizes(parentId, treesByRanks, isAtStake, eventSize, "tree");
  await handleTreePrizes(
    parentId,
    streaksByRanks,
    isAtStake,
    eventSize,
    "streak",
  );
};

const handleWeeklyRankWrapper = async (
  weeklyPrizes: UserPrizes,
  parentId: string,
  isTeamAward: boolean,
  eventSize: number,
) => {
  for (const week of Object.keys(weeklyPrizes)) {
    // console.log("week", week);
    // console.log("1st", weeklyPrizes[week].first);
    // console.log("2nd", weeklyPrizes[week].second);
    // console.log("3rd", weeklyPrizes[week].third);
    await handleWeeklyRank(
      parentId,
      week,
      1,
      eventSize,
      isTeamAward,
      weeklyPrizes[week].first,
    );
    await handleWeeklyRank(
      parentId,
      week,
      2,
      eventSize,
      isTeamAward,
      weeklyPrizes[week].second,
    );
    await handleWeeklyRank(
      parentId,
      week,
      3,
      eventSize,
      isTeamAward,
      weeklyPrizes[week].third,
    );
  }
};

const handleWeeklyRank = async (
  parentId: string,
  week: string,
  rank: number,
  eventSize: number,
  isTeamAward: boolean,
  user?: UserRank,
) => {
  if (user) {
    // console.log("rank exists", rank, user.authorName);
    await handleWeekRankPrize(
      user,
      rank,
      eventSize,
      parentId,
      true,
      isTeamAward,
      week,
    );
  } else {
    // console.log("rank does not exist", rank);
    const remoteWeekAward = await getWeeklyPrizeFromDb(
      rank,
      parentId,
      isTeamAward,
      week,
    );

    // console.log("remoteWeekAward previous", remoteWeekAward?.awardedToName);

    if (remoteWeekAward) {
      await deletePrize(remoteWeekAward);
    }
  }
};

const handleRankPrizeWrapper = async (
  firstMember: UserRank | undefined,
  eventSize: number,
  parentId: string,
  isAtStake: boolean,
  rank: number,
) => {
  if (firstMember) {
    await handleRankPrize(firstMember, eventSize, parentId, isAtStake);
  } else {
    const remotePrize = await getEventRankPrize(rank, parentId, false);
    if (remotePrize) {
      await deletePrize(remotePrize);
    }
  }
};

const handleCoachRankPrizeWrapper = async (
  firstMember: CoachRank | undefined,
  eventSize: number,
  parentId: string,
  isAtStake: boolean,
  rank: number,
) => {
  if (firstMember) {
    await handleCoachPrize(firstMember, eventSize, parentId, isAtStake);
  } else {
    const remotePrize = await getEventRankPrize(rank, parentId, true);
    if (remotePrize) {
      await deletePrize(remotePrize);
    }
  }
};

const handleWeekRankPrize = async (
  userRank: UserRank,
  rank: number,
  eventSize: number,
  parentId: string,
  isAtStake: boolean,
  isTeamAward: boolean,
  week: string,
) => {
  const remotePrize = await getWeeklyPrizeFromDb(
    rank,
    parentId,
    isTeamAward,
    week,
  );
  // console.log("remote prize now", remotePrize?.prizeName);

  if (!remotePrize) {
    const coach = await getUserById(userRank.coachCommunityId);
    const prize = createPrize(
      parentId,
      userRank.coachCommunityId,
      userRank.coachEventId,
      rank,
      eventSize,
      coach?.name ? coach.name : "",
      userRank.uid,
      userRank?.authorName ? userRank.authorName : "",
      isAtStake,
      "weeklyRank",
      isTeamAward,
      undefined,
      undefined,
      undefined,
      week,
    );

    // console.log("new prize", prize);

    await savePrize(prize);
  } else {
    const coach = await getUserById(userRank.coachCommunityId);
    const updatedPrize = updatePrize(
      remotePrize,
      userRank.coachCommunityId,
      rank,
      eventSize,
      coach?.name ? coach.name : "",
      userRank.uid,
      userRank.authorName ? userRank.authorName : "",
      isAtStake,
      userRank.coachEventId,
      userRank.coachCommunityId,
      "weeklyRank",
    );

    // console.log("updatedPrize prize", updatedPrize);

    await savePrize(updatedPrize);
  }
};

const handleRankPrize = async (
  firstMember: UserRank,
  eventSize: number,
  parentId: string,
  isAtStake: boolean,
) => {
  const remotePrize = await getEventRankPrize(
    firstMember.rank,
    parentId,
    false,
  );

  // console.log("remotePrize", remotePrize?.awardedByName);

  if (!remotePrize) {
    const coach = await getUserById(firstMember.coachCommunityId);
    const prize = createPrize(
      parentId,
      firstMember.coachCommunityId,
      firstMember.coachEventId,
      firstMember.rank,
      eventSize,
      coach?.name ? coach.name : "",
      firstMember.uid,
      firstMember.authorName ? firstMember.authorName : "",
      isAtStake,
      "rank",
      false,
    );

    await savePrize(prize);
  }
  //if (remotePrize.awardedToUID !== firstMember.uid)
  else {
    const coach = await getUserById(firstMember.coachCommunityId);
    const updatedPrize = updatePrize(
      remotePrize,
      firstMember.coachCommunityId,
      firstMember.rank,
      eventSize,
      coach?.name ? coach.name : "",
      firstMember.uid,
      firstMember.authorName ? firstMember.authorName : "",
      isAtStake,
      firstMember.coachEventId,
      firstMember.coachCommunityId,
      "rank",
    );

    await savePrize(updatedPrize);
  }
};

const handleCoachPrize = async (
  coachRank: CoachRank,
  eventSize: number,
  parentId: string,
  isAtStake: boolean,
) => {
  const remotePrize = await getEventRankPrize(coachRank.rank, parentId, true);

  if (!remotePrize) {
    const coach = await getUserById(coachRank.uid);
    const prize = createPrize(
      parentId,
      coachRank.uid,
      coachRank.coachEventId,
      coachRank.rank,
      eventSize,
      coach?.name ? coach.name : "",
      coachRank.uid,
      coach?.name ? coach.name : "",
      isAtStake,
      "rank",
      true,
    );

    await savePrize(prize);
  } else if (remotePrize.awardedToUID !== coachRank.uid) {
    const coach = await getUserById(coachRank.uid);
    const updatedPrize = updatePrize(
      remotePrize,
      coachRank.uid,
      coachRank.rank,
      eventSize,
      coach?.name ? coach.name : "",
      coachRank.uid,
      coach?.name ? coach.name : "",
      isAtStake,
      coachRank.coachEventId,
      coachRank.uid,
      "rank",
    );

    await savePrize(updatedPrize);
  }
};

export const handleTreePrizes = async (
  parentId: string,
  treesToAllot: { [uid: string]: UserRank },
  isAtStake: boolean,
  eventSize: number,
  prizeType: awardTypes,
) => {
  const treePrizes = await getEventTreePrizes(parentId, prizeType);

  //   console.log("existing treePrizes", Object.keys(treePrizes).length);

  for (const userRank of Object.values(treesToAllot)) {
    // tree doesn't exists
    if (!treePrizes[userRank.uid] && parentId) {
      const coach = await getUserById(userRank.coachCommunityId);
      if (coach?.name) {
        const prize = createPrize(
          parentId,
          userRank.coachCommunityId,
          userRank.coachEventId,
          userRank.rank,
          eventSize,
          coach.name,
          userRank.uid,
          userRank.authorName ? userRank.authorName : "",
          isAtStake,
          prizeType,
          false,
        );

        console.log(`${prizeType}: ${prize.prizeName} : ${prize.prizeType}`);

        await savePrize(prize);
      }
    }
  }

  // remove unused trees
  for (const treePrize of Object.keys(treePrizes)) {
    // tree is no more
    if (!treesToAllot[treePrize]) {
      await deletePrize(treePrizes[treePrize]);
    }
  }
};
