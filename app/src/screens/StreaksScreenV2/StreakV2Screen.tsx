import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import StreakV2Main from "@modules/StreakV2Module/StreakV2Main";


const StreakV2Screen = () => {
  useScreenTrack();
  return <StreakV2Main />;
};

export default StreakV2Screen;