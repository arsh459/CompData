import { numberKeys } from "@hooks/tasks/useTask";
import { Coord, Task } from "@models/Tasks/Task";
import { TextField } from "@mui/material";
import CoordsAdder from "../CoordsAdder";

interface Props {
  task?: Task;
  onNumberUpdate: (key: numberKeys, newVal: string) => void;
  onUpdateCoords: (newCoords: Coord[]) => void;
}

const PathFields: React.FC<Props> = ({
  task,
  onNumberUpdate,
  onUpdateCoords,
}) => {
  return (
    <>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Add Distance in m"}
          label={"Distance in m"}
          variant="outlined"
          onChange={(val) => onNumberUpdate("distance", val.target.value)}
          value={task?.distance || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <CoordsAdder coords={task?.path} onUpdateCoords={onUpdateCoords} />
      </div>
    </>
  );
};

export default PathFields;
