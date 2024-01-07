import { TouchableOpacity } from "react-native";
import DayCircleV3 from "./DayCircleV3";
// import { DateData } from "react-native-calendars";
import { localGoalObj } from "@models/User/User";
import { format } from "date-fns";
import { memo } from "react";
// import { DayProps } from "react-native-calendars/src/calendar/day";
// import { DateData } from "react-native-calendars";

interface Props {
  // loading: boolean;
  date: string | undefined; // (string & DateData) | undefined;
  goalObjs: { [date: string]: localGoalObj };
  onPress: (newDate: string) => void;
  isSelected: boolean;
}

const DayComponentCal: React.FC<Props> = ({
  date,
  goalObjs,
  isSelected,
  // loading,
  onPress,
  // onPress,
  // date,
  // marking,
}) => {
  // return onPress ? (
  //   <TouchableOpacity className="text-white" onPress={() => onPress(date)}>
  //     <Text className="text-white text-xs">
  //       {date?.dateString.slice(8, 12)}
  //     </Text>
  //     <Text className="text-white">{marking?.selected ? "Y" : "N"}</Text>
  //   </TouchableOpacity>
  // ) : (
  //   <View />
  // );

  const dayData = getDayData(date, goalObjs);

  return (
    <TouchableOpacity onPress={() => onPress(date ? date : "")}>
      <DayCircleV3
        isSelected={isSelected}
        percent={dayData.progress}
        middleText={`${dayData?.day}`}
        isFuture={dayData.futureDay}
        isToday={dayData.isToday ? dayData.isToday : false}
        inActiveColor="#FFFFFF33"
        isCalender={true}
        calenderStyleTw="py-0 "
      />
    </TouchableOpacity>
  );
};

// export default memo(DayComponentCal, ());

export default memo(DayComponentCal, (prev, now) => {
  if (prev.isSelected === now.isSelected) {
    return false;
  }
  return false;
});

const getDayData = (
  val: string | undefined, // (string & DateData) | undefined,
  goalObj: { [date: string]: localGoalObj }
) => {
  // const now = Date.now();
  const dtToday = format(new Date(), "yyyy-MM-dd");

  if (val) {
    const gObj = goalObj[val];

    const dayList = val.split("-");

    if (gObj) {
      // const dayList = gObj.date.split("-");

      const percent =
        (gObj.achievedFP / (gObj.targetFP ? gObj.targetFP : 1)) * 100;
      return {
        isToday: val === dtToday,
        progress: percent,
        futureDay: gObj.isFuture,

        day: dayList.length === 3 ? parseInt(dayList[2]) : 0,
      };
    } else {
      return {
        isToday: val === dtToday,
        futureDay: true,
        progress: 0,

        day: dayList.length === 3 ? parseInt(dayList[2]) : 0,
      };
    }

    // const sameDay = isSameDay(new Date(), new Date(val?.timestamp));
    // const futureDay = isFuture(val?.timestamp);
    // return {
    //   isToday: sameDay,
    //   day: val.day,
    //   futureDay,
    // };
  }
  return {
    isToday: false,
    progress: 0,
    day: 0,
    futureDay: false,
  };
};
