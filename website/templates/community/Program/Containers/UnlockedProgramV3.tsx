import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { EventInterface } from "@models/Event/Event";
import ProgramWrapperV3 from "@templates/community/ProgramWrapper/ProgramWrapperV3";
import { UserInterface } from "@models/User/User";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import LeaderboardWrapper from "@templates/community/LeaderboardWrapper/LeaderboardWrapper";
// import PrizesWrapperV2 from "../Prizes/PrizeWrapperV2";
import PrizesV2 from "../Prizes/PrizesV2";

interface Props {
  targetRef: (node: any) => void;
  urlState: communityQueryV3;
  onGoBack: () => void;
  parentEvent: EventInterface;

  selectedEvent: EventInterface;
  leader: LeaderBoard;
  // myUserRank?: UserRank;
  // isMember: true;
  // savedList: string[];

  signedInUser: UserInterface;
  baseShareURL: string;
  eventName: string;
  communityId: string;
  onQueryChange: (querry: communityQueryV3, replace?: true) => void;
}

const UnlockedProgramV3: React.FC<Props> = ({
  targetRef,
  urlState,
  onGoBack,
  parentEvent,
  signedInUser,
  baseShareURL,
  eventName,
  communityId,
  onQueryChange,
  // savedList,
  selectedEvent,
  leader,
  // myUserRank,
  // isMember,
}) => {
  return (
    <div ref={targetRef} className="flex-1 flex flex-col">
      {urlState.nav === "program" ? (
        <ProgramWrapperV3
          onGoBack={onGoBack}
          urlState={urlState}
          parentEvent={parentEvent}
          signedInUser={signedInUser}
          baseShareURL={baseShareURL}
          onQueryChange={onQueryChange}
          teamId={selectedEvent.id}
          communityId={leader.uid}
          leaderKey={leader.userKey ? leader.userKey : ""}
          eventKey={selectedEvent.eventKey ? selectedEvent.eventKey : ""}
        />
      ) : urlState.nav === "leaderboard" ? (
        <LeaderboardWrapper
          urlState={urlState}
          parentEvent={parentEvent}
          coachUser={leader}
          communityId={communityId}
          signedInUserId={signedInUser.uid}
          onQueryChange={onQueryChange}
          baseShareURL={baseShareURL}
          eventName={eventName}
        />
      ) : urlState.nav === "prizes" ? (
        <PrizesV2
          urlState={urlState}
          signedInUser={signedInUser}
          onQueryChange={onQueryChange}
          signedInUserId={signedInUser.uid}
          parentEvent={parentEvent}
          gameKPIs={parentEvent.configuration?.kpis}
          coachUID={communityId}
          leaderKey={leader.userKey ? leader.userKey : ""}
          eventKey={selectedEvent.eventKey ? selectedEvent.eventKey : ""}
        />
      ) : null}
    </div>
  );
};

export default UnlockedProgramV3;
