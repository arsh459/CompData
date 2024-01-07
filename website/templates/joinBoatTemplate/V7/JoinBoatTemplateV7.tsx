import Loading from "@components/loading/Loading";
import { useAuth } from "@hooks/auth/useAuth";
import { useLocalUserV2 } from "@hooks/joinBoat/V7/useLocalUserV2";
import { useStartSectionV2 } from "@hooks/joinBoat/V7/useSectionV2";
import {
  accurateGoal,
  dailyHealthIssues,
  howBusy,
  howBusyTypes,
  pastUsedMethodTypes,
} from "@models/User/User";
import SetHeight from "../V5/Components/SetHeight";
import SetWeight from "../V5/Components/SetWeight";
import EnterEmail from "../V6/EnterEmail";
import EnterName from "../V6/EnterName";
import JoinBoatWrapper from "../V6/JoinBoatWrapper";
import SetAge from "../V6/SetAge";
import ListElementCard from "./ListElementCard";
import OkWithPaidPlans from "./OkWithPaidPlans";
import {
  accurateGoalData,
  bookSlotData,
  DailyIssuesList,
  howBusyData,
  pastUsedMethodData,
} from "./utils";
import CalendlySlot from "./CalendlySlot";
import DownloadAppV2 from "../V6/DownloadAppV2";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import BookSlot from "./BookSlot";

const totalSection = 11;

