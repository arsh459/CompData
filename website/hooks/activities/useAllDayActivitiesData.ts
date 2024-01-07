import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";

export const useAllDayActivitiesData = (activities: Activity[]) => {
  const [calories, setCalories] = useState<number>(0);
  const [fitpoints, setFitpoints] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    let remoteCalories: number = 0;
    // let remoteFitpoints: number = 0;
    // let remoteDuration: number = 0;

    activities.forEach((activity) => {
      remoteCalories += activity.calories ? activity.calories : 0;
      // remoteFitpoints += activity.fitPointsV2 ? activity.fitPointsV2 : 0;
      //   remoteDuration += activity.timeInSeconds ? activity.timeInSeconds : 0;
    });

    setCalories(remoteCalories);
    setFitpoints(remoteCalories > 0 ? 1 : 0);
    setDuration(remoteCalories ? (remoteCalories / 300) * 30 * 60 : 0);
  }, [activities]);

  return {
    calories,
    fitpoints,
    duration,
  };
};
