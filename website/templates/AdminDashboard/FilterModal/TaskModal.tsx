import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
// import { usePlayerSearch } from "@hooks/search/usePlayerSearch";
import clsx from "clsx";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { useJudgeSearch } from "@hooks/search/useJudgeSearch";
import { useTaskSearch } from "@hooks/search/useTaskSearch";
import { Task } from "@models/Tasks/Task";

interface Props {
  q?: adminDashboardQuery;
  taskId?: string;
  taskName?: string;
  onClose: () => void;
  initString?: string;
  onOverrideSelect?: (task?: Task) => void;
  allTasksHidden?: boolean;
}

const TaskSearch: React.FC<Props> = ({
  q,
  onClose,
  taskId,
  taskName,
  onOverrideSelect,
  allTasksHidden,
}) => {
  const { searchString, setSearchString, fetchedData } =
    useTaskSearch(taskName);

  const router = useRouter();

  const onSelect = (task?: Task) => {
    if (onOverrideSelect) {
      onOverrideSelect(task);
    } else if (q) {
      q.taskId = task?.id ? task?.id : "";
      q.taskName = task?.name ? task.name : "";
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
        label="Search tasks"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className="overflow-y-scroll pt-2">
        {allTasksHidden ? null : (
          <p
            onClick={() => onSelect()}
            className={clsx(
              "text-orange-500",
              !taskId ? "font-bold" : "font-light",
              "cursor-pointer text-lg text-right"
            )}
          >
            ALL Tasks
          </p>
        )}
        {fetchedData.map((item) => {
          return (
            <div
              onClick={() => onSelect(item)}
              key={item.id}
              className="py-1 pl-1 cursor-pointer"
            >
              <p
                className={clsx(
                  taskId === item.id ? "font-bold" : "font-light",
                  "cursor-pointer text-lg text-left"
                )}
              >
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskSearch;
