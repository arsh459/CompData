import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import SelectUniverse from "@modules/Universe/SelectUniverse";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";

const UniverseSelector = () => {
  const { state } = useAuthContext();
  useScreenTrack();

  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <UserProvider> */}
      <SelectUniverse />
      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default UniverseSelector;
