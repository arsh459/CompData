import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  communityQueryV3,
  navLevelsV3,
} from "@hooks/community/v2/useCommunityParamsV3";
import clsx from "clsx";

interface Props {
  selectedNav: navLevelsV3;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
  leaderboardInitialParams: (querry: communityQueryV3) => void;
}

const navItems: { text: string; key: navLevelsV3 }[] = [
  {
    text: "Community",
    key: "program",
  },
  {
    text: "Leaderboard",
    key: "leaderboard",
  },
  {
    text: "Prizes",
    key: "prizes",
  },
];

const TopNavV2: React.FC<Props> = ({
  selectedNav,
  onQueryChange,
  leaderboardInitialParams,
}) => {
  const handleQueryChange = (key: navLevelsV3) => {
    const query: communityQueryV3 = {};
    query.nav = key;
    if (key === "leaderboard") {
      leaderboardInitialParams(query);
    } else if (key === "prizes") {
      query.prizesFor = "monthly";
    }
    onQueryChange(query);
    weEventTrack("game_navClick", { navValue: key });
  };

  return (
    <div className="flex items-center bg-[#D5D5DB]">
      {navItems.map((item) => {
        return (
          <div key={item.key} className="w-1/3 text-center">
            <p
              onClick={() => handleQueryChange(item.key)}
              className={clsx(
                "text-sm iphoneX:text-lg cursor-pointer py-4 font-extrabold",
                selectedNav === item.key ? "text-[#203C51]" : "text-black/50"
              )}
            >
              {item.text}
            </p>
            {selectedNav === item.key ? (
              <div className="w-full h-1 bg-[#203C51]" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default TopNavV2;
