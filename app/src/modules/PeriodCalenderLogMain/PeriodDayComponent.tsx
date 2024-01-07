import { memo, useRef } from "react";
import { DateData } from "react-native-calendars";
// import CustomPeriodDay, { getColorCode } from "./CustomPeriodDay";

// import { useUserContext } from "@providers/user/UserProvider";
import { periodDateType } from "@models/User/User";
// import { getPeriodType } from "./utils";
import { Text, TouchableOpacity, View } from "react-native";
// import CustomPeriodDay, { getColorCode } from "./CustomPeriodDay";

// const width = Dimensions.get("window").width;

export interface PeriodDates {
  [key: string]: periodDateType;
}

interface Props {
  date: (string & DateData) | undefined;
  period: periodDateType;
  onPress?: (date?: DateData | undefined) => void;
  //   setLocalPeriodDate: React.Dispatch<React.SetStateAction<PeriodDates>>;
}

const PeriodDayComponent: React.FC<Props> = ({
  date,
  period,
  //   localPeriodDate,
  //   setLocalPeriodDate,
  onPress,
}) => {
  if (!date) {
    return null;
  }

  const renders = useRef<number>(0);

  //   const itemWidth = width / 7;

  //   const { user } = useUserContext();
  //   const userPeriods = user?.periodDates || {};

  //   const dateStr = date.dateString;
  //   const periodType = getPeriodType(
  //     localPeriodDate[dateStr],
  //     userPeriods[dateStr]
  //   );

  //   const handlePress = useCallback(() => {
  //     const value = userPeriods[dateStr];
  //     const localValue = localPeriodDate[dateStr];
  //     if (value === "PERIOD" || value === "ESTIMATED_PERIOD") {
  //       setLocalPeriodDate((prev) => ({
  //         ...prev,
  //         [dateStr]: "UNKNOWN",
  //       }));
  //     }

  //     if (value) {
  //       if (localValue) {
  //         if (value === localValue) {
  //           setLocalPeriodDate((prev) => ({
  //             ...prev,
  //             [dateStr]: value === "PERIOD" ? "UNKNOWN" : "PERIOD",
  //           }));
  //         } else {
  //           setLocalPeriodDate((prev) => {
  //             const newLocalPeriodDate = { ...prev };
  //             delete newLocalPeriodDate[dateStr];
  //             return newLocalPeriodDate;
  //           });
  //         }
  //       } else {
  //         setLocalPeriodDate((prev) => ({
  //           ...prev,
  //           [dateStr]: value === "PERIOD" ? "UNKNOWN" : "PERIOD",
  //         }));
  //       }
  //     } else {
  //       if (localValue) {
  //         setLocalPeriodDate((prev) => {
  //           const newLocalPeriodDate = { ...prev };
  //           delete newLocalPeriodDate[dateStr];
  //           return newLocalPeriodDate;
  //         });
  //       } else {
  //         setLocalPeriodDate((prev) => ({
  //           ...prev,
  //           [dateStr]: "PERIOD",
  //         }));
  //       }
  //     }
  //   }, [dateStr, userPeriods, localPeriodDate]);
  if (onPress)
    return (
      <TouchableOpacity onPress={() => onPress(date)}>
        <Text className="text-white h-14">
          R: {renders.current++}
          {period === "UNKNOWN" ? "-" : "+"}
        </Text>
        {/* <CustomPeriodDay
          date={date}
          color={getColorCode(periodType)}
          itemWidth={itemWidth}
          periodType={periodType}
          onPressDay={handlePress}
          isEditMode={true}
        /> */}
      </TouchableOpacity>
    );
  else {
    return <View />;
  }
};

export default memo(PeriodDayComponent, (previous, next) => {
  if (previous.period !== next.period) {
    return false;
  }

  return true;
});
