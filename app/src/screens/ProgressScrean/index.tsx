import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import ProgressState from "@modules/ProgressState";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { BadgeProvider } from "@providers/badges/BadgeProvider";
import { GameProvider } from "@providers/game/GameProvider";
import { TeamProgressProvider } from "@providers/teamProgress/TeamProgressProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

export interface TeamProgParams {
  captainId: string;
  teamId: string;
  sprintId: string;
}

const ProgressScreen = () => {
  const route = useRoute();
  useScreenTrack();
  const params = route.params as TeamProgParams;
  const { state } = useAuthContext();

  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <UserProvider> */}
      <TeamProgressProvider captainId={params.captainId}>
        <ProgressState {...params} />
      </TeamProgressProvider>
      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default ProgressScreen;
