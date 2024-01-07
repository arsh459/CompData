import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AddMoodMain from "@modules/JourneyLogHome/AddMoodMain";
import { useRoute } from "@react-navigation/native";

export interface AddMoodParams {
  todaysMood: number;
}
const AddMoodScreen = () => {
  const route = useRoute();
  const params = route.params as AddMoodParams;
  useScreenTrack();
  return <AddMoodMain todaysMood={params.todaysMood} />;
};

export default AddMoodScreen;
