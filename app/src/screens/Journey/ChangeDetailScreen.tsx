import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import ChangeDetail from "@modules/Joureny/ChangeDetail";
// import { UserProvider } from "@providers/user/UserProvider";

const ChangeDetailScreen = () => {
  useScreenTrack();
  return (
    <>
      <ChangeDetail />
    </>
  );
};

export default ChangeDetailScreen;
