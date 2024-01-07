import { Text, View, TouchableOpacity } from "react-native";

interface Props {
  onPress?: () => void;
  selected?: boolean;
  children?: React.ReactNode;
}
const RadioButton: React.FC<Props> = ({ onPress, selected, children }) => {
  return (
    <View className="flex-row   items-center px-4 pb-4 iphoneX:pb-3 ">
      <TouchableOpacity
        onPress={onPress}
        className="w-3  aspect-square   justify-center items-center rounded-[10px]"
        style={{ borderWidth: 1, borderColor: "#F0F0F0" }}
      >
        {selected ? (
          // <View className="w-1.5 aspect-square bg-[#1C1C1C] rounded-[7px] " />
          <View className="w-1.5 aspect-square bg-[#F0F0F0] rounded-[7px] " />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text
          className="text-base  text-[#CDCDCD] ml-2"
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;
