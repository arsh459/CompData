import Loading from "@components/loading/Loading";
import { useDayRecsBetween } from "@hooks/dayRecs/useDayRecsBetween";
import { dayRecommendationType } from "@models/User/User";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import { View, useWindowDimensions } from "react-native";
import { dayObj } from "../interface";
import { useDayContext } from "../provider/DayProvider";
import CalenderDateV3 from "./CalendarDateV3";

interface Props {
  type: dayRecommendationType;
  color?: string;
  text?: string;
}

const CalenderViewV3: React.FC<Props> = ({ type, color, text }) => {
  const {
    calender,
    intialSlideIndex,
    startTime,
    endTime,
    setSelectedDate,
    setSelectedWeekDay,
    setSelectedUnix,
  } = useDayContext();

  const { badge } = useSignleBadgeContext();
  const flatlistRef = useRef<FlashList<dayObj>>(null);

  const { dateRecs } = useDayRecsBetween(badge?.id, startTime, endTime);
  const { width } = useWindowDimensions();
  const itemWidth = width / 7;

  const onPress = (obj: dayObj) => {
    setSelectedDate(obj.date);
    setSelectedWeekDay(obj.day);
    setSelectedUnix(obj.unix);
  };

  const renderItem = ({ item, index }: { item: dayObj; index: number }) => {
    return (
      <CalenderDateV3
        onPress={() => onPress(item)}
        numStr={item.numStr}
        day={item}
        color={color}
        showRest={type === "workout"}
        recomendation={dateRecs[item.date]}
        itemWidth={itemWidth}
      />
    );
  };

  const keyExtractor = (item: dayObj, index: number) => `${item.unix}-${index}`;

  const dayObjArr: dayObj[] = calender.flat();

  return (
    <>
      {width && calender?.length ? (
        <View style={{ width: width }}>
          <FlashList
            ref={flatlistRef}
            horizontal={true}
            keyExtractor={keyExtractor}
            estimatedItemSize={itemWidth}
            data={dayObjArr}
            initialScrollIndex={intialSlideIndex * 7}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />
        </View>
      ) : (
        <View className="w-full flex justify-center items-center">
          <Loading width="w-8 h-8" />
        </View>
      )}
    </>
  );
};

export default CalenderViewV3;
