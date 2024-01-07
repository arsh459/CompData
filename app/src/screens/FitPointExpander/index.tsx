// import { UserProvider } from "@providers/user/UserProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import FitPointExpanderMain from "@modules/UserMain/FitPointExpanderMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

const FitPointExpanderScreen = () => {
  // const { state } = useAuthContext();
  useScreenTrack();
  return (
    // <GameProvider selectedGameId={state.gameId}>
    <>
      <FitPointExpanderMain />
    </>
    // </GameProvider>
  );
};

export default FitPointExpanderScreen;
