import { TextField } from "@mui/material";
import React from "react";
interface Props {
  heading?: string;
  currentValue?: string;
  onUpdate: (val: string) => void;
  isDisable?: boolean;
}
const TargetInputText: React.FC<Props> = ({
  currentValue,
  heading,
  onUpdate,
  isDisable,
}) => {
  return (
    <div className="py-4">
      <p className="px-2 text-xs text-black/70 pb-4 ">{heading}</p>

      <TextField
        style={{ width: "100%" }}
        placeholder={heading}
        variant="outlined"
        disabled={isDisable}
        onChange={(val) => onUpdate(val.target.value)}
        value={currentValue || ""}
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default TargetInputText;
