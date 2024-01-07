import { View, Text } from "react-native";
import { DateData } from "react-native-calendars";
// import { memo } from "react";
import { DayProps } from "react-native-calendars/src/calendar/day";
import ImageWithURL from "@components/ImageWithURL";
import { streakFreeze, targetFlag } from "@constants/imageKitURL";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { shallow } from "zustand/shallow";
import { addDays, format } from "date-fns";
import { memo } from "react";

const StreakDayComponent: React.FC<
  DayProps & {
    date?: DateData | undefined;
  }
> = ({ date }) => {
  const { dayStatus, streakStartedOn, streakTargetDays } = useStreakStore(
    (state) => {
      return {
        dayStatus: date && state.streakMonthDays[date?.dateString],
        streakStartedOn: state.streak?.startedOn,
        streakTargetDays: state.streak?.targetDays,
      };
    },
    shallow
  );

  // console.log("date.dateString", date?.dateString, dayStatus);

  // show flag
  if (streakStartedOn && streakTargetDays) {
    const targetDayDate = addDays(streakStartedOn, streakTargetDays - 1);

    const targetDayDateStr = format(targetDayDate, "yyyy-MM-dd");

    if (date?.dateString === targetDayDateStr) {
      return (
        <View className="flex  relative items-center justify-center w-full h-8">
          <ImageWithURL
            source={{ uri: targetFlag }}
            resizeMode="contain"
            className=" w-10 h-10 absolute top-0.5"
          />
          <Text className="text-[#F4B73F] font-bold">{date?.day}</Text>
        </View>
      );
    }
  }

  if (dayStatus) {
    if (dayStatus === "active") {
      return (
        <View className="flex relative items-center justify-center w-full h-8">
          <View className="bg-[#5E598C] rounded-full w-8 h-full flex justify-center items-center">
            <Text className=" text-white font-bold">{date?.day}</Text>
          </View>
        </View>
      );
    } else if (dayStatus === "activeHit") {
      return (
        <View className="flex relative items-center justify-center w-full h-8">
          <View className=" w-1/2 h-full bg-[#664A20] absolute left-0" />
          <View className="bg-[#FF9901] rounded-full w-8 h-full flex justify-center items-center">
            <Text className="text-[#5C3700] font-bold">{date?.day}</Text>
          </View>
        </View>
      );
    } else if (dayStatus === "isFreeze") {
      return (
        <View className="flex bg-[#664A20] relative items-center justify-center w-full h-8">
          <ImageWithURL
            source={{ uri: streakFreeze }}
            resizeMode="contain"
            className=" w-12 h-12 absolute"
          />
          <Text className="text-[#003963] font-bold">{date?.day}</Text>
        </View>
      );
    } else if (dayStatus === "miss") {
      return (
        <View className="flex relative items-center justify-center w-full h-8">
          <View className="bg-[#5E598C] rounded-full w-8 h-full flex justify-center items-center">
            <Text className=" text-[#ACA4FF] font-bold text-base">x</Text>
          </View>
        </View>
      );
    } else if (dayStatus === "isStreakStartDay") {
      return (
        <View className="flex relative items-center justify-center w-full h-8">
          <View className=" w-1/2 h-full bg-[#664A20] absolute right-0" />
          <View className="bg-[#FF9901] rounded-full w-8 h-full flex justify-center items-center">
            <Text className="text-[#5C3700] font-bold">{date?.day}</Text>
          </View>
        </View>
      );
    } else if (dayStatus === "isDayBtwStreak") {
      return (
        <View className="flex bg-[#664A20] items-center justify-center w-full h-8">
          <Text className="text-[#FFAC30] font-bold">{date?.day}</Text>
        </View>
      );
    }
  } else {
    return (
      <View className="flex items-center justify-center w-full h-8">
        <Text className="text-[#656094] font-bold">{date?.day}</Text>
      </View>
    );
  }

  return <View className="flex items-center justify-center w-full h-8"></View>;
};

// export default StreakDayComponent;

export default memo(StreakDayComponent, (prev, now) => {
  return prev.date?.dateString === now.date?.dateString;
});
