import { boolKeys, numberKeys, stringKeys } from "@hooks/tasks/useTask";
import { Task, taskTypeArr, TaskTypes } from "@models/Tasks/Task";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import HandleTags from "../HandleTags";

interface Props {
  task?: Task;
  onUpdateTaskType: (val: TaskTypes) => void;
  onNumberUpdate: (key: numberKeys, newVal: string) => void;
  onStringUpdate: (key: stringKeys, newVal: string) => void;
  onBoolUpdate: (key: boolKeys, newVal: boolean) => void;
  addTags: (steps: string, index?: number | undefined) => void;
  removeTags: (step: string) => void;
  gptGenerated?: boolean;
}

const CommonFields: React.FC<Props> = ({
  task,
  onUpdateTaskType,
  onNumberUpdate,
  onStringUpdate,
  onBoolUpdate,
  addTags,
  removeTags,
  gptGenerated,
}) => {
  return (
    <>
      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Type of Task"}
          label={"Type of Task"}
          variant="outlined"
          onChange={(e) => onUpdateTaskType(e.target.value as TaskTypes)}
          value={task?.taskType || "NO ENTRY"}
          className="uppercase"
          InputLabelProps={{
            shrink: true,
          }}
        >
          {taskTypeArr.map((each) => (
            <MenuItem key={each} value={each} className="uppercase">
              {each}
            </MenuItem>
          ))}
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"What people will call this activity"}
          label={"Name of Activity"}
          variant="outlined"
          onChange={(val) => onStringUpdate("name", val.target.value)}
          value={task?.name || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      {gptGenerated ? (
        <>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Base Task Id"}
              label={"Base Task Id"}
              variant="outlined"
              onChange={(val) => onStringUpdate("baseTaskId", val.target.value)}
              value={task?.baseTaskId || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Image generated for custom Recipes"}
              label={"Image Generated for Custom Recipes"}
              variant="outlined"
              onChange={(val) =>
                onStringUpdate("gptImageUrl", val.target.value)
              }
              value={task?.gptImageUrl || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <img src={task?.gptImageUrl} alt="gpt generated image" />
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Description of Task"}
          label={"Description"}
          variant="outlined"
          multiline={true}
          minRows={4}
          onChange={(val) => onStringUpdate("description", val.target.value)}
          value={task?.description || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"UID of creator"}
          label={"UserId"}
          variant="outlined"
          onChange={(val) => onStringUpdate("userId", val.target.value)}
          value={task?.userId}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Speciality Text"}
          label={"Speciality Text"}
          variant="outlined"
          onChange={(val) => onStringUpdate("specialityText", val.target.value)}
          value={task?.specialityText}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"PT20M"}
          label={"Prep Time"}
          variant="outlined"
          onChange={(val) => onStringUpdate("prepTime", val.target.value)}
          value={task?.prepTime}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"PT20M"}
          label={"Cook Time"}
          variant="outlined"
          onChange={(val) => onStringUpdate("cookTime", val.target.value)}
          value={task?.cookTime}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Yields"}
          label={"Yields"}
          variant="outlined"
          onChange={(val) => onStringUpdate("yields", val.target.value)}
          value={task?.yields}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"PT50M"}
          label={"Total Time"}
          variant="outlined"
          onChange={(val) => onStringUpdate("totalTime", val.target.value)}
          value={task?.totalTime}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Dessert"}
          label={"category"}
          variant="outlined"
          onChange={(val) => onStringUpdate("category", val.target.value)}
          value={task?.category}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"American"}
          label={"cuisine"}
          variant="outlined"
          onChange={(val) => onStringUpdate("cuisine", val.target.value)}
          value={task?.cuisine}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="p-4 flex items-center">
        <Checkbox
          color="primary"
          checked={task?.isReel ? true : false}
          onChange={() => onBoolUpdate("isReel", task?.isReel ? false : true)}
        />
        <p className="text-gray-700">Is this task is reel</p>
      </div>

      <div className="p-4 flex items-center">
        <Checkbox
          color="primary"
          checked={task?.searchable ? true : false}
          onChange={() =>
            onBoolUpdate("searchable", task?.searchable ? false : true)
          }
        />
        <p className="text-gray-700">Can this be searched</p>
      </div>
      {task?.isReel ? (
        <>
          <HandleTags task={task} addTags={addTags} removeTags={removeTags} />
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Duration of the Ready in"}
              label={"Ready in minutes"}
              variant="outlined"
              onChange={(e) => onNumberUpdate("readyIn", e.target.value)}
              value={task?.readyIn || 0}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Priority of this activity"}
              label={"Priority"}
              variant="outlined"
              onChange={(val) => onNumberUpdate("priority", val.target.value)}
              value={task?.priority || 0}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default CommonFields;
