import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import LandingScreen from "@modules/LandingScreen";
import { GameProvider } from "@providers/game/GameProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

export interface GameLandingParams {
  gameId: string;
  teamId?: string;
}

export default function GameLanding() {
  const route = useRoute();
  const params = route.params as GameLandingParams;

  useScreenTrack();

  return (
    <GameProvider selectedGameId={params.gameId}>
      <>
        <TeamProvider
          selectedTeamId={params.teamId ? params.teamId : ""}
          initTeamMembers={3}
        >
          <LandingScreen />
        </TeamProvider>
      </>
    </GameProvider>
  );
}
