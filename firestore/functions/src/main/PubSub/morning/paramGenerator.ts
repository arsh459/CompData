import { UserRank } from "../../../models/Activity/Activity";
import { Param } from "../../../models/Conversations/sendHSM";
import { formatWithCommas } from "./utils";

export const createParamsForWorkoutUpdate = (
  month: string,
  parentEventName: string,
  toUserName: string | undefined,
  eventName: string | undefined,
  userRank1: UserRank,
  userRank2: UserRank,
  link: string,
  coachName: string | undefined,
  toUserRank?: UserRank,
): Param[] => {
  return [
    {
      default: toUserName ? `${toUserName.trim()}` : "there",
    },

    {
      default: parentEventName
        ? `*${parentEventName.trim()}*`
        : eventName
        ? `*${eventName.trim()}*`
        : "SB Game",
    },

    // rank 1
    {
      default: userRank1.rank ? `*${getRankString(userRank1, month)}*` : "1",
    },
    {
      default: userRank1.authorName ? `*${userRank1.authorName}*` : "Athlete I",
    },
    {
      default: `*${getPointString(userRank1, month)}*`,
    },

    // rank 2
    {
      default: userRank2.rank ? `*${getRankString(userRank2, month)}*` : "2",
    },
    {
      default: userRank2.authorName
        ? `*${userRank2.authorName}*`
        : "Athlete II",
    },
    {
      default: `*${getPointString(userRank2, month)}*`,
    },

    // my rank
    {
      default: toUserRank ? `*${getRankString(toUserRank, month)}*` : "-",
    },
    {
      default: toUserRank ? `*${getPointString(toUserRank, month)}*` : "0pts",
    },

    {
      default: `${link}`,
    },

    // coach name
    {
      default: coachName ? `${coachName}` : "SocialBoat",
    },
  ];
};

// const getCalorieString = (cals: number | undefined) => {
//   return `${formatWithCommas(cals ? cals : 0)} cals`;
// };

const getPointString = (userRank: UserRank, week: string) => {
  if (userRank.monthPointObj && userRank.monthPointObj[week]) {
    return `${formatWithCommas(
      userRank.monthPointObj[week] ? userRank.monthPointObj[week] : 0,
    )} pts`;
  }

  return `0 pts`;
};

const getRankString = (userRank: UserRank, month: string) => {
  if (userRank.monthlyRank && userRank.monthlyRank[month]) {
    return `${userRank.monthlyRank[month]}`;
  }

  return `-`;
};

// export const createParamsForWorkoutReminder = (
//   toUserName: string,
//   eventName: string,
//   userRank1: UserRank,
//   userRank2: UserRank,
//   link: string,
//   coachName: string,
//   toUserRank?: UserRank,
// ): Param[] => {
//   return [
//     {
//       default: `${toUserName.trim()}`,
//     },

//     // rank 1
//     {
//       default: `*${userRank1.rank}*`,
//     },
//     {
//       default: `*${userRank1.authorName}*`,
//     },
//     {
//       default: `*${getPointString(userRank1.fitPointsV2)}*`,
//     },

//     // rank 2
//     {
//       default: `*${userRank2.rank}*`,
//     },
//     {
//       default: `*${userRank2.authorName}*`,
//     },
//     {
//       default: `*${getPointString(userRank2.fitPointsV2)}*`,
//     },

//     // my rank
//     {
//       default: `*${toUserRank?.rank ? toUserRank.rank : "-"}*`,
//     },
//     {
//       default: `*${getPointString(toUserRank?.fitPointsV2)}*`,
//     },

//     {
//       default: `*${eventName.trim()}*`,
//     },

//     {
//       default: `${link}`,
//     },

//     // coach name
//     {
//       default: `${coachName}`,
//     },
//   ];
// };
