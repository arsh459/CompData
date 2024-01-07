import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
// import Script from "next/script";
import { useJoinStatus } from "@hooks/community/useJoinStatus";
import { useUserRank } from "@hooks/activities/userUserRank";
// import { useCalendarView } from "@hooks/activities/useCalendarView";
import HeaderV2 from "./Header/HeaderV2";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import EventBrief from "./Program/EventBrief/EventBrief";
import TopNav from "./Program/TopNav/TopNav";
import { useCommunityParamsV2 } from "@hooks/community/v2/useCommunityParamsV2";
import UnlockedProgramV2 from "./Program/Containers/UnlockedProgramV2";
import Loading from "@components/loading/Loading";
import LockedProgramV2 from "./Program/Containers/LockedProgramV2";
// import { mainCTAClick } from "@analytics/click/wrappers";

interface Props {
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  selectedEvent: EventInterface;
  parentEvent: EventInterface | null;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  // signOut: () => void;
  setAuthIsVisible: () => void;
}

const CommunityTemplateV3: React.FC<Props> = ({
  leader,
  signedInUser,
  selectedEvent,
  parentEvent,
  setAuthIsVisible,
  // setNewPost,
  // authRequest,
  authStatus,
  // signOut,
}) => {
  const {
    nav,
    onNavChange,
    parentPostId,
    onParentPostChange,
    onNavChangeWithScroll,
    onGoBack,
    // selectedLeaderboard,
    // onProfileNameClick,
    // onLeaderboardChange,
    leaderboardWeek,
    onLeaderboardWeekChange,
    postEventId,
    leaderboardMonth,
    onLeaderboardMonthChange,
  } = useCommunityParamsV2(
    parentEvent?.configuration?.starts,
    parentEvent?.configuration?.challengeLength,
    parentEvent?.configuration?.sprints
  );

  const { myUserRank } = useUserRank(parentEvent?.id, signedInUser?.uid);
  // const { savedList } = useCalendarView(
  //   // parentEvent?.configuration?.challengeLength,
  //   parentEvent?.configuration?.starts,
  //   parentEvent?.configuration?.sprints,
  //   // parentEvent?.configuration?.rounds,
  //   leaderboardMonth
  // );

  // console.log("cu", leaderboardWeek, leaderboardMonth);

  // const onSignOut = () => {
  //   onNavChange("program");
  //   signOut();
  // };

  // console.log(
  //   "l",
  //   leaderboardWeek,
  //   leaderboardMonth,
  //   parentEvent?.configuration
  // );

  const newAuthRequest = () => {
    if (!selectedEvent?.cost && selectedEvent?.eventKey) {
      // console.log("selectedEvent?.eventKey", selectedEvent?.eventKey);
      setAuthIsVisible();
      // selectedEventId,
      // selectedCohortId,
      // selectedEvent?.eventKey
    } else {
      onNavChange("program");
    }
  };

  // const justAuthRequest = () => {
  // authRequest(
  //   // selectedEvent?.eventKey ? selectedEvent?.eventKey : "",
  //   // selectedEvent?.id ? selectedEvent.id : ""
  // );
  // };

  // const newPostRequest = () => {
  // setNewPost(selectedEventId, selectedCohortId);
  // };

  // console.log("eve", selectedEvent.eventStarts);

  const { memberStatus } = useJoinStatus(
    selectedEvent,
    signedInUser,
    undefined,
    authStatus
    // selectedCohortId
  );

  // console.log("signedInUser", signedInUser);

  return (
    <div className="max-w-xl relative mx-auto">
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}

      <div className="bg-gradient-to-b from-gray-100 to-gray-100">
        <div className="bg-gray-100 top-0 w-full z-40 left-0 right-0 fixed">
          <HeaderV2
            onSignIn={setAuthIsVisible}
            onGoBack={onGoBack}
            eventId={selectedEvent.id}
            headerItems={["My Profile", "Leave Team"]}
            signedInUserName={signedInUser?.name}
            uid={signedInUser?.uid}
            authStatus={authStatus}
            signedInUserImage={signedInUser?.profileImage}
            signedInUserKey={signedInUser?.userKey}
          />
        </div>

        <div className="h-20" />

        {!parentPostId || memberStatus === "FAILED" ? (
          <>
            <div className="px-4 pt-4 pb-2">
              <EventBrief
                eventName={selectedEvent?.name}
                eventDescription={selectedEvent?.description}
                creatorName={leader.name}
                creatorKey={leader.userKey}
                creatorUID={leader.uid}
                // onProfilePress={() => onProfileNameClick(leader.uid)}
              />
            </div>
          </>
        ) : null}
      </div>

      {/* {memberStatus !== "SUCCESS" ? ( */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2
          registerBy={
            parentEvent?.eventStarts && memberStatus === "FAILED"
              ? new Date(parentEvent.eventStarts)
              : selectedEvent?.eventStarts && memberStatus === "FAILED"
              ? new Date(selectedEvent.eventStarts)
              : undefined
          }
          cta={
            memberStatus === "SUCCESS" && selectedEvent.parentId
              ? "Start Workout"
              : memberStatus === "SUCCESS" && !selectedEvent.parentId
              ? "Go to Team"
              : // ""
              // :

              memberStatus === "FAILED" && selectedEvent.parentId
              ? "Join Team"
              : memberStatus === "FAILED" && !selectedEvent.parentId
              ? "Start Team"
              : ""
          }
          link={
            memberStatus === "FAILED"
              ? `/joinBoatV2/${leader.userKey}/${selectedEvent.eventKey}`
              : memberStatus === "SUCCESS" && selectedEvent.parentId
              ? `/${leader.userKey}/${selectedEvent.eventKey}/workout`
              : "/teams"
          }
          onClick={() => {}}
          // onClick={() => {
          //   mainCTAClick(
          //     memberStatus === "SUCCESS" && selectedEvent.parentId
          //       ? "start_workout"
          //       : memberStatus === "SUCCESS"
          //       ? "go_to_team"
          //       : memberStatus === "FAILED" && selectedEvent.parentId
          //       ? "join_team"
          //       : memberStatus === "FAILED" && !selectedEvent.parentId
          //       ? "start_team"
          //       : ""
          //   );
          //   // if (memberStatus === "SUCCESS") {
          //   // onNavChange("program");
          //   // }
          // }}
        />
      </div>
      {/* // ) : null} */}

      {memberStatus === "PENDING" ? (
        <div className="flex justify-center items-start pt-8 min-h-[50vh] bg-gray-100">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : memberStatus === "FAILED" || !parentEvent ? (
        <LockedProgramV2
          parentId={parentEvent?.id}
          eventId={selectedEvent.id}
          faq={parentEvent?.faq ? parentEvent.faq : selectedEvent.faq}
          prizes={
            parentEvent?.programDetails
              ? parentEvent.programDetails
              : selectedEvent.programDetails
          }
          isAdmin={signedInUser?.role ? true : false}
          goal={selectedEvent.courseGoal}
          eventKey={selectedEvent.eventKey}
        />
      ) : memberStatus === "SUCCESS" && signedInUser && parentEvent ? (
        <>
          <div className="py-2 px-4 sticky top-16 z-40 bg-gray-100">
            <TopNav selectedNav={nav} onChangeSubNav={onNavChangeWithScroll} />
          </div>
          <UnlockedProgramV2
            nav={nav}
            leader={leader}
            leaderboardMonth={leaderboardMonth}
            leaderboardWeek={leaderboardWeek}
            onLeaderboardWeekChange={onLeaderboardWeekChange}
            onLeaderboardMonthChange={onLeaderboardMonthChange}
            signedInUser={signedInUser}
            parentPostId={parentPostId}
            // onProfileNameClick={onProfileNameClick}
            newAuthRequest={newAuthRequest}
            selectedEvent={selectedEvent}
            parentEvent={parentEvent}
            // selectedLeaderboard={selectedLeaderboard}
            // onLeaderboardChange={onLeaderboardChange}
            isMember={true}
            // savedList={savedList}
            savedList={[]}
            myUserRank={myUserRank}
            postEventId={postEventId}
            onParentPostChange={onParentPostChange}
            // nowIndex={nowIndex}
            onNavChange={onNavChange}
          />
        </>
      ) : null}
    </div>
  );
};

export default CommunityTemplateV3;
