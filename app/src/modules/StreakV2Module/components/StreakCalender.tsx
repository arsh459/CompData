import { Calendar } from "react-native-calendars";
import { useEffect } from "react";
import StreakDayComponent from "./StreakDayComponent";
import { useUserStreakV2 } from "@providers/streakV2/hooks/useUserStreakV2";
import useCurrentStreakMonth from "@providers/streakV2/hooks/useCurrentStreakMonth";

const StreakCalender: React.FC = () => {
  const { onStreakMonthChange } = useUserStreakV2();
  const { onMonthChange } = useCurrentStreakMonth();

  //// hook to get months streak data. GET visible month
  useEffect(() => {
    // don't path any params
    onStreakMonthChange(Date.now());
  }, []);

  return (
    <Calendar
      enableSwipeMonths={true}
      hideExtraDays={true}
      firstDay={1}
      onMonthChange={onMonthChange}
      dayComponent={StreakDayComponent}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        monthTextColor: "#FFFFFF",
        dayTextColor: "#656094",
        arrowColor: "#FFFFFF",
        textDayStyle: { color: "#656094" },
      }}
    />
  );
};

export default StreakCalender;
