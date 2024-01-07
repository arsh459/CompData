import { useCoachRank } from "@hooks/activities/useCoachRank";
import { useBadges } from "@hooks/badges/useBadges";
import { UserRank } from "@models/Activities/Activity";
import { GameKPITarget, gameTypes } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
import PrizeCard from "@templates/community/Program/Prizes/PrizesV2/PrizeCard";
import React from "react";

interface Props {
  gameId: string;
  sprintId?: string;
  roundId?: string;
  myUserRank?: UserRank;
  leaderKey: string;
  coachUID: string;
  uid: string;
  eventKey: string;
  user: UserInterface;
  isGoalWidget?: boolean;
  hidePlayNow?: boolean;
  gameKPIs?: GameKPITarget[];
  gameType?: gameTypes;
}

const PrizeList: React.FC<Props> = ({
  gameId,
  uid,
  leaderKey,
  eventKey,
  user,
  roundId,
  sprintId,
  myUserRank,
  isGoalWidget,
  hidePlayNow,
  gameKPIs,
  gameType,
}) => {
  const { myCoachRank } = useCoachRank(gameId, myUserRank?.coachCommunityId);
  const { badges } = useBadges(gameId);

  // console.log("myCoach", myCoachRank);

  return (
    <div>
      {badges.map((item, index) => {
        if (
          item.badgeId !== "spotlight" &&
          item.badgeId !== "independent" &&
          item.badgeId !== "relative"
        )
          return (
            <div key={`${item.id}-${index}`} className="pb-1">
              <PrizeCard
                badge={item}
                leaderKey={leaderKey}
                eventKey={eventKey}
                signedInUserId={user.uid}
                sprintId={sprintId}
                userRank={myUserRank}
                teamRank={myCoachRank}
                gameType={gameType}
                user={user}
                gameId={gameId}
                roundId={roundId}
                hidePrizes={true}
                isGoalWidget={isGoalWidget}
                hidePlayNow={hidePlayNow}
                gameKPIs={gameKPIs}
              />
            </div>
          );
      })}
    </div>
  );
};

export default PrizeList;
