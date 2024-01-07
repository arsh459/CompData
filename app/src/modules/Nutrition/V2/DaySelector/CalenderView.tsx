import Swiper from "@components/Swiper";
import { polygonIcon } from "@constants/imageKitURL";
import { useDayRecsBetween } from "@hooks/dayRecs/useDayRecsBetween";
import { dayRecommendationType } from "@models/User/User";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import CalenderWeek from "./CalenderWeek";
import { useDayContext } from "./provider/DayProvider";

interface Props {
  type: dayRecommendationType;
  onClose?: () => void;
  color?: string;
  text?: string;
}

const CalenderView: React.FC<Props> = ({ type, onClose, color, text }) => {
  const {
    calender,
    selectedWeekDay,
    intialSlideIndex,
    setSelectedDate,
    setSelectedWeekDay,
    setSelectedUnix,
    setIntialSlideIndex,
    startTime,
    endTime,
  } = useDayContext();

  const { badge } = useSignleBadgeContext();

  const { dateRecs } = useDayRecsBetween(badge?.id, startTime, endTime);

  useEffect(() => {
    calender[intialSlideIndex] &&
      calender[intialSlideIndex].forEach((each) => {
        if (each.day === selectedWeekDay) {
          setSelectedDate(each.date);
          setSelectedWeekDay(each.day);
          setSelectedUnix(each.unix);
        }
      });
  }, [intialSlideIndex]);

  return (
    <View className="bg-[#343150]">
      <Pressable
        onPress={onClose}
        className="flex flex-row justify-center items-center p-2"
      >
        <Text className="text-white font-medium text-lg mx-3">{text}</Text>
        <Image
          source={{ uri: polygonIcon }}
          style={{ transform: [{ rotate: "180deg" }] }}
          className="w-2.5 aspect-square"
          resizeMode="contain"
        />
      </Pressable>

      <Swiper
        initialScrollIndex={intialSlideIndex}
        onIndexChange={setIntialSlideIndex}
      >
        {calender.map((each, index) => (
          <CalenderWeek
            key={`week-${index + 1}`}
            onClose={onClose}
            type={type}
            week={each}
            color={color}
            dateRecs={dateRecs}
          />
        ))}
      </Swiper>
    </View>
  );
};

export default CalenderView;
