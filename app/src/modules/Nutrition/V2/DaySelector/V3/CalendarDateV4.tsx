import CirclePercent from "@components/CirclePercent";
import SvgIcons from "@components/SvgIcons";
import { dayRecommendation } from "@models/User/User";
import { useAuthContext } from "@providers/auth/AuthProvider";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";
import { dayObj } from "../interface";
import { useDayContext } from "../provider/DayProvider";
import { Day, useWorkoutPreference } from "@hooks/task/useWorkoutPreference";
import { format } from "date-fns";

interface Props {
  onPress: () => void;
  day: dayObj;
  numStr: string;
  color?: string;
  recomendation?: dayRecommendation;
  itemWidth: number;
  showRest: boolean;
}

const CalenderDateV3: React.FC<Props> = ({
  onPress,
  day,
  color,
  recomendation,
  numStr,
  itemWidth,
  showRest,
}) => {
  const { selectedUnix, startUnixDayStart } = useDayContext();
  const { today, todayUnix } = useAuthContext();

  const { workoutDays } = useWorkoutPreference();
  const targetDay = format(new Date(day.unix), "EEEE").toLowerCase() as Day;
  const restDay = !workoutDays.includes(targetDay);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx("flex justify-center items-center py-2 ")}
      style={{ width: itemWidth }}
    >
      <View
        className={clsx(
          selectedUnix === day.unix
            ? "bg-[#FFFFFF26] aspect-[36/21]  rounded-full"
            : ""
        )}
      >
        <Text
          className={clsx("text-white text-sm text-center w-full px-3 py-1")}
          style={{ fontFamily: "Nunito-Medium" }}
        >
          {day.day}
        </Text>
      </View>
      <View
        className={clsx(
          " aspect-square",
          selectedUnix === day.unix ? "w-4" : "w-4"
        )}
      />
      {restDay && day.unix > startUnixDayStart && showRest ? (
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
              className={clsx(
                " text-xs",
                day.unix <= todayUnix ? "text-white" : "text-[#FFCC194D]"
              )}
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

export default CalenderDateV3;
