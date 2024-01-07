import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AddWeightMain from "@modules/JourneyLogHome/AddWeightMain";

const AddWeightScreen = () => {
  useScreenTrack();
  return <AddWeightMain />;
};

export default AddWeightScreen;
