import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { useCommunityParams } from "@hooks/community/useCommunityParams";
import { Cohort, EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
// import Header from "@templates/community/Header/Header";
import Script from "next/script";
import { getEventCohortsFromObj, getJoinURL } from "./Program/utils/utils";
import AboutCreator from "./AboutCreator/AboutCreator";
import ListingWrapper from "@templates/listing/ListingWrapper";
import ProfileWrapper from "./ProfileWrapper/ProfileWrapper";
import ProgramWrapper from "./ProgramWrapper/ProgramWrapper";
import { navElements_main } from "./constants/constants";
import Members from "./Members/Members";
import ChallengeTemplate from "@templates/listing/ChallengeTemplate";
import DiscoverChallenges from "./DiscoverChallenges/DiscoverChallenges";
import PostPlaceholder from "./Program/Post/PostPlaceholder";
import PersonalKPIs from "./PersonalKPIs/PersonalKPIs";
import clsx from "clsx";
import { useJoinStatus } from "@hooks/community/useJoinStatus";
import { RefObject } from "react";
import Loading from "@components/loading/Loading";
import ProgressV2 from "./PersonalKPIs/ProgressV2";
import TopHeader from "./Thread/TopHeader";
import EventDropdownV2 from "./EventDropdown/EventDropdownV2";
import { useUserRank } from "@hooks/activities/userUserRank";
// import { useCalendarView } from "@hooks/activities/useCalendarView";
import PrizesWrapper from "./Program/Prizes/PrizesWrapper";

interface Props {
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  allEvents: EventInterface[];
  element: RefObject<HTMLDivElement>;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  signOut: () => void;

  authRequest: () => void;
  setAuthIsVisible: (eventId: string, cohortId: string) => void;
  setNewPost: (eventId: string, cohortId: string) => void;
  allEventCohorts: {
    [eId: string]: { [cohortId: string]: Cohort };
  };
}

const CommunityTemplate: React.FC<Props> = ({
  leader,
  signedInUser,
  allEventCohorts,
  allEvents,
  setAuthIsVisible,
  setNewPost,
  authRequest,
  authStatus,
  signOut,
}) => {
  const {
    selectedCohortId,
    selectedEventId,
    onEventChange,
    nav,
    onNavChange,
    parentPostId,
    onParentPostChange,
    eventViewState,
    onGoBack,
    setEventViewState,
    selectedLeaderboard,
    onLeaderboardChange,
  } = useCommunityParams(allEvents, allEventCohorts);
  const { selectedEvent, loading } = useCommunityEvent(selectedEventId);
  const parentEventObj = useCommunityEvent(selectedEvent?.parentId);
  const { myUserRank } = useUserRank(
    parentEventObj.selectedEvent?.id,
    signedInUser?.uid
  );
  // const { savedList, nowIndex } = useCalendarView(
  //   parentEventObj.selectedEvent?.challengeLength,
  //   parentEventObj.selectedEvent?.eventStarts
  // );

  const savedList: string[] = [];
  const nowIndex = 0;
  // console.log("eventViewState", eventViewState);

  const joinURL = getJoinURL(allEventCohorts, selectedEvent, selectedCohortId);

  const newAuthRequest = () => {
    console.log("newAuthReq");
    if (!selectedEvent?.cost) {
      setAuthIsVisible(selectedEventId, selectedCohortId);
    } else {
      onNavChange("program");
    }
  };

  const newPostRequest = () => {
    setNewPost(selectedEventId, selectedCohortId);
  };

  const { isMember } = useJoinStatus(
    selectedEvent,
    signedInUser,
    selectedCohortId,
    authStatus
  );

  return (
    <div className="max-w-7xl mx-auto relative">
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />

      <div className="fixed md:top-2 max-w-7xl w-full z-50  bg-white rounded-lg shadow-sm">
        {/* <div className="md:h-2 bg-gray-100" /> */}
        {/* <Header
          headerItems={["Programs", "Progress", "Members", "Log out"]}
          name={leader.name}
          onSignIn={authRequest}
          onNavChange={onNavChange}
          onSignOut={signOut}
          userKey={leader.userKey}
          signedInUserName={signedInUser?.name}
          uid={signedInUser?.uid}
          authStatus={authStatus}
          signedInUserImage={signedInUser?.profileImage}
          signedInUserKey={signedInUser?.userKey}
        /> */}
      </div>
      {nav === "profile" ? (
        <div className="md:grid md:grid-cols-4 md:h-screen scrollbar-hide">
          <div></div>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-4 md:h-screen scrollbar-hide">
          <ProfileWrapper
            leader={leader}
            isAdmin={
              signedInUser && signedInUser?.uid === leader.uid ? true : false
            }
            uid={signedInUser?.uid}
            parentPostId={parentPostId}
            nav={nav}
            navElements={navElements_main}
            onNavChange={onNavChange}
          />
          <div className="md:col-span-3 h-screen md:overflow-y-auto md:scrollbar-hide">
            <div
              className={clsx(
                signedInUser?.uid ? "md:h-24 md:mt-2" : "md:h-20 md:mt-2"
              )}
            />
            {/* {nav === "creator" ? (
              <div className="w-full md:w-3/5 md:pt-4 p-0 md:pl-4 md:pr-4">
                <AboutCreator leader={leader} />
              </div>
            ) : nav === "program" ||
              // nav === "profile" ||
              nav === "compose" ||
              nav === "me" ||
              // nav === "workouts" ||
              nav === "rewards" ? (
              <>
                {
                  //(eventViewState === "unknown" || !parentPostId) &&
                  allEvents.length > 0 ? (
                    <div className="pt-0 md:mt-0 md:w-3/5">
                      {/* <p>selId{selectedEvent?.id}</p> */}
            {/* <p>urlId{selectedEventId}</p> */}
            {/* <EventDropdownV2
                        onClick={onEventChange} */}
            {/* // ======= */}
            {nav === "creator" ? (
              <div className="w-full md:w-3/5 md:pt-4 p-0 md:pl-4 md:pr-4">
                <AboutCreator leader={leader} />
              </div>
            ) : nav === "program" ||
              // nav === "me" ||
              nav === "compose" ? (
              // nav === "workouts" ||
              // nav === "rewards"

              <>
                {
                  //(eventViewState === "unknown" || !parentPostId) &&
                  allEvents.length > 0 ? (
                    <div className="pt-0 md:mt-0 md:w-3/5">
                      {/* <p>selId{selectedEvent?.id}</p> */}
                      {/* <p>urlId{selectedEventId}</p> */}
                      <EventDropdownV2
                        onClick={onEventChange}
                        signedInUser={signedInUser}
                        events={allEvents}
                        isMember={isMember}
                        eventCohorts={allEventCohorts}
                        selectedEvent={selectedEvent}
                        setEventViewState={setEventViewState}
                        myUID={signedInUser?.uid}
                        communityId={leader.uid}
                        selectedCohortId={selectedCohortId}
                      />
                    </div>
                  ) : null
                }
                {nav === "program" &&
                allEvents.length > 0 &&
                (!selectedEvent?.parentId || eventViewState === "preview") &&
                selectedEvent?.eventType === "challenge" ? (
                  <div className="md:pl-4 md:pt-2">
                    <ChallengeTemplate
                      selectedEvent={selectedEvent}
                      leader={leader}
                      // participatingCommunity={participatingCommunity}
                      editing={false}
                      cohortId={selectedCohortId}
                      live={true}
                      selectedCohort={
                        allEventCohorts[selectedEvent.id]
                          ? allEventCohorts[selectedEvent.id][selectedCohortId]
                          : undefined
                      }
                      noHeader={true}
                      preview={true}
                      user={signedInUser}
                      setAuthIsVisible={newAuthRequest}
                    />
                  </div>
                ) : nav === "program" || nav === "compose" ? (
                  <>
                    <div
                      className={clsx(
                        "",
                        allEvents.length === 0
                          ? "md:p-4 md:pt-0 md:pr-0"
                          : "md:p-4 md:pr-0"
                      )}
                    >
                      {loading ? (
                        <div className="pt-8 flex justify-center items-center">
                          <Loading fill="#ff735c" width={48} height={48} />
                        </div>
                      ) : eventViewState === "community" && selectedEvent ? (
                        <ProgramWrapper
                          leader={leader}
                          leaderboardWeek="overall"
                          onLeaderboardWeekChange={() => {}}
                          onProfileNameClick={() => {}}
                          selectedEvent={selectedEvent}
                          isMember={isMember}
                          signedInUser={signedInUser}
                          parentEvent={parentEventObj.selectedEvent}
                          joinURL={joinURL}
                          setAuthIsVisible={newAuthRequest}
                          myUserRank={myUserRank}
                          navState={nav}
                          selectedCohortId={selectedCohortId}
                          parentPostId={parentPostId}
                          setParentPostId={onParentPostChange}
                          onNewPost={newPostRequest}
                          savedList={savedList}
                          nowIndex={nowIndex}
                          selectedLeaderboard={selectedLeaderboard}
                          onLeaderboardChange={onLeaderboardChange}
                          onNavChange={onNavChange}
                        />
                      ) : selectedEvent &&
                        eventViewState === "preview" &&
                        selectedEvent.eventType !== "challenge" ? (
                        <ListingWrapper
                          event={selectedEvent}
                          preview={true}
                          leader={leader}
                          cohorts={getEventCohortsFromObj(
                            selectedEvent.id,
                            allEventCohorts
                          )}
                        />
                      ) : leader.uid === signedInUser?.uid &&
                        allEvents.length === 0 ? (
                        <>
                          <PostPlaceholder placeholderStyle="community-me" />
                          <DiscoverChallenges />
                        </>
                      ) : leader.uid !== signedInUser?.uid &&
                        allEvents.length === 0 ? (
                        <PostPlaceholder placeholderStyle="community" />
                      ) : null}
                    </div>
                  </>
                ) : nav === "rewards" ? (
                  <div className="pt-0">
                    <div className="max-w-lg pb-2">
                      <TopHeader onClick={onGoBack} />
                    </div>
                    <PrizesWrapper
                      heading="🏆 Weekly Fitness Prizes 🏆"
                      prizes={parentEventObj?.selectedEvent?.programDetails}
                      canSubmit={
                        selectedEvent?.id &&
                        signedInUser?.enrolledEvents?.includes(selectedEvent.id)
                          ? true
                          : false
                      }
                      setPostRequest={() => {}}
                    />
                  </div>
                ) : selectedEvent?.parentId &&
                  signedInUser?.uid &&
                  signedInUser?.enrolledEvents?.includes(selectedEvent.id) ? (
                  <div className="pt-2 md:pl-4">
                    <div className="max-w-lg pb-2">
                      <TopHeader onClick={onGoBack} />
                    </div>
                    <ProgressV2
                      eventName={selectedEvent.name}
                      leader={leader}
                      onProfileNameClick={() => {}}
                      savedList={savedList}
                      myUserRank={myUserRank}
                      parentId={selectedEvent?.parentId}
                      signedInUser={signedInUser}
                      challengeLength={
                        parentEventObj?.selectedEvent?.challengeLength
                      }
                      after={parentEventObj?.selectedEvent?.eventStarts}
                    />
                  </div>
                ) : (
                  <div className="pt-2 md:pl-4">
                    <PersonalKPIs
                      signedInUID={signedInUser?.uid}
                      numClaps={signedInUser?.numClaps}
                      checkIns={signedInUser?.numCheckins}
                      onJoin={newAuthRequest}
                      creatorName={leader.name}
                      onProfileNameClick={() => {}}
                      onNewPost={newPostRequest}
                      isMember={isMember}
                    />
                  </div>
                )}
              </>
            ) : nav === "discover" ? (
              <DiscoverChallenges />
            ) : (
              <Members
                allEvents={allEvents}
                onProfileNameClick={() => {}}
                allEventCohorts={allEventCohorts}
                communityId={leader.uid}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityTemplate;
