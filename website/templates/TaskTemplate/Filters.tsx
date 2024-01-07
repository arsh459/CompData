import { SortTypes } from "@hooks/tasks/useTasks";
import { CollectionTypes, TaskTypes, taskTypeArr } from "@models/Tasks/Task";
import { Checkbox, MenuItem, TextField } from "@mui/material";

interface Props {
  collectionType: CollectionTypes;
  setCollectionType: (newVal: CollectionTypes) => void;
  sortBy: SortTypes;
  setSortBy: (newVal: SortTypes) => void;
  taskType: TaskTypes | "all";
  setTaskType: (newVal: TaskTypes | "all") => void;
  setIsReel?: (newVal: boolean) => void;
  isReel?: boolean;
}

const Filters: React.FC<Props> = ({
  collectionType,
  setCollectionType,
  sortBy,
  setSortBy,
  taskType,
  setTaskType,
  isReel,
  setIsReel,
}) => {
  return (
    <div className="w-full sm:w-1/2 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
      <TextField
        select
        placeholder={"Filter by Collection"}
        label={"Filter by Collection"}
        variant="outlined"
        onChange={(e) => setCollectionType(e.target.value as CollectionTypes)}
        value={collectionType}
        className="uppercase flex-1"
        InputLabelProps={{
          shrink: true,
        }}
      >
        <MenuItem key={"tasks"} value={"tasks"} className="uppercase">
          Tasks
        </MenuItem>
        <MenuItem key={"gptTasks"} value={"gptTasks"} className="uppercase">
          Gpt Tasks
        </MenuItem>
      </TextField>
      <TextField
        select
        placeholder={"Sort by order"}
        label={"Sort by order"}
        variant="outlined"
        onChange={(e) => setSortBy(e.target.value as SortTypes)}
        value={sortBy}
        className="uppercase flex-1"
        InputLabelProps={{
          shrink: true,
        }}
      >
        <MenuItem value="new_to_old" className="uppercase">
          {"new_to_old".replaceAll("_", " ")}
        </MenuItem>
        <MenuItem value="old_to_new" className="uppercase">
          {"old_to_new".replaceAll("_", " ")}
        </MenuItem>
        <MenuItem value="nothing" className="uppercase">
          {"nothing".replaceAll("_", " ")}
        </MenuItem>
      </TextField>
      <TextField
        select
        placeholder={"Filter by type"}
        label={"Filter by type"}
        variant="outlined"
        onChange={(e) => setTaskType(e.target.value as TaskTypes | "all")}
        value={taskType}
        className="uppercase flex-1"
        InputLabelProps={{
          shrink: true,
        }}
      >
        {taskTypeArr.map((each) => (
          <MenuItem key={each} value={each} className="uppercase">
            {each}
          </MenuItem>
        ))}
        <MenuItem value="all" className="uppercase">
          all
        </MenuItem>
      </TextField>

      {setIsReel ? (
        <div className="flex items-center">
          <Checkbox
            color="primary"
            checked={isReel}
            onChange={(e) => setIsReel(!isReel)}
          />
          <p className="text-gray-700">Reel Only</p>
        </div>
      ) : null}
    </div>
  );
};

export default Filters;
