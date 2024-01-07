import {
  ActivityUserPts,
  CoachRank,
  UserRank,
} from "../../../models/Activity/Activity";
// import { sbEventInterface } from "../../../models/sbEvent/sbEvent";

export const mapRanksToTeam = (userRanks: UserRank[]) => {
  const userRanksToTeam: { [coachUID: string]: UserRank[] } = {};
  for (const userRank of userRanks) {
    if (userRank.coachCommunityId) {
      if (!userRanksToTeam[userRank.coachCommunityId]) {
        userRanksToTeam[userRank.coachCommunityId] = [];
      }

      userRanksToTeam[userRank.coachCommunityId].push(userRank);
    }
  }

  return userRanksToTeam;
};

export const reconcileCoachAndUser = (
  coachRanks: CoachRank[],
  userRanks: UserRank[],
) => {
  const userActObj: { [uid: string]: { [month: string]: ActivityUserPts[] } } =
    {};
  for (const coachRank of coachRanks) {
    const coachActObj = coachRank.monthActPts;

    if (coachActObj) {
      for (const month of Object.keys(coachActObj)) {
        const selectedActs = coachActObj[month];
        if (selectedActs) {
          for (const actObj of selectedActs) {
            if (!userActObj[actObj.uid]) {
              userActObj[actObj.uid] = {};
            }

            if (!userActObj[actObj.uid][month]) {
              userActObj[actObj.uid][month] = [];
            }

            // update act obj
            userActObj[actObj.uid][month].push(actObj);
          }
        }
      }
    }
  }

  const newRanks: UserRank[] = [];
  for (const rank of userRanks) {
    if (userActObj[rank.uid]) {
      const newMonthPointObj: { [month: string]: number } = {};
      for (const month of Object.keys(userActObj[rank.uid])) {
        const actPts = userActObj[rank.uid][month];
        if (actPts) {
          const monthPts = actPts.reduce((acc, b) => acc + b.fp, 0);
          if (newMonthPointObj[month]) {
            newMonthPointObj[month] += monthPts;
          } else {
            newMonthPointObj[month] = monthPts;
          }
        }
      }

      newRanks.push({
        ...rank,
        monthActPts: userActObj[rank.uid],
        monthPointObj: newMonthPointObj,
      });
    } else {
      newRanks.push({
        ...rank,
        monthActPts: {},
        monthPointObj: {},
      });
    }
  }

  return newRanks;
};
