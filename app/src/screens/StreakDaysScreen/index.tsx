// import { UserProvider } from "@providers/user/UserProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { GameProvider } from "@providers/game/GameProvider";
import StreakDaysScreenMain from "@modules/StreakDaysScreenMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";

const StreakDaysScreen = () => {
  // const { state } = useAuthContext();
  useScreenTrack();
  return (
    // <GameProvider selectedGameId={state.gameId}>
    <InteractionProvider>
      <StreakDaysScreenMain />
    </InteractionProvider>
    // </GameProvider>
  );
};

export default StreakDaysScreen;
