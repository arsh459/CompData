import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import PrescriptionsModule from "@modules/PrescriptionsModule";
import { View } from "react-native";

const PrescriptionsView = () => {
  useScreenTrack();
  return (
    <View>
      <PrescriptionsModule />
    </View>
  );
};
export default PrescriptionsView;
