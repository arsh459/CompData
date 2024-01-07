import { View, Text } from "react-native";

import SlidingArrowIcon from "@components/SvgIcons/SlideArrow";
import clsx from "clsx";

interface Props {
  twWidth?: string;
  primaryText?: string;
  secondaryText?: string;
}
const DailyFocusStartElement: React.FC<Props> = ({
  primaryText,
  secondaryText,
  twWidth,
}) => (
  <View className="w-full flex-1  flex justify-center ">
    <View className="flex-[.25] relative z-0">
      <SlidingArrowIcon />
      <View
        className={clsx(
          "absolute flex justify-center left-4  top-0 ",
          twWidth ? twWidth : " w-1/2 "
        )}
      >
        <Text
          className="text-blue-800 text-xl  pb-2"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {primaryText}
        </Text>
        <Text
          className="text-[#F1F1F1] text-5xl  py-2"
          style={{ lineHeight: 42, fontFamily: "Nunito-Bold" }}
          numberOfLines={2}
        >
          {secondaryText}
        </Text>
      </View>
    </View>
  </View>
);

export default DailyFocusStartElement;
