import { useAuthContext } from "@providers/auth/AuthProvider";
import clsx from "clsx";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { dayObj } from "../interface";
import { format } from "date-fns";
// import { useUserContext } from "@providers/user/UserProvider";
import { getPeriodType } from "@modules/PeriodCalenderLogMain/utils";

interface Props {
  onPress: () => void;
  day: dayObj;
  numStr: string;
  color?: string;
  isSelected?: boolean;
}

const CalenderDateV4: React.FC<Props> = ({
  onPress,
  day,
  color,

  numStr,
  isSelected,
}) => {
  const { width } = useWindowDimensions();
  //   const { selectedUnix, startUnixDayStart } = useDayContext();
  // const { user } = useUserContext();
  const { today } = useAuthContext();
  const itemWidth = width / 7;
  const isToday = today === day.date;
  const periodType = getPeriodType(undefined, undefined);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "flex justify-center items-center rounded-xl py-2",
        isSelected ? "bg-[#343150]" : ""
      )}
      style={{ width: itemWidth }}
    >
      <Text
        className="text-white/80 text-xs font-medium"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {format(day.unix, "eee")}
      </Text>
      <Text
        className="text-white text-lg"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {numStr}
      </Text>
      <View
        className={clsx(
          "w-4 aspect-square  rounded-full",
          periodType === "PERIOD"
            ? "bg-red-400"
            : periodType === "ESTIMATED_PERIOD"
            ? "border border-red-400 border-dashed"
            : ""
        )}
      />
      {isToday ? (
        <View className="w-4 h-1 mt-1 bg-red-400 rounded-full" />
      ) : null}

      <View className="w-1.5 aspect-square" />
    </TouchableOpacity>
  );
};

export default CalenderDateV4;
