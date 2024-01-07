import { View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
interface MultiSliderProps {
  selected: number;
  setSelected: (index: number) => void;
  trackMarks: number[];
  minValue?: number;
  thumbColor?: string;
  trackMarkColor?: string;
  borderWidthDot?: number;
}

const MultiSlider: React.FC<MultiSliderProps> = ({
  selected,
  setSelected,
  trackMarks,
  thumbColor,
  trackMarkColor,
  borderWidthDot,
}) => {
  // const trackMarks = [0, 1, 2, 3, 4];

  const borderWidth = borderWidthDot ? borderWidthDot : 6;
  return (
    <View className=" w-full px-4 pt-10 relative z-0">
      <Slider
        animateTransitions
        maximumValue={trackMarks.length - 1}
        minimumValue={trackMarks[0]}
        step={1}
        value={selected}
        trackStyle={{
          height: 26,
          borderRadius: 16,

          backgroundColor: "#343150",
        }}
        trackMarks={trackMarks}
        thumbTintColor={thumbColor ? thumbColor : "#FF754E"}
        maximumTrackTintColor="#d3d3d3"
        minimumTrackTintColor="#343150"
        thumbStyle={{ width: 34, height: 34, borderRadius: 17 }}
        onValueChange={(value) => setSelected(value[0])}
        trackClickable
        renderTrackMarkComponent={(index: number) => {
          // const currentMarkValue = trackMarks[index];
          // const currentSliderValue =
          //   selected || (Array.isArray([selected]) && selected) || 0;
          // const isActive = currentMarkValue > Math.max(currentSliderValue);

          return (
            <View
              style={{
                borderColor: thumbColor ? thumbColor : "#FF754E",
                borderRadius: (borderWidth * 3) / 2,
                borderWidth,
                left: borderWidth * 1.5,
                // right: isActive ? -borderWidth * 3 : undefined,
              }}
            />
          );
        }}
      />

      <View className="absolute left-0 right-0 px-5 top-full ">
        <View className="flex flex-row justify-between flex-1">
          <View className="">
            <Text
              className="text-white text-sm "
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Less
            </Text>
          </View>
          <View className="">
            <Text
              className="text-white text-sm "
              style={{ fontFamily: "Nunito-Bold" }}
            >
              More
            </Text>
          </View>
        </View>
      </View>
      <Text
        className="text-white/25 text-sm text-center pt-6"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Slide to interact
      </Text>
    </View>
  );
};

export default MultiSlider;
