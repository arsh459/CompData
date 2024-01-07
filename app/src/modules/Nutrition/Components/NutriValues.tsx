import {
  carbsIcon,
  carbsIconWhiteFrame12,
  eggIcon,
  eggIconWhiteFrame12,
  fatsIcon,
  fatsIconWhiteFrame12,
  fibreIcon,
  fibreIconWhiteFrame12,
} from "@constants/imageKitURL";
import clsx from "clsx";
import { Image, Text, View } from "react-native";

interface Props {
  value: string;
  text: string;
  isWhite?: boolean;
  bgColorTw?: string;
  customStr?: string;
}

const NutriValues: React.FC<Props> = ({
  value,
  text,
  isWhite,
  bgColorTw,
  customStr,
}) => {
  const getIcons = (text: string) => {
    switch (text) {
      case "protein":
        return isWhite ? eggIconWhiteFrame12 : eggIcon;
      case "carbs":
        return isWhite ? carbsIconWhiteFrame12 : carbsIcon;
      case "fats":
        return isWhite ? fatsIconWhiteFrame12 : fatsIcon;
      case "fibre":
        return isWhite ? fibreIconWhiteFrame12 : fibreIcon;
      default:
        null;
    }
  };

  return (
    <View
      className={clsx(
        "flex flex-row items-center justify-evenly flex-1 mx-auto",
        isWhite && "bg-[#4C4873] rounded-2xl",
        customStr || "p-3 min-w-[48%]",
        bgColorTw
      )}
    >
      <View className="flex flex-row flex-1 items-center">
        <Image
          source={{ uri: getIcons(text) }}
          className="w-3 aspect-square"
          resizeMode="contain"
        />
        <Text
          className={clsx(
            isWhite ? "text-[#C8C8C8]" : "text-[#2F2F2F]",
            "pl-1.5 text-xs iphoneX:text-sm capitalize font-semibold"
          )}
        >
          {text}
        </Text>
      </View>
      <Text
        className={clsx(
          isWhite ? "text-white " : "text-[#2F2F2F]",
          "text-sm iphoneX:text-base"
        )}
      >
        {value ? `${value} g` : "0.0 g"}
      </Text>
    </View>
  );
};
export default NutriValues;
