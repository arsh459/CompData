import { numberKeys, stringKeys } from "@hooks/tasks/useTask";
import { Exercise, Task } from "@models/Tasks/Task";
import { MenuItem, TextField } from "@mui/material";
import HandleExercise from "../HandleExercise";
import MakeStreamable from "../MakeStreamable";

interface Props {
  uid?: string;
  task?: Task;
  onStringUpdate: (key: stringKeys, newVal: string) => void;
  onNumberUpdate: (key: numberKeys, newVal: string) => void;
  onOrientationUpdate: (val: "landscape" | "portrait") => void;
  addExercise: (val: Exercise) => void;
  removeExercise: (val: Exercise) => void;
}

const WorkoutFields: React.FC<Props> = ({
  uid,
  task,
  onStringUpdate,
  onNumberUpdate,
  onOrientationUpdate,
  addExercise,
  removeExercise,
}) => {
  return (
    <>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"video Intro Duration"}
          label={"Intro End time of Activity in Seconds"}
          variant="outlined"
          onChange={(val) => onNumberUpdate("videoIntroDur", val.target.value)}
          value={task?.videoIntroDur || 0}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="p-4 border-2 border-red-500 my-4">
        <p className="text-xl font-bold">Can task stream?</p>
        <p className="text-lg text-red-500">ONLY FOR PRODUCTION TASKS</p>
        <MakeStreamable
          onUpdatePlayback={(val: string) => onStringUpdate("playbackId", val)}
          url={task?.avatar?.url}
          playbackId={task?.playbackId}
        />
      </div>

      <div className="p-4 border-2 border-red-500 my-4">
        <p className="text-xl font-bold">Can LOW RES task stream?</p>
        <p className="text-lg text-red-500">ONLY FOR PRODUCTION TASKS</p>
        <MakeStreamable
          onUpdatePlayback={(val: string) =>
            onStringUpdate("lowResPlaybackId", val)
          }
          url={task?.lowResMedia?.url}
          playbackId={task?.lowResPlaybackId}
        />
      </div>

      <div className="p-4 border-2 border-red-500 my-4">
        <p className="text-xl font-bold">Can Reel stream?</p>
        <p className="text-lg text-red-500">ONLY FOR PRODUCTION TASKS</p>
        <MakeStreamable
          onUpdatePlayback={(val: string) =>
            onStringUpdate("reelPlaybackId", val)
          }
          url={task?.reelMedia?.url}
          playbackId={task?.reelPlaybackId}
        />
      </div>
      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Orientation"}
          label={"Orientation"}
          variant="outlined"
          onChange={(e) =>
            onOrientationUpdate(
              e.target.value === "landscape" ? "landscape" : "portrait"
            )
          }
          value={task?.orientation || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value="portrait">portrait</MenuItem>
          <MenuItem value="landscape">landscape</MenuItem>
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>
      {task && uid ? (
        <HandleExercise
          task={task}
          uid={uid}
          addExercise={addExercise}
          removeExercise={removeExercise}
        />
      ) : null}
    </>
  );
};

export default WorkoutFields;
