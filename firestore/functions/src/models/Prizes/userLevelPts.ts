import { FIT_POINT_TH } from "../../constants/challenge";
import { handleLevelChange } from "../../main/Https/refreshUserLevels/handleLevelChange";
import { mergeUserActivityReconcileV2 } from "../../main/Https/refreshUserLevels/handleUserLevelReconcile";
import { Activity, ActivityUserPts } from "../Activity/Activity";
import { updateUserLevelV2 } from "../User/updateUserLevel";

export const getUserLevelPts = async (
  uid: string,
  pastActivityes: Activity[],
  prevCalObj: { [day: string]: number },
  prevPointObj: { [day: string]: number },
  previousUserLevel: number,
  activitiesAfter: number,
  activitiesBefore: number,
  sprintId: string,
  previousMonthActPts?: { [month: string]: ActivityUserPts[] },
) => {
  const { dayFitPoints, userLevel, activePoints, progressV2, dayCals } =
    mergeUserActivityReconcileV2(
      prevCalObj,
      prevPointObj,
      pastActivityes,
      FIT_POINT_TH,
      activitiesAfter,
      activitiesBefore,
      sprintId,
      previousMonthActPts,
    );

  // if (previousUserLevel !== userLevel) {
  // console.log("prevPointObj", prevPointObj);
  // console.log("dayFitPoints", dayFitPoints);
  // console.log("activePoints", activePoints);
  // console.log("progressV2", progressV2);
  // }
  // throw new Error("hI");

  await updateUserLevelV2(
    uid,
    dayFitPoints,
    dayCals,
    userLevel,
    activePoints,
    progressV2,
  );

  if (previousUserLevel !== userLevel) {
    await handleLevelChange(uid, previousUserLevel, userLevel, false);
  }

  return {
    userLevel,
    progressV2,
  };
};
