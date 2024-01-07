import { memo } from "react";
import {
  View,
  ListRenderItemInfo,
  Dimensions,
  Text,
  ColorValue,
} from "react-native";
import { Calendar } from "react-native-calendars";
import PeriodDayComponentV2 from "./PeriodDayComponentV2";
import { CalendarMonth } from "@providers/period/periodStore";
import PeriodDayNonEdit from "./PeriodDayNonEdit";

const { width } = Dimensions.get("window");
export const monthElementHeight = Math.round(width * 1.2);

interface Props {
  isEditable?: boolean;
  calendarHeight?: number;
  markedColor?: ColorValue;
}
// @Krishanu
const PeriodMonthComponent: React.FC<
  ListRenderItemInfo<CalendarMonth> & Props
> = ({ item, isEditable, calendarHeight, markedColor }) => {
  return (
    <View
      style={{
        height: calendarHeight ? calendarHeight : monthElementHeight,
        width: width - 2,
      }}
      className=" flex justify-center items-center"
    >
      <Calendar
        initialDate={item.currentDate}
        hideDayNames={true}
        hideExtraDays={true}
        monthFormat="yyyy MM"
        headerStyle={{
          alignItems: "flex-start",
          paddingBottom: 4,
        }}
        customHeaderTitle={
          <Text className="text-white text-lg font-medium">
            {item.viewDate}
          </Text>
        }
        hideArrows={true}
        style={{
          width: width - 2,
        }}
        dayComponent={(props) =>
          isEditable ? (
            <PeriodDayComponentV2 {...props} markedColor={markedColor} />
          ) : (
            <PeriodDayNonEdit {...props} />
          )
        }
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          dayTextColor: "#FFFFFF",

          weekVerticalMargin: 0,
        }}
      />
    </View>
  );
};

export default memo(PeriodMonthComponent, (prev, now) => {
  return prev.item.currentDate === now.item.currentDate;
});
