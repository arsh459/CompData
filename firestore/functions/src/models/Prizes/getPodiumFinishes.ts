import {
  CoachPrizes,
  CoachRank,
  UserPrizes,
  UserRank,
} from "../Activity/Activity";
// import { unixTzCorrection } from "./countStreaks";
// import { format } from "date-fns";
import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
import {
  getDayStartIST,
  getFormattedDateForUnix,
} from "../../main/PubSub/activityTracker/utils";

// export const getMemberPodiumFinish = (userRank: UserRank) => {
//   if (userRank.rank === 1) {
//     return "gold";
//   } else if (userRank.rank === 2) {
//     return "silver";
//   } else if (userRank.rank === 3) {
//     return "bronze";
//   }

//   return "unranked";
// };
const getMonthlyBucket = (
  dayCalObj: { [day: string]: number },
  after: number,
  sprintLength: number,
) => {
  const dStart = getDayStartIST(after);

  // console.log("dayCalObj", dayCalObj);
  let monthSum: number = 0;
  for (let i = 0; i < sprintLength; i++) {
    //
    const nowDateUnix = dStart + i * 24 * 60 * 60 * 1000;

    const nowDateStringV2 = getFormattedDateForUnix(nowDateUnix);
    // const nowDateStringV2 = format(new Date(nowDateUnix), "yyyy-MM-dd");

    monthSum += dayCalObj[nowDateStringV2] ? dayCalObj[nowDateStringV2] : 0;
    // console.log("i", i, nowDateString, dayCalObj[nowDateString], weekSum);
  }

  return monthSum;
};

const getMonthlyBucketV2 = (
  dayTaskPointObj: { [day: string]: { [taskId: string]: number } },
  after: number,
  sprintLength: number,
) => {
  const dStart = getDayStartIST(after);

  // console.log("dayCalObj", dayCalObj);
  let monthSum: number = 0;
  for (let i = 0; i < sprintLength; i++) {
    //
    const nowDateUnix = dStart + i * 24 * 60 * 60 * 1000;

    const nowDateStringV2 = getFormattedDateForUnix(nowDateUnix);

    const dayTaskObj = dayTaskPointObj[nowDateStringV2];
    let dayPts: number = 0;
    if (dayTaskObj) {
      dayPts = Object.values(dayTaskObj).reduce((a, b) => a + b, 0);
    }

    monthSum += dayPts;
    // console.log("i", i, nowDateString, dayCalObj[nowDateString], weekSum);
  }

  return monthSum;
};

const getMonthlyTaskList = (
  dayTaskObj: { [day: string]: { [taskId: string]: number } },
  after: number,
  sprintLength: number,
) => {
  const dStart = getDayStartIST(after);

  // console.log("dayCalObj", dayCalObj);

  const monthTaskObj: { [taskId: string]: number } = {};
  for (let i = 0; i < sprintLength; i++) {
    //
    const nowDateUnix = dStart + i * 24 * 60 * 60 * 1000;

    const nowDateStringV2 = getFormattedDateForUnix(nowDateUnix);
    // const nowDateStringV2 = format(new Date(nowDateUnix), "yyyy-MM-dd");

    const taskObjForDay = dayTaskObj[nowDateStringV2]
      ? dayTaskObj[nowDateStringV2]
      : {};
    for (const taskId of Object.keys(taskObjForDay)) {
      const currentTaskPts = taskObjForDay[taskId];
      const prevTaskPts = monthTaskObj[taskId] ? monthTaskObj[taskId] : 0;
      if (currentTaskPts > prevTaskPts) {
        monthTaskObj[taskId] = currentTaskPts;
      }
    }
    // console.log("i", i, nowDateString, dayCalObj[nowDateString], weekSum);
  }

  return monthTaskObj;
};

const getWeeklyBucket = (
  dayCalObj: { [day: string]: number },
  after: number,
  roundLength: number,
) => {
  const dStart = getDayStartIST(after);
  // console.log("dayCalObj", dayCalObj);
  let weekSum: number = 0;
  for (let i = 0; i < roundLength; i++) {
    const nowDateUnix = dStart + i * 24 * 60 * 60 * 1000;
    // const nowDateString = new Date(nowDateUnix).toDateString();
    const nowDateStringV2 = getFormattedDateForUnix(nowDateUnix);

    // const nowDateStringV2 = format(new Date(nowDateUnix), "yyyy-MM-dd");
    // console.log(
    //   "nowDateStringV2",
    //   nowDateStringV2,
    //   dayCalObj[nowDateStringV2] ? dayCalObj[nowDateStringV2] : 0,
    // );

    weekSum += dayCalObj[nowDateStringV2] ? dayCalObj[nowDateStringV2] : 0;
    // console.log("i", i, nowDateString, dayCalObj[nowDateString], weekSum);
  }

  return weekSum;
};

