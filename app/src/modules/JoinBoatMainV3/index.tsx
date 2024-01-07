import Loading from "@components/loading/Loading";
import ScanningBodyType from "@modules/JoinBoatMainV3/components/ScanningBodyType";
import Welcome from "@modules/JoinBoatMainV3/components/Welcome";
import { View } from "react-native";
import EnterName from "./components/EnterName";
import SetAge from "./components/SetAge";
import SetFitnessGoal from "./components/SetFitnessGoal";
import SetonDiagnosedPeriod from "./components/SetonDiagnosedPeriod";
import SetWorkoutFrequency from "./components/SetWorkoutFrequency";
import StartTransformation from "./components/StartTransformation";
import { sectionTypes, useStartSection } from "./hooks/useSection";
import PlanScreen from "@modules/JoinBoatMainV3/components/PlanScreen";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import AchievementPath from "./components/AchievementPath";
import SetWeightWithJoinBoatWrapper from "./components/SetWeightWithJoinBoatWrapper";
import SetHeightWithJoinBoatWrapper from "./components/SetHeightWithJoinBoatWrapper";
import SetLengthWithJoinBoatWrapper from "./components/SetLengthWithJoinBoatWrapper";
import SetSleepWithJoinBoatWrapper from "./components/SetSleepWithJoinBoatWrapper";
import SelectBodyTypeWithJoinBoatWrapper from "./components/SelectBodyTypeWithJoinBoatWrapper";
import CycleRegularity from "./components/CycleRegularity";
import PeriodCalenderWithJoinBoatWrapper from "./components/PeriodCalenderWithJoinBoatWrapper";
import SetMood from "./components/SetMood";
import SetEnergy from "./components/SetEnergy";
import SetPeriodSymptoms from "./components/SetPeriodSymptoms";
import SetWorkoutStyle from "./components/SetWorkoutStyle";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import EnterEmail from "./components/EnterEmail";

const totalSection = 15;

const getNextButtonCTA = (backOnDone?: boolean) => {
  if (backOnDone) {
    return "Save";
  } else {
    return "Proceed";
  }
};

interface Props {
  section: sectionTypes;
  toJoinGameId?: string;
  toJoinTeamId?: string;
  backOnDone?: boolean;
}

