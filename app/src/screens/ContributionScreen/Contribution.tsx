// import ProgressState from "@modules/ProgressState";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import UserProgressModule from "@modules/Progress";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { BadgeProvider } from "@providers/badges/BadgeProvider";
import { GameProvider } from "@providers/game/GameProvider";
// import { TeamProgressProvider } from "@providers/teamProgress/TeamProgressProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

export interface UserProgParams {
  uid: string;
  sprintId: string;
  //   teamId: string;
}

const ContributionScreen = () => {
  useScreenTrack();
  const route = useRoute();
  const params = route.params as UserProgParams;
  const { state } = useAuthContext();

  return (
    <GameProvider selectedGameId={state.gameId}>
      <>
        <UserProgressModule {...params} />
      </>
    </GameProvider>
  );
};

export default ContributionScreen;
