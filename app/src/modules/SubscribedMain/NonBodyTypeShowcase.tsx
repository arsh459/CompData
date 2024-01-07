import GradientText from "@components/GradientText";
import { iPhoneX } from "@constants/screen";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { getTransdormationData } from "./utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  styleStr?: string;
  colors?: string[];
}

const NonBodyTypeShowcase: React.FC<Props> = ({ styleStr, colors }) => {
  const { width } = useWindowDimensions();

  const transdormationData = useUserStore(
    ({ user }) =>
      getTransdormationData(
        user?.name,
        user?.gender,
        user?.weight,
        user?.desiredWeight,
        user?.height,
        user?.desiredBodyType,
        user?.dailyFPTarget,
        user?.cycleLength,
        user?.fitnessGoal,
        user?.pcosSymptoms
      ),
    shallow
  );

  return (
    <LinearGradient
      colors={colors && colors?.length >= 2 ? colors : ["#393954", "#393959"]}
      className={clsx(
        "w-full aspect-[1.8] rounded-2xl flex flex-row p-4",
        styleStr
      )}
    >
      <View className="flex-1 flex flex-col">
        <Text className="text-sm iphoneX:text-base font-popR text-white">
          MyGoal: {transdormationData.goal}
        </Text>
        <View className="flex-1 flex flex-col justify-end">
          <View className="flex flex-row items-end">
            <GradientText
              text={transdormationData.dailyFitpoints}
              colors={["#75E0DF", "#7B8DE3"]}
              fallbackColor="#FFFFFF"
              textStyle={{
                fontSize: width < iPhoneX ? 56 : 48,
                lineHeight: width < iPhoneX ? 56 : 48,
                fontWeight: "500",
              }}
            />
            <GradientText
              text="FitPoints"
              colors={["#75E0DF", "#7B8DE3"]}
              fallbackColor="#FFFFFF"
              textStyle={{
                fontSize: width < iPhoneX ? 18 : 16,
                lineHeight: 40,
                marginLeft: 4,
              }}
            />
          </View>
          <Text className="text-white/60 text-xs iphoneX:text-sm">
            My Daily Target to achieve{" "}
          </Text>
        </View>
      </View>
      <Image
        source={{ uri: transdormationData.illustration }}
        className="h-full aspect-[0.5] object-contain"
      />
    </LinearGradient>
  );
};

export default NonBodyTypeShowcase;
