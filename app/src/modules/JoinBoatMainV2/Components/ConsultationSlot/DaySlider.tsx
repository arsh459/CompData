import { getISTFromMillis, oneDayMS } from "@models/slots/utils";
import clsx from "clsx";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

interface Props {
  startDate: number;
  slotDate?: number;
  setSlotDate: (val: number) => void;
}

const DaySlider: React.FC<Props> = ({ startDate, slotDate, setSlotDate }) => {
  const renderItem = ({ item }: { item: number }) => {
    const dateUnix = startDate + item * oneDayMS;
    return (
      <TouchableOpacity
        onPress={() => setSlotDate(dateUnix)}
        className={clsx(
          slotDate === dateUnix ? "bg-white" : "bg-white/30",
          "rounded-xl h-20 aspect-square flex justify-evenly items-center"
        )}
      >
        <Text
          className={clsx(
            slotDate === dateUnix ? "text-[#333333]" : "text-white",
            "text-xs"
          )}
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {getISTFromMillis(dateUnix).weekdayShort}
        </Text>
        <Text
          className={clsx(
            slotDate === dateUnix ? "text-[#333333]" : "text-white",
            "text-xl"
          )}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {getISTFromMillis(dateUnix).toFormat("dd")}
        </Text>
        <Text
          className={clsx(
            slotDate === dateUnix ? "text-[#333333]" : "text-white",
            "text-xs"
          )}
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {getISTFromMillis(dateUnix).monthShort}
        </Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: number) =>
    (startDate + item * oneDayMS).toString();

  return (
    <FlatList
      data={[0, 1, 2, 3, 4, 5, 6]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      bounces={false}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={<View className="w-6 aspect-square" />}
      ListFooterComponent={<View className="w-6 aspect-square" />}
      ItemSeparatorComponent={() => <View className="w-6 aspect-square" />}
      className="flex-1 mb-5"
    />
  );
};

export default DaySlider;
