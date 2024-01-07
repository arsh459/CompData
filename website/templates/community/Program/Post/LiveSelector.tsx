import React from "react";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import TextField from "@mui/material/TextField";

// import StaticDateTimePicker from "@mui/lab/StaticDateTimePicker";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DateTimePicker from "@mui/lab/DateTimePicker";

// import { formLabelValues } from "@components/drawers/constants";
// import DateFnsUtils from "@date-io/date-fns";
// import { useEffect, useState } from "react";

// import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
// import "react-datetime-picker/dist/DateTimePicker.css";
// const now = new Date();
interface Props {
  datetime: Date | null | undefined;
  label: string;
  onChange: (newVal: Date | null) => void;
  pastAllow?: boolean;
}

const LiveSelector: React.FC<Props> = ({
  datetime,
  pastAllow,
  label,
  onChange,
}) => {
  // useEffect(() => {
  //   if (dateTime) {
  //     handleDateChange(new Date(dateTime));
  //   }
  // }, [dateTime]);

  // const [selectedDate, handleDateChange] = useState<Date | null>(
  //   () => new Date()
  // );
  //   console.log("selectedDate", selectedDate);
  // console.log("datetime", datetime);

  return (
    <div>
      <div className="">
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateTimePicker
            displayStaticWrapperAs="mobile"
            value={datetime}
            openTo="hours"
            // minTime={now}
            minDateTime={!pastAllow ? now : undefined}
            onChange={onChange}
            renderInput={(params: any) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
          />
        </LocalizationProvider> */}
      </div>
    </div>
  );
};

export default LiveSelector;
