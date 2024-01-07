import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import { UserInterface } from "@models/User/User";
import { useWorkoutV3Params } from "@hooks/tasks/useWorkoutV3Params";
import Loading from "@components/loading/Loading";
import { EventInterface } from "@models/Event/Event";
// import { useSubscription } from "@hooks/subscription/useSubscription";
// import SubscriptionWidget from "@templates/joinBoatTemplate/subscription/SubscriptionWidget";
import MainContainerV2 from "./MainContainerV2";
// import { getFreeTierDaysV2 } from "@hooks/subscription/utils";
import SubscriptionLeft from "@components/button/SubscriptionLeft";
// import { useState } from "react";
// import {
// getCurrentMonthForPurchase,
// getCurrentWeekStartV2,
// getCurrentMonthV3,
// } from "@hooks/community/challengeWeekUtils/utils";
// import { startFreeTrial } from "@hooks/joinBoat/utils";
import { useUserPlanStatus } from "@hooks/subscription/useUserPlanStatus";
import SubscriptionWidgetV2 from "@templates/joinBoatTemplate/subscription/SubscriptionWIdgetV2";
import { useSubscriptionModal } from "@hooks/subscription/useSubscriptionModal";
// import { getCurrentMonthV3 } from "@hooks/community/challengeWeekUtils/utils";

interface Props {
  leader: UserInterface;
  selectedEvent?: EventInterface | null;
  parentEvent?: EventInterface | null;
  // sprintId: string;
  // currentDay: number;
}

const WorkoutV4Template: React.FC<Props> = ({
  leader,
  selectedEvent,
  parentEvent,
  // sprintId,
  // currentDay,
}) => {
  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  // const { id } = getCurrentMonthForPurchase(
  //   parentEvent?.configuration?.sprints,
  //   parentEvent?.configuration?.starts,
  //   parentEvent?.configuration?.challengeLength,
  //   parentEvent?.configuration?.activeSprintId
  // );

  // const { subStatus, subObj, onHideSub, affirmation, onSuccessSub } =
  //   useSubscription(user?.uid, parentEvent?.id, "", id, parentEvent?.pricing);

  // const daysLeft = getFreeTierDaysV2(
  //   subObj?.startFreeTrial,
  //   parentEvent?.pricing,
  //   parentEvent?.configuration?.starts
  // );

  // const onFreeTrial = async () => {
  //   if (parentEvent?.id && user?.uid) {
  //     await startFreeTrial(parentEvent?.id, user?.uid);
  //     onSuccessSub();
  //   }
  // };

  // const onHideSubComplete = () => {
  // onHideSub();
  // toggleSubscreen(false);
  // };

  const {
    tab,
    onBack,
    taskId,
    postId,
    onNavChange,
    onNavReplace,
    sType,
    onWorkoutClick,
    parentId,
    coachKey,
    teamName,
    onGoToTeam,
    onSummaryClick,
    onTerraWorkout,
  } = useWorkoutV3Params(
    leader?.userKey,
    selectedEvent?.eventKey,
    parentEvent?.id,
    user
  );

  const res = useUserPlanStatus(
    user?.userRazorPlans,
    user?.uid,
    parentEvent?.id,
    parentEvent?.configuration?.rounds,
    parentEvent?.configuration?.sprints,
    parentEvent?.pricing,
    parentEvent?.configuration?.starts,
    parentEvent?.freeGame
  );

  const { subVisible, onShowModal, onCloseModal } = useSubscriptionModal(
    res.currentStatus,
    res.basePlanStatus,
    onGoToTeam
  );

  // useEffect(() => {
  //   if (
  //     !daysLeft &&
  //     (subStatus === "EXPIRED" || subStatus === "NEED_SUBSCRIPTION")
  //   ) {
  //     toggleSubscreen(true);
  //   } else {
  //     toggleSubscreen(false);
  //   }
  // }, [daysLeft, subStatus]);

  // console.log(res);

  return (
    <div className="max-w-md min-h-screen bg-gradient-to-b from-[#F3F6F8] mx-auto">
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
      {
        //(res.currentStatus === "EXPIRED" ||
        //res.currentStatus === "GAME_TO_START" ||
        // res.currentStatus === "PAID_ONE") &&
        parentEvent &&
        res.appPlan &&
        // daysLeft === 0 &&
        user ? (
          <div className="w-full h-full">
            <SubscriptionWidgetV2
              isOpen={subVisible}
              currentStatus={res.currentStatus}
              basePlanStatus={res.basePlanStatus}
              cost={res.appPlan?.cost}
              planId={res.appPlan?.id}
              freeAccessDays={res.appPlan?.freeTrialDuration}
              userAppSubscription={res.userSubscription}
              onClose={onCloseModal}
              onCloseAffirmation={onCloseModal}
              closeIcon={true}
              game={parentEvent}
              resetAffirmation={true}
              userEmail={user?.email}
              userPhone={user?.phone}
              userName={user.name}
              uid={user?.uid}
              basicPlan={res.basicPlan}
              // onNext={onHideSubComplete}
              // onSuccess={onSuccessSub}
              // onFreeTrial={onFreeTrial}
              // isUserOnTrial={subObj?.startFreeTrial ? true : false}
              // subStatus={subStatus}
              // trialExpired={daysLeft === 0}
            />
            {res.currentStatus !== "SUBSCRIBED" ? (
              <SubscriptionLeft
                text={
                  res.daysLeft
                    ? `${res.daysLeft} ${
                        res.daysLeft === 1 ? `Day` : `Days`
                      } Left`
                    : "Renew"
                }
                classStr="fixed bottom-4 right-2 z-10 w-16 iphoneX:w-20 h-16 iphoneX:h-20 text-[10px] iphoneX:text-xs"
                onClick={onShowModal}
              />
            ) : null}
          </div>
        ) : null
      }

      {authStatus === "SUCCESS" &&
      user &&
      parentId &&
      coachKey &&
      parentEvent &&
      selectedEvent?.eventKey ? (
        <MainContainerV2
          user={user}
          onGoToTeam={onGoToTeam}
          onTerraWorkout={onTerraWorkout}
          activeTab={tab}
          taskId={taskId}
          summaryType={sType}
          onBack={onBack}
          freeDaysLeft={res.daysLeft}
          onNavChange={onNavChange}
          onNavReplace={onNavReplace}
          onWorkoutClick={onWorkoutClick}
          gameId={parentId}
          coachUID={leader.uid}
          subStatus={res.currentStatus}
          leaderKey={coachKey}
          eventKey={selectedEvent?.eventKey}
          eventId={selectedEvent.id}
          onSummaryClick={onSummaryClick}
          game={parentEvent}
          postId={postId}
          teamName={teamName}
        />
      ) : authStatus === "FAILED" ? (
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth placeholder="Enter your phone" recaptcha={recaptcha} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </div>
  );
};

export default WorkoutV4Template;
