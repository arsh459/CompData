import { CoachRank, UserRank } from "@models/Activity/Activity";
import { format } from "date-fns";

export type viewTypes = "players" | "teams";
export type periodTypes = "week" | "month";

export const getRankHeading = (
  type: "player" | "team",
  period?: periodTypes
) => {
  if (period === "week") {
    return `${type === "player" ? "Your" : "Team"} Weekly Rank`;
  }

  if (period === "month") {
    return `${type === "player" ? "Your" : "Team"} Monthly Rank`;
  }

  if (type === "player") {
    ("Your Rank");
  }

  if (type === "team") {
    ("Team Rank");
  }

  return "";
};

export const getUserRank = (
  userRank?: UserRank | CoachRank,
  selectedRound?: string,
  selectedSprint?: string,
  period?: periodTypes
) => {
  if (period === "month" || selectedRound === "overall") {
    if (selectedSprint && userRank?.monthlyRank && userRank.monthPointObj) {
      return {
        rank: userRank.monthlyRank[selectedSprint],
        pts: userRank.monthPointObj[selectedSprint],
      };
    } else {
      return {
        rank: "-",
        pts: 0,
      };
    }
  } else if (period === "week") {
    if (selectedRound && userRank?.weeklyRank && userRank.weekPointObj) {
      return {
        rank: userRank.weeklyRank[selectedRound],
        pts: userRank.weekPointObj[selectedRound],
      };
    } else {
      return {
        rank: "-",
        pts: 0,
      };
    }
  } else {
    return { rank: userRank?.rank, pts: userRank?.totalFitPoints };
  }
};

export const getProgressParams = (
  viewType?: viewTypes,
  playerRank?: string | number,
  teamRank?: string | number,
  myPts?: number,
  teamPts?: number,
  competitionPts?: number
) => {
  const compet = competitionPts ? competitionPts + 1 : 6;
  const my = myPts ? myPts : 1;
  const myTeam = teamPts ? teamPts : 1;

  if (viewType === "players" && typeof playerRank === "number") {
    return {
      start: playerRank,
      diff: compet - my,
      // startPoints: myPts,
      percent: my / compet,
      // end: playerRank - 1 > 0 ? playerRank - 1 : 0,
    };
  } else if (viewType === "teams" && typeof teamRank === "number") {
    return {
      start: teamRank,
      diff: compet - myTeam,
      percent: myTeam / compet,
      // end: teamRank - 1 > 0 ? teamRank - 1 : 0,
    };
  }

  return {
    start: "-",
    diff: 5,
    percent: 0.05,
  };
};

export const getDateStrings = () => {
  const nowDate = new Date();
  const nowStartUnix = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    0,
    0,
    0,
    0
  ).getTime();

  const nowString = format(
    new Date(nowStartUnix - 1 * 24 * 60 * 60 * 1000),
    "yyyy-MM-dd"
  );
  const now_1_String = format(
    new Date(nowStartUnix - 2 * 24 * 60 * 60 * 1000),
    "yyyy-MM-dd"
  );

  return {
    yesterday: nowString,
    dayBefore: now_1_String,
  };
};
