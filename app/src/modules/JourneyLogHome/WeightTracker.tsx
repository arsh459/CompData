import { Text, View, ScrollView } from "react-native";
import { useState } from "react";
import ViewSelectorV4 from "@components/ViewSelector/V4";
import {
  plusIconWhiteWithoutBorder,
  weightIconFrame45,
} from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import WeightElement from "./WeightElement";
import JourneyGraph from "./JourneyGraph";
import { format } from "date-fns";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { getCurrentWeekRange, getMonthRange } from "./utils";
import useAvgDataV2 from "@providers/streak/hooks/useAvgDataV2";
import { useEarliestWeight } from "@providers/streak/hooks/useLatestWeight";
import TrackerHeader from "./TrackerHeader";
import TrackerButton from "./TrackerButton";
import LoadingWrapper from "@components/LoadingWrapper";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {}

const WeightTracker: React.FC<Props> = ({}) => {
  const { user } = useUserContext();
  const [selectedView, setSelectedView] = useState<"Week" | "Month">("Week");

  const navigation = useNavigation();

  const { currentWeekData, weeklyAvgs, loading, currentWeekNumber } =
    useAvgDataV2("weight", "dailyWeight", user?.uid);
  const { weight } = useEarliestWeight(user?.uid);
  const todayDate = new Date();

  const latestWeight = weight?.weight ? weight.weight : user?.weight || 0;

  const {
    weekRange: str,
    weightsToShow: dataSet,
    dayLabels,
  } = getCurrentWeekRange(
    currentWeekData?.weekDataObj ? currentWeekData?.weekDataObj : [],
    latestWeight
  );
  const { dataSetMonth, monthRange } = getMonthRange(
    currentWeekNumber,
    weeklyAvgs,
    latestWeight
  );

  const data: LineChartData = {
    labels: ["", ...dayLabels],

    datasets: [
      {
        data: weight?.weight
          ? [weight?.weight, ...dataSet]
          : latestWeight
          ? [latestWeight, ...dataSet]
          : dataSet,
        color: () => "#5D588C",
        strokeWidth: 0.1,
      },
    ],
  };
  const dataMonth: LineChartData = {
    labels: ["", ...monthRange],
    datasets: [
      {
        data: weight?.weight
          ? [weight?.weight, ...dataSetMonth]
          : latestWeight
          ? [latestWeight, ...dataSetMonth]
          : dataSetMonth,
        color: () => "#5D588C",
        strokeWidth: 0.1,
      },
    ],
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <TrackerHeader icon={weightIconFrame45} text="Weight Tracker" />
      <ViewSelectorV4
        view1="Week"
        view2="Month"
        currView={selectedView}
        onView1={() => setSelectedView("Week")}
        onView2={() => setSelectedView("Month")}
        noThirdView={true}
      />
      <LoadingWrapper loading={loading}>
        <ScrollView bounces={false} className="flex-1 ">
          <View className="border border-[#534F7C] rounded-lg m-4 mt-0">
            <Text
              className="text-xs iphoneX:text-sm text-white/80 py-2 text-center"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {selectedView === "Month"
                ? format(todayDate, "MMMM yyyy")
                : selectedView === "Week"
                ? str
                : ""}
            </Text>
          </View>
          {selectedView === "Week" ? (
            <>
              {dataSet.length ? (
                <JourneyGraph
                  data={data}
                  weekData={currentWeekData?.weekDataObj}
                />
              ) : null}
            </>
          ) : selectedView === "Month" ? (
            <>
              {dataSetMonth.length ? <JourneyGraph data={dataMonth} /> : null}
            </>
          ) : null}
          <>
            <WeightElement
              leftMainText="Desired Goal Weight"
              rightText={`${user?.desiredWeight}kg`}
              rightTextColor="#FF7E46"
            />
          </>
        </ScrollView>
      </LoadingWrapper>

      <TrackerButton
        icon={plusIconWhiteWithoutBorder}
        onPress={() => {
          navigation.navigate("AddWeightScreen");
          weEventTrack("weightTracker_clickAdd", {});
        }}
        text="Add Weight"
      />
    </View>
  );
};

export default WeightTracker;
