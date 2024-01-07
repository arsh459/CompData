import CirclePercent from "@components/CirclePercent";
import { memo } from "react";
import { calendatItemWidth } from "./HorizontalDayComp";
import clsx from "clsx";
import { ListRenderItemInfo } from "@shopify/flash-list";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { CalendarDate } from "@providers/period/periodStore";
import { shallow } from "zustand/shallow";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import {
  getKCalMeterColor,
  getTargetNutritionValues,
} from "../NutritionMeters/utils";

const RenderComp: React.FC<ListRenderItemInfo<CalendarDate>> = ({ item }) => {
  const {
    isActive,
    setActive,
    isPassed,
    isCurrent,
    dayIsInRound,

    isInFuture,
  } = useDietCalendar((state) => {
    return {
      isActive: state?.active?.unix === item.unix,
      setActive: state.setActive,
      isPassed: state?.today?.unix ? state?.today.unix >= item.unix : false,
      isInFuture: state.today?.unix ? item.unix > state.today?.unix : false,
      isCurrent: state?.today?.unix === item.unix,
      today: state.today ? state.today?.unix : 0,
      dayIsInRound:
        state.maxUnix && state.minUnix
          ? item.unix >= state.minUnix && item.unix <= state.maxUnix
          : state.minUnix
          ? item.unix >= state.minUnix
          : false,
    };
  }, shallow);

  const { badgeId, badge } = useSignleBadgeContext();
  const { kcalDone, dayNumber } = useUserStore((state) => {
    const val =
      state?.recCache[`${badgeId}-${item.currentDate}`] &&
      state?.recCache[`${badgeId}-${item.currentDate}`]?.consumedNutrition &&
      state?.recCache[`${badgeId}-${item.currentDate}`]?.consumedNutrition?.kcal
        ? state?.recCache[`${badgeId}-${item.currentDate}`]?.consumedNutrition
            ?.kcal
        : 0;

    return {
      kcalDone: val ? val : 0,
      dayNumber:
        state.recCache && state.recCache[`${badgeId}-${item.currentDate}`]
          ? state.recCache[`${badgeId}-${item.currentDate}`].day
          : undefined,
    };
  }, shallow);

  const targets = getTargetNutritionValues(badge, dayNumber);

  const perc =
    kcalDone && targets?.kcal
      ? Number((kcalDone / targets.kcal).toFixed(2))
      : 0;

  return (
    <TouchableOpacity
      className={clsx(
        "h-full p-1 flex items-center relative z-0 justify-center"
      )}
      style={{
        width: calendatItemWidth,
      }}
      onPress={() => {
        setActive(item);
      }}
      disabled={!dayIsInRound}
    >
      <View
        className={clsx("absolute h-16 w-1 top-3.5 left-0")}
        style={
          item.currentDate.split("-")[2] === "01"
            ? {
                borderLeftWidth: 1,
                borderLeftColor: "#ffffff4d",
                ...(Platform.OS === "ios" ? {} : { borderStyle: "dashed" }),
              }
            : { display: "none" }
        }
      />
      <View className={clsx("flex-1 flex items-center justify-around mb-2")}>
        <View
          className={clsx(
            "flex items-center justify-center px-2 py-0.5",
            isActive ? "bg-[#ffffff26]  rounded-2xl" : ""
          )}
        >
          <Text
            className={clsx(
              " text-[10px]  text-center",
              dayIsInRound ? "text-white" : "text-white/20"
            )}
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {item.day}
          </Text>
        </View>
        {/*  */}

        <View className="">
          <CirclePercent
            circleSize={38}
            percent={isPassed && dayIsInRound ? perc : !isInFuture ? 0.01 : 0}
            activeColor={getKCalMeterColor(kcalDone, targets?.kcal)} //{"#FFA826"}
            strokeWidth={5}
            inActiveColor={dayIsInRound ? "#4f413366" : "#232136"}
            showInactive={dayIsInRound}
            showActive={dayIsInRound}
          >
            <View className="w-full h-full flex justify-center items-center">
              <Text
                className={clsx(
                  " text-xs",
                  isPassed ? "text-[#FFF]" : "text-[#ffcc194d]",
                  dayIsInRound ? "" : "text-white/20"
                )}
                style={{ fontFamily: "Nunito-Light" }}
              >
                {item.currentDate.split("-")[2]}
              </Text>
            </View>
          </CirclePercent>
        </View>
      </View>
      <View
        className={clsx(
          "h-[6px] rounded-2xl w-6 ",
          isCurrent ? "bg-[#FFA826]" : ""
        )}
      ></View>
    </TouchableOpacity>
  );
};

export default memo(RenderComp, (prev, now) => {
  return prev.item.currentDate === now.item.currentDate;
});
