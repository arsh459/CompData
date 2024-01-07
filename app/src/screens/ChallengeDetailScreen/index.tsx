import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import ChallengeDetailMain from "@modules/ChallengeDetailMain";
import { RoundProvider } from "@providers/round/RoundProver";
import { useRoute } from "@react-navigation/native";

export interface ChallengeDetailScreenProps {
  roundId: string;
}

const ChallengeDetailScreen = () => {
  const route = useRoute();
  const { roundId } = route.params as ChallengeDetailScreenProps;
  useScreenTrack();
  return (
    <RoundProvider roundId={roundId}>
      <ChallengeDetailMain />
    </RoundProvider>
  );
};

export default ChallengeDetailScreen;
