import { View, Text } from "react-native";

// import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import DistanceIcon from "@components/SvgIcons/DistanceIcon";
import TimeIcon from "@components/SvgIcons/TimeIcon";
import PaceIcon from "@components/SvgIcons/PaceIcon";
// import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
// import { shareIcon } from "@constants/imageKitURL";
// import { sectionTypes } from "..";
import BlurBG from "@components/BlurBG";
import { getReturnValues } from "../utils";
// import { useTaskContext } from "@providers/task/TaskProvider";
import { getDistanceToShow } from "./utils";
interface Props {
  // section?: sectionTypes;
  // setSection: (val: sectionTypes) => void;
  timeElapsed?: number;
  distance?: number;
  paceStr?: string;
  // onStart: () => void;
  // onPause: () => void;
  // onFinish: () => void;
}
const MapsRunning: React.FC<Props> = ({
  // section,
  // setSection,
  distance,
  paceStr,
  timeElapsed,
  // onStart,
  // onPause,
  // onFinish,
}) => {
  return (
    <>
      <View
        // colors={["transparent", "#100F1A", "#100F1A", "#100F1A"]}
        className="px-4"
      >
        <View className="bg-[#26263057] relative p-7 px-0  flex items-center     rounded-3xl flex-row justify-evenly aspect-[333/105]">
          <BlurBG
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 26,
            }}
            blurAmount={10}
            fallbackColor="#262630"
            blurType="dark"
          />
          <View className="flex items-center">
            <Text
              className="text-white  text-xl pb-2"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {getDistanceToShow(distance)}
            </Text>

            <View className="  flex-row items-center">
              <View className="w-2.5 aspect-square">
                <DistanceIcon color="#C8C8C8" />
              </View>
              <Text
                className="text-[#C8C8C8]  text-xs pl-1"
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                Kilometers
              </Text>
            </View>
          </View>
          <View className="w-px h-14 bg-[#FFFFFF47]" />
          <View className="flex items-center">
            <Text
              className="text-white  text-xl pb-2"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {paceStr}
            </Text>

            <View className="  flex-row items-center">
              <View
                className="w-2.5 aspect-square"
                style={{
                  transform: [{ scaleX: -1 }],
                }}
              >
                <PaceIcon color="#C8C8C8" />
              </View>
              <Text
                className="text-[#C8C8C8]  text-xs pl-1"
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                Pace
              </Text>
            </View>
          </View>
          <View className="w-px h-14 bg-[#FFFFFF47]" />
          <View className="flex items-center min-w-[25%]">
            <Text
              className="text-white  text-xl pb-2"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {timeElapsed ? getReturnValues(timeElapsed) : "00:00"}
            </Text>

            <View className="  flex-row items-center">
              <View className="w-2.5 aspect-square">
                <TimeIcon color="#C8C8C8" />
              </View>
              <Text
                className="text-[#C8C8C8]  text-xs pl-1"
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                Time
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default MapsRunning;
