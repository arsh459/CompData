import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

interface Props {
  value: Date | null;
  onChange: (newDateTime: Date | null) => void;
}

const DateTimeSelector: React.FC<Props> = ({ onChange, value }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label=""
          value={value || null} // Changed NaN to null
          onChange={onChange}
          ampm={true}
          className="w-full"
          // Display AM/PM selector
        />
      </LocalizationProvider>
    </>
  );
};

export default DateTimeSelector;