// export const getMonthlyUserActivityBucket = () => {};

export const getWeeklyBucketForUser = (
  dayCalObj: { [day: string]: number },
  daysElapsed: number,
  startDateUnix: number,
  rounds: RoundObject[],
  // sprints: SprintObject[],
) => {
  // console.log("days", daysElapsed, startDateUnix);
  let j: number = 0;
  const weekObjs: { [week: string]: number } = {};
  for (const round of rounds) {
    const roundStart = startDateUnix + j * 24 * 60 * 60 * 1000;

    // only active round cals
    // if (round.type === "ACTIVE") {
    const roundBucket = getWeeklyBucket(dayCalObj, roundStart, round.length);
    // console.log("roundBucket", roundBucket);
    weekObjs[round.id] = roundBucket;
    // }

    j += round.length;

    if (daysElapsed < j) {
      break;
    }
  }

  // for (let i = 0; i < daysElapsed; i++) {
  //   // console.log("i", i, isWeekStart(i, roundLength, sprintLength));
  //   // get round
  //   if (isWeekStart(i, roundLength, sprintLength)) {
  //     const nowDateUnix =
  //       startDateUnix + unixTzCorrection + i * 24 * 60 * 60 * 1000;

  //     const weekBucketSum = getWeeklyBucket(
  //       dayCalObj,
  //       nowDateUnix,
  //       roundLength,
  //     );

  //     weekObjs[`week-${j}`] = weekBucketSum;

  //     j++;
  //   }
  // }

  // for (let i = 0; i < daysElapsed; i += roundLength) {
  //   if (isRoundValid(j, roundLength, sprintLength)) {
  //     const nowDateUnix =
  //       startDateUnix + unixTzCorrection + i * 24 * 60 * 60 * 1000;

  //     const weekBucketSum = getWeeklyBucket(
  //       dayCalObj,
  //       nowDateUnix,
  //       roundLength,
  //     );

  //     // console.log(`week-${j}`, weekBucketSum);

  //     weekObjs[`week-${j}`] = weekBucketSum;

  //     j++;
  //   }
  // }

  return weekObjs;
};

export const getMonthlyTaskBucketForUser = (
  dayTaskObj: { [day: string]: { [taskId: string]: number } },
  daysElapsed: number,
  startDateUnix: number,
  sprints: SprintObject[],
) => {
  let j: number = 0;
  const finalMonthTaskObj: { [month: string]: { [taskId: string]: number } } =
    {};
  for (const sprint of sprints) {
    const sprintStart = startDateUnix + j * 24 * 60 * 60 * 1000;

    const monthTaskObj = getMonthlyTaskList(
      dayTaskObj,
      sprintStart,
      sprint.length,
    );

    finalMonthTaskObj[sprint.id] = monthTaskObj;

    j += sprint.length;

    // if in future
    if (daysElapsed < j) {
      break;
    }
  }

  return finalMonthTaskObj;
};

export const getMonthlyBucketForUserV2_dep = (
  dayTaskPointObj: { [day: string]: { [taskId: string]: number } },
  daysElapsed: number,
  startDateUnix: number,
  sprints: SprintObject[],
) => {
  const monthObjs: { [month: string]: number } = {};
  let j: number = 0;

  for (const sprint of sprints) {
    const sprintStart = startDateUnix + j * 24 * 60 * 60 * 1000;

    const monthBucketSum = getMonthlyBucketV2(
      dayTaskPointObj,
      sprintStart,
      sprint.length,
    );

    monthObjs[sprint.id] = monthBucketSum;

    j += sprint.length;

    // if in future
    if (daysElapsed < j) {
      break;
    }
  }

  return monthObjs;
};

