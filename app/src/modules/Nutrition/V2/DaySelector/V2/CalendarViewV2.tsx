import Loading from "@components/loading/Loading";
import GradientText from "@components/GradientText";
import { useDayRecsBetween } from "@hooks/dayRecs/useDayRecsBetween";
import { dayRecommendationType } from "@models/User/User";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { FlashList } from "@shopify/flash-list";
import { View, useWindowDimensions } from "react-native";
import CalenderDateV2 from "./CalendarDateV2";
import { dayObj } from "../interface";
import { useDayContext } from "../provider/DayProvider";

interface Props {
  type: dayRecommendationType;
  color?: string;
  text?: string;
}

const CalenderViewV2: React.FC<Props> = ({ type, color, text }) => {
  const {
    calender,
    intialSlideIndex,
    startTime,
    endTime,
    setSelectedDate,
    setSelectedWeekDay,
    setSelectedUnix,
  } = useDayContext();

  const { width } = useWindowDimensions();
  const { badge } = useSignleBadgeContext();
  const { dateRecs } = useDayRecsBetween(badge?.id, startTime, endTime);
  const itemWidth = width / 7;

  const renderItem = ({ item, index }: { item: dayObj; index: number }) => {
    const rec = dateRecs[item.date];

    const onPress = (obj: dayObj) => {
      setSelectedDate(obj.date);
      setSelectedWeekDay(obj.day);
      setSelectedUnix(obj.unix);
    };

    return (
      <View style={{ width: itemWidth }} className="overflow-hidden ">
        <CalenderDateV2
          onPress={() => onPress(item)}
          numStr={item.numStr}
          day={item}
          color={color}
          recomendation={rec}
        />
      </View>
    );
  };

  const keyExtractor = (item: dayObj, index: number) => `${item.date}-${index}`;

  const days: dayObj[] = calender.flat();

  return (
    <>
      <View className="flex flex-row justify-center items-center py-2 px-4">
        <GradientText
          text={text || ""}
          colors={["#58F5FF", "#10BFFF"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          textStyle={{
            fontFamily: "Nunito-Bold",
            fontSize: 16,
          }}
        />
      </View>

      {calender?.length ? (
        <View style={{ width: width }} className="pb-4">
          <FlashList
            data={days}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            estimatedItemSize={itemWidth}
            horizontal={true}
            initialScrollIndex={intialSlideIndex}
            bounces={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <View className="w-full flex-1 flex justify-center items-center">
          <Loading width="w-8 h-8" />
        </View>
      )}
    </>
  );
};

export default CalenderViewV2;