const JoinBoatTemplateV7 = () => {
  const { user } = useAuth();

  const {
    localUser,
    onNameUpdate,
    onNumberFieldsUpdate,
    onEmailUpdate,
    setLocalUser,
  } = useLocalUserV2(user);

  const {
    section,
    onNameSave,
    onAgeSave,
    onHeightSave,
    onWeightSave,
    onEmailSave,
    onAccurateGoalSave,
    onBookConsultationSave,
    onHealthIssueSave,
    onHowBusySave,
    onPaidStatusSave,
    onPastUsedMethodSave,
    gotoSection,
  } = useStartSectionV2(localUser, user);
  // console.log(localUser?.howBusy, "localUser?.howBusy", user?.howBusy);

  const handleAccurateGoalSelect = (type: keyof accurateGoal) => {
    setLocalUser((prev) => {
      if (prev) {
        const updatedGoals: accurateGoal = {};

        // Set the selected type to true
        updatedGoals[type] = true;

        // Clear other goal types
        for (const goalType in prev.accurateGoal) {
          if (goalType !== type) {
            updatedGoals[goalType as keyof accurateGoal] = false;
          }
        }

        return { ...prev, accurateGoal: updatedGoals };
      } else {
        return prev;
      }
    });
  };

  const handleDailyHealthIssues = (type: keyof dailyHealthIssues) => {
    setLocalUser((prev) => {
      if (prev) {
        const prevSelected = prev.dailyHealthIssues;
        const val = prevSelected
          ? { ...prevSelected, [type]: !prevSelected[type] }
          : { [type]: true };

        return { ...prev, dailyHealthIssues: val };
      } else {
        return prev;
      }
    });
  };

  const handlepastUsedMethodSelect2 = (type: pastUsedMethodTypes) => {
    setLocalUser((prev) => {
      if (prev) {
        const prevSelected = prev.pastUsedMethod;
        const val = prevSelected
          ? { ...prevSelected, [type]: !prevSelected[type] }
          : { [type]: true };

        return { ...prev, pastUsedMethod: val };
      } else {
        return prev;
      }
    });
  };

  const handlehowBusySelect = (type: howBusyTypes) => {
    setLocalUser((prev) => {
      if (prev) {
        const updatedHowBusy: howBusy = {};

        updatedHowBusy[type] = true;

        for (const howBusyType in prev.howBusy) {
          if (howBusyType !== type) {
            updatedHowBusy[howBusyType as howBusyTypes] = false;
          }
        }

        return { ...prev, howBusy: updatedHowBusy };
      } else {
        return prev;
      }
    });
  };

  switch (section) {
    case "loading":
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading fill="#FF735C" width={50} height={50} />
        </div>
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
        <EnterEmail
          localUser={localUser}
          onEmailUpdate={onEmailUpdate}
          onEmailSave={onEmailSave}
          progress={2 / totalSection}
        />
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

    case "weight":
      return (
        <JoinBoatWrapper
          title="What is your Current Weight?"
          onNext={() => onWeightSave(localUser?.weight)}
          disabled={!localUser?.weight}
          progress={4 / totalSection}
        >
          <SetWeight
            initialValue={localUser?.weight ? localUser.weight : 0}
            // localUser={localUser}
            onNumberFieldsUpdate={(val: number) =>
              onNumberFieldsUpdate(val, "weight")
            }
            target="weight"
          />
        </JoinBoatWrapper>
      );

    case "height":
      return (
        <JoinBoatWrapper
          title="What is your Current Height?"
          onNext={() => onHeightSave(localUser?.height)}
          disabled={!localUser?.height}
          progress={5 / totalSection}
        >
          <SetHeight
            localUser={localUser}
            onNumberFieldsUpdate={(val: number) =>
              onNumberFieldsUpdate(val, "height")
            }
          />
        </JoinBoatWrapper>
      );
    case "accurateGoal":
      return (
        <JoinBoatWrapper
          title="What does accurately represent your goal?"
          onNext={() => onAccurateGoalSave(localUser?.accurateGoal)}
          // disabled={!localUser?.accurateFitnessGoal}
          progress={6 / totalSection}
          styleTw="text-center"
        >
          {accurateGoalData.map((item, idx) => {
            const isTypeExist = localUser?.accurateGoal?.[item.type]
              ? true
              : false;

            return (
              <ListElementCard
                onClick={() => handleAccurateGoalSelect(item.type)}
                key={item.type}
                icon={item.icon}
                text={item.text}
                styleContainerTw="mb-4"
                isSelected={isTypeExist}
              />
            );
          })}
        </JoinBoatWrapper>
      );
    case "healthIssue":
      return (
        <JoinBoatWrapper
          title="Do you have any Health Conditions?"
          note="You can Choose multiple options if you want"
          onNext={() => onHealthIssueSave(localUser?.dailyHealthIssues)}
          // disabled={!localUser?.healthIssue}
          progress={7 / totalSection}
          styleTw="text-center"
        >
          <>
            <div className="grid grid-cols-2 flex-1">
              {DailyIssuesList.map((item, idx) => {
                const isTypeExist = localUser?.dailyHealthIssues?.[item.type]
                  ? true
                  : false;

                return (
                  <ListElementCard
                    onClick={() => handleDailyHealthIssues(item.type)}
                    key={item.type}
                    // icon={item.icon}
                    text={item.text}
                    styleContainerTw="mb-4 px-7"
                    isSelected={isTypeExist}
                    textStyle="text-center"
                  />
                );
              })}
            </div>
          </>
        </JoinBoatWrapper>
      );
    case "pastUsedMethod":
      return (
        <JoinBoatWrapper
          title="Which of the following ways have you tried to manage your fitness and health ?"
          onNext={() => onPastUsedMethodSave(localUser?.pastUsedMethod)}
          // disabled={!localUser?.pastUsedMethod}
          progress={8 / totalSection}
          styleTw="text-center"
        >
          {pastUsedMethodData.map((item, idx) => {
            const isTypeExist = localUser?.pastUsedMethod?.[item.type]
              ? true
              : false;

            return (
              <ListElementCard
                onClick={() => handlepastUsedMethodSelect2(item.type)}
                key={item.type}
                icon={item.icon}
                text={item.text}
                styleContainerTw="mb-4 px-7"
                isSelected={isTypeExist}
                textStyle="text-center"
              />
            );
          })}
        </JoinBoatWrapper>
      );
    case "howbusy":
      return (
        <JoinBoatWrapper
          title="How busy are you?"
          onNext={() => onHowBusySave(localUser?.howBusy)}
          // disabled={!localUser?.howBusy}
          progress={9 / totalSection}
        >
          {howBusyData.map((item, idx) => {
            const isTypeExist = localUser?.howBusy?.[item.type] ? true : false;

            return (
              <ListElementCard
                onClick={() => handlehowBusySelect(item.type)}
                key={item.type}
                icon={item.icon}
                text={item.text}
                styleContainerTw="mb-4 px-7"
                isSelected={isTypeExist}
                textStyle="text-center"
              />
            );
          })}
        </JoinBoatWrapper>
      );
    case "paidplan":
      return (
        <JoinBoatWrapper
          title="Are you ok with paid plans?"
          onNext={() =>
            onPaidStatusSave(localUser?.isOkWithPaidPlan ? true : false)
          }
          // disabled={!localUser?.howBusy}
          progress={10 / totalSection}
        >
          <OkWithPaidPlans
            setLocalUser={setLocalUser}
            status={localUser?.isOkWithPaidPlan ? true : false}
          />
        </JoinBoatWrapper>
      );
    case "bookslot":
      return (
        <JoinBoatWrapper
          onNext={() => onBookConsultationSave()}
          nextBtnText="Book Consultation Slot"
          // disabled={!localUser?.howBusy}
          // progress={11 / totalSection}
          // note="Annual plan Starting @ Rs. 750/month "
          waveBtn={true}
        >
          <div className="p-4 h-full flex-1  flex flex-col relative z-0 ">
            <div className="w-4/5 mx-auto pb-8">
              <p className="font-nunitoR text-3xl text-white">
                How we can help
              </p>
              <p className="font-popR text-sm text-white/70 pt-2">
                We provide personalised programs for PCOS management
              </p>
            </div>
            <div className="grid grid-cols-2  gap-4 w-4/5 mx-auto ">
              {bookSlotData.map((item) => {
                return (
                  <BookSlot img={item.icon} text={item.text} key={item.text} />
                );
              })}
            </div>
            <p className="text-center text-sm font-nunitoB text-white/70 pt-10">
              Annual plan Starting @{" "}
              <span className="text-[#AFFF49]">Rs. 750/month</span>
            </p>
            <div className=" absolute h-screen inset-x-0  -z-10  bg-gradient-to-b from-transparent via-[#852F75] to-[#FC52FF] opacity-60"></div>
          </div>
        </JoinBoatWrapper>
      );
    case "consultationtime":
      return (
        <JoinBoatWrapper
          nextBtnText="Browse Workouts & Recipees"
          onNext={() => {
            gotoSection("download");
            weEventTrack("fScanSlotTimeLeadgen_clickNext", {});
          }}

          // disabled={!localUser?.howBusy}
          // progress={11 / totalSection}
        >
          <CalendlySlot uid={user?.uid ? user.uid : ""} />
        </JoinBoatWrapper>
      );
    case "download":
      return (
        <JoinBoatWrapper>
          <DownloadAppV2 noContinue={true} user={user} />
        </JoinBoatWrapper>
      );

    default:
      return null;
  }
};

export default JoinBoatTemplateV7;
