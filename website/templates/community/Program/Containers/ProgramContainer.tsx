import { eventVisibility } from "@hooks/community/useCommunityEventCache";
import {
  leaderboardWeekTypes,
  navLevels,
  profileSubNav,
} from "@hooks/community/useCommunityParams";
import { UserRank } from "@models/Activities/Activity";
import { Cohort, EventInterface, leaderboardKPIs } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import { NavElement } from "@templates/community/constants/constants";
import EventDropdownV2 from "@templates/community/EventDropdown/EventDropdownV2";
import ProfileWrapper from "@templates/community/ProfileWrapper/ProfileWrapper";
import ProgramWrapper from "@templates/community/ProgramWrapper/ProgramWrapper";
// import ChallengeTemplate from "@templates/listing/ChallengeTemplate";
// import ListingWrapper from "@templates/listing/ListingWrapper";
// import ChallengeTemplate from "@templates/listing/ChallengeTemplate";
import clsx from "clsx";
import { isParentChalenge } from "../utils";
// import { getEventCohortsFromObj } from "../utils/utils";
import LockedProgram from "./LockedProgram";
import ProfileContainer from "./ProfileContainer";
// import AboutCreator from "../../AboutCreator/AboutCreator";

interface Props {
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  parentPostId: string;
  nav: "program" | "compose";
  navElements_main: NavElement[];
  onNavChange: (el: navLevels) => void;
  allEvents: EventInterface[];
  onEventChange: (navId: string, cohortId: string) => void;
  selectedEvent?: EventInterface;
  allEventCohorts: { [eId: string]: { [cId: string]: Cohort } };
  setEventViewState: (eId: eventVisibility) => void;
  selectedCohortId: string;
  // eventViewState: eventVisibility;
  newAuthRequest: () => void;
  isMember: boolean;
  joinURL: string;
  myUserRank?: UserRank;
  parentEventObj: { selectedEvent?: EventInterface; loading: boolean };
  onParentPostChange: (newId: string) => void;
  newPostRequest: () => void;
  savedList: string[];
  nowIndex: number;
  selectedLeaderboard: leaderboardKPIs;
  onProfileNameClick: (newId: string) => void;
  onLeaderboardChange: (newL: leaderboardKPIs) => void;
  pId: string;
  profileNav: profileSubNav;
  onProfileSubNav: (newNav: profileSubNav) => void;
  onBack: () => void;
  viewerIsCoach?: boolean;
  viewerId?: string;
  memberStatus: "PENDING" | "SUCCESS" | "FAILED";
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  leaderboardWeek?: leaderboardWeekTypes;
  onLeaderboardWeekChange: (newWeek: leaderboardWeekTypes) => void;
}

const ProgramContainer: React.FC<Props> = ({
  leader,
  signedInUser,
  parentPostId,
  nav,
  navElements_main,
  onNavChange,
  allEvents,
  onEventChange,
  selectedEvent,
  allEventCohorts,
  setEventViewState,
  selectedCohortId,
  pId,
  authStatus,
  newAuthRequest,
  isMember,
  joinURL,
  myUserRank,
  parentEventObj,
  onParentPostChange,
  newPostRequest,
  savedList,
  nowIndex,
  selectedLeaderboard,
  onLeaderboardChange,
  onProfileNameClick,
  profileNav,
  onProfileSubNav,
  onBack,
  viewerId,
  viewerIsCoach,
  memberStatus,
  leaderboardWeek,
  onLeaderboardWeekChange,
}) => {
  // console.log(
  //   memberStatus,
  //   !isParentChalenge(selectedEvent),
  //   memberStatus === "SUCCESS" &&
  //     selectedEvent &&
  //     !isParentChalenge(selectedEvent)
  // );
  return (
    <div className="md:grid md:grid-cols-4 md:h-screen scrollbar-hide">
      {pId ? (
        <div className="h-20" />
      ) : (
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
      )}
      <div className="md:col-span-3 h-screen md:overflow-y-auto md:scrollbar-hide">
        <div
          className={clsx(
            signedInUser?.uid ? "md:h-24 md:mt-2" : "md:h-20 md:mt-2"
          )}
        />
        <>
          {allEvents.length > 0 ? (
            <div className="pt-0 md:mt-0 md:w-3/5">
              <EventDropdownV2
                onClick={onEventChange}
                signedInUser={signedInUser}
                events={allEvents}
                eventCohorts={allEventCohorts}
                selectedEvent={selectedEvent}
                setEventViewState={setEventViewState}
                myUID={signedInUser?.uid}
                communityId={leader.uid}
                isMember={isMember}
                selectedCohortId={selectedCohortId}
              />
            </div>
          ) : null}
          {pId ? (
            <ProfileContainer
              communityKey={leader.userKey}
              authStatus={authStatus}
              newAuthRequest={newAuthRequest}
              onBack={onBack}
              onProfileSubNav={onProfileSubNav}
              profileId={pId}
              profileNav={profileNav}
              viewerIsCoach={viewerIsCoach}
              viewerId={viewerId}
            />
          ) : memberStatus === "SUCCESS" &&
            selectedEvent &&
            !isParentChalenge(selectedEvent) ? (
            <ProgramWrapper
              leaderboardWeek={leaderboardWeek}
              onLeaderboardWeekChange={onLeaderboardWeekChange}
              leader={leader}
              selectedEvent={selectedEvent}
              isMember={isMember}
              signedInUser={signedInUser}
              parentEvent={parentEventObj.selectedEvent}
              onProfileNameClick={onProfileNameClick}
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
          ) : allEvents.length > 0 &&
            selectedEvent &&
            (memberStatus === "FAILED" || isParentChalenge(selectedEvent)) ? (
            <LockedProgram
              leader={leader}
              signedInUser={signedInUser}
              allEvents={allEvents}
              selectedEvent={selectedEvent}
              allEventCohorts={allEventCohorts}
              selectedCohortId={selectedCohortId}
              // eventViewState={eventViewState}
              newAuthRequest={newAuthRequest}
            />
          ) : null}
        </>
      </div>
    </div>
  );
};

export default ProgramContainer;
