import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
interface Props {
  initialValue?: Date;
  maxDate?: Date;
  setSelectDate: (newVal: Date) => void;
}
const HandleDate: React.FC<Props> = ({
  initialValue,
  setSelectDate,
  maxDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        maxDate={maxDate}
        value={initialValue ? initialValue : "-"}
        onChange={(newValue) => {
          newValue && setSelectDate(new Date(newValue));
        }}
        inputFormat="DD/MM/YYYY"
        className=""
      />
    </LocalizationProvider>
  );
};

export default HandleDate;
