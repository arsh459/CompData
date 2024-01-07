import { dayRecommendation, dayRecommendationType } from "@models/User/User";

import { View } from "react-native";
import CalenderDate from "./CalenderDate";
import { dayObj, weekArr } from "./interface";
import { useDayContext } from "./provider/DayProvider";

interface Props {
  type: dayRecommendationType;
  onClose?: () => void;
  week?: weekArr;
  color?: string;
  dateRecs: { [date: string]: dayRecommendation };
}

const CalenderWeek: React.FC<Props> = ({
  dateRecs,
  type,
  onClose,
  week,
  color,
}) => {
  const { setSelectedWeekDay, setSelectedDate, setSelectedUnix } =
    useDayContext();

  const onPress = (obj: dayObj) => {
    setSelectedDate(obj.date);
    setSelectedWeekDay(obj.day);
    setSelectedUnix(obj.unix);
    onClose && onClose();
  };

  return (
    <View className="flex flex-row justify-center items-center">
      {week?.map((each) => {
        const rec = dateRecs[each.date];

        return (
          <CalenderDate
            onPress={() => onPress(each)}
            key={each.day}
            numStr={each.numStr}
            day={each}
            color={color}
            recomendation={rec}
          />
        );
      })}
    </View>
  );
};

export default CalenderWeek;
