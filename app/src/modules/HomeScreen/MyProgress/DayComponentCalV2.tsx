import { TouchableOpacity, View, Dimensions } from "react-native";
import DayCircleV3 from "./DayCircleV3";
import { memo } from "react";
import { DayProps } from "react-native-calendars/src/calendar/day";
import { DateData } from "react-native-calendars";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useMonthlyStreakContext } from "@providers/monthlyStreak/MonthlyStreakProvider";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useCurrentDayStore } from "@providers/monthlyStreak/CurrentDayStore";

const { width } = Dimensions.get("window");

const DayComponentCalV2: React.FC<
  DayProps & {
    date?: DateData | undefined;
  }
> = ({ date, onPress, marking }) => {
  const { today, todayUnix } = useAuthContext();
  const { goalObjs, loading } = useMonthlyStreakContext();

  const setSelDate = useCurrentDayStore((state) => state.setSelDate);

  const achievedFP =
    date?.dateString && goalObjs[date?.dateString]?.achievedFP
      ? goalObjs[date?.dateString]?.achievedFP
      : 0;
  const totalFP =
    date?.dateString && goalObjs[date?.dateString]?.targetFP
      ? goalObjs[date?.dateString]?.targetFP
      : 1;

  const middleText = date?.dateString.slice(8, 10);
  let middleTextToShow = "";
  if (middleText) {
    middleTextToShow = `${parseInt(middleText)}`;
  }

  const isFuture =
    date?.dateString === today
      ? false
      : date?.timestamp
      ? todayUnix < date?.timestamp
      : false;

  if (loading) {
    return (
      <SkeletonPlaceholder
        backgroundColor="#FFFFFF33"
        speed={800}
        highlightColor="#00000033"
      >
        <View
          style={{ width: width / 8, height: width / 8 }}
          //   className="m-1"
        ></View>
      </SkeletonPlaceholder>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity
        disabled={isFuture}
        onPress={() => {
          onPress(date);
          setSelDate(date?.dateString ? date?.dateString : today);
        }}
      >
        <DayCircleV3
          isSelected={marking?.selected ? true : false}
          percent={achievedFP / totalFP}
          middleText={middleTextToShow}
          isFuture={isFuture}
          isToday={today === date?.dateString ? true : false}
          inActiveColor="#FFFFFF33"
          isCalender={true}
          calenderStyleTw="py-0 "
        />
        {/* <Text className="text-white">{date?.dateString}</Text> */}
        {/* <Text className="text-white">{marking?.selected ? "Y" : "-"}</Text> */}
      </TouchableOpacity>
    );
  } else {
    return <View />;
  }
};

export default memo(
  DayComponentCalV2,

  (prev, now) => {
    if (
      prev.marking?.selected === now.marking?.selected &&
      prev.date?.dateString === now.date?.dateString
    ) {
      return true;
    }

    return false;
  }
);
