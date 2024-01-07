import { Activity } from "../Activity/Activity";

export const calculateAvgSpeed = (activities: Activity[]) => {
  let totalDistance: number = 0;
  let totalTime: number = 0;
  for (const act of activities) {
    totalTime += act.timeInSeconds ? act.timeInSeconds : 0;
    totalDistance += act.distanceInMeters ? act.distanceInMeters : 0;
  }

  if (totalTime) {
    const speedInMeterSecond = totalDistance / totalTime;
    return {
      avgSpeed: speedInMeterSecond * (18 / 5),
      totalDistance,
    };
  }

  return {
    avgSpeed: 0,
    totalDistance: 0,
  };
};
