import HorizontalDayComponent, {
  calendatItemWidth,
  horizontalItemHeight,
} from "@modules/Nutrition/V2/DaySelector/V3/HorizontalDayComponent";
import {
  CalendarProvider,
  DateData,
  WeekCalendar,
} from "react-native-calendars";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useUserContext } from "@providers/user/UserProvider";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useCallback } from "react";
import { usePeriodDatesForUser } from "@providers/period/hooks/usePeriodDatesForUser";

// selectedDate
// today in each component
// marked

interface Props {}

const HorizontalPeriodCalendar: React.FC<Props> = ({}) => {
  // const { todayUnix } = useAuthContext();

  usePeriodDatesForUser();

  const markedDates = useCurrentPeriodStore((state) => state.markedDates);

  const toggleSelectedDate = useCurrentPeriodStore(
    (state) => state.toggleSelectedDate
  );

  // get today
  const today = useCurrentPeriodStore((state) => state.today);
  // const initData = useCurrentPeriodStore((state) => state.initData);

  const onDayPressHandler = useCallback((dateData: DateData) => {
    toggleSelectedDate(dateData.dateString);
  }, []);

  return (
    <CalendarProvider
      date={today}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        dayTextColor: "#FFFFFF",
        weekVerticalMargin: 0,
      }}
    >
      <WeekCalendar
        pastScrollRange={2}
        firstDay={1}
        onVisibleMonthsChange={() => console.log("month changed")}
        markedDates={markedDates}
        futureScrollRange={1}
        pagingEnabled={true}
        onDayPress={onDayPressHandler}
        dayComponent={HorizontalDayComponent}
        scrollEnabled={true}
        calendarWidth={calendatItemWidth * 8}
        calendarHeight={horizontalItemHeight + 10}
        // calendarStyle={{ flex: 1, paddingBottom: 40 }}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          dayTextColor: "#FFFFFF",
          weekVerticalMargin: 0,
        }}
        hideDayNames={true}
      />
    </CalendarProvider>
  );
};

export default HorizontalPeriodCalendar;
