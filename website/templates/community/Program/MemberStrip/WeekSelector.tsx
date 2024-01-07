// import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";
import { weekStateInterface } from "@hooks/community/useChallengeWeeks";
// import { getWeekString } from "@templates/community/Members/utils";
import clsx from "clsx";

interface Props {
  // leaderboardWeek?: leaderboardWeekTypes;
  leaderboardWeeks: weekStateInterface[];
  selectedMonth: string;
  currentWeek: string;
  selectedWeek?: string;
  onLeaderboardWeekChange: (newWeek: string) => void;
  // onLeaderboardWeekChange: (newWeek: leaderboardWeekTypes) => void;
}

const WeekSelector: React.FC<Props> = ({
  leaderboardWeeks,
  currentWeek,
  selectedWeek,
  selectedMonth,
  onLeaderboardWeekChange,
}) => {
  return (
    <div className="flex flex-row justify-start bg-gray-200 border overflow-x-scroll w-full scrollbar-hide">
      <div
        onClick={() => onLeaderboardWeekChange("overall")}
        className={clsx(
          "cursor-pointer",
          "flex-none",
          selectedWeek === "overall" ? "border-b-2 border-gray-700" : ""
        )}
      >
        <p
          className={clsx(
            selectedWeek === "overall"
              ? "text-gray-700 font-semibold "
              : "text-gray-500 font-medium",
            " text-lg capitalize px-4 py-2"
          )}
        >
          Overall
        </p>
      </div>
      {leaderboardWeeks.map((item) => {
        if (item.month === selectedMonth) {
          return (
            <div
              key={item.key}
              onClick={() => onLeaderboardWeekChange(item.key)}
              className={clsx(
                "cursor-pointer",
                "flex-none",
                selectedWeek === item.key ? "border-b-2 border-gray-700" : ""
              )}
            >
              <p
                className={clsx(
                  selectedWeek === item.key
                    ? "text-gray-700 font-semibold "
                    : "text-gray-500 font-medium",
                  "text-lg capitalize px-4 py-2"
                )}
              >
                {item.key === currentWeek ? "Current Week" : item.value}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default WeekSelector;
