import { DateData } from "react-native-calendars";
import { useUserStreakV2 } from "./useUserStreakV2";

const useCurrentStreakMonth = () => {
  const { onStreakMonthChange } = useUserStreakV2();
  const onMonthChange = (date: DateData) => {
    onStreakMonthChange(date.timestamp);
  };
  return { onMonthChange };
};

export default useCurrentStreakMonth;
