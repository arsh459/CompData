import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
// import { usePlayerSearch } from "@hooks/search/usePlayerSearch";
import clsx from "clsx";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { useJudgeSearch } from "@hooks/search/useJudgeSearch";

interface Props {
  q?: adminDashboardQuery;
  onClose: () => void;
  selectedId: string;
  onSelectOverride?: (item?: LeaderBoard) => void;
  allJudgesHidden?: boolean;
}

const JudgesSearch: React.FC<Props> = ({
  q,
  onClose,
  selectedId,
  onSelectOverride,
  allJudgesHidden,
}) => {
  const { searchString, setSearchString, fetchedData } = useJudgeSearch();

  const router = useRouter();

  const onSelect = (leaderboard?: LeaderBoard) => {
    if (onSelectOverride) {
      onSelectOverride(leaderboard);
    } else if (q) {
      q.agent = leaderboard?.uid ? leaderboard?.uid : "";
      q.agentName = leaderboard?.name ? leaderboard.name : "";
      router.push(getQueryParamsForAdminDashboard(q), undefined, {
        shallow: true,
      });
    }

    onClose();
  };
  return (
    <div className="h-96 py-1">
      <TextField
        className="w-full"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        id="outlined-basic"
        label="Search judge"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className="overflow-y-scroll pt-2">
        {allJudgesHidden ? null : (
          <p
            onClick={() => onSelect()}
            className={clsx(
              "text-orange-500",
              !selectedId ? "font-bold" : "font-light",
              "cursor-pointer text-lg text-right"
            )}
          >
            ALL Judges
          </p>
        )}
        {fetchedData.map((item) => {
          return (
            <div
              onClick={() => onSelect(item)}
              key={item.uid}
              className="py-1 pl-1 cursor-pointer"
            >
              <p
                className={clsx(
                  selectedId === item.uid ? "font-bold" : "font-light",
                  "cursor-pointer text-lg text-left"
                )}
              >
                {item.name} | {item.phone ? item.phone : "0"} |{" "}
                {item.uid.slice(0, 4)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JudgesSearch;
