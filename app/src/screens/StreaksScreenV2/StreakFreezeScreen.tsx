import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import StreakFreezeMain from "@modules/StreakV2Module/StreakFreezeMain";



const StreakFreezeScreen = () => {
  useScreenTrack();
  return <StreakFreezeMain />;
};

export default StreakFreezeScreen ;