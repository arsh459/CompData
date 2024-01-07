// import Loading from "@components/loading/Loading";
import Header from "@modules/Header";
import { useCallback, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { DateData } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
// import { format, isSameYear } from "date-fns";
// import { useUserContext } from "@providers/user/UserProvider";
import { periodDateType } from "@models/User/User";
// import { savePeriodDates } from "./utils";
// import { Dimensions } from "react-native";
// import PeriodDayComponent from "./PeriodDayComponent";
import CalendarComponent from "./CalendarComponent";
import { useNavigation } from "@react-navigation/native";

export interface PeriodDates {
  [key: string]: periodDateType;
}

const dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {}
// const width = Dimensions.get("window").width;

const PeriodCalenderEdit: React.FC<Props> = () => {
  // const { user } = useUserContext();
  const navigation = useNavigation();
  // const [loading, setLoading] = useState<boolean>(true);
  // const [loading, setLoading] = useState<boolean>(true);

  const [localPeriodDate, setLocalPeriodDate] = useState<PeriodDates>({});

  const onPress = useCallback((date?: DateData | undefined) => {
    // const value = userPeriods[dateStr];
    // const localValue = localPeriodDate[dateStr];
    // if (value === "PERIOD" || value === "ESTIMATED_PERIOD") {
    const dateStr = date?.dateString;
    if (dateStr) {
      setLocalPeriodDate((prev) => ({
        ...prev,
        [dateStr]: prev[dateStr] === "PERIOD" ? "UNKNOWN" : "PERIOD",
      }));
    }
    // }

    // if (value) {
    //   if (localValue) {
    //     if (value === localValue) {
    //       setLocalPeriodDate((prev) => ({
    //         ...prev,
    //         [dateStr]: value === "PERIOD" ? "UNKNOWN" : "PERIOD",
    //       }));
    //     } else {
    //       setLocalPeriodDate((prev) => {
    //         const newLocalPeriodDate = { ...prev };
    //         delete newLocalPeriodDate[dateStr];
    //         return newLocalPeriodDate;
    //       });
    //     }
    //   } else {
    //     setLocalPeriodDate((prev) => ({
    //       ...prev,
    //       [dateStr]: value === "PERIOD" ? "UNKNOWN" : "PERIOD",
    //     }));
    //   }
    // } else {
    //   if (localValue) {
    //     setLocalPeriodDate((prev) => {
    //       const newLocalPeriodDate = { ...prev };
    //       delete newLocalPeriodDate[dateStr];
    //       return newLocalPeriodDate;
    //     });
    //   } else {
    //     setLocalPeriodDate((prev) => ({
    //       ...prev,
    //       [dateStr]: "PERIOD",
    //     }));
    //   }
    // }
  }, []);

  // const renderCustomHeader = useCallback((dateStr: string) => {
  //   const currentDate = new Date();
  //   const date = new Date(dateStr);
  //   const month = format(date, "MMMM");
  //   const year = format(date, "yyyy");
  //   let text = month;

  //   if (!isSameYear(date, currentDate)) {
  //     text += ` ${year}`;
  //   }

  //   return (
  //     <View className="flex-1">
  //       <Text
  //         className="text-left text-white text-xl"
  //         style={{ fontFamily: "Nunito-Bold" }}
  //       >
  //         {text}
  //       </Text>
  //     </View>
  //   );
  // }, []);

  const renders = useRef<number>(0);

  return (
    <>
      <Header back={true} tone="dark" gradientColors={["#FF6069", "#FF67A7"]} />
      <LinearGradient
        colors={["#FF6069", "#FF67A7"]}
        start={[0, 0]}
        end={[1, 0]}
        className="flex flex-row justify-around px-3 py-4"
      >
        {dayArr.map((item) => (
          <Text
            key={item}
            className="text-white text-xs"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {item}
          </Text>
        ))}
      </LinearGradient>
      <View className="flex-1 bg-[#232136] pt-4 relative z-0">
        <Text className="text-white text-lg">
          RENDERS OUTSIDE: {renders.current++}
        </Text>
        <CalendarComponent
          localPeriodDate={localPeriodDate}
          onPress={onPress}
        />

        {Object.keys(localPeriodDate).length ? (
          <View className="absolute left-0 right-0 bottom-4  flex flex-row justify-between px-4 mb-4">
            <TouchableOpacity
              onPress={() => setLocalPeriodDate({})}
              className="border-2 border-white flex-1 rounded-lg my-4"
            >
              <Text
                className="text-white text-center py-1.5 text-sm"
                style={{ fontFamily: "Nunito-SemiBold" }}
              >
                Undo
              </Text>
            </TouchableOpacity>
            <View className="w-5 aspect-square" />
            <TouchableOpacity
              onPress={async () => {
                if (Object.keys(localPeriodDate).length) {
                  // await savePeriodDates(
                  //   { ...userPeriods, ...localPeriodDate },
                  //   user?.uid
                  // );
                  setLocalPeriodDate({});
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                }
              }}
              className="bg-[#6D55D1] flex-1  rounded-lg my-4"
            >
              <Text
                className="text-white text-center py-2 text-sm"
                style={{ fontFamily: "Nunito-SemiBold" }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/* {loading ? (
          <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#232136] flex justify-center items-center">
            <Loading />
          </View>
        ) : null} */}
      </View>
    </>
  );
};

export default PeriodCalenderEdit;
