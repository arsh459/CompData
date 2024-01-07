import clsx from "clsx";
import {
  communityQueryV3,
  viewTypes,
} from "@hooks/community/v2/useCommunityParamsV3";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  urlState: communityQueryV3;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const LeaderboardViewSelector: React.FC<Props> = ({
  urlState,
  onQueryChange,
}) => {
  const handleQueryChange = (key: viewTypes) => {
    const query: communityQueryV3 = {};
    query.nav = urlState.nav;
    query.view = key;
    query.leaderboardWeek = urlState.leaderboardWeek;
    query.leaderboardMonth = urlState.leaderboardMonth;
    query.lS = "r";
    query.lpg = "1";
    onQueryChange(query);
    weEventTrack("gameLeaderboard_viewType", { viewType: key });
  };

  return (
    <div className="grid grid-cols-2 h-12 iphoneX:h-16 text-lg iphoneX:text-2xl">
      <button
        className={clsx(
          urlState.view === "players"
            ? "text-white bg-gradient-to-bl from-[#6AFFCD] to-[#4879FF] rounded-2xl font-extrabold"
            : "text-[#]"
        )}
        onClick={() => handleQueryChange("players")}
      >
        Players
      </button>
      <button
        className={clsx(
          urlState.view === "teams"
            ? "text-white bg-gradient-to-bl from-[#FFB47D] to-[#E84C87] rounded-2xl font-extrabold"
            : "text-[#]"
        )}
        onClick={() => handleQueryChange("teams")}
      >
        Teams
      </button>
    </div>
  );
};

export default LeaderboardViewSelector;
