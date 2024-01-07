import Loading from "@components/loading/Loading";
import Header from "@modules/Header";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, useWindowDimensions, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import CustomPeriodDay from "./CustomPeriodDay";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
// import { useUserContext } from "@providers/user/UserProvider";
import { getPeriodType } from "./utils";
import { periodDateType } from "@models/User/User";

interface Props {}

const PeriodCalenderLogMain: React.FC<Props> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  // const { user } = useUserContext();
  const userPeriods: { [date: string]: periodDateType } = {};

  const navigation = useNavigation();

  const { width } = useWindowDimensions();
  const itemWidth = width / 7;

  function renderCustomHeader(date: any) {
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
  }

  return (
    <>
      <Header back={true} tone="dark" gradientColors={["#FF6069", "#FF67A7"]} />
      <LinearGradient
        colors={["#FF6069", "#FF67A7"]}
        start={[0, 0]}
        end={[1, 0]}
        className="flex flex-row justify-around px-3 py-4"
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => (
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
        <CalendarList
          pastScrollRange={1}
          futureScrollRange={1}
          scrollEnabled={true}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            dayTextColor: "#FFFFFF",
            weekVerticalMargin: 0,
          }}
          hideDayNames={true}
          renderHeader={renderCustomHeader}
          dayComponent={({ date }) => {
            if (!date) {
              return null;
            }

            const dateStr = date.dateString;
            const periodType = getPeriodType(undefined, userPeriods[dateStr]);
            return (
              <CustomPeriodDay
                date={date}
                // color={color}
                itemWidth={itemWidth}
                periodType={periodType}
              />
            );
          }}
          onLayout={() =>
            setTimeout(() => {
              setLoading(false);
            }, 200)
          }
        />
        {loading ? (
          <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#232136] flex justify-center items-center">
            <Loading />
          </View>
        ) : null}
        <View className="absolute left-0 right-0 bottom-4   ">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PeriodCalenderLogScreen", {
                title: "Edit Period Dates",
                isEditable: true,
              })
            }
            className="bg-white  w-2/5 mx-auto rounded-lg my-4"
          >
            <Text
              className="text-red-400 text-center py-2 text-sm"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              Edit Periods
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PeriodCalenderLogMain;
