import { useWonAward } from "@hooks/award/useWonAward";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import EnergyTracker from "@modules/JourneyLogHome/EnergyTracker";

const EnergyTrackerScreen = () => {
  useScreenTrack();
  useWonAward();
  return <EnergyTracker />;
};

export default EnergyTrackerScreen;
