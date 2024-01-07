import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { SingleFieldCompProps } from "../utils";

const DateComp: React.FC<SingleFieldCompProps> = ({
  fieldObject,
  setReRenderCount,
  depedentFieldObject,
}) => {
  const [remoteValue, setRemoteValue] = useState<number | null>(
    typeof fieldObject.value === "number" ? fieldObject.value : null
  );

  const renderInput = (props: TextFieldProps) => {
    return <TextField {...props} />;
  };

  const handleChange = (newValue: number | null) => {
    if (newValue) {
      const temp = new Date(newValue).getTime();
      setRemoteValue(temp);
      fieldObject.value = temp;

      if (depedentFieldObject && fieldObject.dependencyId) {
        const hideField = fieldObject.dependencyDependVal !== newValue;

        depedentFieldObject.hideIfDepedent = hideField;
        if (hideField) {
          depedentFieldObject.value = undefined;
        }

        setReRenderCount((prev) => prev + 1);
      }
    }
  };

  return fieldObject.type === "date" ? (
    <div className="flex items-center gap-2">
      <label className="text-black/70 text-sm md:text-base">
        {fieldObject.name}:{" "}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {fieldObject.time ? (
          <TimePicker
            renderInput={renderInput}
            value={remoteValue}
            onChange={handleChange}
            className="FieldComp"
          />
        ) : (
          <DatePicker
            renderInput={renderInput}
            value={remoteValue}
            onChange={handleChange}
            className="FieldComp"
          />
        )}
      </LocalizationProvider>
    </div>
  ) : null;
};

export default DateComp;
