import { View, Text } from "react-native";

import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import clsx from "clsx";

interface Props {
  text?: string;
  mainText?: string;
  textStyle?: string;
  note?: string;
}
const ReminderFieldComp: React.FC<Props> = ({
  text,
  mainText,
  textStyle,
  note,
}) => (
  <View className=" bg-[#232136] py-4">
    {mainText ? (
      <Text
        className="text-white/80 text-base pl-5 pb-2"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {mainText}
      </Text>
    ) : null}
    {text ? (
      <View className="px-4 py-3 bg-[#343150] flex flex-row items-center justify-between mx-4 rounded-xl">
        <Text
          className={clsx("text-white/80 text-base pl-1.5", textStyle)}
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {text}
        </Text>
        <View className="w-3 aspect-square">
          <ArrowIcon direction="right" color={"#FFFFFF"} />
        </View>
      </View>
    ) : null}
    {note ? (
      <Text
        className="text-white/80 text-xs w-4/5  mx-auto  pt-2"
        style={{ fontFamily: "Nunito-Medium", lineHeight: 14 }}
      >
        {note}
      </Text>
    ) : null}
  </View>
);

export default ReminderFieldComp;
