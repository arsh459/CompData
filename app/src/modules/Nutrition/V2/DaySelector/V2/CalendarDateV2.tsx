import CirclePercent from "@components/CirclePercent";
import SvgIcons from "@components/SvgIcons";
import { dayRecommendation } from "@models/User/User";
import { useAuthContext } from "@providers/auth/AuthProvider";
import clsx from "clsx";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { dayObj } from "../interface";
import { useDayContext } from "../provider/DayProvider";

interface Props {
  onPress: () => void;
  day: dayObj;
  numStr: string;
  color?: string;
  recomendation?: dayRecommendation;
}

const CalenderDateV2: React.FC<Props> = ({
  onPress,
  day,
  color,
  recomendation,
  numStr,
}) => {
  const { width } = useWindowDimensions();
  const { selectedUnix, startUnixDayStart } = useDayContext();

  const { today } = useAuthContext();
  const itemWidth = width / 7;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "flex justify-center items-center rounded-xl py-2",
        selectedUnix === day.unix ? "bg-[#103C62]" : ""
      )}
      style={{ width: itemWidth }}
    >
      <Text
        className="text-white text-sm font-medium"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {day.day}
      </Text>
      <View className="w-4 aspect-square" />
      {recomendation && !recomendation.tasks.length ? (
        <View style={{ width: itemWidth * 0.7, aspectRatio: 1 }}>
          <SvgIcons iconType="restDay" color={color} />
        </View>
      ) : (
        <CirclePercent
          circleSize={itemWidth * 0.7}
          percent={(recomendation?.doneFP || 0) / (recomendation?.taskFP || 1)}
          showInactive={true}
          strokeWidth={day.unix >= startUnixDayStart ? 6 : 0}
          activeColor={color}
          inActiveColor={color ? `${color}33` : undefined}
          noAnimation={true}
        >
          <View className="w-full h-full flex justify-center items-center">
            <Text
              className="text-white text-xs"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {numStr}
            </Text>
          </View>
        </CirclePercent>
      )}
      <View className="w-1.5 aspect-square" />
      <View className="w-full h-3 flex justify-center items-center">
        {today === day.date ? (
          <View
            className={clsx(
              today === day.date ? "opacity-100" : "opacity-0",
              "w-1/3 h-[5px] rounded-full"
            )}
            style={{ backgroundColor: color }}
          />
        ) : day.unix === startUnixDayStart ? (
          <View className="w-3 aspect-square">
            <SvgIcons iconType="star" />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default CalenderDateV2;
