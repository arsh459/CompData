import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { updateTodayFlag } from "@modules/SwapMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { format } from "date-fns";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { getDayStr } from "../hooks/useBadgeProgressCalender";
import { useDayContext } from "../provider/DayProvider";
import CalenderViewV2 from "./CalendarViewV2";
interface Props {
  type: dayRecommendationType;
  recomendation?: dayRecommendation;
}

const DaySelectorV2: React.FC<Props> = ({ type, recomendation }) => {
  const color =
    type == "workout" ? "#19C8FF" : type == "nutrition" ? "#FCB750" : "#FFFFFF";

  const {
    selectedtDate,
    selectedUnix,
    setSelectedUnix,
    setSelectedDate,
    setSelectedWeekDay,
  } = useDayContext();

  const { today, todayUnix } = useAuthContext();
  const { user } = useUserContext();
  useEffect(() => {
    if (user?.flags?.goToday) {
      updateTodayFlag(user.uid, false);

      setSelectedDate(today);
      setSelectedWeekDay(getDayStr(new Date(todayUnix)));
      setSelectedUnix(todayUnix);
    }
  }, [user?.flags?.goToday, today, todayUnix, user?.uid]);

  return (
    <View className="w-full relative z-0">
      <CalenderViewV2
        type={type}
        color={color}
        text={
          selectedtDate === today
            ? `Today, ${format(new Date(selectedUnix), "do LLLL yyyy")}`
            : format(new Date(selectedUnix), "do LLLL yyyy")
        }
      />
      {recomendation && !recomendation.tasks.length ? (
        <Text className="text-white text-base text-center my-2">
          This is your Rest day
        </Text>
      ) : null}
    </View>
  );
};

export default DaySelectorV2;
