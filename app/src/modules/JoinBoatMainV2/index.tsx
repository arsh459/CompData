import { useLocalUserV2 } from "@hooks/user/useLocalUserV2";
import { useUserContext } from "@providers/user/UserProvider";
import JoinBoatWrapper from "./JoinBoatWrapper";
import EnterName from "./Components/EnterName";
import SelectGender from "./Components/SelectGender";
import SetHeight from "./Components/SetHeight";
import SetRepsCount, {
  defaultRepsCount,
  Skip,
} from "./Components/SetRepsCount";
import SettintUp from "./Components/SettintUp";
import Welcome from "./Components/Welcome";
import useSection, { sectionTypes } from "./hooks/useSection";
import EnterPhone from "./Components/EnterPhone";
import LoadingSection from "@modules/LoadingRouter/LoadingSection";
import { sendWEOnboardingEvent } from "./hooks/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import ScanningBodyType from "./Components/ScanningBodyType";
import ResolutionDetail from "./Components/ResolutionDetail";
import SetConcerns from "./Components/SetConcerns";
import DesiredBodyType from "./Components/BodyType/DesiredBodyType";
import CurrentBodyType from "./Components/BodyType/CurrentBodyType";
import SetGoal from "./Components/SetGoal";
import JoinComp from "./Components/JoinComp";
import ConsultationSlot from "./Components/ConsultationSlot";
// import SlotBooked from "./Components/SlotBooked";
import SlotBookedV2 from "@modules/JoinBoatMainV3/components/SlotBookedV2";
import SetWeightNew from "@modules/JoinBoatMainV3/components/SetWeightNew";

interface Props {
  selectedSection: sectionTypes;
  toJoinTeamId?: string;
  toJoinGameId?: string;
  backOnDone?: boolean;
}

