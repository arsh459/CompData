import { getUserActivityAfter } from "../../../models/Activity/getUtils";
import { handleUserActivityReconcile } from "./handleUserLevelReconcile";

export const handleUserReconcileV2 = async (
  uid: string,
  th: number,
  after: number,
  before: number,
) => {
  const allUserActivities = await getUserActivityAfter(uid, after, before);
  const {
    totalCalories,
    totalFPoints,
    activePoints,
    dayCals,
    dayFitPoints,
    userLevel,
    progressV2,
  } = handleUserActivityReconcile(allUserActivities, th);

  const filteredCals: { [day: string]: number } = {};
  const filteredPts: { [day: string]: number } = {};
  for (const day of Object.keys(dayCals)) {
    if (dayCals[day]) {
      filteredCals[day] = dayCals[day];
    }

    if (dayFitPoints[day]) {
      filteredPts[day] = dayFitPoints[day];
    }
  }

  return {
    totalCalories,
    totalFPoints,
    progressV2,
    activePoints,
    userLevel,
    dayCals: filteredCals,
    dayFitPoints: filteredPts,
  };
};
