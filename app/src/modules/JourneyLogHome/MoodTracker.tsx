import { View, ScrollView } from "react-native";
import { useState } from "react";
import ViewSelectorV4 from "@components/ViewSelector/V4";
import { moodIconFrame45 } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import DailyOnboard from "@modules/HomeScreen/GuidedOnboard/DailyOnboard";
import useAvgDataV2 from "@providers/streak/hooks/useAvgDataV2";
import TrackerHeader from "./TrackerHeader";
import TrackerButton from "./TrackerButton";
import ScrollViewContentMood from "./MoodViews/ScrollViewContentMood";
import LoadingWrapper from "@components/LoadingWrapper";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {}

export type selectedViewMoodTracker = "Day" | "Week" | "Month";
const MoodTracker: React.FC<Props> = ({}) => {
  const { user } = useUserContext();
  const [selectedView, setSelectedView] =
    useState<selectedViewMoodTracker>("Day");

  const navigation = useNavigation();

  const {
    currentWeekData,
    today: todayMood,
    overallAvg,
    // prevWeekAvg,
    weeklyAvgs,
    monthlyStatus,
    monthlyText,
    loading,
  } = useAvgDataV2("mood", "dailyMood", user?.uid);
  const showDailyOnboard =
    (selectedView === "Day" && !todayMood) ||
    (selectedView === "Week" && currentWeekData?.currentWeekAvg === 0);

  return (
    <View className="flex-1 bg-[#232136]">
      <TrackerHeader icon={moodIconFrame45} text="Mood Tracker" />
      <ViewSelectorV4
        view1="Day"
        view2="Week"
        view3="Month"
        currView={selectedView}
        onView1={() => {
          setSelectedView("Day");
          weEventTrack("mood_changeToDay", {});
        }}
        onView2={() => {
          setSelectedView("Week");
          weEventTrack("mood_changeToWeek", {});
        }}
        onView3={() => {
          setSelectedView("Month");
          weEventTrack("mood_changeToMonth", {});
        }}
      />

      <LoadingWrapper loading={loading}>
        <ScrollView bounces={false} className="flex-1 ">
          <ScrollViewContentMood
            selectedView={selectedView}
            todayMood={todayMood}
            currentWeekData={currentWeekData}
            monthlyText={monthlyText}
            monthlyStatus={monthlyStatus}
            overallAvg={overallAvg}
            weeklyAvgs={weeklyAvgs}
          />
        </ScrollView>
        {showDailyOnboard ? (
          <DailyOnboard
            color="#ff8607"
            text="adding your mood everyday"
            type="mood"
          />
        ) : null}
      </LoadingWrapper>

      <TrackerButton
        onPress={() => {
          navigation.navigate("AddMoodScreen", { todaysMood: todayMood || 0 });
          weEventTrack("mood_clickAdd", {});
        }}
        text="Add Mood"
      />
    </View>
  );
};

export default MoodTracker;

// function isCurrentWeekAbovePrevWeek(
//   currentWeekAvg: number,
//   prevWeekAvg?: number
// ): { text: string; subtext: string } {
//   if (typeof currentWeekAvg === "number" && typeof prevWeekAvg === "number") {
//     return {
//       text: "Your mood this month is",
//       subtext: "getting better!",
//     };
//   }
//   return {
//     text: "A few setbacks this month. Will get better",
//     subtext: "soon",
//   };
// }

// function isCurrentDayBetterThanBefore(
//   currentWeekAvg: number,
//   prevWeekAvg?: number
// ): { text: string; subtext: string } {
//   if (typeof currentWeekAvg === "number" && typeof prevWeekAvg === "number") {
//     return {
//       text: "Your mood this week is",
//       subtext: "getting better!",
//     };
//   }
//   return {
//     text: "A few setbacks this week. Will get better",
//     subtext: "soon",
//   };
// }

// const { text, subtext } = isCurrentWeekAbovePrevWeek(
//   currentWeekData.currentWeekAvg,
//   prevWeekAvg
// );

// const increaseAfterSocialBoat = `${Math.floor((overallAvg / 5) * 100)}%`;
