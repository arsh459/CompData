import clsx from "clsx";
import { useEventCoaches } from "@hooks/community/useEventCoaches";
import Loading from "@components/loading/Loading";
import { getRank } from "../Program/MemberStrip/utils";
import TeamDetailsModal from "./TeamDetailsModal";
import Teams from "./Teams";
import { useState } from "react";
import { CoachRank } from "@models/Activities/Activity";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { SprintObject } from "@models/Event/Event";

interface Props {
  isModal?: boolean;
  eventName: string;
  parentId?: string;
  // selectedWeek?: string;
  // selectedMonth?: string;
  after?: number;
  myCoachRank?: CoachRank;
  yesterday: string;
  dayBefore: string;
  urlState?: communityQueryV3;
  onQueryChange: (querry: communityQueryV3, replace?: true) => void;
  gameStarts?: number;
  sprints?: SprintObject[];
}

const TeamsWise: React.FC<Props> = ({
  isModal,
  eventName,
  parentId,
  // selectedWeek,
  // selectedMonth,
  after,
  myCoachRank,
  yesterday,
  dayBefore,
  urlState,
  onQueryChange,
  gameStarts,
  sprints,
}) => {
  const [coachRank, setCoachRank] = useState<CoachRank>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // console.log("u", urlState);

  const { rankCoaches, loadingCoaches, onNext, nextExists } = useEventCoaches(
    parentId,
    true,
    urlState?.leaderboardWeek,
    urlState?.leaderboardMonth,
    after,
    6,
    myCoachRank,
    urlState?.lpg,
    urlState?.lS,
    onQueryChange
  );

  const onCoachClick = (coach: CoachRank) => {
    setCoachRank(coach);
    setIsOpen(true);
  };
  const { targetRef } = useNextOnScroll(onNext, nextExists);

  return (
    <>
      {loadingCoaches ? (
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
            isModal ? "" : "h-60"
          )}
        >
          {rankCoaches.map((each, index, arr) => (
            <Teams
              key={each.uid}
              selectedMonth={urlState?.leaderboardMonth}
              selectedWeek={urlState?.leaderboardWeek}
              each={each}
              isMe={each.uid === myCoachRank?.uid}
              isLast={index !== arr.length - 1}
              onClick={onCoachClick}
              yesterday={yesterday}
              dayBefore={dayBefore}
            />
          ))}
          <div ref={targetRef} className="h-px" />
        </div>
      )}
      {coachRank ? (
        <TeamDetailsModal
          isOpen={isOpen}
          onCloseModal={() => setIsOpen(false)}
          coachRank={coachRank}
          tamRank={getRank(
            coachRank,
            urlState?.leaderboardWeek,
            urlState?.leaderboardMonth
          )}
          sprints={sprints}
          gameStarts={gameStarts}
          leaderboardMonth={urlState?.leaderboardMonth}
          yesterday={yesterday}
          dayBefore={dayBefore}
        />
      ) : null}
    </>
  );
};

export default TeamsWise;
