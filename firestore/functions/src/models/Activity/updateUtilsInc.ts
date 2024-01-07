// import { getDayBucket } from "../../main/Https/refreshUserLevels/handleUserLevelReconcile";
// import { getCurrentWeekV2 } from "../Prizes/getChallengeStats";
// // import { getStreakPrizeInc } from "../Prizes/getStreakPrizeInc";
// // import { getStreakPrizeV2 } from "../Prizes/getStreakPrizeV2";
// import { UserInterface } from "../User/User";
// import { UserRank } from "./Activity";

// export const updateActivityInRankObjV2Inc = async (
//   user: UserInterface,
//   after: number,
//   daysElapsed: number,
//   eventId: string,
//   coachEventId: string,
//   communityId: string,
//   fitPointTh: number,
//   teamName: string,
//   teamKey: string,
//   eventJoinTime: number,
//   activityAfter: number,
//   activityBefore: number,
//   sprintLength: number,
//   roundLength: number,
//   rankObj?: UserRank,
// ): Promise<UserRank | undefined> => {
//   //   console.log("user", user.name);

//   if (rankObj) {
//     const {
//       dayFitPoints,
//       totalFPoints,
//       weekFitPoints,
//       totalCalories,
//       weekCalObj,
//       dayCals,
//       monthPointObj,
//       monthCalObj,
//     } = await getStreakPrizeInc(
//       user.uid,
//       after,
//       // before,
//       fitPointTh,
//       daysElapsed,
//       activityAfter,
//       activityBefore,
//       sprintLength,
//       roundLength,
//     );

//     const currentDay = getDayBucket(activityBefore);
//     const { currentMonth, currentWeek } = getCurrentWeekV2(
//       sprintLength,
//       roundLength,
//       after,
//       daysElapsed,
//     );

//     return mergeUserRanks(
//       rankObj,
//       currentWeek,
//       currentMonth,
//       currentDay,
//       totalFPoints,
//       totalCalories,
//       dayFitPoints,
//       dayCals,
//       weekFitPoints,
//       weekCalObj,
//       monthPointObj,
//       monthCalObj,
//       teamName,
//       teamKey,
//       coachEventId,
//     );
//   } else {
//     const {
//       dayFitPoints,
//       totalFPoints,
//       weekFitPoints,
//       totalCalories,
//       weekCalObj,
//       dayCals,
//       monthPointObj,
//       monthCalObj,
//     } = await getStreakPrizeInc(
//       user.uid,
//       after,
//       // before,
//       fitPointTh,
//       daysElapsed,
//       eventJoinTime,
//       activityBefore,
//       sprintLength,
//       roundLength,
//     );
//     return {
//       rank: -1,
//       communityRank: -1,
//       uid: user.uid,
//       coachCommunityId: communityId,
//       coachEventId: coachEventId,
//       eventId: eventId,
//       teamName: teamName,
//       teamKey,

//       fitPointsV2: totalFPoints,
//       weekPointObj: weekFitPoints,
//       dayPointObj: dayFitPoints,
//       totalCalories: totalCalories,
//       weekCalObj: weekCalObj,
//       dayCalObj: dayCals,
//       monthPointObj: monthPointObj,
//       monthCalObj: monthCalObj,
//       userLevelV2: user.userLevelV2 ? user.userLevelV2 : 0,

//       updatedOn: Date.now(),

//       prizes: [],
//       numActivities: 0,

//       ...(user.name ? { authorName: user.name } : {}),
//       ...(user.profileImage ? { authorImg: user.profileImage } : {}),
//     };
//   }
// };

// const mergeUserRanks = (
//   rankObj: UserRank,
//   currentWeek: string,
//   currentMonth: string,
//   currentDay: string,
//   totalFPoints: number,
//   totalCalories: number,
//   dayFitPoints: { [day: string]: number },
//   dayCals: { [day: string]: number },
//   weekFitPoints: { [week: string]: number },
//   weekCalObj: { [week: string]: number },
//   monthPointObj: { [month: string]: number },
//   monthCalObj: { [month: string]: number },
//   teamName: string,
//   teamKey: string,
//   coachEventId?: string,
// ): UserRank => {
//   return {
//     ...rankObj,
//     fitPointsV2: (rankObj.fitPointsV2 ? rankObj.fitPointsV2 : 0) + totalFPoints,
//     weekPointObj: {
//       ...rankObj.weekPointObj,
//       [currentWeek]:
//         rankObj.weekPointObj && rankObj.weekPointObj[currentWeek]
//           ? rankObj.weekPointObj[currentWeek]
//           : 0 + weekFitPoints[currentWeek],
//     },
//     dayPointObj: {
//       ...rankObj.dayPointObj,
//       [currentDay]:
//         rankObj.dayPointObj && rankObj.dayPointObj[currentDay]
//           ? rankObj.dayPointObj[currentDay]
//           : 0 + dayFitPoints[currentDay],
//     },
//     totalCalories:
//       (rankObj.totalCalories ? rankObj.totalCalories : 0) + totalCalories,
//     weekCalObj: {
//       ...rankObj.weekCalObj,
//       [currentWeek]:
//         rankObj.weekCalObj && rankObj.weekCalObj[currentWeek]
//           ? rankObj.weekCalObj[currentWeek]
//           : 0 + weekCalObj[currentWeek],
//     },
//     dayCalObj: {
//       ...rankObj.dayCalObj,
//       [currentDay]:
//         rankObj.dayCalObj && rankObj.dayCalObj[currentDay]
//           ? rankObj.dayCalObj[currentDay]
//           : 0 + dayCals[currentDay],
//     },
//     monthPointObj: {
//       ...rankObj.monthPointObj,
//       [currentMonth]:
//         rankObj.monthPointObj && rankObj.monthPointObj[currentMonth]
//           ? rankObj.monthPointObj[currentMonth]
//           : 0 + monthPointObj[currentMonth],
//     },
//     monthCalObj: {
//       ...rankObj.monthCalObj,
//       [currentMonth]:
//         rankObj.monthCalObj && rankObj.monthCalObj[currentMonth]
//           ? rankObj.monthCalObj[currentMonth]
//           : 0 + monthCalObj[currentMonth],
//     },

//     teamName: teamName,
//     teamKey,

//     ...(coachEventId ? { coachEventId: coachEventId } : {}),
//     updatedOn: Date.now(),
//   };
// };
