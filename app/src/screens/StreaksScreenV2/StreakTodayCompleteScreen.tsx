import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import StreakTodayCompleteMain from "@modules/StreakV2Module/StreakTodayCompleteMain";


const StreakTodayCompeleteScreen = () => {
  useScreenTrack();
  return <StreakTodayCompleteMain />;
};

export default StreakTodayCompeleteScreen;