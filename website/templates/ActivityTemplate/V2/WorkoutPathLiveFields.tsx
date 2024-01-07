import { boolKeys, numberKeys, stringKeys } from "@hooks/tasks/useTask";
import { DifficultyLevelsTypes, Equipment, Task } from "@models/Tasks/Task";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import HandleEquipment from "../HandleEquipment";

interface Props {
  task?: Task;
  onBoolUpdate: (key: boolKeys, newVal: boolean) => void;
  onNumberUpdate: (key: numberKeys, newVal: string) => void;
  onStringUpdate: (key: stringKeys, newVal: string) => void;
  addEquipment: (val: Equipment) => void;
  removeEquipment: (val: Equipment) => void;
  onUpdateDifficultyLevel: (val: DifficultyLevelsTypes) => void;
}

const WorkoutPathLiveFields: React.FC<Props> = ({
  task,
  onBoolUpdate,
  onNumberUpdate,
  onStringUpdate,
  addEquipment,
  removeEquipment,
  onUpdateDifficultyLevel,
}) => {
  return (
    <>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"FitPoints you will earn with this activity"}
          label={"FitPoints"}
          variant="outlined"
          onChange={(val) => onNumberUpdate("fitPoints", val.target.value)}
          value={task?.fitPoints || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <HandleEquipment
        task={task}
        addEquipment={addEquipment}
        removeEquipment={removeEquipment}
      />
      <div className="pt-4 flex flex-wrap items-center">
        <div className="px-4 flex items-center">
          <Checkbox
            color="primary"
            checked={task?.freeTask ? true : false}
            onChange={() =>
              onBoolUpdate("freeTask", task?.freeTask ? false : true)
            }
          />
          <p className="text-gray-700">Free Task?</p>
        </div>

        <div className="px-4 flex items-center">
          <Checkbox
            color="primary"
            checked={task?.preview ? true : false}
            onChange={() =>
              onBoolUpdate("preview", task?.preview ? false : true)
            }
          />
          <p className="text-gray-700">Preview Task</p>
        </div>

        <div className="px-4 flex items-center">
          <Checkbox
            color="primary"
            checked={task?.landingPage ? true : false}
            onChange={() =>
              onBoolUpdate("landingPage", task?.landingPage ? false : true)
            }
          />
          <p className="text-gray-700">Landing Page</p>
        </div>
      </div>
      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Difficulty Levels"}
          label={"Difficulty Levels"}
          variant="outlined"
          onChange={(e) =>
            onUpdateDifficultyLevel(e.target.value as DifficultyLevelsTypes)
          }
          value={task?.difficultyLevels || "NO ENTRY"}
        >
          <MenuItem value={"easy"}>Easy</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"hard"}>Hard</MenuItem>
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Rules to remember"}
          label={"Rules"}
          multiline={true}
          minRows={4}
          variant="outlined"
          onChange={(val) => onStringUpdate("rules", val.target.value)}
          value={task?.rules || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </>
  );
};

export default WorkoutPathLiveFields;
