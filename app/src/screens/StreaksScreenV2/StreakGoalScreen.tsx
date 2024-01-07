import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import StreakGoalMain from "@modules/StreakV2Module/StreakGoalMain";


const StreakGoalScreen = () => {
  useScreenTrack();
  return <StreakGoalMain />;
};

export default StreakGoalScreen;