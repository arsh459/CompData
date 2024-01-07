import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { EventInterface } from "@models/Event/Event";
import CommunityIllustration from "@templates/community/viewOnly/CommunityIllustration";

export interface CommunityHomeWrapperProps {
  leader: LeaderBoard;
  events: EventInterface[];
}

const CommunityHomeWrapper: React.FC<CommunityHomeWrapperProps> = ({
  leader,
  events,
}) => {
  return events.length > 0 ? (
    <CommunityIllustration
      leader={leader}
      allEvents={events}
      initialEventId={events[0].id}
      //   authStatus="FAILED"
      setAuthIsVisible={() => {}}
      //   allEventCohorts={{}}
    />
  ) : (
    <div />
  );
};

export default CommunityHomeWrapper;
