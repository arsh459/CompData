import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { View } from "react-native";
interface Props {
  onPress: () => void;
}

const ProceedButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View className="p-5 py-6 bg-[#232136]">
      <StartButton
        title="Proceed"
        bgColor="bg-[#6D55D1]"
        textColor="text-[#fff]"
        roundedStr="rounded-2xl"
        fontFamily="Nunito-Bold"
        textStyle="py-3 text-center text-base font-bold "
        onPress={onPress}
      />
    </View>
  );
};

export default ProceedButton;
