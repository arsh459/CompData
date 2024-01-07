import { View, Text, useWindowDimensions, Pressable } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
// import { format } from "date-fns";
import { DayStepDoc } from "@hooks/steps/useUserPreviousSteps";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useConfigContext } from "@providers/Config/ConfigProvider";
interface Props {
  item: DayStepDoc;
  // isToday: boolean;
  featurePresent?: boolean;
  dtString: string;
}
const HistoryCardV2: React.FC<Props> = ({
  item,
  // isToday,
  // featurePresent,
  dtString,
}) => {
  const { today } = useAuthContext();
  const isToday = today === item.stepDtString;
  const { width } = useWindowDimensions();

  const { config } = useConfigContext();

  const featurePresent =
    item.unix >= (config?.dailyStepsFrom ? config?.dailyStepsFrom : 0);
  return (
    <Pressable className="pb-4 pt-4">
      <View className="px-4">
        <View className="flex-1 bg-[#A5DAFF] h-px" />
        <View className="flex flex-row justify-between  pt-2.5">
          <Text
            className="text-[#A5DAFF] text-sm"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {dtString}
          </Text>
          {isToday ? (
            <Text
              className="text-[#A5DAFF] text-sm"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Currently Active
            </Text>
          ) : null}
        </View>
      </View>
      <LinearGradient
        colors={["#15B891", "#009DBF"]}
        className=" flex items-center mx-auto mt-4   aspect-[333/105] rounded-2xl"
        start={[0, 1]}
        end={[1, 0]}
        style={{ width: width - 32 }}
      >
        <View className=" flex flex-row justify-between items-center  flex-1">
          <View className="flex-1">
            <Text
              className="text-[#FFFFFF] text-3xl  text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {featurePresent ? `${item.fp}FP` : "-"}
            </Text>
            <Text
              className="text-[#FFFFFFB2] text-xs text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {featurePresent ? "Fitpoints Earned" : "Feature unavailable"}
            </Text>
          </View>
          <View className="w-px  h-11 bg-[#FFFFFF69]" />
          <View className="flex-1">
            <Text
              className="text-[#FFFFFF] text-3xl  text-center"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {item?.steps}
            </Text>
            <Text
              className="text-[#FFFFFFB2] text-xs  text-center "
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Steps Taken
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default HistoryCardV2;
