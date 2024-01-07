import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { CalendarDate, dayMS } from "@providers/period/periodStore";
import { useEffect } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import RenderComp from "./RenderComp";
import { useCallback } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { useDayRecsBetweenV2 } from "@hooks/dayRecs/useDayRecsBetweenV2";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useRoute } from "@react-navigation/native";
import { NutritionParams } from "@screens/NutritionScreen";
import { useFutureRecs } from "@hooks/dayRecs/useFutureRecs";
import { useAuthContext } from "@providers/auth/AuthProvider";

const { width } = Dimensions.get("window");
export const calendatItemWidth = Math.round(width / 7);
export const horizontalItemHeight = calendatItemWidth * 2;

const renderItem = (item: ListRenderItemInfo<CalendarDate>) => {
  return <RenderComp {...item} />;
};

const HorizontalDayComp = () => {
  const route = useRoute();
  const params = route.params as NutritionParams;

  const { nutritionStart } = useUserStore((state) => {
    return {
      nutritionStart: state.user?.recommendationConfig?.nutritionStart,
    };
  }, shallow);

  const { isVisible, weeksData, onInit, onNext, getPrevious, start, end } =
    useDietCalendar(
      (state) => ({
        isVisible: state.isVisible,
        weeksData: state.weeksData,
        start: state.weeksData[0] ? state.weeksData[0].unix : undefined,
        end: state.weeksData[state.weeksData.length - 1]
          ? state.weeksData[state.weeksData.length - 1].unix
          : undefined,
        onInit: state.onInit,
        onNext: state.onNext,
        getPrevious: state.getPrevious,
      }),
      shallow
    );

  const { badgeId } = useSignleBadgeContext();
  const { todayUnix } = useAuthContext();
  useFutureRecs(todayUnix + 7 * dayMS, "nutrition", badgeId);
  useDayRecsBetweenV2(badgeId, "nutrition", start, end);

  const keyExtractor = (item: CalendarDate) => `${item.unix}`;

  const onScrollDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (e.nativeEvent.contentOffset.x == 0) {
        getPrevious();
      }
    },
    []
  );

  useEffect(() => {
    if (nutritionStart) {
      onInit(nutritionStart, undefined, params.selectedUnix);
    }
  }, [nutritionStart, params.selectedUnix]);

  return (
    <>
      {isVisible && weeksData.length > 0 ? (
        <View className="w-full mt-4 bg-[#343150b3] py-2">
          <View
            style={{
              width: calendatItemWidth * 7,
              height: horizontalItemHeight,
              flex: 1,
            }}
            className="flex flex-row"
          >
            <FlashList
              scrollEventThrottle={16}
              renderItem={renderItem}
              data={weeksData}
              estimatedItemSize={calendatItemWidth}
              horizontal={true}
              keyExtractor={keyExtractor}
              snapToInterval={calendatItemWidth * 7}
              snapToAlignment="center"
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              bounces={false}
              initialScrollIndex={0}
              onEndReached={onNext}
              onEndReachedThreshold={0.8}
              onScrollEndDrag={onScrollDrag}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default HorizontalDayComp;