const JoinBoatMainV3: React.FC<Props> = ({
  section,
  toJoinGameId,
  toJoinTeamId,
  backOnDone,
}) => {
  const nextBtnText = getNextButtonCTA(backOnDone);

  const {
    gotoHome,
    gotoSection,
    onNameSave,
    onEmailSave,
    onFitnessGoalSave,
    onDiagnosedPeriodSave,
    onAgeSave,
    onHeightSave,
    onWeightSave,
    onDesiredWeightSave,
    onWorkoutFrequencySave,
    onCurrentBodyTypeSave,
    onDesiredBodyTypeSave,
    onScanningNext,
    onSlotBookingSkip,
    onCycleRegularitySave,
    onMarkPeriodSave,
    onCycleLengthAverageSave,
    onLastPeriodLengthSave,
    onSleepQualitySave,
    onAchievementPathCtaClick,
    onWelcomeNext,
    onMoodSave,
    onEnergySave,
    onSlotBookingNext,
    onSymptomsDuringPeriodSave,
    onSymptomsBeforePeriodSave,
    onWorkoutStyleSave,
    onEmailSkip,
  } = useStartSection(toJoinGameId, toJoinTeamId, backOnDone);

  switch (section) {
    case "loading":
      return (
        <View className="flex-1 bg-black flex flex-col justify-center items-center">
          <Loading fill="#ff735c" width="w-16" height="h-16" />
        </View>
      );
    case "welcome":
      return <Welcome onWelcomeNext={onWelcomeNext} />;
    case "name":
      return <EnterName onNameSave={onNameSave} progress={1 / totalSection} />;
    case "email":
      return (
        <EnterEmail
          onSkip={onEmailSkip}
          onEmailSave={onEmailSave}
          progress={2 / totalSection}
        />
      );
    case "fitnessGoal":
      return (
        <SetFitnessGoal
          onFitnessGoalSave={onFitnessGoalSave}
          nextBtnText={nextBtnText}
          progress={3 / totalSection}
        />
      );
    case "pcos_pcod":
      return (
        <SetonDiagnosedPeriod
          onDiagnosedPeriodSave={onDiagnosedPeriodSave}
          nextBtnText={nextBtnText}
          progress={4 / totalSection}
        />
      );
    case "age":
      return (
        <SetAge
          onAgeSave={onAgeSave}
          nextBtnText={nextBtnText}
          progress={4 / totalSection}
        />
      );
    case "height":
      return (
        <SetHeightWithJoinBoatWrapper
          onHeightSave={onHeightSave}
          nextBtnText={nextBtnText}
          progress={5 / totalSection}
        />
      );
    case "weight":
      return (
        <SetWeightWithJoinBoatWrapper
          onWeightSave={onWeightSave}
          title="What is your Current Weight?"
          nextBtnText={nextBtnText}
          progress={6 / totalSection}
          target="weight"
          key="weight"
        />
      );
    case "desiredWeight":
      return (
        <SetWeightWithJoinBoatWrapper
          onWeightSave={onDesiredWeightSave}
          title="What is your Desired Weight?"
          nextBtnText={nextBtnText}
          progress={7 / totalSection}
          target="desiredWeight"
          key="desiredWeight"
        />
      );
    case "cycleRegularity":
      return (
        <CycleRegularity
          progress={8 / totalSection}
          onCycleRegularitySave={onCycleRegularitySave}
        />
      );
    case "markLastPeriod":
      return (
        <PeriodCalenderWithJoinBoatWrapper
          key="markLastPeriod"
          target="markLastPeriod"
          progress={9 / totalSection}
          title="Mark the dates of your last period?"
          highlightedTitle="last period?"
          highlightedColor="#FF6069"
          onSkip={() => {
            weEventTrack("fScanMarkLastSkip", {});
            gotoSection("irregulerCycle");
          }}
          onSaveAndNext={onMarkPeriodSave}
        />
      );
    case "markBeforeLastPeriod":
      return (
        <PeriodCalenderWithJoinBoatWrapper
          key="markBeforeLastPeriod"
          target="markBeforeLastPeriod"
          progress={10 / totalSection}
          title="Can you help us with period dates before that?"
          highlightedTitle="period dates before that?"
          highlightedColor="#9B7BFF"
          onSkip={() => {
            weEventTrack("fScanMarkLastToLastSkip", {});
            gotoSection("irregulerCycle");
          }}
          onSaveAndNext={onMarkPeriodSave}
        />
      );
    case "cycleLengthAverage":
    case "irregulerCycle":
      return (
        <SetLengthWithJoinBoatWrapper
          onLengthSave={onCycleLengthAverageSave}
          nextBtnText={nextBtnText}
          progress={9 / totalSection}
          title="In the last 6 months, how many days have gone by between your periods on average?"
          highlightedTitle="days have gone by between your periods"
          highlightedColor="#6D55D1"
          currentText="Your Current cycle is "
          isCycle={true}
          isIrregulerCycle={section === "irregulerCycle"}
          key="cycleLengthAverage"
        />
      );
    case "lastPeriodLength":
      return (
        <SetLengthWithJoinBoatWrapper
          onLengthSave={onLastPeriodLengthSave}
          nextBtnText={nextBtnText}
          progress={10 / totalSection}
          title="How long was your last period?"
          highlightedTitle="last period?"
          highlightedColor="#FF388A"
          currentText="Your Current period length is "
          key="lastPeriodLength"
        />
      );
    case "sleepQuality":
      return (
        <SetSleepWithJoinBoatWrapper
          onSleepSave={onSleepQualitySave}
          nextBtnText={nextBtnText}
          progress={11 / totalSection}
        />
      );
    case "mood":
      return (
        <SetMood
          onMoodSave={onMoodSave}
          nextBtnText={nextBtnText}
          progress={12 / totalSection}
        />
      );
    case "energy":
      return (
        <SetEnergy
          onEnergySave={onEnergySave}
          nextBtnText={nextBtnText}
          progress={13 / totalSection}
        />
      );
    case "symptomsDuringPeriod":
      return (
        <SetPeriodSymptoms
          onPeriodSymptomsSave={onSymptomsDuringPeriodSave}
          nextBtnText={nextBtnText}
          progress={14 / totalSection}
          target="symptomsDuringPeriod"
          key="symptomsDuringPeriod"
          title="Are there any particular symptoms you face during your period?"
          highlightedTitle="any particular symptoms"
          highlightedColor="#19C8FF"
        />
      );
    case "symptomsBeforePeriod":
      return (
        <SetPeriodSymptoms
          onPeriodSymptomsSave={onSymptomsBeforePeriodSave}
          nextBtnText={nextBtnText}
          progress={14 / totalSection}
          target="symptomsBeforePeriod"
          key="symptomsBeforePeriod"
          title="Do you face any of the following symptom just before your period?"
          highlightedTitle="any of the following symptom"
          highlightedColor="#C79BFF"
        />
      );
    case "workoutFrequency":
      return (
        <SetWorkoutFrequency
          onWorkoutFrequencySave={onWorkoutFrequencySave}
          nextBtnText={nextBtnText}
          progress={14 / totalSection}
        />
      );
    case "workoutStyle":
      return (
        <SetWorkoutStyle
          onWorkoutStyleSave={onWorkoutStyleSave}
          nextBtnText={nextBtnText}
          progress={15 / totalSection}
        />
      );
    case "currentBodyType":
      return (
        <SelectBodyTypeWithJoinBoatWrapper
          onBodyTypeSave={onCurrentBodyTypeSave}
          title="What your current body-type?"
          progress={14 / totalSection}
          target="currentBodyType"
          key="currentBodyType"
        />
      );
    case "desiredBodyType":
      return (
        <SelectBodyTypeWithJoinBoatWrapper
          onBodyTypeSave={onDesiredBodyTypeSave}
          title="Choose your desired body-type you want to achieve?"
          progress={14 / totalSection}
          target="desiredBodyType"
          key="desiredBodyType"
        />
      );
    case "scanning":
      return <ScanningBodyType onScaningNext={onScanningNext} />;
    case "transformation":
      return <StartTransformation gotoSection={gotoSection} />;
    case "achievementPath":
      return (
        <AchievementPath
          type="fetch"
          ctaText="Let's Get Started"
          onCtaPress={onAchievementPathCtaClick}
        />
      );
    case "plans":
      return (
        <InteractionProvider>
          <PlanScreen
            goToHome={gotoHome}
            onSlotBookingRequest={onSlotBookingNext}
            onSlotBookingSkip={onSlotBookingSkip}
          />
        </InteractionProvider>
      );
    default:
      return null;
  }
};

export default JoinBoatMainV3;