export const getMonthlyBucketForUser = (
  dayPointObj: { [day: string]: number },
  daysElapsed: number,
  startDateUnix: number,
  sprints: SprintObject[],
) => {
  const monthObjs: { [month: string]: number } = {};
  let j: number = 0;

  for (const sprint of sprints) {
    const sprintStart = startDateUnix + j * 24 * 60 * 60 * 1000;

    const monthBucketSum = getMonthlyBucket(
      dayPointObj,
      sprintStart,
      sprint.length,
    );

    monthObjs[sprint.id] = monthBucketSum;

    j += sprint.length;

    // if in future
    if (daysElapsed < j) {
      break;
    }
  }

  // for (let i = 0; i < daysElapsed; i += sprintLength) {
  //   const nowDateUnix =
  //     startDateUnix + unixTzCorrection + i * 24 * 60 * 60 * 1000;

  //   const monthBucketSum = getMonthlyBucket(
  //     dayPointObj,
  //     nowDateUnix,
  //     sprintLength,
  //   );

  //   monthObjs[`month-${j}`] = monthBucketSum;

  //   j++;
  // }

  return monthObjs;
};

const getCombinedWeekBucket = (
  userRanks: UserRank[],
  challengeLength: number,
  startDateUnix: number,
  roundLength: number,
  sprintLength: number,
) => {
  // const weeklyUserObjs: { [uid: string]: { [week: string]: number } } = {};
  const userRankUpdated: UserRank[] = [];
  for (const userRank of userRanks) {
    // console.log("user", userRank.authorName);
    if (userRank.dayCalObj) {
      userRankUpdated.push({
        ...userRank,
        weekCalObj: getWeeklyBucketForUser(
          userRank.dayCalObj,
          challengeLength,
          startDateUnix,
          [],
          // sprintLength,
        ),
      });
    }
  }

  return userRankUpdated;
};

const getWeeklyPrize = (
  userWeek: { userRank: UserRank; sumWeek: number }[],
  awardedUIDObj: { [uid: string]: boolean },
) => {
  userWeek.sort((a, b) => -a.sumWeek + b.sumWeek);

  let first: UserRank | undefined = undefined;
  let second: UserRank | undefined = undefined;
  let third: UserRank | undefined = undefined;
  for (const usr of userWeek) {
    if (!first && !awardedUIDObj[usr.userRank.uid]) {
      first = usr.userRank;
      awardedUIDObj[usr.userRank.uid] = true;
      continue;
    }

    if (!second && !awardedUIDObj[usr.userRank.uid]) {
      second = usr.userRank;
      awardedUIDObj[usr.userRank.uid] = true;
      continue;
    }

    if (!third && !awardedUIDObj[usr.userRank.uid]) {
      third = usr.userRank;
      awardedUIDObj[usr.userRank.uid] = true;
      break;
    }
  }

  return {
    first: first,
    second: second,
    third: third,
    awardedUIDObj,
  };
};

// const invertObjPoints = (challengeLength: number, userRanks: UserRank[]) => {
//   let j: number = 0;
//   const weeklyUserObjs: {
//     [week: string]: { userRank: UserRank; sumWeek: number }[];
//   } = {};
//   for (let i = 0; i < challengeLength; i += 7) {
//     for (const userRank of userRanks) {
//       // console.log("u", userRank.authorName, userRank.dayPointObj, j);
//       if (
//         weeklyUserObjs[`week-${j}`] &&
//         userRank?.weekPointObj &&
//         userRank?.weekPointObj[`week-${j}`]
//       ) {
//         weeklyUserObjs[`week-${j}`].push({
//           userRank: userRank,
//           sumWeek: userRank?.weekPointObj[`week-${j}`],
//         });
//       } else if (
//         userRank?.weekPointObj &&
//         userRank?.weekPointObj[`week-${j}`]
//       ) {
//         weeklyUserObjs[`week-${j}`] = [
//           {
//             userRank: userRank,
//             sumWeek: userRank?.weekPointObj[`week-${j}`],
//           },
//         ];
//       }
//     }

//     j++;
//   }

//   return weeklyUserObjs;
// };

const invertObj = (challengeLength: number, userRanks: UserRank[]) => {
  let j: number = 0;
  const weeklyUserObjs: {
    [week: string]: { userRank: UserRank; sumWeek: number }[];
  } = {};
  for (let i = 0; i < challengeLength; i += 7) {
    for (const userRank of userRanks) {
      if (
        weeklyUserObjs[`week-${j}`] &&
        userRank?.weekCalObj &&
        userRank?.weekCalObj[`week-${j}`]
      ) {
        weeklyUserObjs[`week-${j}`].push({
          userRank: userRank,
          sumWeek: userRank?.weekCalObj[`week-${j}`],
        });
      } else if (userRank?.weekCalObj && userRank?.weekCalObj[`week-${j}`]) {
        weeklyUserObjs[`week-${j}`] = [
          {
            userRank: userRank,
            sumWeek: userRank?.weekCalObj[`week-${j}`],
          },
        ];
      }
    }

    j++;
  }

  return weeklyUserObjs;
};

