// import Loading from "@components/loading/Loading";
// import Header from "@modules/Header";
import { useCallback, useRef } from "react";
// import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import {
  CalendarList,
  DateData,
  // NewCalendarList,
} from "react-native-calendars";
// import { LinearGradient } from "expo-linear-gradient";
import { format, isSameYear } from "date-fns";

// import { useUserContext } from "@providers/user/UserProvider";
import { periodDateType } from "@models/User/User";
// import { savePeriodDates } from "./utils";
import { Dimensions } from "react-native";
import PeriodDayComponent, { PeriodDates } from "./PeriodDayComponent";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { FlashList } from "@shopify/flash-list";

// const dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  localPeriodDate: PeriodDates;
  onPress: (date?: DateData | undefined) => void;
}
const width = Dimensions.get("window").width;

const CalendarComponent: React.FC<Props> = ({ onPress, localPeriodDate }) => {
  //   const { user } = useUserContext();
  //   const [loading, setLoading] = useState<boolean>(true);
  //   const userPeriods = user?.periodDates || {};
  // const [localPeriodDate, setLocalPeriodDate] = useState<PeriodDates>({});
  // const { today } = useAuthContext();

  const renderCustomHeader = useCallback((dateStr: string) => {
    const currentDate = new Date();
    const date = new Date(dateStr);
    const month = format(date, "MMMM");
    const year = format(date, "yyyy");
    let text = month;

    if (!isSameYear(date, currentDate)) {
      text += ` ${year}`;
    }

    return (
      <View className="flex-1">
        <Text
          className="text-left text-white text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {text}
        </Text>
      </View>
    );
  }, []);

  const renders = useRef<number>(0);

  return <View>{/* <FlashList data={[]} renderItem={} /> */}</View>;

  return (
    <>
      <Text className="text-white text-lg">RENDERS: {renders.current++}</Text>
      <CalendarList
        pastScrollRange={3}
        futureScrollRange={0}
        style={{ width: width }}
        calendarWidth={width}
        scrollEnabled={true}
        pagingEnabled={true}
        //  scrollRange={3}
        staticHeader={true}
        // scrollViewProps={{ scrollEnabled: true }}
        // initialDate={new Date()}
        theme={{
          backgroundColor: "#232136",
          calendarBackground: "#232136",
          dayTextColor: "#FFFFFF",
          weekVerticalMargin: 0,
        }}
        onDayPress={onPress}
        horizontal={false}
        // showScrollIndicator={true}
        // theme={{
        //   backgroundColor: "#232136",
        //   calendarBackground: "#232136",
        //   dayTextColor: "#FFFFFF",
        //   weekVerticalMargin: 0,
        // }}
        // onDayPress={onPress}
        hideDayNames={true}
        renderHeader={renderCustomHeader}
        dayComponent={({ date, onPress }) => {
          const dtString = date?.dateString;
          let period: periodDateType = "UNKNOWN";
          if (dtString) {
            period = localPeriodDate[dtString];
          }

          return (
            <PeriodDayComponent
              date={date}
              onPress={onPress}
              period={period}
              // localPeriodDate={localPeriodDate}
              // setLocalPeriodDate={setLocalPeriodDate}
            />
          );
        }}
        // onLayout={() =>
        //   setTimeout(() => {
        //     setLoading(false);
        //   }, 500)
        // }
      />
    </>
  );
};

export default CalendarComponent;
