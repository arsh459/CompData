import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { View } from "react-native";
import CalenderDateV2 from "./CalendarDateV2";
import { dayObj, weekArr } from "../interface";
import { useDayContext } from "../provider/DayProvider";

interface Props {
  type: dayRecommendationType;
  onClose?: () => void;
  week?: weekArr;
  color?: string;
  dateRecs: { [date: string]: dayRecommendation };
}

const CalenderWeekV2: React.FC<Props> = ({
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

  return week?.length === 7 ? (
    <View className="flex flex-row justify-between">
      <CalenderDateV2
        onPress={() => onPress(week[0])}
        numStr={week[0].numStr}
        day={week[0]}
        color={color}
        recomendation={dateRecs[week[0].date]}
      />
      <CalenderDateV2
        onPress={() => onPress(week[1])}
        numStr={week[1].numStr}
        day={week[1]}
        color={color}
        recomendation={dateRecs[week[1].date]}
      />
      <CalenderDateV2
        onPress={() => onPress(week[2])}
        numStr={week[2].numStr}
        day={week[2]}
        color={color}
        recomendation={dateRecs[week[2].date]}
      />
      <CalenderDateV2
        onPress={() => onPress(week[3])}
        numStr={week[3].numStr}
        day={week[3]}
        color={color}
        recomendation={dateRecs[week[3].date]}
      />
      <CalenderDateV2
        onPress={() => onPress(week[4])}
        numStr={week[4].numStr}
        day={week[4]}
        color={color}
        recomendation={dateRecs[week[4].date]}
      />
      <CalenderDateV2
        onPress={() => onPress(week[5])}
        numStr={week[5].numStr}
        day={week[5]}
        color={color}
        recomendation={dateRecs[week[5].date]}
      />
      <CalenderDateV2
        onPress={() => onPress(week[6])}
        numStr={week[6].numStr}
        day={week[6]}
        color={color}
        recomendation={dateRecs[week[6].date]}
      />
    </View>
  ) : null;

  // return (
  //   <View className="flex flex-row justify-between">
  //     {week?.map((each, index) => {
  //       const rec = dateRecs[each.date];

  //       return (
  //         <CalenderDateV2
  //           onPress={() => onPress(each)}
  //           numStr={each.numStr}
  //           day={each}
  //           color={color}
  //           recomendation={rec}
  //         />
  //       );
  //     })}
  //   </View>
  // );
};

export default CalenderWeekV2;
