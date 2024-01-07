import Loading from "@components/loading/Loading";
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import { View, useWindowDimensions } from "react-native";
import { dayObj } from "../interface";
import CalenderDateV4 from "../V2/CalenderDateV4";
import { useAuthContext } from "@providers/auth/AuthProvider";
import useCurrentMonthDays from "@hooks/periodTracker/useCurrentMonthDays";

interface Props {
  color?: string;
  text?: string;
  setSelectedDate: (val: dayObj) => void;
  selectedDateStr?: string;
}

const CalenderForPeriods: React.FC<Props> = ({
  color,
  text,
  setSelectedDate,
  selectedDateStr,
}) => {
  const flatlistRef = useRef<FlashList<dayObj>>(null);

  const { width } = useWindowDimensions();
  const { today } = useAuthContext();
  const itemWidth = width / 7;

  const onPress = (obj: dayObj) => {
    setSelectedDate(obj);
  };

  const renderItem = ({ item, index }: { item: dayObj; index: number }) => {
    return (
      <CalenderDateV4
        onPress={() => onPress(item)}
        numStr={item.numStr}
        day={item}
        color={color}
        isSelected={selectedDateStr === item.date}
      />
    );
  };

  const keyExtractor = (item: dayObj, index: number) => `${item.unix}-${index}`;

  const dayObjArr = useCurrentMonthDays();

  const intialSlideIndex = dayObjArr.findIndex((i) => i.date === today);

  return (
    <>
      {width && dayObjArr.length ? (
        <View className="py-4" style={{ width: width }}>
          <FlashList
            ref={flatlistRef}
            horizontal={true}
            keyExtractor={keyExtractor}
            estimatedItemSize={itemWidth}
            data={dayObjArr}
            initialScrollIndex={intialSlideIndex}
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

export default CalenderForPeriods;