const getWeeklyPrizeLabel = (rank: number) => {
  if (rank === 1) {
    return "first";
  } else if (rank === 2) {
    return "second";
  }

  return "third";
};

export const getMonthlyPrizes_points = (
  userRanks: UserRank[] | CoachRank[],
) => {
  const globalPrizes: UserPrizes | CoachPrizes = {};

  for (let j: number = 0; j <= 4; j++) {
    for (const userRank of userRanks) {
      if (
        userRank.monthlyRank &&
        userRank.monthlyRank[`month-${j}`] &&
        userRank.monthlyRank[`month-${j}`] <= 3
      ) {
        if (globalPrizes[`month-${j}`]) {
          // add global prize
          globalPrizes[`month-${j}`][
            getWeeklyPrizeLabel(userRank.monthlyRank[`month-${j}`])
          ] = userRank;
        } else {
          globalPrizes[`week-${j}`] = {
            [getWeeklyPrizeLabel(userRank.monthlyRank[`month-${j}`])]: userRank,
          };
        }
      }
    }
  }

  return globalPrizes;
};

export const typeCastToUserPrizes = (
  globalPrizes: UserPrizes | CoachPrizes,
) => {
  return globalPrizes as UserPrizes;
};

export const typeCastToCoachPrizes = (
  globalPrizes: UserPrizes | CoachPrizes,
) => {
  return globalPrizes as CoachPrizes;
};

export const getWeeklyPrizes_Points = (
  userRanks: UserRank[] | CoachRank[],
  // challengeLength: number,
  // startDateUnix: number,
) => {
  const globalPrizes: UserPrizes | CoachPrizes = {};

  // let j: number = 0;
  for (let j: number = 0; j <= 4; j++) {
    for (const userRank of userRanks) {
      if (
        userRank.weeklyRank &&
        userRank.weeklyRank[`week-${j}`] &&
        userRank.weeklyRank[`week-${j}`] <= 3
      ) {
        if (globalPrizes[`week-${j}`]) {
          // add global prize
          globalPrizes[`week-${j}`][
            getWeeklyPrizeLabel(userRank.weeklyRank[`week-${j}`])
          ] = userRank;
        } else {
          globalPrizes[`week-${j}`] = {
            [getWeeklyPrizeLabel(userRank.weeklyRank[`week-${j}`])]: userRank,
          };
        }
      }
    }
  }

  // const invertedWeeks = invertObjPoints(challengeLength, userRanks);

  // let awardedUIDs: { [uid: string]: boolean } = {};
  // for (let i = 0; i < challengeLength; i += 7) {
  //   if (invertedWeeks[`week-${j}`]) {
  //     const { first, second, third, awardedUIDObj } = getWeeklyPrize(
  //       invertedWeeks[`week-${j}`],
  //       awardedUIDs,
  //     );
  //     globalPrizes[`week-${j}`] = { first, second, third };
  //     awardedUIDs = { ...awardedUIDs, ...awardedUIDObj };
  //   } else {
  //     globalPrizes[`week-${j}`] = {};
  //   }

  //   j++;
  // }

  return globalPrizes;
};

export const getWeeklyPrizes = (
  userRanks: UserRank[],
  challengeLength: number,
  startDateUnix: number,
  roundLength: number,
  sprintLength: number,
) => {
  const userRanksUpdated = getCombinedWeekBucket(
    userRanks,
    challengeLength,
    startDateUnix,
    roundLength,
    sprintLength,
  );

  const invertedWeeks = invertObj(challengeLength, userRanksUpdated);

  // console.log("invertedWeeks", invertedWeeks);

  let j: number = 0;
  const globalPrizes: {
    [week: string]: { first?: UserRank; second?: UserRank; third?: UserRank };
  } = {};
  let awardedUIDs: { [uid: string]: boolean } = {};
  for (let i = 0; i < challengeLength; i += 7) {
    if (invertedWeeks[`week-${j}`]) {
      const { first, second, third, awardedUIDObj } = getWeeklyPrize(
        invertedWeeks[`week-${j}`],
        awardedUIDs,
      );
      globalPrizes[`week-${j}`] = { first, second, third };
      awardedUIDs = { ...awardedUIDs, ...awardedUIDObj };
    } else {
      globalPrizes[`week-${j}`] = {};
    }

    j++;
  }

  return globalPrizes;

  // console.log("awardedTo", awardedTo);
};

