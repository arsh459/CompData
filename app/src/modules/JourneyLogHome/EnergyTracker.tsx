import { View, ScrollView } from "react-native";
import { useState } from "react";
import { energyIconFrame45 } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import DailyOnboard from "@modules/HomeScreen/GuidedOnboard/DailyOnboard";
import useAvgDataV2 from "@providers/streak/hooks/useAvgDataV2";
import ViewSelectorV4 from "../../components/ViewSelector/V4";
import TrackerHeader from "./TrackerHeader";
import TrackerButton from "./TrackerButton";
import ScrollViewContentEnergy from "./EnergyViews/ScrollViewContentEnergy";
import LoadingWrapper from "@components/LoadingWrapper";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {}
const EnergyTracker: React.FC<Props> = ({}) => {
  const { user } = useUserContext();
  const [selectedView, setSelectedView] = useState<"Day" | "Week" | "Month">(
    "Day"
  );

  const navigation = useNavigation();

  const {
    currentWeekData,
    today: todaysValue,
    overallAvg,
    // prevWeekAvg,
    weeklyAvgs,
    monthlyStatus,
    monthlyText,
    loading,
  } = useAvgDataV2("energy", "dailyEnergy", user?.uid);
  const showDailyOnboard =
    (selectedView === "Day" && !todaysValue) ||
    (selectedView === "Week" && currentWeekData?.currentWeekAvg === 0);
  return (
    <View className="flex-1 bg-[#232136]">
      <TrackerHeader icon={energyIconFrame45} text="Energy Tracker" />
      <ViewSelectorV4
        view1="Day"
        view2="Week"
        view3="Month"
        currView={selectedView}
        onView1={() => {
          setSelectedView("Day");
          weEventTrack("energyTracker_changeDay", {});
        }}
        onView2={() => {
          setSelectedView("Week");
          weEventTrack("energyTracker_changeWeek", {});
        }}
        onView3={() => {
          setSelectedView("Month");
          weEventTrack("energyTracker_changeMonth", {});
        }}
      />
      <LoadingWrapper loading={loading}>
        <ScrollView bounces={false} className="flex-1">
          <ScrollViewContentEnergy
            selectedView={selectedView}
            todaysValue={todaysValue}
            currentWeekData={currentWeekData}
            monthlyText={monthlyText}
            monthlyStatus={monthlyStatus}
            overallAvg={overallAvg}
            weeklyAvgs={weeklyAvgs}
          />
        </ScrollView>
        {showDailyOnboard ? (
          <DailyOnboard
            color="#4cff87"
            text="adding your energy levels everyday"
            type="energy"
          />
        ) : null}
      </LoadingWrapper>
      <TrackerButton
        onPress={() => {
          navigation.navigate("AddEnergyScreen", {
            todaysValue: todaysValue || 0,
          });
          weEventTrack("energy_clickAdd", {});
        }}
        text="Add Energy"
      />
    </View>
  );
};

export default EnergyTracker;
