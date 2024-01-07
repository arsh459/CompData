import { weEventTrack } from "@analytics/webengage/user/userLog";
import Loading from "@components/loading/Loading";
import { useJoinBoatParamsV2 } from "@hooks/joinBoat/useJoinBoatParamsV2";
import { useLocalUser } from "@hooks/joinBoat/useLocalUser";
import { useUserPlanStatus } from "@hooks/subscription/useUserPlanStatus";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { achievementPace, UserInterface } from "@models/User/User";
import AlreadyInTeam from "./AlreadyInTeam/AlreadyInTeam";
import SubscriptionAffirmation from "./subscription/SubscriptionAffirmation";
import SubscriptionWidgetV2 from "./subscription/SubscriptionWIdgetV2";
import JoinBoatSelector from "./V4/JoinBoatSelector";
import JoinBoatWrapper from "./V4/JoinBoatWrapper";
import ProfileBrief from "./V4/ProfileBrief";
import VarifyFeild from "./V4/VarifyFeild";

interface Props {
  user: UserInterface;
  eventToJoin: EventInterface;
  game: EventInterface;
  coach: LeaderBoard;
}

const JoinBoatTemplateV4: React.FC<Props> = ({
  user,
  game,
  eventToJoin,
  coach,
}) => {
  const {
    localUser,
    uploadProfileImg,
    // removeProfileImg,
    onNameUpdate,
    onEmailUpdate,
    onInstaUpdate,
    onBioUpdate,
    onKeyChange,
    onGoalUpdate,
    onLocationUpdate,
    onPaceUpdate,
  } = useLocalUser(user);

  //   const { id } = getCurrentMonthForPurchase(
  //     game.configuration?.sprints,
  //     game.configuration?.starts,
  //     game.configuration?.challengeLength,
  //     game.configuration?.activeSprintId
  //   );

  const res = useUserPlanStatus(
    user.userRazorPlans,
    user.uid,
    game.id,
    game?.configuration?.rounds,
    game?.configuration?.sprints,
    game.pricing,
    game.configuration?.starts,
    game.freeGame
  );

  // console.log("res", res);

  // console.log("id", id);

  //   const { subStatus, affirmation, onSuccessSub, subObj } = useSubscription(
  //     user.uid,
  //     game.id,
  //     "",
  //     id,
  //     game?.pricing
  //   );

  // const freeDaysLeft = getFreeTierDaysV2(
  //   subObj?.freeTrialStarted,
  //   game.pricing,
  //   game.configuration?.starts
  // );

  const {
    section,
    // onNext,

    onBack,
    loading,
    // loadingMsg,
    onUserKeySave,
    onProfileUpdate,
    onFitnessGoalUpdate,
    onFitnessPaceUpdate,
    onPreferredLocationUpdate,
    onTeamNameUpdate,
    onSubscribeCallback,
    onNavOut,
    onJoin,
    // teamPresent,
  } = useJoinBoatParamsV2(
    game,
    user,
    coach.uid,
    eventToJoin,
    res.currentStatus,
    res.basePlanStatus,
    coach.userKey,
    eventToJoin.eventKey,
    localUser?.name,
    localUser?.userKey,
    localUser?.profileImage
  );

  // console.log("section", section);

  return (
    <>
      {section === "loading" || loading ? (
        <div className="w-full h-full bg-black flex flex-col justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
          {/* <p className="text-lg font-semibold text-gray-700 pt-4 text-center">
            {loadingMsg}
          </p> */}
        </div>
      ) : section === "userKey" ? (
        <JoinBoatWrapper
          headText="Set up your profile"
          title="Set up your SocialBoat Handle"
          onBack={onBack}
          current={1}
        >
          <VarifyFeild
            uid={user.uid}
            keyValue={localUser?.userKey}
            lable="Your Handle"
            placeholder="Rahul_899"
            onKeyChange={onKeyChange}
            onNext={(val: string) => {
              onUserKeySave(val);
              weEventTrack("joinBoat_nextClick", {
                eventId: eventToJoin.id,
                section: "userKey",
              });
            }}
            maxCharacterLength={20}
          />
        </JoinBoatWrapper>
      ) : section === "profileBrief" ? (
        <JoinBoatWrapper
          headText="Set up your profile"
          title="Let's Set Up Your Profile"
          onNext={() => {
            onProfileUpdate(
              localUser?.name,
              localUser?.instagramHandle,
              localUser?.email,
              localUser?.profileImage,
              localUser?.bio
            );
            weEventTrack("joinBoat_nextClick", {
              eventId: eventToJoin.id,
              section: "profileBrief",
            });
          }}
          onBack={onBack}
          current={2}
        >
          <ProfileBrief
            name={localUser?.name}
            uid={localUser?.uid ? localUser?.uid : ""}
            instagramHandle={localUser?.instagramHandle}
            email={localUser?.email}
            img={localUser?.profileImage}
            bio={localUser?.bio}
            onNameUpdate={onNameUpdate}
            onEmailUpdate={onEmailUpdate}
            onInstaUpdate={onInstaUpdate}
            uploadProfileImg={uploadProfileImg}
            onBioUpdate={onBioUpdate}
          />
        </JoinBoatWrapper>
      ) : section === "fitnessGoal" ? (
        <JoinBoatWrapper
          headText="Goal and Focus Point"
          title="What is your fitness goal?"
          onNext={() => {
            localUser?.fitnessGoal &&
              onFitnessGoalUpdate(localUser?.fitnessGoal);
            weEventTrack("joinBoat_nextClick", {
              eventId: eventToJoin.id,
              section: "fitnessGoal",
            });
          }}
          onBack={onBack}
          current={3}
        >
          <JoinBoatSelector
            target="fitnessGoal"
            fitnessGoal={localUser?.fitnessGoal}
            onGoalUpdate={onGoalUpdate}
          />
        </JoinBoatWrapper>
      ) : section === "goalPace" ? (
        <JoinBoatWrapper
          headText="Set Goal Date"
          title="At what Pace you want to reach Your goal?"
          onBack={onBack}
          current={4}
          onNext={() => {
            localUser?.paceOfAchievement &&
              onFitnessPaceUpdate(localUser.paceOfAchievement);
            weEventTrack("joinBoat_nextClick", {
              eventId: eventToJoin.id,
              section: "goalPace",
            });
          }}
        >
          <JoinBoatSelector
            target="goalPace"
            goalPace={localUser?.paceOfAchievement}
            onPaceUpdate={(newVal: achievementPace) => {
              onPaceUpdate(newVal);
              onFitnessPaceUpdate(newVal);
            }}
          />
        </JoinBoatWrapper>
      ) : section === "goalLocation" ? (
        <JoinBoatWrapper
          headText="Workout Style"
          title="How do you like to workout?"
          onNext={() => {
            localUser?.preferredWorkoutLocation &&
              onPreferredLocationUpdate(localUser?.preferredWorkoutLocation);
            weEventTrack("joinBoat_nextClick", {
              eventId: eventToJoin.id,
              section: "goalLocation",
            });
          }}
          onBack={onBack}
          current={5}
        >
          <JoinBoatSelector
            target="goalLocation"
            goalLocation={localUser?.preferredWorkoutLocation}
            onLocationUpdate={onLocationUpdate}
          />
        </JoinBoatWrapper>
      ) : section === "teamName" ? (
        <JoinBoatWrapper
          headText="Set up your profile"
          title="Set up your Team Name"
          onBack={onBack}
          current={6}
        >
          <VarifyFeild
            lable="Your team name"
            placeholder="Fit_with_Abhi"
            onNext={(val: string) => {
              onTeamNameUpdate(val);
              weEventTrack("joinBoat_nextClick", {
                eventId: eventToJoin.id,
                section: "teamName",
              });
            }}
            maxCharacterLength={20}
          />
        </JoinBoatWrapper>
      ) : section === "has_team" ? (
        <div className="w-full h-full">
          <AlreadyInTeam gameId={game.id} user={user} />
        </div>
      ) : section === "join" ? (
        <div className="fixed inset-0 z-10">
          <SubscriptionAffirmation onNext={onJoin} />
        </div>
      ) : section === "subscription" && res.appPlan ? (
        <div className="flex justify-center items-center">
          <SubscriptionWidgetV2
            isOpen={true}
            basePlanStatus={res.basePlanStatus}
            onSubscribeCallback={onSubscribeCallback}
            userAppSubscription={res.userSubscription}
            currentStatus={res.currentStatus}
            cost={res.appPlan?.cost}
            planId={res.appPlan?.id}
            freeAccessDays={res.appPlan?.freeTrialDuration}
            onClose={onBack}
            onCloseAffirmation={onNavOut}
            game={game}
            basicPlan={res.basicPlan}
            closeIcon={true}
            userEmail={user?.email}
            userPhone={user?.phone}
            uid={user?.uid}
            resetAffirmation={false}
            //   onSubscribe={onNext}
            //   onFreeTrial={() =>
            // onNext(undefined, undefined, undefined, undefined, true)
            //   }
            //   affirmation={affirmation}
            //   onNext={onNavOut}
            //   isUserOnTrial={subObj?.startFreeTrial ? true : false}
          />
        </div>
      ) : null}
    </>
  );
};

export default JoinBoatTemplateV4;
