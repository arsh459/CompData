import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { usePlayerSearch } from "@hooks/search/usePlayerSearch";
import clsx from "clsx";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";

interface Props {
  q: adminDashboardQuery;
  onClose: () => void;
  onSelectOverride?: (player?: UserInterface) => void;
  initialPlayerName?: string;
}

const PlayerSearch: React.FC<Props> = ({
  q,
  onClose,
  onSelectOverride,
  initialPlayerName,
}) => {
  const { searchString, setSearchString, fetchedData } =
    usePlayerSearch(initialPlayerName);

  const router = useRouter();

  const onSelect = (leaderboard?: UserInterface) => {
    if (onSelectOverride) {
      onSelectOverride(leaderboard);
      onClose();
    } else {
      q.player = leaderboard?.uid ? leaderboard?.uid : "";
      q.playerName = leaderboard?.name ? leaderboard.name : "";
      router.push(getQueryParamsForAdminDashboard(q), undefined, {
        shallow: true,
      });

      onClose();
    }
  };
  return (
    <div className="h-96 py-1">
      <TextField
        className="w-full"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        id="outlined-basic"
        label="Search player"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className="overflow-y-scroll pt-2">
        <p
          onClick={() => onSelect()}
          className={clsx(
            "text-orange-500",
            !q.player ? "font-bold" : "font-light",
            "cursor-pointer text-lg text-right"
          )}
        >
          ALL Players
        </p>
        {fetchedData.map((item) => {
          return (
            <div
              onClick={() => onSelect(item)}
              key={item.uid}
              className="py-1 pl-1 cursor-pointer"
            >
              <p
                className={clsx(
                  q.player === item.uid ? "font-bold" : "font-light",
                  "cursor-pointer text-lg text-left"
                )}
              >
                {item.name} | {item.fpCredit ? item.fpCredit : "0"} FP |{" "}
                {item.userLevelV2} lvl | {item.uid.slice(0, 5)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerSearch;
