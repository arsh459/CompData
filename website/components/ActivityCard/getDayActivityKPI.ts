import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";

export const useDayActivityKPI = (activities: Activity[]) => {
    const [totalFitPoints, setTotalFitPoints] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(0);

    useEffect(() => {
        let fitpoints = 0;
        let calories = 0;

        activities.forEach((item) => {
            fitpoints += item.fitPointsV2 ? item.fitPointsV2 : 0;
            calories += item.calories ? item.calories : 0;
        });

        setTotalFitPoints(fitpoints);
        setTotalDuration((calories / 300) * 30);
    }, [activities]);

    return {
        totalFitPoints,
        totalDuration,
    };
};
