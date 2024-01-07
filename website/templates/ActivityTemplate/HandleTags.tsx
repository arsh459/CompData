import Button from "@mui/material/Button";
import { MenuItem, TextField } from "@mui/material";
import { Task } from "@models/Tasks/Task";
import { useState } from "react";
import { useGame } from "@hooks/games/useGame";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

interface Props {
  task?: Task;
  addTags: (steps: string, index?: number | undefined) => void;
  removeTags: (step: string) => void;
}

const HandleTags: React.FC<Props> = ({ task, addTags, removeTags }) => {
  const [text, setText] = useState<string>("");
  const { game } = useGame(TEAM_ALPHABET_GAME);

  const onHandleExerciseFields = () => {
    if (text) {
      addTags(text);
    }

    setText("");
  };

  const handleInput = (value: string) => {
    setText(value as string);
  };

  return (
    <div className="my-4 border-2 border-dashed border-red-500  rounded-lg p-2">
      <p className="text-lg text-gray-700">Add Tags</p>
      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Select Tag"}
          label={"Select Tag"}
          variant="outlined"
          onChange={(e) => handleInput(e.target.value as string)}
          value={text || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {game?.configuration?.tagTypes?.map((each) => (
            <MenuItem key={each} value={each}>
              {each}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <Button>
        <div
          onClick={onHandleExerciseFields}
          className="text-black font-bold border mt-2 py-2 px-4"
        >
          Add Tag
        </div>
      </Button>
      <div className="flex rounded-lg flex-col">
        <p className="">Tags:</p>
        {task?.tags?.map((i, index) => {
          return (
            <div
              key={`${i}-${index}`}
              className="flex-1 m-1 border-2 flex gap-4 justify-between border-red-800 p-1"
            >
              <p className="max-w-sm p-2">{i}</p>

              <div className="flex space-x-2">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    removeTags(i);
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

export default HandleTags;
