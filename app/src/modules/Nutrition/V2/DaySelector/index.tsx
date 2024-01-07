import BlurBG from "@components/BlurBG";
import UseModal from "@components/UseModal";
// import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { updateTodayFlag } from "@modules/SwapMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { View, useWindowDimensions, Pressable, Text } from "react-native";
import CalenderView from "./CalenderView";
import DayChanger from "./DayChanger";
import { getDayStr } from "./hooks/useBadgeProgressCalender";
import { useDayContext } from "./provider/DayProvider";

interface Props {
  type: dayRecommendationType;
  recomendation?: dayRecommendation;
}

const DaySelector: React.FC<Props> = ({ type, recomendation }) => {
  const color =
    type == "workout" ? "#19C8FF" : type == "nutrition" ? "#FCB750" : "#FFFFFF";
  const { height } = useWindowDimensions();
  const {
    selectedtDate,
    selectedUnix,
    setSelectedUnix,
    setSelectedDate,
    setSelectedWeekDay,
  } = useDayContext();

  const [py, setPy] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  const viewRef = useRef<View>(null);

  useEffect(() => {
    if (viewRef.current && visible && !py) {
      viewRef.current.measure((fx, fy, width, height, px, py) => setPy(py));
    }
  }, [viewRef.current, visible, py]);

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

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <View ref={viewRef} collapsable={false}>
        <DayChanger
          color={color}
          type={type}
          text={
            selectedtDate === today
              ? "Today"
              : format(new Date(selectedUnix), "do, LLL")
          }
          onPress={() => setVisible(true)}
          recomendation={recomendation}
        />
      </View>
      <UseModal
        visible={visible && py !== 0}
        onClose={onClose}
        width="w-full"
        height="h-full"
        tone="dark"
        classStr="flex justify-end"
      >
        <Pressable
          className="absolute left-0 right-0 top-0 bottom-0 z-0"
          onPress={onClose}
        />
        <View
          className="w-full relative z-0"
          style={{ height: isNaN(height - py) ? height : height - py }}
        >
          <BlurBG
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            blurAmount={20}
            fallbackColor="#232136E5"
            blurType="dark"
          />
          <Pressable
            className="absolute left-0 right-0 top-0 bottom-0 z-0"
            onPress={onClose}
          />
          <CalenderView
            type={type}
            onClose={onClose}
            color={color}
            text={
              selectedtDate === today
                ? "Today"
                : format(new Date(selectedUnix), "do, LLL")
            }
          />
          {recomendation && !recomendation.tasks.length ? (
            <Text className="text-white text-base text-center my-2">
              This is your Rest day
            </Text>
          ) : null}
        </View>
      </UseModal>
    </>
  );
};

export default DaySelector;
