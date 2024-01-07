import CirclePercent from "@components/CirclePercent";
import SvgIcons from "@components/SvgIcons";
// import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { dayRecommendation } from "@models/User/User";
// import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import clsx from "clsx";
// import { format } from "date-fns";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { getDateStr, getMidnigthDate } from "./hooks/useBadgeProgressCalender";
import { dayObj } from "./interface";
import { useDayContext } from "./provider/DayProvider";

const paddingX = 8;

interface Props {
  onPress: () => void;
  day: dayObj;
  numStr: string;
  color?: string;
  recomendation?: dayRecommendation;
}

const CalenderDate: React.FC<Props> = ({
  onPress,
  day,
  color,
  recomendation,
  numStr,
}) => {
  const { width } = useWindowDimensions();
  const { selectedUnix, startUnixDayStart } = useDayContext();

  const today = getDateStr(getMidnigthDate(Date.now()));

  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "flex justify-center items-center rounded-xl py-2 my-3",
        selectedUnix === day.unix ? "bg-[#5D588C94]" : ""
      )}
      style={{ paddingHorizontal: paddingX }}
    >
      <Text className="text-white text-sm font-medium">{day.day}</Text>
      <View className="w-4 aspect-square" />
      {recomendation && !recomendation.tasks.length ? (
        <View style={{ width: (width - 16 * paddingX) / 7, aspectRatio: 1 }}>
          <SvgIcons iconType="restDay" color={color} />
        </View>
      ) : (
        <CirclePercent
          circleSize={(width - 16 * paddingX) / 7}
          percent={(recomendation?.doneFP || 0) / (recomendation?.taskFP || 1)}
          showInactive={true}
          strokeWidth={day.unix >= startUnixDayStart ? 4 : 0}
          activeColor={color}
          inActiveColor={color ? `${color}33` : undefined}
        >
          <View className="w-full h-full flex justify-center items-center">
            <Text className="text-white text-xs iphoneX:text-sm">{numStr}</Text>
          </View>
        </CirclePercent>
      )}
      <View className="w-2 aspect-square" />
      <View className="w-full h-3 flex justify-center items-center">
        {today === day.date ? (
          <View
            className={clsx(
              today === day.date ? "opacity-100" : "opacity-0",
              "w-11/12 h-[5px] rounded-full"
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

export default CalenderDate;
