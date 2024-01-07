import { dayRecommendation } from "@models/User/User";
import { dayObj } from "@modules/Nutrition/V2/DaySelector/interface";
import { memo } from "react";
import { useWindowDimensions, View } from "react-native";
import { DateData } from "react-native-calendars";
import CustomDate from "./CustomDate";

interface Props {
  //   type: dayRecommendationType;
  color: "#19C8FF" | "#FCB750" | "#FFFFFF";
  dateRecs: {
    [date: string]: dayRecommendation;
  };
  onPress: (obj: dayObj) => void;
  date: (string & DateData) | undefined;
}

const DayComponent: React.FC<Props> = ({
  date,

  dateRecs,
  onPress,
  color,
}) => {
  const { width } = useWindowDimensions();

  const itemWidth = width / 7;

  return date ? (
    <CustomDate
      date={date}
      color={color}
      dateRecs={dateRecs}
      itemWidth={itemWidth}
      onPress={onPress}
      showRest={true}
    />
  ) : (
    <View />
  );
};

export default memo(DayComponent);
