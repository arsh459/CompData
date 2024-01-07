import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  rightMainText?: string;
  rightSubText?: string;
  leftText?: string;
  onPressEditSchedule: () => void;
}
const WeightSheduleBox: React.FC<Props> = ({
  rightMainText,
  rightSubText,
  leftText,
  onPressEditSchedule,
}) => {
  return (
    <View className="bg-[#343150] rounded-xl p-5 mt-5  mx-4">
      <View className=" flex flex-row justify-between items-center">
        <Text
          className="text-white text-lg iphoneX:text-xl w-1/2 leading-6"
          style={{ fontFamily: "Nunito-Medium" }}
        >
          {leftText}
        </Text>
        <View className="flex ">
          <Text
            className="text-white text-base iphoneX:text-xl "
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {rightMainText}
          </Text>
          {rightSubText ? (
            <Text
              className="text-white/80 text-xs "
              style={{ fontFamily: "Nunito-Light" }}
            >
              {rightSubText}
            </Text>
          ) : null}
        </View>
      </View>
      <View className="w-full h-px my-4 bg-[#FFFFFF33]" />
      <TouchableOpacity onPress={onPressEditSchedule}>
        <Text
          className="text-[#745AE2] text-lg iphoneX:text-xl  text-center"
          style={{ fontFamily: "Nunito-Medium" }}
        >
          Edit Schedule
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeightSheduleBox;
