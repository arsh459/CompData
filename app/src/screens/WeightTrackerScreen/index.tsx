import { useWonAward } from "@hooks/award/useWonAward";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import WeightTracker from "@modules/JourneyLogHome/WeightTracker";

const WeightTrackerScreen = () => {
  useScreenTrack();
  useWonAward();
  return <WeightTracker />;
};

export default WeightTrackerScreen;
