import clsx from "clsx";
import { TextField } from "@mui/material";

import { useState } from "react";

interface Props {
  text: string;
  selected: boolean;
  onAdd: (val: number) => void;
  onRemove: () => void;
}

const TaskAdder: React.FC<Props> = ({ text, selected, onAdd, onRemove }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <div
      className={clsx(
        selected ? "border-green-500 border-2" : "border border-gray-400",
        "p-2 m-2 cursor-pointer"
      )}
    >
      <p className="text-lg pb-1">{text}</p>

      <div className="w-24 py-2">
        <TextField
          style={{ width: "100%" }}
          label={"Priority"}
          variant="outlined"
          onChange={(val) => {
            setValue(parseInt(val.target.value));
          }}
          value={value}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <p className="text-green-500" onClick={() => onAdd(value)}>
        Add
      </p>
      {selected ? (
        <p className="pt-2 text-red-500" onClick={onRemove}>
          Remove
        </p>
      ) : null}
    </div>
  );
};

export default TaskAdder;
