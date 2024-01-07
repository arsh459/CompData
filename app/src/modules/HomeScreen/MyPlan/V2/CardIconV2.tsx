import clsx from "clsx";
import { Image, Text, View } from "react-native";
import { getTaskIconV2, statusTypes } from "../utils";

interface Props {
  status?: statusTypes;
  text?: string;
  color: string;
}

const CardIconV2: React.FC<Props> = ({ status, text, color }) => {
  const data = getTaskIconV2(status);

  return data ? (
    <View className="flex justify-center items-center">
      <View
        className={clsx(
          text ? "w-6" : status === "pro" ? "w-10" : "w-8",
          "aspect-square"
        )}
      >
        <Image
          source={{ uri: data.icon }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      {text ? (
        <Text
          style={{ color, fontFamily: "BaiJamjuree-Medium" }}
          className="text-xs iphoneX:text-sm  text-right py-1"
        >
          {text}
        </Text>
      ) : null}
    </View>
  ) : null;
};

export default CardIconV2;
