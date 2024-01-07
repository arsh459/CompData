import { FlatList, View } from "react-native";
import { useZohoSlotStore } from "./store/zohoSlotStore";
import { shallow } from "zustand/shallow";
import DaySliderItem, { cardWidth } from "./DaySliderItem";
// import { FlashList } from "@shopify/flash-list";

const DaySlider = () => {
  const datesArr = useZohoSlotStore((state) => state.datesArr, shallow);
  // console.log("datesArr", datesArr);

  const renderItem = ({ item }: { item: number }) => (
    <DaySliderItem dateUnix={item} />
  );

  const getItemLayout = (
    _: ArrayLike<unknown> | null | undefined,
    index: number
  ) => {
    return {
      length: cardWidth + 16, //+ emptyWidth,
      offset: cardWidth + 16 * index,
      index,
    };
  };

  const keyExtractor = (item: number) => item.toString();

  return (
    <View className="h-20 mb-4">
      <FlatList
        data={datesArr}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<View className="w-6 aspect-square" />}
        // ListFooterComponent={<View className="w-6 aspect-square" />}
        // ItemSeparatorComponent={() => <View className="w-6 aspect-square" />}
        // estimatedItemSize={100}
        getItemLayout={getItemLayout}
        // className="h-20"
        // className="flex-1 mb-5"
      />
    </View>
  );
};

export default DaySlider;
