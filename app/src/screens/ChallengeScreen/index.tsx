import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useRoute } from "@react-navigation/native";
import ChallengeScreenMain from "@modules/ChallengeModule/ChallengeScreen/ChallengeScreenMain";
import { RoundProvider } from "@providers/round/RoundProver";
import { useUserRankStore } from "@hooks/challenge/useUserRankStore";
import { useLevels } from "@hooks/level/useLevels";

export type selectedChallengeViewType = "goals" | "leaderboard" | "feed";

export interface ChallengeScreenParams {
  initialRouteName?: selectedChallengeViewType;
  roundId: string;
}

const ChallengeScreen = () => {
  const route = useRoute();
  const params = route.params as ChallengeScreenParams;

  useScreenTrack();

  useLevels();
  useUserRankStore();

  return (
    <RoundProvider roundId={params.roundId}>
      <ChallengeScreenMain />
    </RoundProvider>
  );
};

export default ChallengeScreen;
