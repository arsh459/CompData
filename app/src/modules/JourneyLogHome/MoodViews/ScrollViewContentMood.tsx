import {
  CurrentWeekData,
  WeeklyAvgObj,
} from "@providers/streak/hooks/useAvgDataV2";

import { selectedViewMoodTracker } from "../MoodTracker";
import DayViewMood from "./DayViewMood";
import WeekViewMood from "./WeekViewMood";
import { MonthlyTrack } from "../MonthlyTrack";
import { getMoodString } from "../utils";

interface Props {
  selectedView: selectedViewMoodTracker;
  todayMood?: number;
  currentWeekData?: CurrentWeekData;
  monthlyText: string;
  monthlyStatus: string;
  overallAvg: number;
  weeklyAvgs: WeeklyAvgObj[];
}

const ScrollViewContentMood: React.FC<Props> = ({
  selectedView,
  todayMood,
  currentWeekData,
  monthlyText,
  monthlyStatus,
  overallAvg,
  weeklyAvgs,
}) => {
  return (
    <>
      {selectedView === "Day" && todayMood ? (
        <DayViewMood todayMood={todayMood} />
      ) : selectedView === "Week" &&
        currentWeekData &&
        currentWeekData?.currentWeekAvg !== 0 ? (
        <WeekViewMood currentWeekData={currentWeekData} />
      ) : selectedView === "Month" ? (
        <MonthlyTrack
          type="mood"
          mainText={monthlyText}
          subText={monthlyStatus}
          footerMainText={getMoodString(overallAvg)}
          weeklyAvgs={weeklyAvgs}
        />
      ) : null}
    </>
  );
};

export default ScrollViewContentMood;
