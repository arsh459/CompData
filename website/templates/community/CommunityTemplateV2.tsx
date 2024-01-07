import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { useCommunityParams } from "@hooks/community/useCommunityParams";
import { Cohort, EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
// import Header from "@templates/community/Header/Header";
import Script from "next/script";
import { getJoinURL } from "./Program/utils/utils";
import { navElements_main } from "./constants/constants";
import { useJoinStatus } from "@hooks/community/useJoinStatus";
import { RefObject } from "react";
import { useUserRank } from "@hooks/activities/userUserRank";
// import { useCalendarView } from "@hooks/activities/useCalendarView";
import BottomNavCom from "@templates/listing/Book/BottomNavCom";
import ProgramContainer from "./Program/Containers/ProgramContainer";
import { isParentChalenge } from "./Program/utils";
// import LeaderContainer from "./Program/Containers/LeaderboardContainer";
import MemberContainer from "./Program/Containers/MemberContainer";
import DiscoverContainer from "./Program/Containers/DIscoverContainer";
import AboutContainer from "./Program/Containers/AboutContainer";
import ProfileContainer from "./Program/Containers/ProfileContainer";

import Loading from "@components/loading/Loading";

interface Props {
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  allEvents: EventInterface[];
  element: RefObject<HTMLDivElement>;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  signOut: () => void;

  authRequest: (eventKey: string, eId: string) => void;
  setAuthIsVisible: (
    eventId: string,
    cohortId: string,
    eventKey: string
  ) => void;
  setNewPost: (eventId: string, cohortId: string) => void;
  allEventCohorts: {
    [eId: string]: { [cohortId: string]: Cohort };
  };
}

const CommunityTemplateV2: React.FC<Props> = ({
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
    onProfilePress,
    profileId,
    profileNav,
    onGoBack,
    setEventViewState,
    selectedLeaderboard,
    onProfileNameClick,
    onProfileSubNav,
    onLeaderboardChange,
    leaderboardWeek,
    onLeaderboardWeekChange,
  } = useCommunityParams(allEvents, allEventCohorts, leader.userKey);

  const { selectedEvent } = useCommunityEvent(selectedEventId);
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

  // const onSignOut = () => {
  //   onNavChange("program");
  //   signOut();
  // };

  // console.log("selectedEvent", selectedEvent?.id);

  const joinURL = getJoinURL(allEventCohorts, selectedEvent, selectedCohortId);

  const newAuthRequest = () => {
    if (!selectedEvent?.cost && selectedEvent?.eventKey) {
      console.log("selectedEvent?.eventKey", selectedEvent?.eventKey);
      setAuthIsVisible(
        selectedEventId,
        selectedCohortId,
        selectedEvent?.eventKey
      );
    } else {
      onNavChange("program");
    }
  };

  // const justAuthRequest = () => {
  //   authRequest(
  //     selectedEvent?.eventKey ? selectedEvent?.eventKey : "",
  //     selectedEvent?.id ? selectedEvent.id : ""
  //   );
  // };

  const newPostRequest = () => {
    setNewPost(selectedEventId, selectedCohortId);
  };

  const { isMember, memberStatus } = useJoinStatus(
    selectedEvent,
    signedInUser,
    selectedCohortId,
    authStatus
  );

  // console.log("nav", nav, profileId, profileNav, memberStatus);
  // console.log("myUserRank", myUserRank);

  // console.log("sel", selectedEvent?.eventType, selectedEvent?.parentId);

  return (
    <div className="max-w-7xl mx-auto relative">
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />
      <div className="fixed md:top-2 max-w-7xl w-full z-50  bg-white rounded-lg shadow-sm">
        {/* <Header
          headerItems={["Programs", "Members", "Log out"]}
          name={leader.name}
          onSignIn={justAuthRequest}
          onNavChange={onNavChange}
          onSignOut={onSignOut}
          userKey={leader.userKey}
          signedInUserName={signedInUser?.name}
          uid={signedInUser?.uid}
          authStatus={authStatus}
          signedInUserImage={signedInUser?.profileImage}
          signedInUserKey={signedInUser?.userKey}
        /> */}
      </div>
      {nav === "profile" ? (
        <div className="pt-20">
          <ProfileContainer
            profileId={profileId}
            newAuthRequest={newAuthRequest}
            authStatus={authStatus}
            communityKey={leader.userKey}
            onBack={onGoBack}
            profileNav={profileNav}
            onProfileSubNav={onProfileSubNav}
            viewerIsCoach={signedInUser?.userKey ? true : false}
            viewerId={signedInUser?.uid}
          />
        </div>
      ) : authStatus === "PENDING" ||
        !selectedEvent ||
        memberStatus === "PENDING" ? (
        <div className="flex justify-center items-center h-screen">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : nav === "leaderboard" ? (
        <>
          {/* <LeaderContainer
            leaderboardWeek={leaderboardWeek}
            onLeaderboardWeekChange={onLeaderboardWeekChange}
            eventId={selectedEvent?.id}
            eventKey={selectedEvent.eventKey ? selectedEvent.eventKey : ""}
            isAdmin={signedInUser?.role ? true : false}
            parentId={selectedEvent?.parentId}
            communityId={leader.uid}
            state={parentEventObj.selectedEvent?.state}
            eventType={selectedEvent?.eventType}
            terraUser={signedInUser?.terraUser}
            uid={signedInUser?.uid}
            leaderKey={leader.userKey}
            isMember={isMember}
            challengeLength={parentEventObj.selectedEvent?.challengeLength}
            after={parentEventObj.selectedEvent?.eventStarts}
            leaderDescription={getLeaderboardDescs(
              parentEventObj.selectedEvent?.leaderboards
            )}
            prizes={parentEventObj?.selectedEvent?.programDetails}
            onLeaderboardChange={onLeaderboardChange}
            savedList={savedList}
            selectedLeaderboard={selectedLeaderboard}
            myUserRank={myUserRank}
          /> */}
        </>
      ) : nav === "program" || nav === "compose" ? (
        <>
          <ProgramContainer
            leader={leader}
            leaderboardWeek={leaderboardWeek}
            onLeaderboardWeekChange={onLeaderboardWeekChange}
            signedInUser={signedInUser}
            parentPostId={parentPostId}
            authStatus={authStatus}
            memberStatus={memberStatus}
            nav={nav}
            pId={profileId}
            onProfileNameClick={onProfileNameClick}
            navElements_main={navElements_main}
            onNavChange={onNavChange}
            allEvents={allEvents}
            onEventChange={onEventChange}
            selectedEvent={selectedEvent}
            allEventCohorts={allEventCohorts}
            setEventViewState={setEventViewState}
            selectedCohortId={selectedCohortId}
            viewerId={signedInUser?.uid}
            viewerIsCoach={signedInUser?.userKey ? true : false}
            newAuthRequest={newAuthRequest}
            savedList={savedList}
            nowIndex={nowIndex}
            profileNav={profileNav}
            onProfileSubNav={onProfileSubNav}
            selectedLeaderboard={selectedLeaderboard}
            onLeaderboardChange={onLeaderboardChange}
            myUserRank={myUserRank}
            onBack={onGoBack}
            joinURL={joinURL}
            isMember={isMember}
            parentEventObj={parentEventObj}
            onParentPostChange={onParentPostChange}
            newPostRequest={newPostRequest}
          />
        </>
      ) : nav === "members" ? (
        <MemberContainer
          onGoBack={onGoBack}
          onProfileNameClick={onProfileNameClick}
          allEvents={allEvents}
          allEventCohorts={allEventCohorts}
          communityId={leader.uid}
        />
      ) : nav === "discover" ? (
        <DiscoverContainer onGoBack={onGoBack} />
      ) : nav === "creator" ? (
        <AboutContainer leader={leader} onGoBack={onGoBack} />
      ) : null}

      {isMember && !isParentChalenge(selectedEvent) ? (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
          <BottomNavCom
            onProfilePress={onProfilePress}
            selectedNav={nav}
            uid={signedInUser?.uid}
            onNavChange={onNavChange}
          />
        </div>
      ) : null}
    </div>
  );

  //   return (
  //     <div className="max-w-7xl mx-auto relative">
  //       <Script
  //         type="text/javascript"
  //         strategy="lazyOnload"
  //         src="https://widget.cloudinary.com/v2.0/global/all.js"
  //       />

  //       <div className="fixed md:top-2 max-w-7xl w-full z-50  bg-white rounded-lg shadow-sm">
  //         {/* <div className="md:h-2 bg-gray-100" /> */}
  //         <Header
  //           headerItems={["Programs", "Progress", "Members", "Log out"]}
  //           name={leader.name}
  //           onSignIn={authRequest}
  //           onNavChange={onNavChange}
  //           onSignOut={signOut}
  //           userKey={leader.userKey}
  //           signedInUserName={signedInUser?.name}
  //           uid={signedInUser?.uid}
  //           authStatus={authStatus}
  //           signedInUserImage={signedInUser?.profileImage}
  //           signedInUserKey={signedInUser?.userKey}
  //         />
  //       </div>
  //       {nav === "profile" ? (
  //         <div className="md:grid md:grid-cols-4 md:h-screen scrollbar-hide">
  //           <div></div>
  //         </div>
  //       ) : (
  //         <div className="md:grid md:grid-cols-4 md:h-screen scrollbar-hide">
  //           <ProfileWrapper
  //             leader={leader}
  //             isAdmin={
  //               signedInUser && signedInUser?.uid === leader.uid ? true : false
  //             }
  //             uid={signedInUser?.uid}
  //             parentPostId={parentPostId}
  //             nav={nav}
  //             navElements={navElements_main}
  //             onNavChange={onNavChange}
  //           />
  //           <div className="md:col-span-3 h-screen md:overflow-y-auto md:scrollbar-hide">
  //             <div
  //               className={clsx(
  //                 signedInUser?.uid ? "md:h-24 md:mt-2" : "md:h-20 md:mt-2"
  //               )}
  //             />
  //             {/* {nav === "creator" ? (
  //               <div className="w-full md:w-3/5 md:pt-4 p-0 md:pl-4 md:pr-4">
  //                 <AboutCreator leader={leader} />
  //               </div>
  //             ) : nav === "program" ||
  //               // nav === "profile" ||
  //               nav === "compose" ||
  //               nav === "me" ||
  //               // nav === "workouts" ||
  //               nav === "rewards" ? (
  //               <>
  //                 {
  //                   //(eventViewState === "unknown" || !parentPostId) &&
  //                   allEvents.length > 0 ? (
  //                     <div className="pt-0 md:mt-0 md:w-3/5">
  //                       {/* <p>selId{selectedEvent?.id}</p> */}
  //             {/* <p>urlId{selectedEventId}</p> */}
  //             {/* <EventDropdownV2
  //                         onClick={onEventChange} */}
  //             {/* // ======= */}
  //             {nav === "creator" ? (
  //               <div className="w-full md:w-3/5 md:pt-4 p-0 md:pl-4 md:pr-4">
  //                 <AboutCreator leader={leader} />
  //               </div>
  //             ) : nav === "program" ||
  //               nav === "me" ||
  //               nav === "compose" ||
  //               // nav === "workouts" ||
  //               nav === "rewards" ? (
  //               <>
  //                 {
  //                   //(eventViewState === "unknown" || !parentPostId) &&
  //                   allEvents.length > 0 ? (
  //                     <div className="pt-0 md:mt-0 md:w-3/5">
  //                       {/* <p>selId{selectedEvent?.id}</p> */}
  //                       {/* <p>urlId{selectedEventId}</p> */}
  //                       <EventDropdownV2
  //                         onClick={onEventChange}
  //                         signedInUser={signedInUser}
  //                         events={allEvents}
  //                         eventCohorts={allEventCohorts}
  //                         selectedEvent={selectedEvent}
  //                         setEventViewState={setEventViewState}
  //                         myUID={signedInUser?.uid}
  //                         communityId={leader.uid}
  //                         selectedCohortId={selectedCohortId}
  //                       />
  //                     </div>
  //                   ) : null
  //                 }
  //                 {nav === "program" &&
  //                 allEvents.length > 0 &&
  //                 (!selectedEvent?.parentId || eventViewState === "preview") &&
  //                 selectedEvent?.eventType === "challenge" ? (
  //                   <div className="md:pl-4 md:pt-2">
  //                     <ChallengeTemplate
  //                       selectedEvent={selectedEvent}
  //                       leader={leader}
  //                       // participatingCommunity={participatingCommunity}
  //                       editing={false}
  //                       cohortId={selectedCohortId}
  //                       live={true}
  //                       selectedCohort={
  //                         allEventCohorts[selectedEvent.id]
  //                           ? allEventCohorts[selectedEvent.id][selectedCohortId]
  //                           : undefined
  //                       }
  //                       noHeader={true}
  //                       preview={true}
  //                       user={signedInUser}
  //                       setAuthIsVisible={newAuthRequest}
  //                     />
  //                   </div>
  //                 ) : nav === "program" || nav === "compose" ? (
  //                   <>
  //                     <div
  //                       className={clsx(
  //                         "",
  //                         allEvents.length === 0
  //                           ? "md:p-4 md:pt-0 md:pr-0"
  //                           : "md:p-4 md:pr-0"
  //                       )}
  //                     >
  //                       {loading ? (
  //                         <div className="pt-8 flex justify-center items-center">
  //                           <Loading fill="#ff735c" width={48} height={48} />
  //                         </div>
  //                       ) : eventViewState === "community" && selectedEvent ? (
  //                         <ProgramWrapper
  //                           leader={leader}
  //                           selectedEvent={selectedEvent}
  //                           isMember={isMember}
  //                           signedInUser={signedInUser}
  //                           parentEvent={parentEventObj.selectedEvent}
  //                           joinURL={joinURL}
  //                           setAuthIsVisible={newAuthRequest}
  //                           myUserRank={myUserRank}
  //                           navState={nav}
  //                           selectedCohortId={selectedCohortId}
  //                           parentPostId={parentPostId}
  //                           setParentPostId={onParentPostChange}
  //                           onNewPost={newPostRequest}
  //                           savedList={savedList}
  //                           nowIndex={nowIndex}
  //                           selectedLeaderboard={selectedLeaderboard}
  //                           onLeaderboardChange={onLeaderboardChange}
  //                           onNavChange={onNavChange}
  //                         />
  //                       ) : selectedEvent &&
  //                         eventViewState === "preview" &&
  //                         selectedEvent.eventType !== "challenge" ? (
  //                         <ListingWrapper
  //                           event={selectedEvent}
  //                           preview={true}
  //                           leader={leader}
  //                           cohorts={getEventCohortsFromObj(
  //                             selectedEvent.id,
  //                             allEventCohorts
  //                           )}
  //                         />
  //                       ) : leader.uid === signedInUser?.uid &&
  //                         allEvents.length === 0 ? (
  //                         <>
  //                           <PostPlaceholder placeholderStyle="community-me" />
  //                           <DiscoverChallenges />
  //                         </>
  //                       ) : leader.uid !== signedInUser?.uid &&
  //                         allEvents.length === 0 ? (
  //                         <PostPlaceholder placeholderStyle="community" />
  //                       ) : null}
  //                     </div>
  //                   </>
  //                 ) : nav === "rewards" ? (
  //                   <div className="pt-0">
  //                     <div className="max-w-lg pb-2">
  //                       <TopHeader onClick={onGoBack} />
  //                     </div>
  //                     <PrizesWrapper
  //                       heading="🏆 Weekly Fitness Prizes 🏆"
  //                       prizes={parentEventObj?.selectedEvent?.programDetails}
  //                       canSubmit={
  //                         selectedEvent?.id &&
  //                         signedInUser?.enrolledEvents?.includes(selectedEvent.id)
  //                           ? true
  //                           : false
  //                       }
  //                       setPostRequest={() => {}}
  //                     />
  //                   </div>
  //                 ) : selectedEvent?.parentId &&
  //                   signedInUser?.uid &&
  //                   signedInUser?.enrolledEvents?.includes(selectedEvent.id) ? (
  //                   <div className="pt-2 md:pl-4">
  //                     <div className="max-w-lg pb-2">
  //                       <TopHeader onClick={onGoBack} />
  //                     </div>
  //                     <ProgressV2
  //                       eventName={selectedEvent.name}
  //                       leader={leader}
  //                       savedList={savedList}
  //                       myUserRank={myUserRank}
  //                       parentId={selectedEvent?.parentId}
  //                       signedInUser={signedInUser}
  //                       challengeLength={
  //                         parentEventObj?.selectedEvent?.challengeLength
  //                       }
  //                       after={parentEventObj?.selectedEvent?.eventStarts}
  //                     />
  //                   </div>
  //                 ) : (
  //                   <div className="pt-2 md:pl-4">
  //                     <PersonalKPIs
  //                       signedInUID={signedInUser?.uid}
  //                       numClaps={signedInUser?.numClaps}
  //                       checkIns={signedInUser?.numCheckins}
  //                       onJoin={newAuthRequest}
  //                       creatorName={leader.name}
  //                       onNewPost={newPostRequest}
  //                       isMember={isMember}
  //                     />
  //                   </div>
  //                 )}
  //               </>
  //             ) : nav === "discover" ? (
  //               <DiscoverChallenges />
  //             ) : (
  //               <Members
  //                 allEvents={allEvents}
  //                 allEventCohorts={allEventCohorts}
  //                 communityId={leader.uid}
  //               />
  //             )}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
};

export default CommunityTemplateV2;
