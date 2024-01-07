import { View } from "react-native";
import { periodSectionTypes, usePeriodSection } from "./hooks/usePeriodSection";
import Loading from "@components/loading/Loading";
import PeriodCalenderWithJoinBoatWrapper from "@modules/JoinBoatMainV3/components/PeriodCalenderWithJoinBoatWrapper";
import SetLengthWithJoinBoatWrapper from "@modules/JoinBoatMainV3/components/SetLengthWithJoinBoatWrapper";

interface Props {
  sec: periodSectionTypes;
}

const totalSection = 5;

const PeriodOnboardingModule: React.FC<Props> = ({ sec }) => {
  const { onMarkPeriodSave, onCycleLengthAverageSave, onLastPeriodLengthSave } =
    usePeriodSection(false);

  switch (sec) {
    case "loading":
      return (
        <View className="flex-1 bg-black flex flex-col justify-center items-center">
          <Loading fill="#ff735c" width="w-16" height="h-16" />
        </View>
      );
    case "lastPeriodLength":
      return (
        <SetLengthWithJoinBoatWrapper
          onLengthSave={onLastPeriodLengthSave}
          nextBtnText="Proceed"
          progress={1 / totalSection}
          title="How long was your last period?"
          highlightedTitle="last period?"
          highlightedColor="#FF388A"
          currentText="Your Current period length is "
          key="lastPeriodLength"
        />
      );

    case "cycleLengthAverage":
      return (
        <SetLengthWithJoinBoatWrapper
          onLengthSave={onCycleLengthAverageSave}
          nextBtnText="Proceed"
          progress={2 / totalSection}
          title="In the last 6 months, how many days have gone by between your periods on average?"
          highlightedTitle="days have gone by between your periods"
          highlightedColor="#6D55D1"
          currentText="Your Current cycle is "
          isCycle={true}
          isIrregulerCycle={true}
          key="cycleLengthAverage"
        />
      );

    case "markLastPeriod":
      return (
        <PeriodCalenderWithJoinBoatWrapper
          key="markLastPeriod"
          target="markLastPeriod"
          progress={2 / totalSection}
          title="Mark the dates of your last period?"
          highlightedTitle="last period?"
          highlightedColor="#FF6069"
          // onSkip={() => {
          // weEventTrack("periodTrackerNext", {});
          // gotoSection("irregulerCycle");
          // }}
          onSaveAndNext={onMarkPeriodSave}
        />
      );

    case "markBeforeLastPeriod":
      return (
        <PeriodCalenderWithJoinBoatWrapper
          key="markBeforeLastPeriod"
          target="markBeforeLastPeriod"
          progress={3 / totalSection}
          title="Can you help us with period dates before that?"
          highlightedTitle="period dates before that?"
          highlightedColor="#9B7BFF"
          // onSkip={() => {
          // weEventTrack("fScanMarkLastToLastSkip", {});
          // gotoSection("irregulerCycle");
          // }}
          onSaveAndNext={onMarkPeriodSave}
        />
      );

    default:
      return (
        <View className="flex-1 bg-black flex flex-col justify-center items-center" />
      );
  }
};

export default PeriodOnboardingModule;
