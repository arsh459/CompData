import { weEventTrack } from "@analytics/webengage/user/userLog";
import InfoBtn from "@components/InfoBtn";
import MediaCard from "@components/MediaCard";
import { STUDENT_OLYMPICS } from "@constants/gameStats";
import { useJoinStatus } from "@hooks/community/useJoinStatus";
// import { useParentEvent } from "@hooks/community/v2/useParentEvent";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { EventInterface } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
// import Link from "next/link";
import ChallengeEndsV2 from "./ChallengeEndsV2";
import GameDetails from "./GameDetails";
interface Props {
  event?: EventInterface;
  game: EventInterface;
  signedInUser?: UserInterface;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
}

const GamesCardV2: React.FC<Props> = ({
  event,
  signedInUser,
  authStatus,
  game,
}) => {
  // const { parentEvent } = useParentEvent(event.parentId);
  const { leader } = useLeaderboard(event?.ownerUID);

  const { isMember } = useJoinStatus(
    event,
    signedInUser,
    undefined,
    authStatus
  );

  return (
    <div className="rounded-xl overflow-hidden relative z-0">
      {game.media.length ? (
        <MediaCard
          media={game.media[0]}
          thumbnail={game.thumbnail}
          heightString="h-[250px] iphoneX:h-[300px]"
        />
      ) : (
        <div className="w-full h-[250px] iphoneX:h-[300px] bg-gray-500" />
      )}
      <div className="absolute top-0 left-0 right-0 z-10 p-2.5 flex justify-between bg-gradient-to-b from-black/80 to-transparent">
        <a
          href={
            game.id === STUDENT_OLYMPICS
              ? "https://socialboat.page.link/FhSa"
              : "https://socialboat.page.link/tTRV"
          }
          onClick={() =>
            weEventTrack("teamsHome_gameIClick", {
              gameName: game.name,
            })
          }
        >
          <InfoBtn />
        </a>
        <ChallengeEndsV2 parentEvent={game} />
      </div>
      <GameDetails
        event={event}
        parentEvent={game}
        leader={leader}
        isMember={isMember}
      />
    </div>
  );
};

export default GamesCardV2;
