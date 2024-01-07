import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import StartStreakMain from "@modules/StreakV2Module/StartStreakMain";


const StartStreakScreen = () => {
  useScreenTrack();
  return <StartStreakMain />;
};

export default StartStreakScreen;
