import ImageWithURL from "@components/ImageWithURL";
import { TouchableOpacity, Text } from "react-native";

interface Props {
  onPress: () => void;
  text?: string;
}

const HelpButton: React.FC<Props> = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center rounded-full bg-white backdrop-blur-3xl px-4 py-1"
    >
      <Text className="text-[#1C1C1C] text-xs iphoneX:text-sm font-medium">
        {text}
      </Text>
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Arrow_137_MJE_BtTvd.png?updatedAt=1686137643237",
        }}
        className="w-2.5 iphoneX:w-3 aspect-1 ml-1.5"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default HelpButton;
