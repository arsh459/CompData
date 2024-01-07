import clsx from "clsx";
import { useEventRanks } from "@hooks/community/useEventRanks";
import { useState } from "react";
import PlayerDetailsModal from "./PlayerDetailsModal";
import Loading from "@components/loading/Loading";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import { UserRank } from "@models/Activities/Activity";
// import { getPointsToShow, getRank } from "../Program/MemberStrip/utils";
import Player from "./Player";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { SprintObject } from "@models/Event/Event";

interface Props {
  isModal?: boolean;
  // eventName: string;
  parentId?: string;
  communityId: string;
  // after?: number;
  // selectedWeek?: string;
  // selectedMonth?: string;
  urlState?: communityQueryV3;
  myUserRank?: UserRank;
  yesterday: string;
  dayBefore: string;
  gameStarts?: number;
  sprints?: SprintObject[];
  onQueryChange: (querry: communityQueryV3, replace?: true) => void;
}

const PlayersWise: React.FC<Props> = ({
  isModal,
  // eventName,
  parentId,
  communityId,
  onQueryChange,
  // after,
  // selectedWeek,
  // selectedMonth,
  myUserRank,
  yesterday,
  dayBefore,
  urlState,
  sprints,
  gameStarts,
}) => {
  const [userRank, setUserRank] = useState<UserRank>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { rankMembers, loading, nextExists, onNext } = useEventRanks(
    parentId,
    communityId,
    5,
    urlState?.leaderboardWeek,
    urlState?.leaderboardMonth,
    // after,
    myUserRank,
    urlState?.lpg,
    urlState?.lS,
    onQueryChange
  );

  // useEffect(() => {
  //   if (isModal) {
  //     setAction('REFRESH');
  //   }
  // }, [isModal, setAction]);

  // console.log("myUserRank", myUserRank);
  // console.log("rankMembers", rankMembers);
  // [el, el, el, elSticky]
  // console.log("myUserRank", myUserRank);

  const { targetRef } = useNextOnScroll(onNext, nextExists);

  const onPlayerClick = (player: UserRank) => {
    setUserRank(player);
    setIsOpen(true);
  };

  return (
    <>
      {loading ? (
        <div
          className={clsx(
            "flex justify-center items-center my-1.5",
            isModal ? "h-full" : "h-60"
          )}
        >
          <Loading fill="#ff735c" width={40} height={40} />
        </div>
      ) : (
        <div
          className={clsx(
            "overflow-y-scroll scrollbar-hide relative m-2",
            !isModal && "h-60"
          )}
        >
          {rankMembers.map((each, index, arr) => (
            <Player
              key={each.uid}
              selectedMonth={urlState?.leaderboardMonth}
              selectedWeek={urlState?.leaderboardWeek}
              each={each}
              isMe={each.uid === myUserRank?.uid}
              isLast={index !== arr.length - 1}
              onClick={onPlayerClick}
              yesterday={yesterday}
              dayBefore={dayBefore}
            />
          ))}
          <div ref={targetRef} className="h-px" />
        </div>
      )}
      {userRank ? (
        <PlayerDetailsModal
          isOpen={isOpen}
          onCloseModal={() => setIsOpen(false)}
          userRank={userRank}
          leaderboardMonth={urlState?.leaderboardMonth}
          sprints={sprints}
          gameStarts={gameStarts}
          yesterday={yesterday}
          dayBefore={dayBefore}
        />
      ) : null}
    </>
  );
};

export default PlayersWise;
