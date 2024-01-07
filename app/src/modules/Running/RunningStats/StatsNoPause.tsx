import { View, Text, ScrollView } from "react-native";
// import { bottomRunnigStaticImage } from "@constants/imageKitURL";
import PaceIcon from "@components/SvgIcons/PaceIcon";
import TimeIcon from "@components/SvgIcons/TimeIcon";
import DistanceIcon from "@components/SvgIcons/DistanceIcon";
import { getReturnValues } from "../utils";
import { getDistanceToShow } from "./utils";
interface Props {
  children?: React.ReactNode;
  timeElapsed?: number;
  distance?: number;
  paceStr?: string;
  totalDistance?: number;
}
const StatsNoMap: React.FC<Props> = ({
  children,
  timeElapsed,
  distance,
  paceStr,
  totalDistance,
}) => {
  return (
    <ScrollView className="bg-[#13121E] flex-1  pt-20">
      <View className="flex-row justify-evenly pb-6">
        <View className="bg-[#262630] w-2/5 flex items-center justify-center  py-3 rounded-3xl">
          <Text
            className="text-white text-2xl pb-2"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {paceStr}
          </Text>

          <View className="  flex-row items-center">
            <View
              className="w-4 aspect-square"
              style={{
                transform: [{ scaleX: -1 }],
              }}
            >
              <PaceIcon color="#C8C8C8" />
            </View>
            <Text
              className="text-[#C8C8C8]  text-lg pl-1"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Pace
            </Text>
          </View>
        </View>
        <View className="bg-[#262630] w-2/5 flex items-center justify-center  py-3 rounded-3xl">
          <Text
            className="text-white  text-3xl pb-2"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {timeElapsed ? getReturnValues(timeElapsed) : "00:00"}
          </Text>

          <View className="  flex-row items-center">
            <View className="w-4 aspect-square">
              <TimeIcon color="#C8C8C8" />
            </View>
            <Text
              className="text-[#C8C8C8]  text-lg pl-1"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Time
            </Text>
          </View>
        </View>
      </View>
      <View className="bg-[#262630] p-12 w-[90%] mx-auto  flex items-center justify-center   rounded-3xl ">
        <Text
          className="text-white  text-3xl pb-2"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {getDistanceToShow(distance)}
          {totalDistance ? ` / ${getDistanceToShow(totalDistance)}` : null}
        </Text>

        <View className="  flex-row items-center">
          <View className="w-4 aspect-square">
            <DistanceIcon color="#C8C8C8" />
          </View>
          <Text
            className="text-[#C8C8C8]  text-lg pl-1"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            Distance covered
          </Text>
        </View>
      </View>
      {/* <View className="py-12 flex justify-around">
        <View className="">{children}</View>
        <View className="px-4  py-12 iphoneX:pb-2">
          <Image
            source={{ uri: bottomRunnigStaticImage }}
            resizeMode="contain"
            className="w-full h-32 "
          />
        </View>
      </View> */}
    </ScrollView>
  );
};

export default StatsNoMap;
