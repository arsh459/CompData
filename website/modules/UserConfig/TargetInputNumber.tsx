import { TextField } from "@mui/material";
import React from "react";
interface Props {
  heading?: string;
  currentValue?: number;
  onUpdate: (val: number) => void;
}
const TargetInputNumber: React.FC<Props> = ({
  currentValue,
  heading,
  onUpdate,
}) => {
  return (
    <div className="py-4">
      <p className="px-2 text-xs text-black/70 pb-4 ">{heading}</p>

      <TextField
        style={{ width: "100%" }}
        placeholder={heading}
        //   label={"cost"}
        variant="outlined"
        // onChange={(val) => onUpdateCost(val.target.value)}
        onChange={(val) => onUpdate(parseInt(val.target.value))}
        value={currentValue || 0}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default TargetInputNumber;
