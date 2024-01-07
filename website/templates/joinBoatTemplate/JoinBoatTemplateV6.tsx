import { weEventTrack } from "@analytics/webengage/user/userLog";
import Loading from "@components/loading/Loading";
import { useAuth } from "@hooks/auth/useAuth";
import { useLocalUser } from "@hooks/joinBoat/V6/useLocalUser";
import { useStartSection } from "@hooks/joinBoat/V6/useSection";
import {
  CycleRegularityTypes,
  diagnosedPeriodType,
  fitnessGoalTypes,
  workoutFrequencyTypes,
  workoutStyleTypes,
} from "@models/User/User";
import ScanningBodyType from "./V5/Components/ScanningBodyType";
import SetHeight from "./V5/Components/SetHeight";
import SetWeight from "./V5/Components/SetWeight";
import Welcome from "./V5/Components/Welcome";
import AuthScreen from "./V6/AuthScreen";
import DownloadAppV2 from "./V6/DownloadAppV2";
import EnterName from "./V6/EnterName";
import JoinBoatWrapper from "./V6/JoinBoatWrapper";
import PaySuccess from "./V6/PaySuccess";
import SetAge from "./V6/SetAge";
import SetFitnessGoal from "./V6/SetFitnessGoal";
import SetonDiagnosedPeriod from "./V6/SetonDiagnosedPeriod";
import SetPcosSymptoms from "./V6/SetPcosSymptoms";
import SetWorkoutFrequency from "./V6/SetWorkoutFrequency";
import StartTransformation from "./V6/StartTransformation";
import SetSleep from "./V6/SetSleep";
import SetLength from "./V6/SetLength";
import AchievementPath from "@modules/Bookings/AchievementPath";
import CalendlySlot from "./V7/CalendlySlot";
import CycleRegularity from "./V6/CycleRegularity";
import MarkPeriodCalender from "./V6/MarkPeriodCalender";
import SetMood from "./V6/SetMood";
import SetEnergy from "./V6/SetEnergy";
import SetPeriodSymptoms from "./V6/SetPeriodSymptoms";
import { symptomId } from "@models/User/symptom";
import SetWorkoutStyle from "./V6/SetWorkoutStyle";
import SelectBodyTypeWithJoinBoatWrapper from "./V6/SetBodyType/SelectBodyTypeWithJoinBoatWrapper";
import EnterEmailV2 from "./V6/EnterEmailV2";

const totalSection = 14;

