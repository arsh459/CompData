// import { UserProvider } from "@providers/user/UserProvider";
import JoinBoatMain from "@modules/JoinBoatMain";
import { sectionTypes } from "@modules/JoinBoatMain/hooks/useSection";
import { GameProvider } from "@providers/game/GameProvider";
import { useRoute } from "@react-navigation/native";
import { TeamProvider } from "@providers/team/TeamProvider";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
// import { useAuthContext } from "@providers/auth/AuthProvider";

export interface JoinBoatParams {
  section: sectionTypes;
  gameId: string;
  teamId?: string;
}

const JoinBoat = () => {
  const route = useRoute();
  const params = route.params as JoinBoatParams | undefined;

  // const { state } = useAuthContext();

  useScreenTrack();

  return (
    <GameProvider
      selectedGameId={params?.gameId ? params.gameId : TEAM_ALPHABET_GAME}
    >
      <>
        <TeamProvider selectedTeamId={params?.teamId ? params.teamId : ""}>
          {/* <Header backIcon="arrow_circle" back={true} tone="dark" /> */}
          <JoinBoatMain
            selectedSection={params?.section ? params.section : ""}
          />
        </TeamProvider>
      </>
    </GameProvider>
  );
};

export default JoinBoat;
