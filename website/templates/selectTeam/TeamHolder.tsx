import { useEventCoaches } from "@hooks/community/useEventCoaches";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import { getDateStrings } from "@templates/community/LeaderboardWrapper/utils";
// import { useJoinChallenge } from "@hooks/community/useJoinChallenge";
import TeamCard from "./TeamCard";
// import CYWBtn from "@modules/WorkoutsV3/CYWBtn";
// import LineDivider from "@templates/editEvent/Form/SessionHolder/LineDivider";

interface Props {
  parentId?: string;
  leaderboardMonth?: string;
  // leaderboardWeek?: string;
  lpg?: string;
  ls?: string;
  queryChange?: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const TeamHolder: React.FC<Props> = ({
  parentId,
  leaderboardMonth,
  // leaderboardWeek,
  lpg,
  ls,
  queryChange,
}) => {
  const { rankCoaches, onNext, nextExists } = useEventCoaches(
    parentId,
    true,
    "overall",
    leaderboardMonth,
    undefined,
    undefined,
    undefined,
    lpg,
    ls,
    queryChange
  );

  // console.log("leaderboardMonth", leaderboardMonth);
  // console.log("rankCoaches", rankCoaches, parentId);

  const { targetRef } = useNextOnScroll(onNext, nextExists);

  const { yesterday, dayBefore } = getDateStrings();

  return (
    <div className="w-full">
      {rankCoaches.map((item) => {
        return (
          <div key={item.uid} className="pb-2.5 iphoneX:pb-4 w-full">
            <TeamCard
              team={item}
              week={"overall"}
              month={leaderboardMonth}
              yesterday={yesterday}
              dayBefore={dayBefore}
            />
          </div>
        );
      })}

      <div ref={targetRef} className="h-px" />
    </div>
  );
};

export default TeamHolder;
