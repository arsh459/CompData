import { TouchableOpacity, View, Text } from "react-native";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";

const VideoQualityBanner: React.FC = ({}) => {
  const { videoResolution, contentModalState, requestResolutionChange } =
    useWorkoutVideoStore((store) => {
      return {
        requestResolutionChange: store.requestResolutionChange,
        videoResolution: store.max_resolution,
        contentModalState: store.contentModalState,
      };
    }, shallow);

  if (contentModalState !== "controls") {
    return null;
  }
  return (
    <View className="">
      <TouchableOpacity
        onPress={requestResolutionChange}
        className="border rounded-xl border-white p-4 py-2 "
      >
        <Text className="text-white/80 text-xs font-medium">
          {videoResolution === "720p" ? "Low Data Mode" : "Best Quality Mode"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoQualityBanner;
