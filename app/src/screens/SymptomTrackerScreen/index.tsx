import AddSymptomMain from "@modules/PeriodTrackerMain/AddSymptomMain";
import { useRoute } from "@react-navigation/native";

export interface SymptomTrackerScreenProps {
  date: string;
}

const SymptomTrackerScreen = () => {
  const route = useRoute();
  const { date } = route.params as SymptomTrackerScreenProps;

  return <AddSymptomMain date={date} />;
};

export default SymptomTrackerScreen;
