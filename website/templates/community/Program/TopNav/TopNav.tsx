// import { navLevels } from "@hooks/community/useCommunityParams";
import { navLevelsV2 } from "@hooks/community/v2/useCommunityParamsV2";
import clsx from "clsx";

interface Props {
  selectedNav: navLevelsV2;
  onChangeSubNav: (newNav: navLevelsV2) => void;
}

const navItems: { text: string; key: navLevelsV2; altKey?: navLevelsV2 }[] = [
  {
    text: "Community",
    key: "program",
    altKey: "compose",
  },
  {
    text: "Leaderboard",
    key: "leaderboard",
  },
  {
    text: "Rules",
    key: "rules",
  },
];

const TopNav: React.FC<Props> = ({ selectedNav, onChangeSubNav }) => {
  return (
    <div className="flex items-center ">
      {navItems.map((item) => {
        return (
          <div key={item.key} className="pr-4">
            <p
              onClick={() => onChangeSubNav(item.key)}
              className={clsx(
                "text-2xl cursor-pointer",
                selectedNav === item.key || item.altKey === selectedNav
                  ? "text-blue-500 font-semibold underline"
                  : "text-gray-700"
              )}
            >
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TopNav;
