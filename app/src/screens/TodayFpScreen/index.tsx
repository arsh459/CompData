import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import TodayFpMain from "@modules/TodayFpMain";

const TodayFpScreen = () => {
  useScreenTrack();
  return <TodayFpMain />;
};

export default TodayFpScreen;
