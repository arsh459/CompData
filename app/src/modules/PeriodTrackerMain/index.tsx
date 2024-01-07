import { ScrollView, View } from "react-native";
import TrackerHeading from "./TrackerHeading";
import CirclePeriod from "./CirclePeriod";
import HorizontalPeriodCalendarV2 from "@modules/PeriodCalenderLogMain/HorizontalPeriodCalendarV2";
import { usePeriodCycles } from "@providers/period/hooks/usePeriodCycles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { usePeriodDatesForUser } from "@providers/period/hooks/usePeriodDatesForUser";
import BasedOnCurrentCycle from "./BasedOnCurrentCycle";
import SymptomsSection from "./SymptomsSection/SymptomsSection";
import PreviousCycleList from "./PreviousCycleList";
import { useOnboardContext } from "./PeriodGuidedOnboard/OnboardProvider";
import PeriodMainGuidedOnboard from "./PeriodGuidedOnboard";
import PeriodTrackerHeader from "./PeriodTrackerHeader";
// import SymptomIntake from "./SymptomIntake";

export type CircleType = "red" | "white" | "unknown";

const PeriodTrackerMain = () => {
  // fetch cycles
  usePeriodCycles();
  usePeriodDatesForUser();
  const tabBarHeight = useBottomTabBarHeight();
  const { periodTrackerCalender } = useOnboardContext();

  return (
    <>
      <PeriodTrackerHeader />
      <ScrollView>
        <TrackerHeading />

        <View className="mt-4" collapsable={false} ref={periodTrackerCalender}>
          <HorizontalPeriodCalendarV2 />
        </View>

        <View className="py-4 pb-8">
          <CirclePeriod />
        </View>

        <BasedOnCurrentCycle view="day" />

        <View className="pt-4 ">
          <SymptomsSection view="day" />

          <PreviousCycleList />
        </View>

        <View style={{ height: tabBarHeight + 16 }} />
      </ScrollView>
      {/* <SymptomIntake /> */}
      <PeriodMainGuidedOnboard />
    </>
  );
};

export default PeriodTrackerMain;