const JoinBoatTemplateV6 = () => {
  const { user, annonymousSignin, authStatus } = useAuth();

  const {
    localUser,
    onNameUpdate,
    onEmailUpdate,
    onGoalUpdate,
    onDiagnosedPeriodUpdate,
    onNumberFieldsUpdate,
    onPcosSymptomsUpdate,
    onWorkoutFrequencyUpdate,
    onCycleRegularityUpdate,
    onPeriodSymptomsUpdate,
    onWorkoutStyleUpdate,
  } = useLocalUser(user);

  const {
    section,
    gotoSection,
    onNameSave,
    onEmailSave,
    onFitnessGoalSave,
    onDiagnosedPeriodSave,
    onAgeSave,
    onHeightSave,
    onWeightSave,
    onDesiredWeightSave,
    onPcosSymptomsSave,
    onWorkoutFrequencySave,
    onCurrentBodyTypeSave,
    onDesiredBodyTypeSave,
    onScanningNext,
    onAuthSuccess,
    onCycleLengthAverageSave,
    onLastPeriodLengthSave,
    onSleepQulitySave,
    gotoPlans,
    onCycleRegularitySave,
    onMarkLastPeriodSave,
    onMoodSave,
    onEnergySave,
    onSymptomsDuringPeriodSave,
    onSymptomsBeforePeriodSave,
    onWorkoutStyleSave,
    challenge,
    // appointmentId,
  } = useStartSection(localUser, user);

  const onWelcomeNext = async () => {
    await annonymousSignin();

    if (authStatus !== "PENDING") {
      gotoSection("name");
    }

    weEventTrack("fScanIntro_clickNext", {});
  };

  const onFitnessGoalClick = (newVal: fitnessGoalTypes) => {
    onGoalUpdate(newVal);
    onFitnessGoalSave([newVal]);
  };

  const onDiagnosedPeriodClick = (newVal: diagnosedPeriodType) => {
    onDiagnosedPeriodUpdate(newVal);
    onDiagnosedPeriodSave(newVal);
  };

  const onWorkoutFrequencyClick = (newVal: workoutFrequencyTypes) => {
    onWorkoutFrequencyUpdate(newVal);
    onWorkoutFrequencySave(newVal);
  };

  const onycleRegularityClick = (newVal: CycleRegularityTypes) => {
    onCycleRegularityUpdate(newVal);
    onCycleRegularitySave(newVal);
  };

  const onWorkoutStyleClick = (newVal: workoutStyleTypes) => {
    onWorkoutStyleUpdate(newVal);
    onWorkoutStyleSave(newVal);
  };

  const onAchievementPathCtaClick = () => {
    weEventTrack(`fScanRoadmap_clickNext`, {});

    if (challenge) {
      gotoSection("download");
    } else if (localUser?.phone) {
      // gotoSection("plans");
      gotoPlans();
    } else {
      gotoSection("auth");
    }
  };

  switch (section) {
    case "loading":
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading fill="#FF735C" width={50} height={50} />
        </div>
      );
    case "welcome":
      return (
        <JoinBoatWrapper onNext={onWelcomeNext} nextBtnText="Get Started">
          <Welcome />
        </JoinBoatWrapper>
      );
    case "name":
      return (
        <EnterName
          localUser={localUser}
          onNameUpdate={onNameUpdate}
          onNameSave={onNameSave}
          progress={1 / totalSection}
        />
      );
    case "email":
      return (
        <EnterEmailV2
          email={localUser?.email}
          onEmailUpdate={onEmailUpdate}
          onEmailSave={onEmailSave}
          progress={2 / totalSection}
        />
      );
    case "fitnessGoal":
      return (
        <JoinBoatWrapper
          title="Choose your fitness goal."
          onNext={() => onFitnessGoalSave(localUser?.fitnessGoal)}
          disabled={!localUser?.fitnessGoal?.length}
          progress={2 / totalSection}
        >
          <SetFitnessGoal
            localUser={localUser}
            onFitnessGoalClick={onFitnessGoalClick}
          />
        </JoinBoatWrapper>
      );
    case "pcos_pcod":
      return (
        <JoinBoatWrapper
          title="When where you diagnosed with PCOS/PCOD?"
          onNext={() => onDiagnosedPeriodSave(localUser?.diagnosedPeriod)}
          disabled={!localUser?.diagnosedPeriod}
          progress={3 / totalSection}
        >
          <SetonDiagnosedPeriod
            localUser={localUser}
            onDiagnosedPeriodClick={onDiagnosedPeriodClick}
          />
        </JoinBoatWrapper>
      );
    case "age":
      return (
        <JoinBoatWrapper
          title={`What is your age ${localUser?.name}?`}
          onNext={() => onAgeSave(localUser?.age)}
          disabled={!localUser?.age}
          progress={3 / totalSection}
        >
          <SetAge
            localUser={localUser}
            onAgeUpdate={(val: number) => onNumberFieldsUpdate(val, "age")}
          />
        </JoinBoatWrapper>
      );
    case "height":
      return (
        <JoinBoatWrapper
          title="What is your Current Height?"
          onNext={() => onHeightSave(localUser?.height)}
          disabled={!localUser?.height}
          progress={4 / totalSection}
        >
          <SetHeight
            localUser={localUser}
            onNumberFieldsUpdate={(val: number) =>
              onNumberFieldsUpdate(val, "height")
            }
          />
        </JoinBoatWrapper>
      );
    case "weight":
      return (
        <JoinBoatWrapper
          title="What is your Current Weight?"
          onNext={() => onWeightSave(localUser?.weight)}
          disabled={!localUser?.weight}
          progress={5 / totalSection}
          key="weight"
        >
          <SetWeight
            initialValue={localUser?.weight ? localUser.weight : 0}
            onNumberFieldsUpdate={(val: number) =>
              onNumberFieldsUpdate(val, "weight")
            }
            target="weight"
          />
        </JoinBoatWrapper>
      );
    case "desiredWeight":
      return (
        <JoinBoatWrapper
          title="What is your Desired Weight?"
          onNext={() => onDesiredWeightSave(localUser?.desiredWeight)}
          disabled={!localUser?.desiredWeight}
          progress={6 / totalSection}
          key="desiredWeight"
        >
          <SetWeight
            initialValue={
              localUser?.desiredWeight ? localUser.desiredWeight : 0
            }
            onNumberFieldsUpdate={(val: number) =>
              onNumberFieldsUpdate(val, "desiredWeight")
            }
            target="desiredWeight"
          />
        </JoinBoatWrapper>
      );
    case "cycleRegularity":
      return (
        <JoinBoatWrapper
          title="Is your cycle regular?"
          onNext={() =>
            localUser?.periodTrackerObj?.cycleRegularity &&
            onycleRegularityClick(localUser?.periodTrackerObj?.cycleRegularity)
          }
          disabled={!localUser?.periodTrackerObj?.cycleRegularity}
          progress={7 / totalSection}
        >
          <CycleRegularity
            cycleRegularity={localUser?.periodTrackerObj?.cycleRegularity}
            onNext={onycleRegularityClick}
          />
        </JoinBoatWrapper>
      );
    case "markLastPeriod":
      return (
        <JoinBoatWrapper
          key="markLastPeriod"
          progress={9 / totalSection}
          onSkip={() => gotoSection("irregulerCycle")}
        >
          <MarkPeriodCalender
            target="markLastPeriod"
            onSaveAndNext={onMarkLastPeriodSave}
            userId={localUser?.uid}
            title="Mark the dates of your last period?"
            highlightedTitle="last period?"
            highlightedColor="#FF6069"
          />
        </JoinBoatWrapper>
      );
    case "markBeforeLastPeriod":
      return (
        <JoinBoatWrapper
          key="markBeforeLastPeriod"
          progress={9 / totalSection}
          onSkip={() => gotoSection("irregulerCycle")}
        >
          <MarkPeriodCalender
            target="markBeforeLastPeriod"
            onSaveAndNext={onMarkLastPeriodSave}
            userId={localUser?.uid}
            title="Can you help us with period dates before that?"
            highlightedTitle="period dates before that?"
            highlightedColor="#9B7BFF"
          />
        </JoinBoatWrapper>
      );
    case "cycleLengthAverage":
    case "irregulerCycle":
      return (
        <JoinBoatWrapper
          onNext={() =>
            onCycleLengthAverageSave(
              localUser?.periodTrackerObj?.inputCycleLength || 28
            )
          }
          disabled={!localUser?.periodTrackerObj?.inputCycleLength}
          progress={8 / totalSection}
        >
          <SetLength
            target={localUser?.periodTrackerObj?.inputCycleLength || 28}
            onChange={(newVal: number) =>
              onNumberFieldsUpdate(newVal, "cycleLengthAverage")
            }
            title="In the last 6 months, how many days have gone by between your periods on average?"
            highlightedTitle="days have gone by between your periods"
            highlightedColor="#6D55D1"
            currentText="Your Current cycle is "
            isCycle={true}
            isIrregulerCycle={section === "irregulerCycle"}
          />
        </JoinBoatWrapper>
      );
    case "lastPeriodLength":
      return (
        <JoinBoatWrapper
          onNext={() =>
            onLastPeriodLengthSave(
              localUser?.periodTrackerObj?.inputPeriodLength || 5
            )
          }
          disabled={!localUser?.periodTrackerObj?.inputPeriodLength}
          progress={9 / totalSection}
        >
          <SetLength
            target={localUser?.periodTrackerObj?.inputPeriodLength || 5}
            onChange={(newVal: number) =>
              onNumberFieldsUpdate(newVal, "lastPeriodLength")
            }
            title="How long was your last period?"
            highlightedTitle="last period?"
            highlightedColor="#FF388A"
            currentText="Your Current period length is "
          />
        </JoinBoatWrapper>
      );
    case "sleepQuality":
      return (
        <JoinBoatWrapper
          onNext={() => onSleepQulitySave(localUser?.sleepQulity || 8)}
          title="What is your sleep quality?"
          disabled={!localUser?.sleepQulity}
          progress={10 / totalSection}
        >
          <SetSleep
            target={localUser?.sleepQulity || 8}
            onChange={(newVal: number) =>
              onNumberFieldsUpdate(newVal, "sleepQulity")
            }
          />
        </JoinBoatWrapper>
      );
    case "mood":
      return (
        <SetMood
          userId={localUser?.uid}
          onMoodSave={onMoodSave}
          totalSection={totalSection}
        />
      );
    case "energy":
      return (
        <SetEnergy
          userId={localUser?.uid}
          totalSection={totalSection}
          onEnergySave={onEnergySave}
        />
      );
    case "symptomsDuringPeriod":
      return (
        <JoinBoatWrapper
          onNext={() =>
            onSymptomsDuringPeriodSave(
              localUser?.periodTrackerObj?.symptomsDuringPeriod
            )
          }
          disabled={!localUser?.periodTrackerObj?.symptomsDuringPeriod?.length}
          progress={13 / totalSection}
          key="symptomsDuringPeriod"
        >
          <SetPeriodSymptoms
            symptoms={localUser?.periodTrackerObj?.symptomsDuringPeriod}
            onPeriodSymptomsUpdate={(val: symptomId) =>
              onPeriodSymptomsUpdate(val, "symptomsDuringPeriod")
            }
            title="Are there any particular symptoms you face during your period?"
            highlightedTitle="any particular symptoms"
            highlightedColor="#19C8FF"
          />
        </JoinBoatWrapper>
      );
    case "symptomsBeforePeriod":
      return (
        <JoinBoatWrapper
          onNext={() =>
            onSymptomsBeforePeriodSave(
              localUser?.periodTrackerObj?.symptomsBeforePeriod
            )
          }
          disabled={!localUser?.periodTrackerObj?.symptomsBeforePeriod?.length}
          progress={13 / totalSection}
          key="symptomsBeforePeriod"
        >
          <SetPeriodSymptoms
            symptoms={localUser?.periodTrackerObj?.symptomsBeforePeriod}
            onPeriodSymptomsUpdate={(val: symptomId) =>
              onPeriodSymptomsUpdate(val, "symptomsBeforePeriod")
            }
            title="Do you face any of the following symptom just before your period?"
            highlightedTitle="any of the following symptom"
            highlightedColor="#C79BFF"
          />
        </JoinBoatWrapper>
      );
    case "pcosSymptoms":
      return (
        <JoinBoatWrapper
          title="Do you have any of the following symptoms?"
          onNext={() => onPcosSymptomsSave(localUser?.pcosSymptoms)}
          disabled={!localUser?.pcosSymptoms?.length}
          progress={9 / totalSection}
        >
          <SetPcosSymptoms
            localUser={localUser}
            onPcosSymptomsUpdate={onPcosSymptomsUpdate}
          />
        </JoinBoatWrapper>
      );
    case "workoutFrequency":
      return (
        <JoinBoatWrapper
          title="How often do you currently workout?"
          onNext={() => onWorkoutFrequencySave(localUser?.workoutFrequency)}
          disabled={!localUser?.workoutFrequency}
          progress={10 / totalSection}
        >
          <SetWorkoutFrequency
            localUser={localUser}
            onWorkoutFrequencyClick={onWorkoutFrequencyClick}
          />
        </JoinBoatWrapper>
      );
    case "workoutStyle":
      return (
        <JoinBoatWrapper
          title="What is your preferred workout style?"
          onNext={() => onWorkoutStyleSave(localUser?.workoutStyle)}
          disabled={!localUser?.workoutStyle}
          nextBtnText={`Proceed ${"With " + localUser?.workoutStyle || ""}`}
          progress={14 / totalSection}
        >
          <SetWorkoutStyle
            workoutStyle={localUser?.workoutStyle}
            onWorkoutStyleClick={onWorkoutStyleClick}
          />
        </JoinBoatWrapper>
      );
    case "currentBodyType":
      return (
        <SelectBodyTypeWithJoinBoatWrapper
          currentBodyTypeDB={localUser?.currentBodyType}
          desiredBodyTypeDB={localUser?.desiredBodyType}
          onBodyTypeSave={onCurrentBodyTypeSave}
          title="What your current body-type?"
          progress={13 / totalSection}
          target="currentBodyType"
          key="currentBodyType"
        />
      );
    case "desiredBodyType":
      return (
        <SelectBodyTypeWithJoinBoatWrapper
          currentBodyTypeDB={localUser?.currentBodyType}
          desiredBodyTypeDB={localUser?.desiredBodyType}
          onBodyTypeSave={onDesiredBodyTypeSave}
          title="Choose your desired body-type you want to achieve?"
          progress={13 / totalSection}
          target="desiredBodyType"
          key="desiredBodyType"
        />
      );
    case "scanning":
      return (
        <ScanningBodyType
          challenge={challenge ? true : false}
          uid={user?.uid}
          onScaningNext={onScanningNext}
        />
      );
    case "transformation":
      return (
        <StartTransformation
          localUser={localUser}
          gotoSection={gotoSection}
          initScreen={false}
          thingsToWorkOn={user?.thingsToWorkOn}
        />
      );
    case "achievementPath":
      return (
        <AchievementPath
          type="fetch"
          user={user}
          ctaText="Let's Get Started"
          onCtaPress={onAchievementPathCtaClick}
        />
      );
    case "auth":
      return (
        <JoinBoatWrapper>
          <AuthScreen onAuthSuccess={onAuthSuccess} />
        </JoinBoatWrapper>
      );
    case "paySuccess":
      return (
        <JoinBoatWrapper
          nextBtnText="Proceed to next"
          onNext={() => gotoSection("download")}
        >
          <PaySuccess />
        </JoinBoatWrapper>
      );
    case "consultationtime":
    case "slotConfirmation":
      return (
        <JoinBoatWrapper
          nextBtnText="Browse Workouts & Recipees"
          onNext={() => gotoSection("download")}
        >
          <CalendlySlot uid={user?.uid ? user.uid : ""} />
        </JoinBoatWrapper>
      );
    case "download":
      return (
        <JoinBoatWrapper>
          <DownloadAppV2 challenge={challenge ? true : false} user={user} />
        </JoinBoatWrapper>
      );
    default:
      return null;
  }
};

export default JoinBoatTemplateV6;
