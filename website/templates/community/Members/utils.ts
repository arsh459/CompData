import { EventInterface } from "@models/Event/Event";
import { formatWithCommas } from "@utils/number";
import { leaderboardKPIs } from "@models/Event/Event";
import { capitalize } from "@mui/material";

export const getWeekString = (week: string) => {
  const wkString = week.replace("-", " ");
  const wkList = wkString.split(" ");
  // console.log("wkList", wkList);

  return capitalize(`${wkList[0]} ${Number.parseInt(wkList[1]) + 1}`);
};

export const getRank = (
  selectedLeaderboard: leaderboardKPIs,
  rank?: number,
  avgSpeedRank?: number,
  streakRank?: number,
  distanceRank?: number
) => {
  if (selectedLeaderboard === "avgSpeed") {
    return avgSpeedRank ? avgSpeedRank : "-";
  }

  if (selectedLeaderboard === "streak") {
    return streakRank ? streakRank : "-";
  }

  if (selectedLeaderboard === "distance") {
    return distanceRank ? distanceRank : "-";
  }

  return rank ? rank : "";
};

export const getEventNames = (
  allEvents: EventInterface[],
  enrolledEvents?: string[]
) => {
  if (enrolledEvents) {
    return allEvents.filter((item) => enrolledEvents.includes(item.id));
  }

  return [];
};

export const getSpeedString = (speed?: number) => {
  return `${speed ? Math.round(speed * 100) / 100 : 0} ${"km/h"}`;
};

export const getDistanceString = (distance?: number) => {
  return `${distance ? Math.round(distance / 10) / 100 : 0} ${"km(s)"}`;
};

export const getCalString = (cals?: number, activities?: number) => {
  return `${cals ? formatWithCommas(Math.round(cals)) : 0} ${
    cals && cals > 1 ? "cals" : "cal"
  }`;

  if (cals && activities) {
    return `${formatWithCommas(cals)} cals | ${activities} effort(s)`;
  } else if (!cals && activities) {
    return `0 cals | ${activities} efforts`;
  } else if (!cals && !activities) {
    return `No efforts`;
  } else {
    return `${formatWithCommas(cals)} cals | 1 effort`;
  }
};

export const getPointString = (points?: number) => {
  return `${points ? formatWithCommas(Math.round(points)) : 0} ${
    points && points > 1 ? "points" : "points"
  }`;
};

// export const getCohortNames = (
//   allEventCohorts: {
//     [eId: string]: { [cohortId: string]: Cohort };
//   },
//   enrolledEvents?: string[],
//   enrolledCohorts?: string[],
// ) => {

//     const enrolledEventCohorts: {[eventId: string]: string[]} = {};
//     if (enrolledEvents && enrolledCohorts) {
//         for (const enrolledEvent of enrolledEvents){
//             const eventCohorts = allEventCohorts[enrolledEvent];

//             for
//         }

//     }
// };
