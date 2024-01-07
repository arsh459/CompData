import { useSubTasks } from "@hooks/subTasks/useSubTasks";
import { SubTaskElement, Task } from "@models/Tasks/Task";
import { Button, MenuItem, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const intial: SubTaskElement = { subTaskId: "NO ENTRY", qty: 1, timeStart: 0 };

interface Props {
  task?: Task;
  addSubTaskEle: (ele: SubTaskElement) => void;
  removeSubTaskEle: (ele: SubTaskElement) => void;
  editSubTaskEle: (ele: SubTaskElement) => void;
  isExercise?: boolean;
}

const calculateValue = (val?: number, qty?: number) => {
  if (val && qty) {
    return val * qty;
  }

  if (!val || !qty) {
    return 0;
  }
};

const SubTaskElements: React.FC<Props> = ({
  task,
  addSubTaskEle,
  removeSubTaskEle,
  editSubTaskEle,
  isExercise,
}) => {
  const { subTaskObj } = useSubTasks(isExercise);
  const [subTaskEleToEdit, setSubTaskEleToEdit] = useState<string>("");
  const [subTaskEle, setSubTaskEle] = useState<SubTaskElement>(intial);

  const onSave = () => {
    if (subTaskEle.subTaskId !== "NO ENTRY") {
      const remoteSubTaskEle: SubTaskElement = isExercise
        ? {
            subTaskId: subTaskEle.subTaskId,
            timeStart: subTaskEle.timeStart,
          }
        : {
            subTaskId: subTaskEle.subTaskId,
            qty: subTaskEle.qty,
          };

      subTaskEleToEdit
        ? editSubTaskEle(remoteSubTaskEle)
        : addSubTaskEle(remoteSubTaskEle);

      setSubTaskEleToEdit("");
      setSubTaskEle(intial);
    }
  };

  const onEdit = (ele: SubTaskElement) => {
    setSubTaskEle(ele);
    setSubTaskEleToEdit(ele.subTaskId);
  };

  const onSubTaskIdChange = (subTaskId: string) => {
    setSubTaskEle((prev) => ({ ...prev, subTaskId }));
  };

  const onQtyChange = (qty: number) => {
    setSubTaskEle((prev) => ({ ...prev, qty }));
  };

  const onTimeStartChange = (timeStart: number) => {
    setSubTaskEle((prev) => ({ ...prev, timeStart }));
  };

  return (
    <div className="mt-2 border-dashed border-2 border-red-500 p-4 my-8">
      <p className="text-lg text-gray-700">Sub Tasks</p>
      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Sub Task"}
          label={"Sub Task"}
          variant="outlined"
          onChange={(e) => onSubTaskIdChange(e.target.value)}
          value={subTaskEle.subTaskId}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {Object.keys(subTaskObj).map((id) => (
            <MenuItem key={id} value={id}>
              {subTaskObj[id].taskName || id}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {isExercise ? (
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Start Time in seconds"}
            label={"Start Time in seconds"}
            variant="outlined"
            onChange={(val) =>
              onTimeStartChange(Math.max(parseInt(val.target.value), 0))
            }
            value={subTaskEle.timeStart}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      ) : (
        <div className="py-4">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Quantity of sub task element"}
            label={"Quantity"}
            variant="outlined"
            onChange={(val) => onQtyChange(parseInt(val.target.value) || 1)}
            value={subTaskEle.qty}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      )}
      <div className="p-2">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onSave}
        >
          {subTaskEleToEdit ? "Update" : "Add"}
        </Button>
      </div>
      {task?.subTasks &&
        task.subTasks.map((subTaskEle) => {
          const subTask = subTaskObj[subTaskEle.subTaskId]
            ? subTaskObj[subTaskEle.subTaskId]
            : undefined;

          return subTaskEleToEdit !== subTaskEle.subTaskId ? (
            <div
              className="mt-2 p-2 border-solid border-2 rounded-xl border-gray-500"
              key={subTaskEle.subTaskId}
            >
              <div className="flex flex-col justify-between">
                <p className="text-base text-gray-700">
                  Sub Task Id: {subTaskEle.subTaskId}
                </p>
                <p className="text-base text-gray-700">
                  Sub Task Name: {subTask?.taskName}
                </p>
                <div className="bg-gray-100 p-2">
                  <p className="pb-1 text-xs font-medium">Item Values</p>
                  {subTask?.nutrientValues ? (
                    <p className="text-xs text-gray-700">
                      {`${calculateValue(
                        subTask?.nutrientValues?.protein,
                        subTaskEle.qty
                      )}g Protein | ${calculateValue(
                        subTask?.nutrientValues?.carbs,
                        subTaskEle.qty
                      )}g Carbs | ${calculateValue(
                        subTask?.nutrientValues?.fats,
                        subTaskEle.qty
                      )}g Fats | ${calculateValue(
                        subTask?.nutrientValues?.fibre,
                        subTaskEle.qty
                      )}g Fiber`}
                    </p>
                  ) : null}

                  {subTask?.kcal ? (
                    <p className="text-xs text-gray-700">
                      {`${calculateValue(subTask?.kcal, subTaskEle.qty)}kcal`}
                    </p>
                  ) : null}
                </div>
                {isExercise ? (
                  <p className="text-base text-gray-700">
                    Start Time: {subTaskEle.timeStart}
                  </p>
                ) : (
                  <p className="text-base text-gray-700">
                    Quantity: {subTaskEle.qty}
                  </p>
                )}
                <div className="flex space-x-2">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onEdit(subTaskEle)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => removeSubTaskEle(subTaskEle)}
                  >
                    Delete
                  </Button>
                  <Link href={`/admin/subTasks/add?id=${subTaskEle.subTaskId}`}>
                    <Button variant="outlined" color="primary" size="small">
                      Go To Task
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null;
        })}
    </div>
  );
};

export default SubTaskElements;
