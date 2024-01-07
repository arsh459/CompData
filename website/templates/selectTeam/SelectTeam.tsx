import CYWBtn from "@modules/WorkoutsV3/CYWBtn";
import LineDivider from "@templates/editEvent/Form/SessionHolder/LineDivider";
// import Link from "next/link";
import TeamHolder from "./TeamHolder";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  // getCurrentMonthForPurchase,
  getCurrentRoundSprint,
} from "@hooks/community/challengeWeekUtils/utils";
import { EventInterface } from "@models/Event/Event";

interface Props {
  parentId?: string;
  parentKey?: string;
  game: EventInterface;
  // leaderboardMonth?: string;
  // leaderboardWeek?: string;
  lpg?: string;
  ls?: string;
  queryChange?: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const SelectTeam: React.FC<Props> = ({
  parentId,
  parentKey,
  // leaderboardMonth,
  // leaderboardWeek,
  lpg,
  ls,
  queryChange,
  game,
}) => {
  const res = getCurrentRoundSprint(
    game.configuration?.sprints,
    game.configuration?.rounds,
    game.configuration?.starts
  );

  // const { id } = getCurrentMonthForPurchase(
  //   game.configuration?.sprints,
  //   game.configuration?.starts,
  //   game.configuration?.challengeLength,
  //   game.configuration?.activeSprintId
  // );

  // console.log("id", id, game.configuration);

  return (
    <div className="p-4">
      <div className="px-4">
        <a href={`/joinBoatV3/${parentKey}`}>
          <CYWBtn
            gotoComponent={() => {
              weEventTrack("game_create_team", {});
            }}
            text="Join game by yourself"
          />
        </a>
      </div>

      <div className="w-full py-2.5 iphoneX:py-4">
        <LineDivider />
      </div>

      <div className="w-full">
        <p className="text-center text-gray-700 font-semibold text-xl iphoneX:text-2xl pb-2.5 iphoneX:b-4">
          Join a team
        </p>
        <TeamHolder
          parentId={parentId}
          leaderboardMonth={res?.selectedSprintId}
          lpg={lpg}
          ls={ls}
          queryChange={queryChange}
        />
      </div>
    </div>
  );
};

export default SelectTeam;
