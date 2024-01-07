import { CoachRank, UserRank } from "@models/Activity/Activity";
import { GameKPITarget, gameTypes } from "@models/Event/Event";
import { Badge, badgeTypes } from "@models/Prizes/Prizes";
import { KPIValue } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import { getBadgeUserType } from "@modules/Community/Prizes/Badges/utils";
import { getLvlPtsProgress } from "@utils/user/utils";

export const getCompetitionParams = (badge: Badge) => {
  // badgetype
  const badgeTypes = getBadgeUserType(badge.badgeId);

  // rank start
  let rank: number | undefined;
  if (badge.rankEnd) {
    rank = badge.rankEnd;
  } else {
    rank = badge.rankStart;
  }

  // frequency
  const frequency =
    badge.frequency === "weekly"
      ? "week"
      : badge.frequency === "monthly"
      ? "month"
      : "";

  return {
    badgeTypes,
    rank,
    frequency,
  };
};

export const getGameGoalProgress = (
  gameKPIs: GameKPITarget[],
  userKPIs: KPIValue
) => {
  const progress: number[] = [];

  for (const kpi of gameKPIs) {
    const target = kpi.targetValue;
    const kpiKey = kpi.kpi;

    const value = userKPIs[kpiKey];

    if (target) {
      const percent = (value ? value : 0) / target;

      progress.push(percent > 1 ? 1 : percent);
    } else {
      progress.push(1);
    }
  }

  let avg = 0;
  if (progress.length) {
    const sumP = progress.reduce((acc, item) => {
      return acc + item;
    }, 0);

    avg = sumP / progress.length;
  }

  return {
    pts: Math.round(avg * 100),
    total: 100,
    progress: Math.round(avg * 100),
    percent: true,
  };
};

const getRankPts = (
  label: "weekly" | "monthly",
  rank1?: UserRank | CoachRank,
  rank2?: UserRank | CoachRank,
  roundId?: string,
  sprintId?: string
) => {
  let pts1: number = 0;
  let pts2: number = 0;
  if (
    label === "weekly" &&
    roundId &&
    rank1?.weekPointObj &&
    rank2?.weekPointObj
  ) {
    pts1 = rank1.weekPointObj[roundId];
    pts2 = rank2.weekPointObj[roundId];
  } else if (
    label === "monthly" &&
    sprintId &&
    rank1?.monthPointObj &&
    rank2?.monthPointObj
  ) {
    pts1 = rank1.monthPointObj[sprintId];
    pts2 = rank2.monthPointObj[sprintId];
  }

  if (pts1 === pts2 && pts2 === 0) {
    return {
      pts: 0,
      total: 0,
      progress: 0,
    };
  }

  if (pts1 >= pts2) {
    return {
      pts: pts2,
      total: pts2,
      progress: 100,
    };
  } else {
    return {
      pts: pts1,
      total: pts2,
      progress: Math.round((pts1 / pts2) * 100),
    };
  }
};

export const getPtsAndProgress = (
  user?: UserInterface,
  myUserRank?: UserRank,
  myTeamRank?: CoachRank,
  competition?: UserRank | CoachRank,
  badgeId?: badgeTypes,
  roundId?: string,
  sprintId?: string,
  gameKPIS?: GameKPITarget[],
  frequency?: "weekly" | "monthly",
  gameType?: gameTypes
): { pts: number; progress: number; total: number; percent?: boolean } => {
  if (
    badgeId === "rank_1" ||
    badgeId === "rank_2" ||
    badgeId === "rank_3" ||
    badgeId === "tier_1" ||
    badgeId === "tier_2"
  ) {
    return getRankPts(
      frequency ? frequency : "weekly",
      myUserRank,
      competition,
      roundId,
      sprintId
    );
  } else if (
    badgeId === "monthly_rank_1" ||
    badgeId === "monthly_rank_2" ||
    badgeId === "monthly_rank_3" ||
    badgeId === "monthly_tier_1" ||
    badgeId === "monthly_tier_2"
  ) {
    return getRankPts(
      frequency ? frequency : "monthly",
      myUserRank,
      competition,
      roundId,
      sprintId
    );
  } else if (
    badgeId === "team_rank_1" ||
    badgeId === "team_rank_24" ||
    badgeId === "team_rank_10"
  ) {
    return getRankPts(
      frequency ? frequency : "weekly",
      myTeamRank,
      competition,
      roundId,
      sprintId
    );
  } else if (
    badgeId === "monthly_team_rank_1" ||
    badgeId === "monthly_team_rank_24" ||
    badgeId === "monthly_team_rank_10"
  ) {
    return getRankPts(
      frequency ? frequency : "monthly",
      myTeamRank,
      competition,
      roundId,
      sprintId
    );
  } else if (badgeId === "level_5") {
    return getLvlPtsProgress(user?.activeFitPointsV2, 5);
  } else if (badgeId === "level_4") {
    return getLvlPtsProgress(user?.activeFitPointsV2, 4);
  } else if (badgeId === "level_3") {
    return getLvlPtsProgress(user?.activeFitPointsV2, 3);
  } else if (badgeId === "level_2") {
    return getLvlPtsProgress(user?.activeFitPointsV2, 2);
  } else if (badgeId === "level_1") {
    return getLvlPtsProgress(user?.activeFitPointsV2, 1);
  } else if (badgeId === "all_levels") {
    const userLevel = user?.userLevelV2 ? user.userLevelV2 : 0;
    return getLvlPtsProgress(
      user?.activeFitPointsV2,
      userLevel !== 5 ? userLevel + 1 : 5
    );
  } else if (
    badgeId === "goal_complete" &&
    gameKPIS &&
    myUserRank?.kpiScoresV2
  ) {
    let kpiScores: KPIValue = {};
    if (gameType === "team") {
      kpiScores =
        sprintId &&
        myTeamRank &&
        myTeamRank.kpiScoresV2 &&
        myTeamRank?.kpiScoresV2[sprintId]
          ? myTeamRank?.kpiScoresV2[sprintId]
          : {};
    } else {
      kpiScores =
        sprintId && myUserRank?.kpiScoresV2[sprintId]
          ? myUserRank?.kpiScoresV2[sprintId]
          : {};
    }

    return getGameGoalProgress(gameKPIS, kpiScores);
  } else if (badgeId === "rookie") {
    const sprintPoints =
      sprintId &&
      myUserRank?.monthPointObj &&
      myUserRank?.monthPointObj[sprintId]
        ? 1
        : 0;
    return {
      pts: sprintPoints > 0 ? 1 : 0,
      total: 100,
      progress: sprintPoints > 0 ? 100 : 0,
    };
  }

  return {
    pts: 0,
    progress: 0,
    total: 0,
  };
};
