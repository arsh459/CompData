import clsx from "clsx";
import { LeaderboardDescription, leaderboardKPIs } from "@models/Event/Event";

interface Props {
  selectedTab: leaderboardKPIs;
  leaderDescription: LeaderboardDescription[];
  onClick: (newVal: leaderboardKPIs) => void;
}

const LeaderFilterStrip: React.FC<Props> = ({
  onClick,
  selectedTab,
  leaderDescription,
}) => {
  return (
    <div className="flex items-center md:justify-center overflow-x-scroll scrollbar-hide no-scrollbar">
      {leaderDescription.map((item) => {
        return (
          <div key={item.kpi} className="pr-4">
            <div
              onClick={() => onClick(item.kpi)}
              className={clsx(
                item.kpi === selectedTab
                  ? "bg-gray-50 border-blue-500 border-2 shadow-md"
                  : "border-2 bg-gray-200",
                "px-4 py-2  rounded-full  cursor-pointer"
              )}
            >
              <p
                className={
                  clsx("text-gray-700", "text-base", "truncate")
                  // selectedTab === item
                  //   ? "text-orange-500 font-semibold underline"
                  //   : "text-gray-500"
                }
              >
                {item.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderFilterStrip;