const JoinBoatMainV2: React.FC<Props> = ({
  selectedSection,
  toJoinGameId,
  toJoinTeamId,
  backOnDone,
}) => {
  const { user } = useUserContext();

  const {
    localUser,
    onNameUpdate,
    onPhoneUpdate,
    onGenderUpdate,
    onNumberFieldsUpdate,
    onCurrentBodyTypeUpdate,
    onDesiredBodyTypeUpdate,
    onFCLocalUpdate,
    onGoalUpdate,
  } = useLocalUserV2(user);

  const {
    section,
    gotoHome,
    gotoSection,
    onProfileUpdate,
    onUserPhoneUpdate,
    onUseGenderUpdate,
    onUserHeightUpdate,
    onUserWeightUpdate,
    onUserRepsCountUpdate,
    onFitnessGoalUpdate,
    onUserCurrentBodyTypeUpdate,
    onUserDesiredBodyTypeUpdate,
    onFCSUpdate,
    // appointmentId,
  } = useSection(
    selectedSection,
    localUser,
    toJoinGameId,
    toJoinTeamId,
    backOnDone
  );

  const goToName = () => {
    gotoSection("name");
    sendWEOnboardingEvent("welcome");
  };

  const onNameNext = () => {
    onProfileUpdate(
      !localUser?.phone ? "phone" : "gender",
      localUser?.name?.trim()
    );
    sendWEOnboardingEvent("name");
  };

  const onGenderNext = () => {
    onUseGenderUpdate(localUser?.gender);
    sendWEOnboardingEvent("gender");
  };

  const onFCSNext = () => {
    onFCSUpdate(localUser?.fitnessConcerns);
    sendWEOnboardingEvent("fcs");
  };

  const onGoalNext = () => {
    onFitnessGoalUpdate(localUser?.fitnessGoal);
    sendWEOnboardingEvent("goal");
  };

  const onHeightNext = () => {
    onUserHeightUpdate(localUser?.height);
    sendWEOnboardingEvent("height");
  };

  const onWeightNext = () => {
    onUserWeightUpdate(localUser?.weight);
    sendWEOnboardingEvent("weight");
  };

  const onRepCountNext = () => {
    if (typeof localUser?.repsCount === "number") {
      onUserRepsCountUpdate(localUser?.repsCount);
    } else {
      onUserRepsCountUpdate(defaultRepsCount);
    }

    sendWEOnboardingEvent("repsCount");
  };

  const onSetCurrentBodyTypeNext = () => {
    onUserCurrentBodyTypeUpdate(
      localUser?.currentBodyType,
      localUser?.currentBodyType === user?.currentBodyType
        ? localUser?.desiredBodyType
        : undefined
    );
    sendWEOnboardingEvent("currentBodyType");

    // setTargetBodyType state
  };

  const onSetDesiredBodyTypeNext = () => {
    onUserDesiredBodyTypeUpdate(
      localUser?.desiredBodyType,
      localUser?.difficulty,
      localUser?.paceOfAchievementInMonth
    );
    sendWEOnboardingEvent("desiredBodyType");
  };

  const onScaningNext = () => {
    gotoSection("desiredBodyType", true);
    sendWEOnboardingEvent("scaningBodyType");
  };

  const onFinalNext = () => {
    gotoSection("resolutionDetail", true);
    sendWEOnboardingEvent("settingup");
  };

  const onResolutionNext = () => {
    gotoSection("consultationSlot", true);
    sendWEOnboardingEvent("resolutionDetail");
  };

  const onLocalUserHeightUpdate = (val: number) => {
    onNumberFieldsUpdate(val, "height");
    weEventTrack("fScanHeight_changeHeight", { height: val });
  };

  const onLocalUserWeightUpdate = (val: number) => {
    onNumberFieldsUpdate(val, "weight");
    weEventTrack("fScanCurrentWeight_changeWeight", { weight: val });
  };

  const onLocalUserRepsUpdate = (val: number) => {
    onNumberFieldsUpdate(val, "repsCount");
    weEventTrack("fScanReps_changeReps", { reps: val });
  };

  const onSkipForNowClick = () => {
    gotoHome();
    weEventTrack("fScanBookConsultation_skipForNow", {});
  };

  const onBookConsultationclick = () => {
    gotoSection("consultationSlot");
    sendWEOnboardingEvent("getStarted");
  };

  const onBookConsultationNext = () => {
    sendWEOnboardingEvent("consultationSlot");
    gotoSection("slotBooked");
  };

  const onSlotBookedNext = () => {
    sendWEOnboardingEvent("slotBooked");
    gotoHome();
  };

  switch (section) {
    case "loading":
      return <LoadingSection />;
    case "welcome":
      return (
        <JoinBoatWrapper
          headText="Introduction"
          current={0}
          onNext={goToName}
          nextBtnText="Let's Start"
          noBack={true}
        >
          <Welcome />
        </JoinBoatWrapper>
      );
    case "name":
      return (
        <EnterName
          localUser={localUser}
          onNameUpdate={onNameUpdate}
          onNameNext={onNameNext}
          backOnDone={backOnDone}
        />
      );
    case "phone":
      return (
        <EnterPhone
          localUser={localUser}
          onPhoneUpdate={onPhoneUpdate}
          onUserPhoneUpdate={onUserPhoneUpdate}
          backOnDone={backOnDone}
        />
      );
    case "gender":
      return (
        <JoinBoatWrapper
          headText="Introduction"
          title="What is your gender?"
          current={3}
          onNext={onGenderNext}
          backOnDone={backOnDone}
        >
          <SelectGender localUser={localUser} onGenderUpdate={onGenderUpdate} />
        </JoinBoatWrapper>
      );
    case "fcs":
      return (
        <JoinBoatWrapper
          headText="Important info"
          title="Mark all that are relevant"
          current={4}
          onNext={onFCSNext}
        >
          <SetConcerns
            localUser={localUser}
            onConcernUpdate={onFCLocalUpdate}
          />
        </JoinBoatWrapper>
      );
    case "goal":
      return (
        <JoinBoatWrapper
          headText="Focus and goal"
          title="What is my goal?"
          current={3}
          onNext={onGoalNext}
          backOnDone={backOnDone}
        >
          <SetGoal localUser={localUser} onGoalUpdate={onGoalUpdate} />
        </JoinBoatWrapper>
      );
    case "height":
      return (
        <JoinBoatWrapper
          headText="Focus and goal"
          title="What is Current Height?"
          current={5}
          onNext={onHeightNext}
          backOnDone={backOnDone}
        >
          <SetHeight
            localUser={localUser}
            onNumberFieldsUpdate={onLocalUserHeightUpdate}
          />
        </JoinBoatWrapper>
      );
    case "weight":
      return (
        <JoinBoatWrapper
          headText="Focus and goal"
          title="What is Current Weight?"
          current={6}
          onNext={onWeightNext}
          backOnDone={backOnDone}
        >
          <SetWeightNew
            initialValue={localUser?.weight ? localUser.weight : 0}
            onNumberFieldsUpdate={onLocalUserWeightUpdate}
            target="weight"
          />
        </JoinBoatWrapper>
      );
    case "repsCount":
      return (
        <JoinBoatWrapper
          headText="Fitness scan"
          title="How many can you perform?"
          current={7}
          onNext={onRepCountNext}
          skip={<Skip onUserRepsCountUpdate={onUserRepsCountUpdate} />}
          backOnDone={backOnDone}
        >
          <SetRepsCount
            localUser={localUser}
            onNumberFieldsUpdate={onLocalUserRepsUpdate}
          />
        </JoinBoatWrapper>
      );
    case "currentBodyType":
      return (
        <CurrentBodyType
          localUser={localUser}
          onNext={onSetCurrentBodyTypeNext}
          backOnDone={backOnDone}
          title="What your current body-type?"
          onCurrentBodyTypeUpdate={onCurrentBodyTypeUpdate}
          current={8}
        />
      );
    case "scaningBodyType":
      return (
        <JoinBoatWrapper current={9}>
          <ScanningBodyType onScaningNext={onScaningNext} />
        </JoinBoatWrapper>
      );
    case "desiredBodyType":
      return (
        <DesiredBodyType
          localUser={localUser}
          onNext={onSetDesiredBodyTypeNext}
          backOnDone={backOnDone}
          title="Choose your desired body-type you want to achieve?"
          onDesiredBodyTypeUpdate={onDesiredBodyTypeUpdate}
          current={10}
        />
      );
    case "settingup":
      return (
        <JoinBoatWrapper current={11}>
          <SettintUp onGotoJoin={onFinalNext} />
        </JoinBoatWrapper>
      );
    case "resolutionDetail":
      return (
        <JoinBoatWrapper
          headText="Fitness scan"
          current={12}
          nextBtnText="Start your Journey"
          onNext={onResolutionNext}
        >
          <ResolutionDetail localUser={localUser} />
        </JoinBoatWrapper>
      );
    case "bookConsultation":
      return (
        <JoinComp
          // onSkip={onSkipForNowClick}
          onBookConsultation={onBookConsultationclick}
        />
      );
    case "consultationSlot":
      return (
        <ConsultationSlot
          onSkip={onSkipForNowClick}
          onBookConsultationNext={onBookConsultationNext}
        />
      );
    case "slotBooked":
      return (
        <SlotBookedV2
          // appointmentId={appointmentId}
          onProceed={onSlotBookedNext}
        />
      );
    default:
      return null;
  }
};

export default JoinBoatMainV2;
