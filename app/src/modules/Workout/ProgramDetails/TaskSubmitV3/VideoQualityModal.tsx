import { View, Text, TouchableOpacity } from "react-native";
import clsx from "clsx";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";
import TickIcon from "@components/SvgIcons/TickIcon";

interface Props {}

const VideoQualityModal: React.FC<Props> = ({}) => {
  // const { streamingState, onResume, onFinish, onQuit, finalOrientation } =
  //   useContentContext();

  const { resolution, toggleResolution, finalOrientation } =
    useWorkoutVideoStore((state) => {
      return {
        toggleResolution: state.toggleResolution,
        resolution: state.max_resolution,
        finalOrientation: state.finalOrientation,
      };
    }, shallow);

  const on720 = () => {
    toggleResolution("720p");
  };

  const onFull = () => {
    toggleResolution("full");
  };

  return (
    <View className=" flex justify-center items-center relative z-0">
      {/* <Pressable
        className="absolute inset-0 w-full h-full -z-10"
        onPress={onResume}
      /> */}
      <Text className="text-white text-base iphoneX:text-lg font-medium pb-2">
        Set Video Quality
      </Text>
      <View
        className={clsx(
          " border border-[#8F8F8F] rounded-xl p-6",
          finalOrientation === "landscape" ? "w-1/2" : "w-5/6"
        )}
      >
        <TouchableOpacity
          onPress={on720}
          className="flex flex-row items-center"
        >
          <View className="flex-1">
            <Text className="text-white text-sm font-semibold">Low Data</Text>
            <Text className="text-white/80 text-xs">
              Data efficient mode. Max Quality is 720p
            </Text>
          </View>
          <View className="pl-8">
            {resolution === "720p" ? (
              <View className="w-6 h-6">
                <TickIcon color="#fff" />
              </View>
            ) : (
              <View
                className={clsx("w-6 h-6 rounded-full border border-[#8F8F8F]")}
              ></View>
            )}
          </View>
        </TouchableOpacity>

        <View className="h-4" />
        <View className="flex-1 h-px" style={{ backgroundColor: "#8F8F8F" }} />
        <View className="h-4" />

        <TouchableOpacity
          onPress={onFull}
          className="flex flex-row items-center"
        >
          <View className="flex-1">
            <Text className="text-white text-sm font-semibold">
              Best Quality Possible
            </Text>
            <Text className="text-white/80 text-xs">
              Best quality possible with your network
            </Text>
          </View>

          <View className="pl-8">
            {resolution !== "720p" ? (
              <View className="w-6 h-6">
                <TickIcon color="#fff" />
              </View>
            ) : (
              <View
                className={clsx("w-6 h-6 rounded-full border border-[#8F8F8F]")}
              ></View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoQualityModal;
