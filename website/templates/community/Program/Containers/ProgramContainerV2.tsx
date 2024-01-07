import { eventVisibility } from "@hooks/community/useCommunityEventCache";
import {
  // leaderboardWeekTypes,
  // navLevels,
  profileSubNav,
} from "@hooks/community/useCommunityParams";
import { navLevelsV2 } from "@hooks/community/v2/useCommunityParamsV2";
// import { UserRank } from "@models/Activities/Activity";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
// import { NavElement } from "@templates/community/constants/constants";
import ProgramWrapperV2 from "@templates/community/ProgramWrapper/ProgramWrapperV2";

interface Props {
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  parentPostId: string;
  nav: "program" | "compose";
  // navElements_main: NavElement[];
  onNavChange: (el: navLevelsV2) => void;
  // allEvents: EventInterface[];
  // onEventChange: (navId: string, cohortId: string) => void;
  selectedEvent?: EventInterface;
  // allEventCohorts: { [eId: string]: { [cId: string]: Cohort } };
  setEventViewState: (eId: eventVisibility) => void;
  // selectedCohortId: string;
  // eventViewState: eventVisibility;
  newAuthRequest: () => void;
  isMember: boolean;
  // joinURL: string;
  // myUserRank?: UserRank;
  parentEvent: EventInterface;
  onParentPostChange: (newId: string) => void;
  // newPostRequest: () => void;
  // savedList: string[];
  // nowIndex: number;
  // selectedLeaderboard: leaderboardKPIs;
  // onProfileNameClick: (newId: string) => void;
  // onLeaderboardChange: (newL: leaderboardKPIs) => void;
  pId: string;
  profileNav: profileSubNav;
  onProfileSubNav: (newNav: profileSubNav) => void;
  onBack: () => void;
  viewerIsCoach?: boolean;
  viewerId?: string;
  memberStatus: "PENDING" | "SUCCESS" | "FAILED";
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  // leaderboardWeek?: leaderboardWeekTypes;
  // onLeaderboardWeekChange: (newWeek: leaderboardWeekTypes) => void;
  // onChangeSubNav: (newNav: communitySubNav) => void;
}

const ProgramContainerV2: React.FC<Props> = ({
  leader,
  signedInUser,
  parentPostId,
  nav,
  // navElements_main,
  onNavChange,
  parentEvent,
  // allEvents,
  // onEventChange,
  selectedEvent,
  // allEventCohorts,
  // setEventViewState,
  // selectedCohortId,
  // pId,
  // authStatus,
  newAuthRequest,
  isMember,
  // joinURL,
  // myUserRank,
  // parentEventObj,
  onParentPostChange,
  // newPostRequest,
  // savedList,
  // nowIndex,
  // selectedLeaderboard,
  // onLeaderboardChange,
  // onProfileNameClick,
  // profileNav,
  // onProfileSubNav,
  // onBack,
  // viewerId,
  // viewerIsCoach,
  // memberStatus,
  // leaderboardWeek,
  // onLeaderboardWeekChange,
  // onChangeSubNav,
}) => {
  // console.log(
  //   memberStatus,
  //   !isParentChalenge(selectedEvent),
  //   memberStatus === "SUCCESS" &&
  //     selectedEvent &&
  //     !isParentChalenge(selectedEvent)
  // );
  return (
    <div className="">
      <ProgramWrapperV2
        // leaderboardWeek={leaderboardWeek}
        // onLeaderboardWeekChange={onLeaderboardWeekChange}
        leader={leader}
        selectedEvent={selectedEvent}
        isMember={isMember}
        signedInUser={signedInUser}
        parentEvent={parentEvent}
        // onProfileNameClick={onProfileNameClick}
        // joinURL={""}
        setAuthIsVisible={newAuthRequest}
        // myUserRank={myUserRank}
        navState={nav}
        // selectedCohortId={selectedCohortId}
        parentPostId={parentPostId}
        setParentPostId={onParentPostChange}
        // onNewPost={newPostRequest}
        // savedList={savedList}
        // nowIndex={nowIndex}
        // selectedLeaderboard={selectedLeaderboard}
        // onLeaderboardChange={onLeaderboardChange}
        onNavChange={onNavChange}
      />
    </div>
  );
};

export default ProgramContainerV2;
