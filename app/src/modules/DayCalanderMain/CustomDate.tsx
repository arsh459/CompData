import { View, Text, Pressable } from "react-native";
import { DateData } from "react-native-calendars";
import CirclePercent from "@components/CirclePercent";
import SvgIcons from "@components/SvgIcons";
import {
  getDateStr,
  // getDayStr,
  getDayStrI,
  getNumStr,
} from "@modules/Nutrition/V2/DaySelector/hooks/useBadgeProgressCalender";
import { dayObj } from "@modules/Nutrition/V2/DaySelector/interface";
import clsx from "clsx";
import { dayRecommendation } from "@models/User/User";
import { useDayContext } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { Day } from "@hooks/task/useWorkoutPreference";

interface Props {
  date: DateData;
  itemWidth: number;
  color: string;
  dateRecs: { [key: string]: dayRecommendation };
  onPress: (val: dayObj) => void;
  showRest: boolean;
}

const CustomDate: React.FC<Props> = ({
  date,
  itemWidth,
  color,
  dateRecs,
  showRest,
  onPress,
}) => {
  const { today } = useAuthContext();

  const { user } = useUserContext();

  const {
    // selectedUnix,
    startUnixDayStart,
  } = useDayContext();

  const dateObj = new Date(date.timestamp);
  const dateMidnightObj = new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
    0,
    0,
    0,
    0
  );

  const dayObj: dayObj = {
    day: getDayStrI(dateMidnightObj),
    date: getDateStr(dateMidnightObj),
    unix: dateMidnightObj.getTime(),
    numStr: getNumStr(dateMidnightObj),
  };

  const onDays = user?.recommendationConfig?.workoutDays;

  const isRestDay =
    showRest && !onDays?.includes(dayObj.day.toLowerCase() as Day);

  const recomendation: dayRecommendation = dateRecs[dayObj.date];

  return (
    <Pressable
      //   onPress={() => onPress(dayObj)}
      className={clsx(
        "flex justify-center items-center rounded-xl py-2"
        // selectedUnix === dayObj.unix ? "bg-[#103C62]" : ""
      )}
      style={{ width: itemWidth }}
    >
      {recomendation && !recomendation.tasks.length ? (
        <View style={{ width: itemWidth * 0.7, aspectRatio: 1 }}>
          <SvgIcons iconType="restDay" color={color} />
        </View>
      ) : isRestDay && dayObj.unix > startUnixDayStart ? (
        <View style={{ width: itemWidth * 0.7, aspectRatio: 1 }}>
          <SvgIcons iconType="restDay" color={color} />
        </View>
      ) : (
        <CirclePercent
          circleSize={itemWidth * 0.7}
          percent={(recomendation?.doneFP || 0) / (recomendation?.taskFP || 1)}
          showInactive={true}
          strokeWidth={dayObj.unix >= startUnixDayStart ? 6 : 0}
          activeColor={color}
          inActiveColor={color ? `${color}33` : undefined}
          noAnimation={true}
        >
          <View className="w-full h-full flex justify-center items-center">
            <Text
              className="text-white text-xs"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {dayObj.numStr}
            </Text>
          </View>
        </CirclePercent>
      )}
      <View className="w-1.5 aspect-square" />
      <View className="w-full h-3 flex justify-center items-center">
        {today === dayObj.date ? (
          <View
            className={clsx(
              today === dayObj.date ? "opacity-100" : "opacity-0",
              "w-1/3 h-[5px] rounded-full"
            )}
            style={{ backgroundColor: color }}
          />
        ) : dayObj.unix === startUnixDayStart ? (
          <View className="w-3 aspect-square">
            <SvgIcons iconType="star" />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

export default CustomDate;
