import ProgressBar from "@components/ProgressBar";
// import {
//   carbsIcon,
//   carbsIconWhiteFrame12,
//   eggIcon,
//   eggIconWhiteFrame12,
//   fatsIcon,
//   fatsIconWhiteFrame12,
//   fibreIcon,
//   fibreIconWhiteFrame12,
// } from "@constants/imageKitURL";
import clsx from "clsx";
import { Text, View } from "react-native";

interface Props {
  value: string;
  text: string;
  isWhite?: boolean;
  bgColorTw?: string;
  customStr?: string;
  activeColor?: string;
  inActiveColor?: string;
  currentNutrientValue: string;
  progress: number;
}

const NutriValuesV2: React.FC<Props> = ({
  value,
  text,
  isWhite,
  bgColorTw,
  customStr,
  activeColor,
  inActiveColor,
  currentNutrientValue,
  progress,
}) => {
  // const getIcons = (text: string) => {
  //   switch (text) {
  //     case "protein":
  //       return isWhite ? eggIconWhiteFrame12 : eggIcon;
  //     case "carbs":
  //       return isWhite ? carbsIconWhiteFrame12 : carbsIcon;
  //     case "fats":
  //       return isWhite ? fatsIconWhiteFrame12 : fatsIcon;
  //     case "fibre":
  //       return isWhite ? fibreIconWhiteFrame12 : fibreIcon;
  //     default:
  //       null;
  //   }
  // };

  return (
    <View
      className={clsx(
        "flex flex-row items-center justify-between  flex-1 ",
        isWhite && "bg-[#4C4873] rounded-2xl",
        customStr || "",
        bgColorTw
      )}
    >
      <View className="flex-1  flex-row items-center  justify-between ">
        <Text
          style={{ fontFamily: "Nunito-Medium" }}
          className={clsx(
            "  ",
            isWhite ? "text-white/70" : "text-[#2F2F2F]",
            "pl-1.5 text-xs  capitalize "
          )}
        >
          {text}
        </Text>
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className={clsx(
            "text-white/70",

            "text-xs"
          )}
        >
          {currentNutrientValue}/{value ? `${value} gm` : "0 gm"}
        </Text>
      </View>
      <View className="w-5 aspect-square" />
      <View className="w-2/5 ">
        <ProgressBar
          height={1}
          progress={progress}
          activeColor={activeColor ? activeColor : "#6BFF8C"}
          inActiveColor={inActiveColor ? inActiveColor : "#6BFF8C29"}
        />
      </View>
    </View>
  );
};
export default NutriValuesV2;
