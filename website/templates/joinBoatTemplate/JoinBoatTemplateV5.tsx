import { weEventTrack } from "@analytics/webengage/user/userLog";
import Loading from "@components/loading/Loading";
import { useLocalUserV2 } from "@hooks/joinBoat/useLocalUserV2";
import useSection from "@hooks/joinBoat/V5/useSection";
import { UserInterface } from "@models/User/User";
import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";
import SelectPlan from "@templates/PaymentTemplate/SelectPlan";
import { useRouter } from "next/router";
import Script from "next/script";
import CurrentBodyType from "./V5/Components/BodyType/CurrentBodyType";
import DesiredBodyType from "./V5/Components/BodyType/DesiredBodyType";
import ConsultationSlot from "./V5/Components/ConsultationSlot";
import EnterName from "./V5/Components/EnterName";
import EnterPhone from "./V5/Components/EnterPhone";
import JoinComp from "./V5/Components/JoinComp";
import ResolutionDetail from "./V5/Components/ResolutionDetail";
import ScanningBodyType from "./V5/Components/ScanningBodyType";
import SelectGender from "./V5/Components/SelectGender";
import SetConcerns from "./V5/Components/SetConcerns";
import SetGoal from "./V5/Components/SetGoal";
import SetHeight from "./V5/Components/SetHeight";
import SetRepsCount, { Skip } from "./V5/Components/SetRepsCount";
import SettintUp from "./V5/Components/SettintUp";
import SetWeight from "./V5/Components/SetWeight";
import SlotBooked from "./V5/Components/SlotBooked";
import TeamCreationFlow from "./V5/Components/TeamCreationFlow";
import Assessment from "./V5/Components/TeamCreationFlow/Assessment";
import Details from "./V5/Components/TeamCreationFlow/Details";
import TeamName from "./V5/Components/TeamCreationFlow/TeamName";
import Welcome from "./V5/Components/Welcome";
import JoinBoatWrapperV2 from "./V5/JoinBoatWrapper";

interface Props {
  user: UserInterface;
  deviceType: deviceTypes;
}

