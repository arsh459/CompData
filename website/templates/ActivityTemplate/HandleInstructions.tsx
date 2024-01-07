import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Task } from "@models/Tasks/Task";
import React, { useState } from "react";

interface Props {
  task?: Task;
  addSteps: (val: string, index?: number) => void;
  removeSteps: (step: string) => void;
}

const HandleInstructions: React.FC<Props> = ({
  task,
  addSteps,
  removeSteps,
}) => {
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  console.log({ task });

  const onHandleExerciseFields = () => {
    if (editIndex !== null) {
      addSteps(text, editIndex);
      setEditIndex(null);
    } else {
      addSteps(text);
    }

    setText("");
  };

  const handleInput = (value: string) => {
    setText(value);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    task?.cookingInstruction && setText(task?.cookingInstruction[index] || "");
  };

  return (
    <div className="my-4 border-2 border-dashed border-red-500  rounded-lg p-2">
      <p className="text-lg text-gray-700">Add Cooking Instructions Stepwise</p>

      <div className="pt-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Heat the pan"}
          label={"Step"}
          multiline={true}
          minRows={1}
          variant="outlined"
          onChange={(val) => handleInput(val.target.value)}
          value={text || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <Button>
        <div
          onClick={onHandleExerciseFields}
          className="text-black font-bold border mt-2 py-2 px-4"
        >
          {editIndex !== null ? "Edit Step" : "Add Step"}
        </div>
      </Button>
      <div className="flex w-max rounded-lg flex-col   mx-auto">
        <p className="">Cooking Steps:</p>
        {task?.cookingInstruction?.map((i, index) => {
          return (
            <div
              key={`${i}-${index}`}
              className="m-2 border-2 flex flex-col gap-4 justify-between border-red-800 "
            >
              <p className="max-w-sm p-2">{i}</p>

              <div className="flex space-x-2">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    removeSteps(i);
                    setText("");
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HandleInstructions;
