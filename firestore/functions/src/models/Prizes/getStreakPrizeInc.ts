// import { handleUserActivityReconcile } from "../../main/Https/refreshUserLevels/handleUserLevelReconcile";
// import { getUserActivityAfter } from "../Activity/getUtils";
// import {
//   getMonthlyBucketForUser,
//   getWeeklyBucketForUser,
// } from "./getPodiumFinishes";

// export const getStreakPrizeInc = async (
//   uid: string,
//   after: number,
//   // before: number,
//   fitPointTh: number,
//   daysElapsed: number,
//   activityAfter: number,
//   activityBefore: number,
//   sprintLength: number,
//   roundLength: number,
// ) => {
//   // console.log("after", activityAfter, activityBefore);

//   // throw new Error("PAUSED");
//   const userActivities = await getUserActivityAfter(
//     uid,
//     activityAfter,
//     activityBefore,
//   );

//   const { totalFPoints, dayFitPoints, totalCalories, dayCals } =
//     handleUserActivityReconcile(userActivities, fitPointTh);

//   //   console.log("total", totalFPoints);
//   //   console.log("dayFitPoints", dayFitPoints);
//   //   console.log("totalCalories", totalCalories);
//   //   console.log("dayCals", dayCals);

//   const weekFitPoints = getWeeklyBucketForUser(
//     dayFitPoints,
//     daysElapsed,
//     after,
//     roundLength,
//     sprintLength,
//   );

//   //   console.log("week", weekFitPoints);

//   // throw new Error("PAUSED");

//   const monthPointObj = getMonthlyBucketForUser(
//     dayFitPoints,
//     daysElapsed,
//     after,
//     sprintLength,
//   );

//   // console.log("monthPointObj", monthPointObj);

//   const monthCalObj = getMonthlyBucketForUser(
//     dayCals,
//     daysElapsed,
//     after,
//     sprintLength,
//   );

//   const weekCalObj = getWeeklyBucketForUser(
//     dayCals,
//     daysElapsed,
//     after,
//     roundLength,
//     sprintLength,
//   );

//   return {
//     totalFPoints,
//     weekFitPoints,
//     dayFitPoints,
//     weekCalObj,
//     totalCalories,
//     dayCals,
//     monthPointObj,
//     monthCalObj,
//   };
// };
