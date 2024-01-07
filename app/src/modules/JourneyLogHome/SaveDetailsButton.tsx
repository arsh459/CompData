import { View } from "react-native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
interface Props {
  handleSaveDetails: () => void;
}
const SaveDetailsButton: React.FC<Props> = ({ handleSaveDetails }) => {
  return (
    <View className="p-4 bg-[#232136]">
      <StartButton
        title="Save Details"
        bgColor="bg-[#6D55D1]"
        textColor="text-[#fff]"
        roundedStr="rounded-2xl"
        fontFamily="Nunito-Bold"
        textStyle="py-3 text-center text-base  font-bold "
        onPress={handleSaveDetails}
      />
    </View>
  );
};

export default SaveDetailsButton;
