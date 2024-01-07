import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import SelectTeamsScreen from "@modules/SelectTeamsScreen";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";

const SelectTeam = () => {
  const { state } = useAuthContext();

  useScreenTrack();

  return (
    <GameProvider selectedGameId={state.gameId}>
      <>
        <SelectTeamsScreen />
      </>
    </GameProvider>
  );
};

export default SelectTeam;
