import { periodDateType } from "@models/User/User";
import {
  getBottomBackgroundColor,
  getMainBackgroundColorCalendar,
} from "@modules/PeriodTrackerMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import {
  CalendarDate,
  useCurrentPeriodStore,
} from "@providers/period/periodStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { format } from "date-fns";
import { memo } from "react";
import { View, Dimensions, Text, Pressable } from "react-native";
import { DateData } from "react-native-calendars";
import { DayProps } from "react-native-calendars/src/calendar/day";
import { shallow } from "zustand/shallow";

const { width } = Dimensions.get("window");
const itemWidth = width / 8;

const PeriodDayNonEdit: React.FC<
  DayProps & {
    date?: DateData | undefined;
  }
> = ({ date }) => {
  const calendarDate: CalendarDate | undefined = date
    ? {
        currentDate: date.dateString,
        unix: date.timestamp,
        visibleDate: format(date.timestamp, "dd"),
        day: format(date.timestamp, "eee"),
      }
    : undefined;

  if (calendarDate) {
    return <HelperComp {...calendarDate} />;
  } else {
    return <View style={{ width: itemWidth, height: itemWidth }} />;
  }
};

export default memo(PeriodDayNonEdit, (prev, now) => {
  return prev.date?.dateString === now.date?.dateString;
});

const HelperComp: React.FC<CalendarDate> = ({
  currentDate: date,
  unix,
  visibleDate,
}) => {
  const { today, todayUnix } = useAuthContext();

  const isFuture = unix > todayUnix;

  const { stateOfCal, symptomsPresent, firstCycleStart } =
    useCurrentPeriodStore((state) => {
      const periodDateObj = state.periodDateObjStore[date];

      // startOfLog
      const firstCycle = state.cyclesArray[state.cyclesArray.length - 1];
      const firstCycleStart = firstCycle.startUnix;

      // for dates before cycle start, show dead state

      const symptomList = periodDateObj?.loggedSymptoms
        ? Object.keys(periodDateObj?.loggedSymptoms)
        : [];

      if (periodDateObj) {
        return {
          stateOfCal: periodDateObj.type,
          symptomsPresent: symptomList.length ? true : false,
          firstCycleStart,
        };
      } else {
        return {
          stateOfCal: "UNKNOWN" as periodDateType,
          symptomsPresent: false,
          firstCycleStart,
        };
      }
    }, shallow);

  const markedObj = useCurrentPeriodStore((state) => {
    return state.markedDates[date];
  }, shallow);

  const isSelected = markedObj?.color ? true : false;

  const onPress = useCurrentPeriodStore(
    (state) => state.toggleMonthlySelectedDate
    // shallow
  );

  const isToday = today === date;
  const colorsMain = getMainBackgroundColorCalendar(stateOfCal, isFuture);
  const colorsBottom = getBottomBackgroundColor(stateOfCal, symptomsPresent);

  const isDotted = isFuture || stateOfCal === "ESTIMATED_PERIOD" ? true : false;

  return (
    <Pressable
      onPress={
        unix < firstCycleStart
          ? undefined
          : () => {
              onPress(date);
              weEventTrack("calendar_clickDate", {});
            }
      }
      className="mb-2.5"
    >
      <Text
        className="text-white/50 text-[10px] text-center p-1"
        style={{ opacity: isToday ? 1 : 0 }}
      >
        Today
      </Text>
      <View
        className="p-1.5 rounded-full"
        style={{ backgroundColor: isSelected ? "#FFFFFF26" : undefined }}
      >
        <View
          className="relative z-0 aspect-square mx-auto flex justify-center items-center"
          style={{
            backgroundColor: colorsMain.backgroundColor,
            borderColor: colorsMain.borderColor,
            borderWidth: 1,
            borderRadius: 1000,
            borderStyle: isDotted ? "dotted" : "solid",
          }}
        >
          <Text
            className="text-xs p-1"
            style={{
              color:
                unix < firstCycleStart ? "#FFFFFF4D" : colorsMain.textColor,
            }}
          >
            {parseInt(visibleDate)}
          </Text>
          <View className="absolute -bottom-1/2 left-0 right-0 z-10 flex items-center">
            <View
              className="w-3/5 aspect-square"
              style={{
                backgroundColor: colorsBottom.backgroundColor,
                borderColor: colorsBottom.borderColor,
                borderWidth: 1,
                borderRadius: 1000,
                borderStyle: isDotted ? "dotted" : "solid",
              }}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

memo(HelperComp, (prev, now) => {
  return prev.currentDate === now.currentDate;
});
