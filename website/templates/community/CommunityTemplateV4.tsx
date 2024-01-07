import { useCommunityParamsV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import HeaderV4 from "./Header/HeaderV4";
import UnlockedProgramV3 from "./Program/Containers/UnlockedProgramV3";
import EventBriefV2 from "./Program/EventBrief/EventBriefV2";
import TopNavV2 from "./Program/TopNav/TopNavV2";
import clsx from "clsx";
// import LockedProgramV2 from "./Program/Containers/LockedProgramV2";
import { useJoinStatus } from "@hooks/community/useJoinStatus";
import Loading from "@components/loading/Loading";
import { useCommunityScroll } from "@hooks/community/v2/useCommunityScroll";
import LockedProgramV3 from "./Program/Containers/LockedProgramV3";
import SubscriptionLeft from "../../components/button/SubscriptionLeft";
// import { useEffect, useState } from "react";
// import {
// getCurrentMonthForPurchase,
// getCurrentMonthForPurchase,
// getCurrentMonthV3,
// } from "@hooks/community/challengeWeekUtils/utils";
// import { getFreeTierDaysV2 } from "@hooks/subscription/utils";
// import { startFreeTrial } from "@hooks/joinBoat/utils";
import { useUserPlanStatus } from "@hooks/subscription/useUserPlanStatus";
import SubscriptionWidgetV2 from "@templates/joinBoatTemplate/subscription/SubscriptionWIdgetV2";
import { useSubscriptionModal } from "@hooks/subscription/useSubscriptionModal";
// import { useUserRank } from "@hooks/activities/userUserRank";
// import { useCalendarView } from "@hooks/activities/useCalendarView";
// import { useScrollDirection } from "@hooks/community/v2/useScrollDirection";

interface Props {
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  selectedEvent: EventInterface;
  parentEvent: EventInterface | null;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  setAuthIsVisible: () => void;
  // sprintId: string;
  // currentDay: number;
}

const CommunityTemplateV4: React.FC<Props> = ({
  leader,
  signedInUser,
  selectedEvent,
  parentEvent,
  setAuthIsVisible,
  authStatus,
  // sprintId,
  // currentDay,
}) => {
  const {
    urlState,
    leaderboardInitialParams,
    onQueryChange,
    onGoBack,
    onGoToTeams,
  } = useCommunityParamsV3(
    parentEvent?.configuration?.starts,
    parentEvent?.configuration?.challengeLength,
    parentEvent?.configuration?.sprints,
    parentEvent?.configuration?.rounds,
    parentEvent?.configuration?.gameType
  );

  // console.log("cu", currentDay);

  // const { id } = getCurrentMonthForPurchase(
  //   parentEvent?.configuration?.sprints,
  //   parentEvent?.configuration?.starts,
  //   parentEvent?.configuration?.challengeLength,
  //   parentEvent?.configuration?.activeSprintId
  // );

  // const { onHideSub, affirmation, onSuccessSub, subStatus, subObj } =
  //   useSubscription(
  //     signedInUser?.uid,
  //     parentEvent?.id,
  //     urlState.leaderboardWeek,
  //     urlState.leaderboardMonth,
  //     parentEvent?.pricing
  //   );

  const res = useUserPlanStatus(
    signedInUser?.userRazorPlans,
    signedInUser?.uid,
    parentEvent?.id,
    parentEvent?.configuration?.rounds,
    parentEvent?.configuration?.sprints,
    parentEvent?.pricing,
    parentEvent?.configuration?.starts,
    parentEvent?.freeGame
  );
  // console.log("r", res);

  // const { sprint } = getCurrentMonthForPurchase(
  //   parentEvent?.configuration?.sprints,
  //   parentEvent?.configuration?.starts,
  //   parentEvent?.configuration?.challengeLength
  // );

  // const daysLeft = getFreeTierDaysV2(
  //   subObj?.startFreeTrial,
  //   parentEvent?.pricing,
  //   parentEvent?.configuration?.starts
  // );

  // console.log("id", id, daysLeft, subObj);

  // const daysLeft = 0;
  // console.log("sprintId New", id, currentSprintDay, daysLeft);

  const { memberStatus } = useJoinStatus(
    selectedEvent,
    signedInUser,
    undefined,
    authStatus
  );

  const { targetRef, headingText, bgClassStr, tone } = useCommunityScroll(
    urlState.post,
    urlState.postId,
    parentEvent?.name
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

  const { subVisible, onShowModal, onCloseModal } = useSubscriptionModal(
    res.currentStatus,
    res.basePlanStatus,
    onGoToTeams
  );

  // console.log("r", res, memberStatus);
  // return (
  //   <div>
  //     <div className="bg-red-500 h-screen w-full p-4" />
  //     <div className="bg-yellow-500 h-screen w-full p-4" />
  //     <div className="bg-blue-500 h-screen w-full p-4" />
  //     <div className="bg-green-500 h-screen w-full p-4" />
  //   </div>
  // );

  return (
    <div className="max-w-md min-h-screen mx-auto bg-gradient-to-b from-[#F3F6F8] to-white flex flex-col">
      <HeaderV4
        onSignIn={setAuthIsVisible}
        onGoBack={onGoBack}
        eventId={selectedEvent.id}
        headerItems={["My Profile", "Leave Team"]}
        signedInUser={signedInUser}
        authStatus={authStatus}
        headingText={urlState.postId ? undefined : headingText}
        bgClassStr={bgClassStr}
        tone={tone}
      />
      <div className="flex-1 flex flex-col">
        {memberStatus === "PENDING" ? (
          <div className="flex justify-center items-start pt-8 flex-1 bg-gray-100">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : memberStatus === "FAILED" || !parentEvent ? (
          <LockedProgramV3
            selectedEvent={selectedEvent}
            queryChange={onQueryChange}
            parentEvent={parentEvent}
            urlState={urlState}
            leader={leader}
            paddingTop={true}
          />
        ) : memberStatus === "SUCCESS" && signedInUser && parentEvent ? (
          <>
            <div
              className={clsx(
                urlState.post === "spotlight" && !urlState.postId
                  ? `-mt-16 iphoneX:-mt-20 h-60 iphoneX:h-72 bg-cover bg-center bg-[url(https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Frame_6_jh-U3KeZP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651579155354)]`
                  : urlState.post === "announcement" && !urlState.postId
                  ? `-mt-16 iphoneX:-mt-20 h-60 iphoneX:h-72 bg-cover bg-center bg-[url(https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Frame_7_PdeyC-_sp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651579155118)]`
                  : ""
              )}
            />
            {urlState.nav === "leaderboard" || urlState.post ? null : (
              <EventBriefV2
                leader={leader}
                selectedEvent={selectedEvent}
                challangeName={parentEvent?.name}
                daysLeft={res.daysLeft >= 0 ? res.daysLeft : undefined}
                gameId={
                  parentEvent?.id
                    ? parentEvent.id
                    : selectedEvent.parentId
                    ? selectedEvent.parentId
                    : ""
                }
                memberStatus={memberStatus}
                currentMonth={
                  urlState.leaderboardMonth
                    ? urlState.leaderboardMonth
                    : "month-0"
                }
              />
            )}
            {urlState.post ? null : (
              <div className="sticky top-[62px] iphoneX:top-[78px] z-40">
                <TopNavV2
                  selectedNav={urlState.nav ? urlState.nav : "program"}
                  leaderboardInitialParams={leaderboardInitialParams}
                  onQueryChange={onQueryChange}
                />
              </div>
            )}
            <UnlockedProgramV3
              targetRef={targetRef}
              urlState={urlState}
              onGoBack={onGoBack}
              parentEvent={parentEvent}
              signedInUser={signedInUser}
              baseShareURL={`https://www.socialboat.live/${encodeURI(
                leader.userKey ? leader.userKey : ""
              )}/${encodeURI(
                selectedEvent.eventKey ? selectedEvent.eventKey : ""
              )}`}
              eventName={selectedEvent.name}
              communityId={leader.uid}
              onQueryChange={onQueryChange}
              selectedEvent={selectedEvent}
              leader={leader}
              // dep
              // isMember={true}
              // savedList={savedList}
              // myUserRank={myUserRank}
            />
          </>
        ) : null}

        {parentEvent &&
        res.appPlan &&
        // (res.currentStatus === "EXPIRED" ||
        // res.currentStatus === "GAME_TO_START" ||
        // res.currentStatus === "PAID_ONE") &&
        signedInUser ? (
          <div className="w-full h-full">
            <SubscriptionWidgetV2
              isOpen={subVisible}
              resetAffirmation={true}
              currentStatus={res.currentStatus}
              basePlanStatus={res.basePlanStatus}
              cost={res.appPlan?.cost}
              planId={res.appPlan?.id}
              userAppSubscription={res.userSubscription}
              freeAccessDays={res.appPlan?.freeTrialDuration}
              onClose={onCloseModal}
              onCloseAffirmation={onCloseModal}
              closeIcon={true}
              basicPlan={res.basicPlan}
              game={parentEvent}
              userEmail={signedInUser?.email}
              userPhone={signedInUser?.phone}
              userName={signedInUser.name}
              uid={signedInUser?.uid}
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
                classStr={clsx(
                  urlState.nav === "program"
                    ? "bottom-16 iphoneX:bottom-20"
                    : "bottom-4",
                  "fixed right-2 z-10 w-16 iphoneX:w-20 h-16 iphoneX:h-20 text-[10px] iphoneX:text-xs"
                )}
                onClick={onShowModal}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommunityTemplateV4;
