import { View } from "react-native";
import Header from "@modules/Header";
import AddButton from "@modules/AddNewItem/components/searchScreen/AddButton";
import AlgoliaMealType from "./components/AlgoliaMealType";
interface Props {
  onProceed: () => void;
}
const AlgoliaMealTypeModule: React.FC<Props> = ({ onProceed }) => {
  return (
    <View className="flex-1 bg-[#232136]">
      <Header back={true} headerColor="#232136" tone="dark" />
      <AlgoliaMealType />
      <AddButton onPress={onProceed} cta={"Proceed"} />
    </View>
  );
};

export default AlgoliaMealTypeModule;
