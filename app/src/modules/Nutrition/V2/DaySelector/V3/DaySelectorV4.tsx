// import {
//   DownIcon,
//   expandIcon,
//   faqDownIcon,
//   nutriLogoNew,
//   polygonIcon,
// } from "@constants/imageKitURL";
import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { updateTodayFlag } from "@modules/SwapMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
// import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { getDayStr } from "../hooks/useBadgeProgressCalender";
import { useDayContext } from "../provider/DayProvider";
// import CalenderViewV3 from "./CalendarViewV3";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
// import ElementCard from "@modules/HomeScreen/MyPlanV2/ElementCard";
// import CalorieProgress from "./CalorieProgress";
// import ProgressBar from "@components/ProgressBar";
// import NutritientTargetProgress from "./NutritientTargetProgress";
import CalenderViewV4 from "./CalendarViewV4";
import DateHeading from "./DateHeading";

interface Props {
  type: dayRecommendationType;
  recomendation?: dayRecommendation;
}

const DaySelectorV4: React.FC<Props> = ({ type, recomendation }) => {
  const [visible, setVisible] = useState<boolean>(false);
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
  // const { badge } = useSignleBadgeContext();
  // const navigation = useNavigation();
  const { uid, goToday } = useUserStore((state) => {
    return { uid: state.user?.uid, goToday: state.user?.flags?.goToday };
  }, shallow);

  useEffect(() => {
    if (uid && goToday) {
      updateTodayFlag(uid, false);

      setSelectedDate(today);
      setSelectedWeekDay(getDayStr(new Date(todayUnix)));
      setSelectedUnix(todayUnix);
    }
  }, [goToday, today, todayUnix, uid]);

  return (
    <View className="border border-white">
      <DateHeading visible={visible} setVisible={setVisible} />
      {visible ? (
        <View className="w-full py-4 bg-[#343150B2]">
          {/** @arsh - ADD DATE SELECTOR HERE */}
          <CalenderViewV4
            type={type}
            color={color}
            text={
              selectedtDate === today
                ? `Today, ${format(new Date(selectedUnix), "do LLLL yyyy")}`
                : format(new Date(selectedUnix), "do LLLL yyyy")
            }
          />
        </View>
      ) : null}
    </View>
  );
};

export default DaySelectorV4;
