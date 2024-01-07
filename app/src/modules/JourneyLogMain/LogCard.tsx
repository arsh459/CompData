import SvgIcons from "@components/SvgIcons";
import { Text, TouchableOpacity, Image, View } from "react-native";

interface Props {
  onPress: () => void;
  color?: string;
  text?: string;
  subText?: string;
  imgUrl?: string;
}

const LogCard: React.FC<Props> = ({
  onPress,
  color,
  text,
  subText,
  imgUrl,
}) => {
  return (
    <TouchableOpacity onPress={onPress} className="px-4 mb-4">
      <View
        className="rounded-2xl flex flex-row px-5 py-4 "
        style={{ backgroundColor: color }}
      >
        <View className="w-11  aspect-square flex justify-center items-center">
          {imgUrl ? (
            <Image
              source={{ uri: imgUrl }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : null}
        </View>

        <View className="ml-4 flex-1  flex flex-row justify-between items-center">
          <View>
            <Text className="text-white text-base iphoneX:text-lg font-bold">
              {text}
            </Text>
            <Text className="text-white/60 text-xs font-light">{subText}</Text>
          </View>

          <View className="w-6 aspect-square">
            <SvgIcons iconType="rightArrowSlim" color="#FFFFFF66" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LogCard;
