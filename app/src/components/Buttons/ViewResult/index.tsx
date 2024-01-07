import { Pressable, Text } from "react-native";

interface Props {
  onPress: () => void;
  text: string;
}
const ViewResult: React.FC<Props> = ({ onPress, text }) => {
  return (
    <Pressable
      className="w-max flex flex-row justify-center items-center bg-[#3D3D48] rounded-full px-3 py-1 iphoneX:px-3 iphoneX:py-1"
      onPress={onPress}
    >
      <Text
        className="text-xs iphoneX:text-sm text-white whitespace-nowrap"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default ViewResult;
