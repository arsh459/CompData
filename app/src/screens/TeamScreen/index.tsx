// import { UserProvider } from "@providers/user/UserProvider";
import TeamMain from "@modules/TeamMain";
import { GameProvider } from "@providers/game/GameProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
import { useRoute } from "@react-navigation/native";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface TeamScreenParams {
  teamId: string;
}
const TeamScreen = () => {
  const route = useRoute();
  useScreenTrack();
  const params = route.params as TeamScreenParams;
  const { state } = useAuthContext();

  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <UserProvider> */}
      <TeamProvider selectedTeamId={params.teamId} initTeamMembers={4}>
        <TeamMain />
      </TeamProvider>
      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default TeamScreen;
