import {
  CurrentWeekData,
  WeeklyAvgObj,
} from "@providers/streak/hooks/useAvgDataV2";

import { selectedViewMoodTracker } from "../MoodTracker";
import { MonthlyTrack } from "../MonthlyTrack";
import { getEnergyString } from "../utils";
import DayViewEnergy from "./DayViewEnergy";
import { WeekTrack } from "../WeekTrack";

interface Props {
  selectedView: selectedViewMoodTracker;
  todaysValue?: number;
  currentWeekData?: CurrentWeekData;
  monthlyText: string;
  monthlyStatus: string;
  overallAvg: number;
  weeklyAvgs: WeeklyAvgObj[];
}

const ScrollViewContentEnergy: React.FC<Props> = ({
  selectedView,
  todaysValue,
  currentWeekData,
  monthlyText,
  monthlyStatus,
  overallAvg,
  weeklyAvgs,
}) => {
  // const increaseAfterSocialBoat = `${Math.floor((overallAvg / 3) * 100)}%`;

  return (
    <>
      {selectedView === "Day" && todaysValue ? (
        <DayViewEnergy todaysValue={todaysValue} />
      ) : selectedView === "Week" &&
        currentWeekData &&
        currentWeekData?.currentWeekAvg !== 0 ? (
        <WeekTrack
          type="energy"
          mainText={currentWeekData?.weekString}
          subText={currentWeekData?.weekStatus}
          footerMainText={getEnergyString(currentWeekData?.currentWeekAvg)}
          // footerSubText={increaseAfterSocialBoat}
          weekDataObj={currentWeekData?.weekDataObj}
        />
      ) : selectedView === "Month" ? (
        <MonthlyTrack
          type="energy"
          mainText={monthlyText}
          subText={monthlyStatus}
          footerMainText={getEnergyString(Math.ceil(overallAvg))}
          weeklyAvgs={weeklyAvgs}
        />
      ) : null}
    </>
  );
};

export default ScrollViewContentEnergy;
