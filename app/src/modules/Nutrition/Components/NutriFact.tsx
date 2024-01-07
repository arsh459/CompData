import {
  carbsIcon,
  carbsIconWhite,
  eggIcon,
  eggIconWhite,
  fatsIcon,
  fatsIconWhite,
  fibreIcon,
  fibreIconWhite,
} from "@constants/imageKitURL";
import clsx from "clsx";
import { Image, Text, View } from "react-native";

interface Props {
  value: number;
  text: string;
  isWhite?: boolean;
}

const Nutrifact: React.FC<Props> = ({ value, text, isWhite }) => {
  const getIcons = (text: string) => {
    switch (text) {
      case "protein":
        return isWhite ? eggIconWhite : eggIcon;
      case "carbs":
        return isWhite ? carbsIconWhite : carbsIcon;
      case "fats":
        return isWhite ? fatsIconWhite : fatsIcon;
      case "fibre":
        return isWhite ? fibreIconWhite : fibreIcon;
      default:
        null;
    }
  };

  return (
    <View
      className={clsx(
        "flex flex-row p-3 items-center justify-evenly flex-1",
        isWhite && "bg-[#262630] rounded-2xl"
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
            "pl-2 text-xs capitalize"
          )}
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {text}
        </Text>
      </View>
      <Text
        className={clsx(isWhite ? "text-white" : "text-[#2F2F2F]", "text-xl")}
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {value ? `${value} g` : "0 g"}
      </Text>
    </View>
  );
};
export default Nutrifact;