export const getMemberPodiumFinishes = (userRanks: UserRank[]) => {
  userRanks.sort((a, b) => a.rank - b.rank);

  let goldWinner: UserRank | undefined = undefined;
  let gold = "";
  if (userRanks.length >= 1) {
    gold = userRanks[0].coachCommunityId;
    goldWinner = userRanks[0];
  }

  let silverWinner: UserRank | undefined = undefined;
  let silver = "";
  if (userRanks.length >= 2) {
    silver = userRanks[1].coachCommunityId;
    silverWinner = userRanks[1];
  }

  let bronzeWinner: UserRank | undefined = undefined;
  let bronze = "";
  if (userRanks.length >= 3) {
    bronze = userRanks[2].coachCommunityId;
    bronzeWinner = userRanks[2];
  }

  return {
    gold,
    silver,
    bronze,
    goldWinner,
    silverWinner,
    bronzeWinner,
  };
};

export const getTeamPodiumFinishes = (coachRanks: CoachRank[]) => {
  coachRanks.sort((a, b) => a.rank - b.rank);

  let goldWinner: CoachRank | undefined = undefined;
  let gold = "";
  if (coachRanks.length >= 1) {
    gold = coachRanks[0].uid;
    goldWinner = coachRanks[0];
  }

  let silverWinner: CoachRank | undefined = undefined;
  let silver = "";
  if (coachRanks.length >= 2) {
    silver = coachRanks[1].uid;
    silverWinner = coachRanks[1];
  }

  let bronzeWinner: CoachRank | undefined = undefined;
  let bronze = "";
  if (coachRanks.length >= 3) {
    bronze = coachRanks[2].uid;
    bronzeWinner = coachRanks[2];
  }

  return {
    gold,
    silver,
    bronze,
    goldWinner,
    silverWinner,
    bronzeWinner,
  };
};

// const isRoundValid = (
//   currentRound: number,
//   currentDay: number,
//   roundLength: number,
//   sprintLength: number,
// ) => {
//   const currentSprint = getCurrentSprint(currentDay, sprintLength);
//   const activeRoundsInSprint = getNumberOfRoundsInSprint(
//     roundLength,
//     sprintLength,
//   );

//   if (currentRound <= activeRoundsInSprint) {
//     return true;
//   }

//   return false;
// };

// const getCurrentSprint = (daysElapsed: number, sprintLength: number) => {
//   const sprint = Math.floor(daysElapsed / sprintLength);

//   return sprint;
// };

// const getCurrentRound = (daysElapsed: number, roundLength: number) => {
//   const round = Math.floor(daysElapsed / roundLength);

//   return round;
// };

// const getWeekStarts = (
//   daysElapsed: number,
//   roundLength: number,
//   sprintLength: number,
// ) => {
//   const numSprints = Math.ceil(daysElapsed / sprintLength);

//   const starts: number[] = [];
//   for (let i: number = 0; i < numSprints * sprintLength; i += roundLength) {
//     starts.push(i);
//   }
// };

// const isWeekStart = (
//   daysElapsed: number,
//   roundLength: number,
//   sprintLength: number,
// ) => {
//   // 0, 7, 14, 21, 30, 37

//   if ([0, 7, 14, 21, 30, 37, 44, 51, 58, 65].includes(daysElapsed)) {
//     return true;
//   }

//   return false;

//   // const sprint = Math.floor(daysElapsed / sprintLength);

//   // start of sprint
//   if (daysElapsed === sprintLength) {
//     return true;
//   }

//   const roundWhole = Math.floor(daysElapsed / roundLength);
//   const round = daysElapsed / roundLength;

//   // no full week present
//   if (daysElapsed + roundLength > sprintLength) {
//     return false;
//   }

//   return round === roundWhole;
// };

// const getNumberOfRoundsInSprint = (
//   roundLength: number,
//   sprintLength: number,
// ) => {
//   return Math.floor(sprintLength / roundLength);
// };
