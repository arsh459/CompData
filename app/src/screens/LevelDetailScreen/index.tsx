import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import LevelDetail from "@modules/LevelDetail";
import { useRoute } from "@react-navigation/native";

export interface LevelDetailScreenProps {
  lvlNumber: number;
}

const LevelDetailScreen = () => {
  const route = useRoute();
  const params = route.params as LevelDetailScreenProps;

  useScreenTrack();

  return <LevelDetail {...params} />;
};

export default LevelDetailScreen;
