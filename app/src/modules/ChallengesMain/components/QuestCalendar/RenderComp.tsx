import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import { memo } from "react";
import { calendatItemWidth } from "./HorizontalDayComp";
import clsx from "clsx";
import { ListRenderItemInfo } from "@shopify/flash-list";
import { View, Text, TouchableOpacity } from "react-native";
import { CalendarDate } from "@providers/period/periodStore";
import { shallow } from "zustand/shallow";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getTime, startOfDay } from "date-fns";
import RenderCompPerc from "./RenderCompPerc";

const RenderComp: React.FC<ListRenderItemInfo<CalendarDate>> = ({ item }) => {
  const { isActive, setActive, isPassed, isCurrent } = useQuestCalendar(
    (state) => ({
      isActive: state?.active?.unix === item.unix,
      setActive: state.setActive,
      isPassed: state?.today?.unix ? state?.today?.unix >= item.unix : false,
      isCurrent: state?.today?.unix === item.unix,
      // today: state.today ? state.today?.unix : 0,

      // dayInRound:
    }),
    shallow
  );

  // const [dayIsInRound, setDayIsInRound] = useState<boolean>(false);
  const { start, end } = useUserStore(
    (state) => ({
      start: state.currentRound?.start,
      end: state.currentRound?.end,
    }),
    shallow
  );

  let dayIsInRound: boolean = false;
  if (start && end) {
    const startUnixTime = getTime(startOfDay(new Date(start)));
    const endUnixTime = getTime(startOfDay(new Date(end)));
    dayIsInRound = item.unix >= startUnixTime && item.unix <= endUnixTime;
  }

  return (
    <TouchableOpacity
      className={clsx("h-full p-1 flex items-center justify-center")}
      style={{
        width: calendatItemWidth,
      }}
      onPress={() => {
        if (dayIsInRound) setActive(item);
      }}
      disabled={!dayIsInRound}
    >
      <View
        className={clsx(
          "flex-1 flex items-center justify-around mb-2"
          // item.currentDate.split("-")[2] === "01"
          //   ? "border-l border-dashed border-white/30"
          //   : ""
        )}
      >
        <View
          className={clsx(
            "flex items-center justify-center px-2 py-0.5",
            isActive ? "bg-[#ffffff26]  rounded-2xl" : ""
          )}
        >
          <Text
            className={clsx(
              " text-[10px] text-white text-center",
              dayIsInRound ? "" : "text-white/20"
            )}
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {item.day}
          </Text>
        </View>
        {/*  */}

        <View className="">
          <RenderCompPerc
            date={item.currentDate}
            dayIsInRound={dayIsInRound}
            isPassed={isPassed}
          />
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
