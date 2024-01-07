import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
interface Props {
  text: string;
  onPress: () => void;
  selected: boolean;
}
// type SelectedType = "yourProgram" | "all";
const ToggleButton: React.FC<Props> = ({ text, onPress, selected }) => {
  return (
    <LinearGradient
      className=" flex-1 flex justify-center mx-4  h-14 rounded-xl"
      colors={
        selected ? ["#0075E0", "#00AAE0"] : ["transparent", "transparent"]
      }
    >
      <Text
        className={clsx(
          " whitespace-nowrap",
          "p-2  text-center rounded-xl text-lg iphoneX:text-xl font-black tracking-wide text-white",
          selected ? "text-white " : "text-[#417EAA]"
        )}
        onPress={onPress}
      >
        {text}
      </Text>
    </LinearGradient>
  );
};

export default ToggleButton;
