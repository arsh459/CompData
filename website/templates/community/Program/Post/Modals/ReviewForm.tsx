import { TextField, Checkbox } from "@mui/material";
import TaskNameDrop from "./TaskNameDrop";

interface Props {
  calories?: number;
  setCalories: (calCount: number) => void;
  fitPoints?: number;
  setFitPoints: (points: number) => void;
  distance?: number;
  time?: number;

  setDistance: (dist: number) => void;
  setTime: (time: number) => void;
  notifyFlag: boolean;
  updateNotify: (newFlag: boolean) => void;
  onSelectName: (name: string) => void;
  taskId: string;
  updateTaskId: (tId: string) => void;
  //   date: Date | null | undefined;
  //   setDate: (newDate: Date | null) => void;
}

const ReviewForm: React.FC<Props> = ({
  calories,
  // fitPoints,
  setCalories,
  // setFitPoints,
  distance,
  time,
  setDistance,
  setTime,
  updateNotify,
  notifyFlag,
  taskId,
  updateTaskId,
  onSelectName,
  //   date,
  //   setDate,
}) => {
  return (
    <div>
      <div>
        <div className="pb-4">
          <TaskNameDrop
            onSelectId={updateTaskId}
            onSelectName={onSelectName}
            selectedId={taskId}
          />
        </div>
        {typeof calories === "number" ? (
          <TextField
            style={{ width: "100%" }}
            helperText="Calories"
            placeholder="Calories"
            type="number"
            label="Add calories"
            variant="outlined"
            onChange={(newVal) => setCalories(parseInt(newVal.target.value))}
            value={calories ? calories : 0}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : null}
      </div>
      {/* <div className="pt-4">
        {typeof fitPoints === "number" ? (
          <TextField
            style={{ width: "100%" }}
            helperText="Fit points"
            placeholder="Fit points"
            label="Add fitpoints"
            variant="outlined"
            onChange={(newVal) => setFitPoints(parseInt(newVal.target.value))}
            value={fitPoints ? fitPoints : 0}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : null}
      </div> */}
      {/* <div className="pt-4">
        {typeof distance === "number" ? (
          <TextField
            style={{ width: "100%" }}
            helperText="Distance in m"
            placeholder="meters run"
            label="Add Distance (m)"
            variant="outlined"
            onChange={(newVal) => setDistance(parseInt(newVal.target.value))}
            value={distance ? distance : 0}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : null}
      </div> */}
      {/* <div className="pt-4">
        {typeof time === "number" ? (
          <TextField
            style={{ width: "100%" }}
            helperText="Time in seconds"
            placeholder="seconds"
            label="Add time (s)"
            variant="outlined"
            onChange={(newVal) => setTime(parseInt(newVal.target.value))}
            value={time ? time : 0}
            InputLabelProps={{
                shrink: true,
              }}
          />
        ) : null}
      </div> */}

      <div className="flex items-center">
        <Checkbox
          color="primary"
          checked={notifyFlag}
          onChange={() => updateNotify(!notifyFlag)}
        />
        <p className="text-gray-700">Notify User</p>
      </div>
    </div>
  );
};

export default ReviewForm;
