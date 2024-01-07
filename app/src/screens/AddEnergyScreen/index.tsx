import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AddEnergyMain from "@modules/JourneyLogHome/AddEnergyMain";
import { useRoute } from "@react-navigation/native";

export interface AddEnergyParams {
  todaysValue: number;
}
const AddEnergyScreen = () => {
  const route = useRoute();
  const params = route.params as AddEnergyParams;
  useScreenTrack();
  return <AddEnergyMain todaysValue={params.todaysValue} />;
};

export default AddEnergyScreen;
