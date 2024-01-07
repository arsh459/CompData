import { expandIcon, polygonIcon } from "@constants/imageKitURL";
import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { updateTodayFlag } from "@modules/SwapMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { getDayStr } from "../hooks/useBadgeProgressCalender";
import { useDayContext } from "../provider/DayProvider";
import CalenderViewV3 from "./CalendarViewV3";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  type: dayRecommendationType;
  recomendation?: dayRecommendation;
}

const DaySelectorV3: React.FC<Props> = ({ type, recomendation }) => {
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
  const { badge } = useSignleBadgeContext();
  const navigation = useNavigation();
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
    <>
      <View className="m-4 flex flex-row items-center justify-between bg-[#343150] px-0 py-2 rounded-xl">
        <Pressable
          style={({ pressed }) => [pressed ? { opacity: 0.9 } : {}]}
          onPress={() =>
            navigation.navigate("DayCalander", {
              badgeId: badge?.id || "",
              type: type,
              st: selectedUnix || todayUnix,
            })
          }
          className="w-3.5 iphoneX:w-4 aspect-square ml-4"
        >
          <Image
            source={{ uri: expandIcon }}
            className="w-full aspect-square"
            resizeMode="contain"
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => [pressed ? { opacity: 0.9 } : {}]}
          onPress={() => setVisible(!visible)}
          className="flex-grow"
        >
          <Text
            className="text-sm iphoneX:text-base text-white text-center"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {selectedtDate === today
              ? `Today, ${format(new Date(selectedUnix), "do LLLL yyyy")}`
              : format(new Date(selectedUnix), "do LLLL yyyy")}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [pressed ? { opacity: 0.9 } : {}]}
          className="w-3.5 iphoneX:w-4 aspect-square  mx-4"
          onPress={() => setVisible(!visible)}
        >
          <Image
            style={{ transform: [{ rotate: visible ? "180deg" : "0deg" }] }}
            source={{ uri: polygonIcon }}
            className="w-full aspect-square"
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {visible ? (
        <View className="w-full py-4">
          <CalenderViewV3
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

      {recomendation && !recomendation.tasks.length ? (
        <Text className="text-white text-base text-center mt-2">
          This is your Rest day
        </Text>
      ) : null}
    </>
  );
};

export default DaySelectorV3;
