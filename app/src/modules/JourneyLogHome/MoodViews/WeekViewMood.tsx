import { CurrentWeekData } from "@providers/streak/hooks/useAvgDataV2";
import { WeekTrack } from "../WeekTrack";
import { getMoodString } from "../utils";
interface Props {
  currentWeekData: CurrentWeekData;
}
const WeekViewMood: React.FC<Props> = ({ currentWeekData }) => {
  return (
    <WeekTrack
      type="mood"
      mainText={currentWeekData?.weekString}
      subText={currentWeekData?.weekStatus}
      footerMainText={getMoodString(currentWeekData?.currentWeekAvg)}
      // footerSubText={increaseAfterSocialBoat}
      weekDataObj={currentWeekData?.weekDataObj}
    />
  );
};

export default WeekViewMood;
