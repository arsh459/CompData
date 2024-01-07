import SvgIcons from "@components/SvgIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View, Text } from "react-native";
import clsx from "clsx";

interface Props {
  heading?: string;
  children: React.ReactNode;
  onLeft?: () => void;
  onRight?: () => void;
  index?: number;
  total?: number;
}
const GoalProgramContainer: React.FC<Props> = ({
  heading,
  children,
  onLeft,
  onRight,
  total,
  index,
}) => {
  return (
    <LinearGradient
      className="rounded-3xl flex border border-[#797979] p-4 m-4"
      colors={["#2B2B2B", "black"]}
    >
      <>
        <View
          className={clsx(
            "flex flex-row items-center justify-between ",
            heading ? "pb-4" : ""
          )}
        >
          {onLeft && index ? (
            <Pressable onPress={onLeft} className="w-5 h-5">
              <SvgIcons iconType="lefArrow" />
            </Pressable>
          ) : (
            <View />
          )}
          {heading ? (
            <Text className="text-white text-lg iphoneX:text-2xl font-bold px-2">
              {heading}
            </Text>
          ) : null}
          {onRight && total && total - 1 !== index ? (
            <Pressable onPress={onRight} className="w-5 h-5">
              <SvgIcons iconType="rightArrow" />
            </Pressable>
          ) : (
            <View />
          )}
        </View>

        {children}
      </>
    </LinearGradient>
  );
};

export default GoalProgramContainer;
