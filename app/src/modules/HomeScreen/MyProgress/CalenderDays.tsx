import { Text, View } from "react-native";
import { memo, useCallback, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
// import { isSameDay } from "date-fns/esm";
// import { format } from "date-fns";
// import { useMonthlyStreak } from "@providers/streak/hooks/useMonthlyStreak";
// import { goalObj } from "@models/User/User";
// import DayCircleV3 from "./DayCircleV3";
// import DayComponentCal from "./DayComponentCal";
import { format } from "date-fns";
// import { DayProps } from "react-native-calendars/src/calendar/day";
import { MarkedDates } from "react-native-calendars/src/types";
// import DayComponentCalV2 from "./DayComponentCalV2";
import { useMonthlyStreakContext } from "@providers/monthlyStreak/MonthlyStreakProvider";
import DayComponentCalV2 from "./DayComponentCalV2";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { DayProps } from "react-native-calendars/src/calendar/day";
// import { getDayData } from "../utills/getDayData";

// const nowSt = format(new Date(), "yyyy-MM-dd");

// const now = Date.now();

// const getDayData = (
//   val: (string & DateData) | undefined,
//   goalObj: { [date: string]: goalObj }
// ) => {
//   if (val?.dateString) {
//     const gObj = goalObj[val.dateString];

//     if (gObj) {
//       const percent =
//         (gObj.achievedFP / (gObj.targetFP ? gObj.targetFP : 1)) * 100;
//       return {
//         isToday: val.dateString === nowSt,
//         progress: percent,
//         futureDay: val.timestamp > now,
//         day: val.day,
//       };
//     } else {
//       return {
//         isToday: val.dateString === nowSt,
//         futureDay: val.timestamp > now,
//         progress: 0,
//         day: val.day,
//       };
//     }

//     // const sameDay = isSameDay(new Date(), new Date(val?.timestamp));
//     // const futureDay = isFuture(val?.timestamp);
//     // return {
//     //   isToday: sameDay,
//     //   day: val.day,
//     //   futureDay,
//     // };
//   }
//   return {
//     isToday: false,
//     progress: 0,
//     day: 0,
//     futureDay: false,
//   };
// };
interface Props {
  // setSelDate: (newDateString: string) => void;
  // selDate: string;
}

const CalenderDays: React.FC<Props> = ({}) => {
  const {
    onMonthChange,
    // loading,
    // selectedGoalObj,
    // setSelectedGoalObj,
  } = useMonthlyStreakContext();
  // const { today } = useAuthContext();
  // const renders = useRef<number>(0);

  // const dayComonent = useCallback(
  //   (
  //     e: DayProps & {
  //       date?: DateData | undefined;
  //     }
  //   ) => {
  //     const onPressUp = (newDate: DateData | undefined) => {
  //       if (e.onPress) {
  //         e.onPress(newDate);
  //       }

  //       // if (newDate?.dateString) {
  //       //   setSelDate(newDate.dateString);
  //       // }
  //     };
  //     return <DayComponentCalV2 {...e} onPress={onPressUp} />;
  //   },

  //   []

  // const onPressHandle = useCallback(
  //   (date?: DateData | undefined) => {
  //     if (date?.dateString) {
  //       onPress(date?.dateString);
  //     }
  //   },
  //   [onPress]
  // );

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const onPressHandle = useCallback((dateData: DateData) => {
    weEventTrack("streak_clickDate", {});
    setMarkedDates((prev) => {
      // if (prev){}
      const unmarked: MarkedDates = {};
      const unmarkedRet = Object.keys(prev).reduce((acc, item) => {
        return {
          ...acc,
          [item]: {
            selected: false,
          },
        };
      }, unmarked);

      return {
        // ...prev,
        ...unmarkedRet,
        [dateData.dateString]: {
          ...(prev[dateData.dateString] ? prev[dateData.dateString] : {}),
          selected: true,
        },
      };
    });
    // if (prev[dateData.dateString] && prev[dateData.dateString].selected) {
    //   onPress(dateData.dateString);
    // }
  }, []);

  return (
    <View className=" pt-4 pb-10 mx-4">
      {/* <Text className="text-white">Renders in cont: {renders.current++}</Text> */}
      <Calendar
        hideExtraDays={true}
        markedDates={markedDates}
        onMonthChange={onMonthChange}
        onDayPress={onPressHandle}
        firstDay={1}
        dayComponent={DayComponentCalV2}
        enableSwipeMonths={true}
        theme={{
          backgroundColor: "#232136",
          calendarBackground: "#232136",
          arrowColor: "#FFFFFF",
        }}
        renderHeader={(date) => {
          return (
            <View className="">
              <Text
                className="text-[#FFFFFF] text-2xl"
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                {format(new Date(date), "MMMM")}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

// export default CalenderDays;

export default memo(CalenderDays);
