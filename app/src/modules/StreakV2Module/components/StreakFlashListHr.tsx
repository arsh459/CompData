import ImageWithURL from "@components/ImageWithURL";
import { freezeBadge, streakCompleteTick } from "@constants/imageKitURL";
import {
  StreakDaysListInterface,
  getStreakDaysList,
} from "@providers/streakV2/hooks/useUserStreakV2";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { FlashList } from "@shopify/flash-list";

import { useEffect } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { shallow } from "zustand/shallow";

const renderItem = ({ item }: { item: StreakDaysListInterface }) => {
  // console.log(item);
  return (
    <View className="mx-2 w-10  h-20 flex items-center justify-start">
      <Text className=" text-white/40 text-base mb-2">{item.date}</Text>
      {item.status === "hit" || item.status === "activeHit" ? (
        <ImageWithURL
          resizeMode="contain"
          className="w-8 h-8"
          source={{ uri: streakCompleteTick }}
        />
      ) : item.status === "freeze" ? (
        <ImageWithURL
          resizeMode="contain"
          className="w-8 h-8"
          source={{ uri: freezeBadge }}
        />
      ) : (
        <View className=" w-8 h-8 rounded-full bg-[#343150]" />
      )}
    </View>
  );
};

const StreakFlashListHr = () => {
  const { targetDays, startedOn, streakDayList, setStreakDayList, streakMap } =
    useStreakStore(
      (state) => ({
        targetDays: state.streak?.targetDays,
        startedOn: state.streak?.startedOn,
        streakDayList: state.streakDayList,
        streakMap: state.streak?.streakMap,
        setStreakDayList: state.setStreakDayList,
      }),
      shallow
    );

  useEffect(() => {
    if (startedOn && targetDays && streakMap) {
      const streakDayListData = getStreakDaysList(
        startedOn,
        targetDays,
        streakMap
      );
      setStreakDayList(streakDayListData);
    }
  }, [targetDays, startedOn, streakMap]);

  const { width } = useWindowDimensions();
  const keyExtractor = (item: StreakDaysListInterface) => `streak${item.date}`;
  return (
    <View style={{ height: 128, width: width }} className=" my-4">
      {streakDayList.length ? (
        <FlashList
          data={streakDayList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={56}
          horizontal={true}
          snapToAlignment="center"
          ListEmptyComponent={() => {
            return (
              <Text className=" text-base text-white text-center font-bold">
                No data to show
              </Text>
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default StreakFlashListHr;
