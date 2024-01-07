import Loading from "@components/loading/Loading";
import { useDayRecsBetween } from "@hooks/dayRecs/useDayRecsBetween";
import { dayRecommendationType } from "@models/User/User";
import Header from "@modules/Header";
import { dayObj } from "@modules/Nutrition/V2/DaySelector/interface";
import { useDayContext } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import CustomDate from "./CustomDate";

interface Props {
  type: dayRecommendationType;
}

const DayCalanderMain: React.FC<Props> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { todayUnix } = useAuthContext();
  const { width } = useWindowDimensions();
  const itemWidth = width / 7;
  const color =
    type == "workout" ? "#19C8FF" : type == "nutrition" ? "#FCB750" : "#FFFFFF";
  const {
    startTime,
    endTime,
    startUnixDayStart,
    setSelectedDate,
    setSelectedWeekDay,
    setSelectedUnix,
  } = useDayContext();

  const currMonth = new Date().getMonth();
  const { badge } = useSignleBadgeContext();
  const { dateRecs } = useDayRecsBetween(badge?.id, startTime, endTime);

  const onPress = (obj: dayObj) => {
    setSelectedDate(obj.date);
    setSelectedWeekDay(obj.day);
    setSelectedUnix(obj.unix);
  };

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
      <Header
        back={true}
        tone="dark"
        title="Progress so far"
        gradientColors={
          type === "nutrition" ? ["#FF9A02", "#F97C20"] : ["#318DF8", "#1F5BF7"]
        }
      />
      <View className="flex-1 bg-[#232136] relative z-0 pt-4">
        <CalendarList
          pastScrollRange={currMonth - new Date(startUnixDayStart).getMonth()}
          futureScrollRange={new Date(todayUnix).getMonth() - currMonth}
          scrollEnabled={true}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            dayTextColor: "#FFFFFF",
            weekVerticalMargin: 0,
          }}
          renderHeader={renderCustomHeader}
          dayComponent={({ date }) =>
            date ? (
              <CustomDate
                date={date}
                showRest={type === "workout"}
                color={color}
                dateRecs={dateRecs}
                itemWidth={itemWidth}
                onPress={onPress}
              />
            ) : null
          }
          onLayout={() =>
            setTimeout(() => {
              setLoading(false);
            }, 500)
          }
        />
        {loading ? (
          <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#232136] flex justify-center items-center">
            <Loading />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default DayCalanderMain;
