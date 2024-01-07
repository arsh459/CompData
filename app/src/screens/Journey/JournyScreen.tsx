// import { UserProvider } from "@providers/user/UserProvider";
import Journey from "@modules/Joureny";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

const JourneyScreen = () => {
  useScreenTrack();
  return (
    <>
      <Journey />
    </>
  );
};

export default JourneyScreen;
