import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
// import { usePlayerSearch } from "@hooks/search/usePlayerSearch";
import clsx from "clsx";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { useTeamSearch } from "@hooks/search/useTeamSearch";
import { EventInterface } from "@models/Event/Event";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";

interface Props {
  q: adminDashboardQuery;
  onClose: () => void;
}

const TeamsSearch: React.FC<Props> = ({ q, onClose }) => {
  const { searchString, setSearchString, fetchedData } = useTeamSearch();

  const router = useRouter();

  const onSelect = (sbEvent?: EventInterface) => {
    q.team = sbEvent?.id ? sbEvent?.id : "";
    q.teamName = sbEvent?.name ? sbEvent.name : "";
    router.push(getQueryParamsForAdminDashboard(q), undefined, {
      shallow: true,
    });

    onClose();
  };
  return (
    <div className="h-96 py-1">
      <TextField
        className="w-full"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        id="outlined-basic"
        label="Search teams"
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
          ALL Teams
        </p>
        {fetchedData.map((item) => {
          return (
            <div
              onClick={() => onSelect(item)}
              key={item.id}
              className="py-1 pl-1 cursor-pointer"
            >
              <p
                className={clsx(
                  q.team === item.id ? "font-bold" : "font-light",
                  "cursor-pointer text-lg text-left"
                )}
              >
                {item.name} | {getGameNameReadable(item.parentId)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamsSearch;
