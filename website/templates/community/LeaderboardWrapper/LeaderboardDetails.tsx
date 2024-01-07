import {
  communityQueryV3,
  period,
} from "@hooks/community/v2/useCommunityParamsV3";
import clsx from "clsx";
import { useState } from "react";
import PlayersWise from "./PlayersWise";
import TeamsWise from "./TeamsWise";
import PeriodModal from "./PeriodModal";
import LeaderboardDetailsHeader from "./LeaderboardDetailsHeader";
import { CoachRank, UserRank } from "@models/Activities/Activity";
import { useChallengeWeeks } from "@hooks/community/useChallengeWeeks";
import { EventInterface } from "@models/Event/Event";
import { getDateStrings } from "./utils";
// import { useEventRanks } from "@hooks/community/useEventRanks";

interface Props {
  urlState: communityQueryV3;
  openExpandModal?: () => void;
  onCloseExpandModal?: () => void;
  eventName: string;
  communityId: string;
  parentEvent: EventInterface;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
  myUserRank?: UserRank;
  myCoachRank?: CoachRank;
}

const { yesterday, dayBefore } = getDateStrings();

const LeaderboardDetails: React.FC<Props> = ({
  urlState,
  openExpandModal,
  onCloseExpandModal,
  eventName,
  communityId,
  parentEvent,
  onQueryChange,
  myUserRank,
  myCoachRank,
}) => {
  // const [period, setPeriod] = useState<"month" | "week">("month");
  const [isOpenPeriodModal, setIsOpenPeriodModal] = useState<boolean>(false);

  const rounds = parentEvent.configuration?.rounds
    ? parentEvent.configuration?.rounds
    : [];
  const sprints = parentEvent.configuration?.sprints
    ? parentEvent.configuration?.sprints
    : [];

  const { weekString, monthStrings, weekStrings, monthString } =
    useChallengeWeeks(
      sprints,
      rounds,
      parentEvent.configuration?.starts,
      parentEvent.configuration?.challengeLength
    );

  // const { rankMembers, loading, nextExists, onNext, setAction } = useEventRanks(
  //   parentEvent.id,
  //   communityId,
  //   5,
  //   urlState.leaderboardWeek,
  //   urlState.leaderboardMonth,
  //   // parentEvent.configuration?.starts,
  //   myUserRank
  // );

  const setPeriod = (newPeriod: period) => {
    // console.log("newPeriod", newPeriod);
    onQueryChange({
      ...urlState,
      period: newPeriod,
      ...(newPeriod === "month" ? { leaderboardWeek: "overall" } : {}),
      lS: `r_${Math.floor(Math.random() * 1000)}`,
    });
  };

  return (
    <>
      <div
        className={clsx(
          "text-white overflow-hidden",
          openExpandModal ? "my-4 rounded-2xl" : "h-full flex flex-col",
          urlState.view === "players"
            ? "bg-gradient-to-b from-[#0A568C] to-[#002D4D]"
            : "bg-gradient-to-b from-[#B54963] to-[#5C0014]"
        )}
      >
        <LeaderboardDetailsHeader
          urlState={urlState}
          setPeriod={setPeriod}
          leaderboardWeeks={weekStrings}
          leaderboardMonths={monthStrings}
          openExpandModal={openExpandModal}
          onCloseExpandModal={onCloseExpandModal}
          setIsOpenPeriodModal={setIsOpenPeriodModal}
        />
        {urlState.view === "players" ? (
          <PlayersWise
            isModal={openExpandModal ? false : true}
            onQueryChange={onQueryChange}
            parentId={parentEvent.id}
            communityId={communityId}
            // after={parentEvent.configuration?.starts}
            urlState={urlState}
            // selectedWeek={urlState.leaderboardWeek}
            // selectedMonth={urlState.leaderboardMonth}
            myUserRank={myUserRank}
            yesterday={yesterday}
            dayBefore={dayBefore}
            sprints={parentEvent.configuration?.sprints}
            gameStarts={parentEvent.configuration?.starts}
          />
        ) : (
          <TeamsWise
            isModal={openExpandModal ? false : true}
            eventName={eventName}
            parentId={parentEvent.id}
            after={parentEvent.configuration?.starts}
            urlState={urlState}
            // selectedWeek={urlState.leaderboardWeek}
            // selectedMonth={urlState.leaderboardMonth}
            myCoachRank={myCoachRank}
            yesterday={yesterday}
            dayBefore={dayBefore}
            onQueryChange={onQueryChange}
            sprints={parentEvent.configuration?.sprints}
            gameStarts={parentEvent.configuration?.starts}
          />
        )}
      </div>
      <PeriodModal
        gameName={parentEvent.name}
        urlState={urlState}
        isOpen={isOpenPeriodModal}
        onCloseModal={() => setIsOpenPeriodModal(false)}
        period={urlState.period}
        current={urlState.period === "week" ? weekString : monthString}
        leaderboard={urlState.period === "week" ? weekStrings : monthStrings}
        onQueryChange={onQueryChange}
      />
    </>
  );
};

export default LeaderboardDetails;
