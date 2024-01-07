import MoonIcon from "@components/SvgIcons/MoonIcon";
import SunIcon from "@components/SvgIcons/SunIcon";
import { Text, View, TouchableOpacity } from "react-native";
import clsx from "clsx";
import { timeLabel } from "@models/slots/Slot";

interface Props {
  timePeriod: timeLabel;
  setTimePeriod: (val: timeLabel) => void;
}

const TimeOfTheDay: React.FC<Props> = ({ timePeriod, setTimePeriod }) => {
  return (
    <View
      className={clsx("flex flex-row rounded-xl mx-4 my-5 border border-white")}
    >
      <View
        className="flex-1 rounded-md"
        style={{
          backgroundColor: timePeriod === "Morning" ? "#FFFFFF" : "transparent",
        }}
      >
        <TouchableOpacity onPress={() => setTimePeriod("Morning")}>
          <View className="flex flex-row justify-center items-center py-2">
            <View className="w-3.5 aspect-square mr-3">
              <SunIcon
                color={timePeriod === "Morning" ? "#333333" : "#F1F1F1"}
                opacity={timePeriod === "Morning" ? 1 : 0.7}
              />
            </View>
            <Text
              className={clsx(
                "font-bold  capitalize text-sm",
                timePeriod === "Morning" ? "text-[#333333]" : "text-[#F1F1F1B2]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Morning slot
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        className={clsx("flex-1 rounded-md")}
        style={{
          backgroundColor: timePeriod === "Evening" ? "#FFFFFF" : "transparent",
        }}
      >
        <TouchableOpacity onPress={() => setTimePeriod("Evening")}>
          <View className="flex flex-row justify-center items-center py-2">
            <View className="w-3.5 aspect-square mr-3">
              <MoonIcon
                color={timePeriod === "Evening" ? "#333333" : "#F1F1F1"}
                opacity={timePeriod === "Evening" ? 1 : 0.7}
              />
            </View>
            <Text
              className={clsx(
                "font-bold  capitalize text-sm",
                timePeriod === "Evening" ? "text-[#333333]" : "text-[#F1F1F1B2]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Evening slot
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimeOfTheDay;
