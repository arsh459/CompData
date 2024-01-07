import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
// import { useEffect, useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import PrizeCard from "./PrizeCard";
import { EventInterface, GameKPITarget } from "@models/Event/Event";
// import { Badge } from "@models/Prizes/PrizeV2";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@config/firebase";
import { useBadges } from "@hooks/badges/useBadges";
import {
  getCurrentMonth,
  getCurrentWeekV3,
} from "@hooks/community/challengeWeekUtils/utils";
import { useUserRank } from "@hooks/activities/userUserRank";
import { useCoachRank } from "@hooks/activities/useCoachRank";
import { UserInterface } from "@models/User/User";
// import { useUserRank } from "@hooks/activities/userUserRank";

interface Props {
  urlState: communityQueryV3;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
  signedInUserId?: string;
  parentEvent: EventInterface;
  leaderKey: string;
  eventKey: string;
  coachUID: string;
  signedInUser: UserInterface;
  gameKPIs?: GameKPITarget[];
}

const PrizesV2: React.FC<Props> = ({
  urlState,
  onQueryChange,
  signedInUserId,
  parentEvent,
  leaderKey,
  eventKey,
  coachUID,
  signedInUser,
  gameKPIs,
}) => {
  const { badges } = useBadges(parentEvent.id, urlState.prizesFor);

  const sprintId = getCurrentMonth(
    parentEvent.configuration?.sprints,
    parentEvent.configuration?.starts,
    parentEvent.configuration?.challengeLength
  );
  const { roundId } = getCurrentWeekV3(
    parentEvent.configuration?.rounds,
    parentEvent.configuration?.starts,
    parentEvent.configuration?.challengeLength
  );

  const { myUserRank } = useUserRank(parentEvent.id, signedInUserId);
  const { myCoachRank } = useCoachRank(parentEvent.id, coachUID);
  // const [badges, setBadges] = useState<Badge[]>([]);

  // useEffect(() => {
  //   const helperFunc = async () => {
  //     const gameRef = doc(db, "sbEvents", parentEvent.id);
  //     const game: EventInterface = (
  //       await getDoc(gameRef)
  //     ).data() as EventInterface;
  //     if (game.badges) {
  //       setBadges(game.badges);
  //     }
  //   };
  //   helperFunc();
  // }, [parentEvent]);

  return (
    <BackgroundWrapper urlState={urlState} onQueryChange={onQueryChange}>
      <div className="bg-gradient-to-b from-[#2D2D2D] to-[#131313] rounded-xl">
        {badges?.map((item, index) =>
          item.badgeId !== "relative" && item.badgeId !== "independent" ? (
            <div key={item.id} className="p-2">
              <PrizeCard
                badge={item}
                leaderKey={leaderKey}
                eventKey={eventKey}
                roundId={roundId}
                sprintId={sprintId}
                userRank={myUserRank}
                teamRank={myCoachRank}
                user={signedInUser}
                gameKPIs={gameKPIs}
                gameId={parentEvent.id}
                gameType={parentEvent.configuration?.gameType}
                signedInUserId={signedInUserId}
              />
            </div>
          ) : null
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default PrizesV2;
