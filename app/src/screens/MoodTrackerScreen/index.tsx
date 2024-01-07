import { useWonAward } from "@hooks/award/useWonAward";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import MoodTracker from "@modules/JourneyLogHome/MoodTracker";

const MoodTrackerScreen = () => {
  useScreenTrack();
  useWonAward();
  return <MoodTracker />;
};

export default MoodTrackerScreen;