const JoinBoatTemplateV5: React.FC<Props> = ({ user, deviceType }) => {
  const {
    localUser,
    onNameUpdate,
    onPhoneUpdate,
    onGenderUpdate,
    onNumberFieldsUpdate,
    onOrganisationUpdate,
    onFCLocalUpdate,
    onGoalUpdate,
    onCurrentBodyTypeUpdate,
    onDesiredBodyTypeUpdate,
  } = useLocalUserV2(user);

  const {
    section,
    selectPlans,
    gotoSection,
    onNameSave,
    onUserPhoneUpdate,
    onUseGenderUpdate,
    onUserHeightUpdate,
    onUserWeightUpdate,
    onUserRepsCountUpdate,
    onUserCurrentBodyTypeUpdate,
    onUserDesiredBodyTypeUpdate,
    onDetailsUpdate,
    onFitnessGoalUpdate,
    onUserTeamnameUpdate,
    teamName,
    setTeamName,
    planData,
    onFCSUpdate,
    q,
    onTeamAdd,
  } = useSection(localUser, deviceType, user);

  const router = useRouter();

  const goToName = () => {
    gotoSection("name");
    weEventTrack("fScanIntro_clickNext", {});
  };

  const onNameNext = () => {
    onNameSave(localUser?.name?.trim());

    weEventTrack("fScanName_clickNext", {});
  };

  const onGenderNext = () => {
    onUseGenderUpdate(localUser?.gender);
    weEventTrack("fScanGender_clickNext", {});
  };

  const onFCSNext = () => {
    onFCSUpdate(localUser?.fitnessConcerns);
    weEventTrack("fScanFitnessConcern_clickNext", {});
  };

  const onGoalNext = () => {
    onFitnessGoalUpdate(localUser?.fitnessGoal);
    weEventTrack("fScanGoal_clickNext", {});
  };

  const onHeightNext = () => {
    onUserHeightUpdate(localUser?.height);
    weEventTrack("fScanHeight_clickNext", {});
  };

  const onWeightNext = () => {
    onUserWeightUpdate(localUser?.weight);
    weEventTrack("fScanCurrentWeight_clickNext", {});
  };

  const onRepCountNext = () => {
    onUserRepsCountUpdate(localUser?.repsCount);
    weEventTrack("fScanReps_clickNext", {});
  };

  const onSetCurrentBodyTypeNext = () => {
    onUserCurrentBodyTypeUpdate(
      localUser?.currentBodyType,
      localUser?.currentBodyType === user.currentBodyType
        ? localUser?.desiredBodyType
        : undefined
    );
    weEventTrack("fScanCurrentBodyType_clickNext", {});
  };

  const onSetDesiredBodyTypeNext = () => {
    onUserDesiredBodyTypeUpdate(
      localUser?.desiredBodyType,
      localUser?.difficulty,
      localUser?.paceOfAchievementInMonth
    );
    weEventTrack("fScanDesiredBodyType_clickNext", {});
  };

  const onScaningNext = () => {
    gotoSection("desiredBodyType", true);
    weEventTrack("fScanBodyType_clickNext", {});
  };

  const onFinalNext = () => {
    gotoSection("resolutionDetail", true);
    weEventTrack("fScanFinal_clickNext", {});
  };

  const onChangeHeightLocalUser = (val: number) => {
    onNumberFieldsUpdate(val, "height");
    weEventTrack("fScanHeight_changeHeight", { height: val });
  };

  const onChangeWeightLocalUser = (val: number) => {
    onNumberFieldsUpdate(val, "weight");

    weEventTrack("fScanCurrentWeight_changeWeight", { weight: val });
  };

  const onChangeRepsLocalUser = (val: number) => {
    onNumberFieldsUpdate(val, "repsCount");

    weEventTrack("fScanReps_changeReps", { reps: val });
  };

  const onResolutionNext = async () => {
    if (q.noSlot && q.teamId && q.noPayment) {
      await onTeamAdd();

      weEventTrack("fScanResolutionDetail_clickNext", {});

      router.push({
        pathname: "/org/success",
        query: { platform: deviceType },
      });
    } else if (q.noSlot && q.teamId) {
      await onTeamAdd();

      selectPlans();
      weEventTrack("fScanResolutionDetail_clickNext", {});
    } else if (q.teamId) {
      await onTeamAdd();
      gotoSection("consultationSlot", true);
      weEventTrack("fScanResolutionDetail_clickNext", {});
    } else {
      gotoSection("consultationSlot", true);
      weEventTrack("fScanResolutionDetail_clickNext", {});
    }
  };

  const onBookConsultationclick = () => {
    gotoSection("consultationSlot");
    weEventTrack("fScanGetStarted_clickNext", {});
  };

  const onBookConsultationNext = () => {
    weEventTrack("fScanConsultationSlot_clickNext", {});
    gotoSection("slotBooked");
  };

  const onSkipForNowClick = () => {
    // console.log("Hi");
    // selectPlans();
    weEventTrack("fScanBookConsultation_skipForNow", {});

    router.push({
      pathname: "/org/success",
      query: { platform: deviceType },
    });
  };

  const onSlotBookedNext = () => {
    weEventTrack("conv_bookSlot", {});
    weEventTrack("fScanSlotBooked_clickNext", {});
    // selectPlans();
    router.push({
      pathname: "/org/success",
      query: { platform: deviceType },
    });
  };

  switch (section) {
    case "loading":
      return (
        <div className="w-full h-full bg-[#100F1A] flex flex-col justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      );
    case "welcome":
      return (
        <JoinBoatWrapperV2
          headText="Introduction"
          current={0}
          onNext={goToName}
          nextBtnText="Let's Start"
        >
          <Welcome />
        </JoinBoatWrapperV2>
      );
    case "name":
      return (
        <EnterName
          localUser={localUser}
          onNameUpdate={onNameUpdate}
          onNameSave={onNameNext}
        />
      );
    case "phone":
      return (
        <EnterPhone
          localUser={localUser}
          onPhoneUpdate={onPhoneUpdate}
          onUserPhoneUpdate={onUserPhoneUpdate}
        />
      );
    case "gender":
      return (
        <JoinBoatWrapperV2
          headText="Introduction"
          title="What is your gender?"
          current={3}
          onNext={onGenderNext}
        >
          <SelectGender localUser={localUser} onGenderUpdate={onGenderUpdate} />
        </JoinBoatWrapperV2>
      );
    case "fcs":
      return (
        <JoinBoatWrapperV2
          headText="Important info"
          title="Mark all that are relevant"
          current={4}
          onNext={onFCSNext}
        >
          <SetConcerns
            localUser={localUser}
            onConcernUpdate={onFCLocalUpdate}
          />
        </JoinBoatWrapperV2>
      );
    case "goal":
      return (
        <JoinBoatWrapperV2
          headText="Focus and goal"
          title="What is my goal?"
          current={3}
          onNext={onGoalNext}
        >
          <SetGoal localUser={localUser} onGoalUpdate={onGoalUpdate} />
        </JoinBoatWrapperV2>
      );
    case "height":
      return (
        <JoinBoatWrapperV2
          headText="Focus and goal"
          title="What is Current Height?"
          current={5}
          onNext={onHeightNext}
          noSpace={true}
        >
          <SetHeight
            localUser={localUser}
            onNumberFieldsUpdate={onChangeHeightLocalUser}
          />
        </JoinBoatWrapperV2>
      );
    case "weight":
      return (
        <JoinBoatWrapperV2
          headText="Focus and goal"
          title="What is Current Weight?"
          current={6}
          onNext={onWeightNext}
          noSpace={true}
        >
          <SetWeight
            // localUser={localUser}
            initialValue={localUser?.weight ? localUser.weight : 0}
            onNumberFieldsUpdate={onChangeWeightLocalUser}
            target="weight"
          />
        </JoinBoatWrapperV2>
      );
    case "repsCount":
      return (
        <JoinBoatWrapperV2
          headText="Fitness scan"
          title="How many can you perform?"
          current={7}
          onNext={onRepCountNext}
          skip={<Skip onUserRepsCountUpdate={onUserRepsCountUpdate} />}
        >
          <SetRepsCount
            localUser={localUser}
            onNumberFieldsUpdate={onChangeRepsLocalUser}
          />
        </JoinBoatWrapperV2>
      );
    case "currentBodyType":
      return (
        <CurrentBodyType
          localUser={localUser}
          onNext={onSetCurrentBodyTypeNext}
          title="What your current body-type?"
          onCurrentBodyTypeUpdate={onCurrentBodyTypeUpdate}
          current={8}
        />
      );
    case "scaningBodyType":
      return (
        <JoinBoatWrapperV2 current={9}>
          <ScanningBodyType onScaningNext={onScaningNext} challenge={false} />
        </JoinBoatWrapperV2>
      );
    case "desiredBodyType":
      return (
        <DesiredBodyType
          localUser={localUser}
          onNext={onSetDesiredBodyTypeNext}
          title="Choose your desired body-type you want to achieve?"
          onDesiredBodyTypeUpdate={onDesiredBodyTypeUpdate}
          current={10}
        />
      );
    case "settingup":
      return (
        <JoinBoatWrapperV2 headText="Fitness scan" current={11}>
          <SettintUp onGotoJoin={onFinalNext} />
        </JoinBoatWrapperV2>
      );
    case "resolutionDetail":
      return (
        <JoinBoatWrapperV2
          headText="Fitness scan"
          current={12}
          nextBtnText="Start your Journey"
          onNext={onResolutionNext}
        >
          <ResolutionDetail localUser={localUser} />
        </JoinBoatWrapperV2>
      );
    case "bookConsultation":
      return (
        <JoinComp
          onGetStarted={onBookConsultationclick}
          ctaText="Book FREE consultation"
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
      return <SlotBooked onProceed={onSlotBookedNext} />;
    case "plans":
      return (
        <>
          <SelectPlan user={user} deviceType={deviceType} planData={planData} />
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            type="text/javascript"
            strategy="afterInteractive"
          />
        </>
      );
    case "details":
      return (
        <TeamCreationFlow>
          <Details
            localUser={localUser}
            onNameUpdate={onNameUpdate}
            onOrganisationUpdate={onOrganisationUpdate}
            onPhoneUpdate={onPhoneUpdate}
            onDetailsUpdate={onDetailsUpdate}
          />
        </TeamCreationFlow>
      );
    case "teamname":
      return (
        <TeamCreationFlow>
          <TeamName
            teamName={teamName}
            setTeamName={setTeamName}
            onUserTeamnameUpdate={onUserTeamnameUpdate}
          />
        </TeamCreationFlow>
      );
    case "assessment":
      return (
        <TeamCreationFlow>
          <Assessment gotoSection={gotoSection} />
        </TeamCreationFlow>
      );
    default:
      return null;
  }
};

export default JoinBoatTemplateV5;
