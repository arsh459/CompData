import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import UserLeaderboardRank from "./UserLeaderboardRank";
import LeaderboardViewSelector from "./LeaderboardViewSelector";
import LeaderboardDetails from "./LeaderboardDetails";
import LeaderboardLevelUp from "./LeaderboardLevelUp";
import ExpandModal from "./ExpandModal";
import { useState } from "react";
import { EventInterface } from "@models/Event/Event";
import { useUserRank } from "@hooks/activities/userUserRank";
import { useCoachRank } from "@hooks/activities/useCoachRank";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { getUserRank } from "./utils";
import { useCompetition } from "@hooks/activities/useCompetition";

interface Props {
  urlState: communityQueryV3;
  baseShareURL: string;
  eventName: string;
  signedInUserId?: string;
  communityId: string;
  parentEvent: EventInterface;
  coachUser: LeaderBoard;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const LeaderboardWrapper: React.FC<Props> = ({
  urlState,
  baseShareURL,
  eventName,
  signedInUserId,
  communityId,
  parentEvent,
  onQueryChange,
  coachUser,
}) => {
  const [isOpenExpandModal, setIsOpenExpandModal] = useState<boolean>(false);
  const { myUserRank } = useUserRank(parentEvent.id, signedInUserId);
  const { myCoachRank } = useCoachRank(parentEvent.id, coachUser.uid);

  const activeRank = getUserRank(
    myUserRank,
    urlState.leaderboardWeek,
    urlState.leaderboardMonth,
    urlState.period
  );
  const activeTeamRank = getUserRank(
    myCoachRank,
    urlState.leaderboardWeek,
    urlState.leaderboardMonth,
    urlState.period
  );

  const { competition, userType } = useCompetition(
    parentEvent.id,
    activeRank.rank,
    activeTeamRank.rank,
    urlState.view,
    urlState.leaderboardWeek,
    urlState.leaderboardMonth,
    urlState.period
  );

  const competitionRank = getUserRank(
    competition,
    urlState.leaderboardWeek,
    urlState.leaderboardMonth,
    urlState.period
  );

  // console.log("competition", competitionRank, activeTeamRank);

  return (
    <>
      <div>
        <UserLeaderboardRank
          activeRank={activeRank.rank}
          activeTeamRank={activeTeamRank.rank}
        />
        <div className="p-4">
          <LeaderboardViewSelector
            urlState={urlState}
            onQueryChange={onQueryChange}
          />
          <LeaderboardDetails
            urlState={urlState}
            openExpandModal={() => setIsOpenExpandModal(true)}
            eventName={eventName}
            communityId={communityId}
            parentEvent={parentEvent}
            onQueryChange={onQueryChange}
            myUserRank={myUserRank}
            myCoachRank={myCoachRank}
          />
          {userType === urlState.view ? (
            <LeaderboardLevelUp
              viewType={urlState.view}
              myUserRank={myUserRank}
              signedInUserId={signedInUserId}
              baseShareURL={baseShareURL}
              gameId={parentEvent.id}
              activeRank={activeRank.rank}
              myPoints={activeRank.pts}
              activeTeamRank={activeTeamRank.rank}
              teamPts={activeTeamRank.pts}
              comptitionRank={competitionRank.rank}
              competitionPts={competitionRank.pts}
            />
          ) : null}
        </div>
      </div>
      <ExpandModal
        isOpen={isOpenExpandModal}
        onCloseModal={() => setIsOpenExpandModal(false)}
      >
        <LeaderboardDetails
          urlState={urlState}
          onCloseExpandModal={() => setIsOpenExpandModal(false)}
          eventName={eventName}
          communityId={communityId}
          parentEvent={parentEvent}
          onQueryChange={onQueryChange}
          myUserRank={myUserRank}
          myCoachRank={myCoachRank}
        />
      </ExpandModal>
    </>
  );
};

export default LeaderboardWrapper;
