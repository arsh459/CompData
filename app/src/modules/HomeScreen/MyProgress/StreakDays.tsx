import { View, Text, ScrollView, TouchableOpacity } from "react-native";

// import { useNavigation } from "@react-navigation/native";
import { useStreakContext } from "@providers/streak/StreakProvider";
import { format, getDate } from "date-fns";
import { useNavigation } from "@react-navigation/native";
// import SvgIcons from "@components/SvgIcons";
import DayCircleV2 from "./DayCircleV2";
import Heading from "./Heading";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const StreakDays = () => {
  const navigation = useNavigation();
  const { goalObjs } = useStreakContext();

  const onStreakPress = () => {
    weEventTrack("progress_clickStreak", {});
    navigation.navigate("StreakDaysScreen");
    // weEventTrack("home_clickStreakHolder", {});
  };

  return (
    <>
      <Text
        className="text-white px-4 pb-4 text-base iphoneX:text-lg "
        style={{ fontFamily: "Nunito-Bold" }}
      >
        My Daily Fitpoints
      </Text>
      <TouchableOpacity onPress={onStreakPress}>
        <View className="bg-[#343150]  mx-4 rounded-xl">
          <View className="flex flex-row p-2 justify-between items-center ">
            <Heading />

            {/* <Text
              className="text-[#3CFFBB] text-xs"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {sevenDayStreak} weeks
            </Text> */}
          </View>
          <View className="flex flex-row py-3.5 px-4 bg-[#5D588C47] rounded-b-xl ">
            <ScrollView
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {goalObjs.map((item, index) => {
                const percent =
                  (item.achievedFP || 0) / (item.targetFP ? item.targetFP : 1);
                const day = format(new Date(item.unix), "EEEEEE");

                const dateNumber = getDate(new Date(item.unix));
                const isToday = day === format(new Date(), "EEEEEE");
                const isFuture = item.isFuture;

                return (
                  <View className="mr-2.5" key={item.id}>
                    <DayCircleV2
                      isFuture={isFuture}
                      middleText={day}
                      percent={percent > 1 ? 100 : percent * 100}
                      isToday={isToday}
                      currentDate={dateNumber}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default StreakDays;
