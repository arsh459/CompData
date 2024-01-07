import { CollectionTypes } from "@models/Tasks/Task";
import { Checkbox, MenuItem, TextField } from "@mui/material";

interface Props {
  collectionType: CollectionTypes;
  setCollectionType: (newVal: CollectionTypes) => void;
  setIsExercise?: (newVal: boolean) => void;
  isExercise?: boolean;
}

const Filters: React.FC<Props> = ({
  collectionType,
  setCollectionType,

  isExercise,
  setIsExercise,
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

      {setIsExercise ? (
        <div className="flex items-center">
          <Checkbox
            color="primary"
            checked={isExercise}
            onChange={(e) => setIsExercise(!isExercise)}
          />
          <p className="text-gray-700">is Exercise</p>
        </div>
      ) : null}
    </div>
  );
};

export default Filters;
