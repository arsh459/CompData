import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";

import clsx from "clsx";
interface Props {
  iconUrl?: string;
  text?: string;
  mainStyleTw?: string;
  onPress?: () => void;
}
const ButtonWithBelowText: React.FC<Props> = ({
  iconUrl,
  text,
  mainStyleTw,
  onPress,
}) => {
  const { width } = useWindowDimensions();
  return (
    <View className={clsx("flex items-center", mainStyleTw)}>
      <TouchableOpacity className="" onPress={onPress}>
        <Image
          source={{ uri: iconUrl }}
          className={clsx(" aspect-square ")}
          style={{ width: width * 0.18 }}
        />
      </TouchableOpacity>
      <Text
        className=" pt-1.5 text-[#FFFFFFD9]"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        {text}
      </Text>
    </View>
  );
};

export default ButtonWithBelowText;
