import { Slider } from "@miblanchard/react-native-slider";
import { View, useWindowDimensions } from "react-native";
import { getWidthHeightMedia } from "@utils/media/mediaDimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { useContentContext } from "./utils/ContentProvider";
import { shallow } from "zustand/shallow";

const CustomSlider = () => {
  const { bottom } = useSafeAreaInsets();
  const dims = useWindowDimensions();
  const { videoRef } = useContentContext();
  const { width, totalSec, currVal, onSeek } = useWorkoutVideoStore((state) => {
    const { width } = getWidthHeightMedia(
      dims.width,
      dims.height,
      state.task?.avatar,
      state.finalOrientation
    );
    return {
      width,
      finalOrientation: state.finalOrientation,
      currVal: state.positionData.currentVal,
      totalSec: state.positionData.totalSec,
      onSeek: state.onSeek,
    };
  }, shallow);

  const handleSlideWrapper = (val: number[]) => {
    if (val.length) {
      onSeek(val[0], videoRef);
    }
  };

  // console.log("custom slider");

  // const { finalOrientation, positionData, handleSlide } = useContentContext();

  return (
    <View
      style={{
        width,
        paddingBottom: bottom,
      }}
      className="mx-auto -my-3"
    >
      <Slider
        value={currVal}
        minimumValue={0}
        maximumValue={totalSec}
        onSlidingComplete={handleSlideWrapper}
        step={1}
        trackStyle={{ height: 12 }}
        maximumTrackTintColor="#FFFFFF99"
        minimumTrackTintColor="#875EFF"
        renderThumbComponent={() => <View />}
      />
    </View>
  );
};

export default CustomSlider;
