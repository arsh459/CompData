// import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";
// import { ROUND_LENGTH, SPRINT_LENGTH } from "@constants/gameStats";
import { navLevelsV2 } from "@hooks/community/v2/useCommunityParamsV2";
import { UserRank } from "@models/Activities/Activity";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import ProgramWrapperV2 from "@templates/community/ProgramWrapper/ProgramWrapperV2";
// import { getLeaderboardDescs } from "../utils/utils";
import LeaderContainer from "./LeaderboardContainer";
import RulesContainer from "./RulesContainer";

interface Props {
  nav: navLevelsV2;
  leader: LeaderBoard;
  leaderboardWeek: string;
  onLeaderboardWeekChange: (newWeek: string) => void;
  signedInUser: UserInterface;
  parentPostId?: string;
  postEventId?: string;
  newAuthRequest: () => void;
  selectedEvent: EventInterface;
  parentEvent: EventInterface;
  // selectedLeaderboard: leaderboardKPIs;
  // onLeaderboardChange: (newL: leaderboardKPIs) => void;
  leaderboardMonth: string;
  onLeaderboardMonthChange: (newMonth: string) => void;
  isMember: true;
  savedList: string[];
  myUserRank?: UserRank;
  onParentPostChange: (newId: string) => void;
  onNavChange: (navLevel: navLevelsV2) => void;
}

const UnlockedProgramV2: React.FC<Props> = ({
  nav,
  leader,
  leaderboardWeek,
  signedInUser,
  onNavChange,
  parentPostId,
  onLeaderboardWeekChange,
  leaderboardMonth,
  onLeaderboardMonthChange,
  newAuthRequest,
  selectedEvent,
  parentEvent,
  // selectedLeaderboard,
  isMember,
  // onLeaderboardChange,
  savedList,
  myUserRank,
  onParentPostChange,
  postEventId,
}) => {
  // console.log("p", parentEvent);
  return (
    <div>
      {nav === "leaderboard" ? (
        <div className="px-2">
          <LeaderContainer
            eventKey={selectedEvent.eventKey ? selectedEvent.eventKey : ""}
            leaderboardWeek={leaderboardWeek}
            onLeaderboardWeekChange={onLeaderboardWeekChange}
            leaderboardMonth={leaderboardMonth}
            onLeaderboardMonthChange={onLeaderboardMonthChange}
            eventId={selectedEvent?.id}
            isAdmin={signedInUser?.role ? true : false}
            parentId={selectedEvent?.parentId}
            communityId={leader.uid}
            state={parentEvent.state}
            eventType={selectedEvent?.eventType}
            terraUser={signedInUser?.terraUser}
            uid={signedInUser?.uid}
            leaderKey={leader.userKey}
            isMember={isMember}
            challengeLength={parentEvent.configuration?.challengeLength}
            after={parentEvent.configuration?.starts}
            sprints={
              parentEvent.configuration?.sprints
                ? parentEvent.configuration?.sprints
                : []
            }
            rounds={
              parentEvent.configuration?.rounds
                ? parentEvent.configuration?.rounds
                : []
            }
            prizes={parentEvent.programDetails}
            savedList={savedList}
            myUserRank={myUserRank}
          />
        </div>
      ) : nav === "program" || nav === "compose" ? (
        <div className="min-h-[50vh]">
          <ProgramWrapperV2
            leader={leader}
            selectedEvent={selectedEvent}
            isMember={isMember}
            signedInUser={signedInUser}
            parentEvent={parentEvent}
            setAuthIsVisible={newAuthRequest}
            navState={nav}
            parentPostId={parentPostId}
            postEventId={postEventId}
            setParentPostId={onParentPostChange}
            onNavChange={onNavChange}
          />
        </div>
      ) : nav === "rules" ? (
        <div className="min-h-[50vh]">
          <RulesContainer gameId={parentEvent.id} />
          <div className="h-24" />
        </div>
      ) : null}
    </div>
  );
};

export default UnlockedProgramV2;
