import { View, Text, TouchableOpacity } from "react-native";

import { CalendarList } from "react-native-calendars";
import PeriodDayComponentV2 from "./PeriodDayComponentV2";
import { memo, useCallback, useState } from "react";
import { DateData } from "react-native-calendars/src/types";
import crashlytics from "@react-native-firebase/crashlytics";
// import { useNavigation } from "@react-navigation/native";
import OnSaveLoadingModal from "@modules/PeriodTrackerMain/OnSaveLoading";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { savePeriodInRemote } from "./utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";

interface Props {}

const CalendarListComponent: React.FC<Props> = ({}) => {
  const renderCustomHeader = useCallback((date: any) => {
    const header = date.toString("MMMM");

    return (
      <View className="flex-1">
        <Text
          className="text-left text-white text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {header}
        </Text>
      </View>
    );
  }, []);

  // const { user } = useUserContext();
  // const navigation = useNavigation();
  // const { user } = useUserContext();

  // const periodDatesFromRemote = user?.periodDates;

  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useAuthContext();
  const navigation = useNavigation();
  // const [toggled, setToggled] = useState<boolean>(false);

  const savePending = useCurrentPeriodStore((state) => state.savePending);
  const markedDates = useCurrentPeriodStore((state) => state.markedDates);

  // const [markedDates, setMarkedDates] = useState<MarkedDates>(() => {
  //   // if (periodDatesFromRemote) {
  //   //   const updatedMarkedDates: MarkedDates = {};
  //   //   return Object.keys(periodDatesFromRemote).reduce((acc, item) => {
  //   //     acc[item] =
  //   //       periodDatesFromRemote[item] === "PERIOD" ? { selected: true } : {};

  //   //     return acc;
  //   //   }, updatedMarkedDates);
  //   // } else {
  //   //   return {};
  //   // }
  //   return {};
  // });
  const onClose = () => setLoading(false);

  const onDayPressHandle = useCallback((dateData: DateData) => {
    // setMarkedDates((prev) => {
    //   let newVal: boolean = true;
    //   if (prev[dateData.dateString]) {
    //     newVal = !prev[dateData.dateString].selected;
    //   }
    //   setToggled(true);
    //   return {
    //     ...prev,
    //     [dateData.dateString]: {
    //       ...(prev[dateData.dateString] ? prev[dateData.dateString] : {}),
    //       selected: newVal,
    //     },
    //   };
    // });
  }, []);

  const saveHandler = async () => {
    try {
      setLoading(true);
      if (state.uid) {
        const savedPeriods: string[] = [];
        Object.keys(markedDates).map((item) => {
          if (markedDates[item].color === "PERIOD") {
            savedPeriods.push(item);
          }
        });
        await savePeriodInRemote(state.uid, savedPeriods);
      }

      setLoading(false);
      navigation.goBack();
    } catch (error: any) {
      console.log("error", error);

      setLoading(false);
      crashlytics().recordError(error);
    }
    // make api call

    // update user

    // nav out
    // navigation.goBack();
  };

  return (
    <>
      <View className="flex-1    relative z-0 ">
        <CalendarList
          pastScrollRange={3}
          markedDates={markedDates}
          onDayPress={onDayPressHandle}
          futureScrollRange={0}
          calendarStyle={{ flex: 1, paddingBottom: 40 }}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            dayTextColor: "#FFFFFF",
            weekVerticalMargin: 0,
          }}
          hideDayNames={true}
          dayComponent={PeriodDayComponentV2}
          renderHeader={renderCustomHeader}
        />
      </View>
      {savePending ? (
        <View className="absolute bottom-4 left-0 right-0  bg-transparent">
          <TouchableOpacity
            onPress={saveHandler}
            className="text-white bg-[#6D55D1] w-1/2 mx-auto py-2 rounded-lg"
          >
            <Text className="text-white text-center">Save</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <OnSaveLoadingModal isOpen={loading} onCloseModal={onClose} />
      {/* {loading ? (
        <View className="absolute top-40 left-0 right-0 h-20 bg-black">
          <Loading />
        </View>
      ) : null} */}
    </>
  );
};

export default memo(CalendarListComponent);
