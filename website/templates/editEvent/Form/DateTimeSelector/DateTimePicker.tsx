// import React from "react";
import Button from "@components/button";
// import { formLabelValues } from "@components/drawers/constants";
// import DateFnsUtils from "@date-io/date-fns";
// import { DateTimePicker, LocalizationProvider } from "@mui/lab";
// import { useEffect, useState } from "react";

// import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
// import "react-datetime-picker/dist/DateTimePicker.css";

interface Props {
  datetime: Date | null | undefined;
  buttonText: string;
  onButtonPress: () => void;
  onChange: (newVal: Date | null) => void;
  heading: string;
  helperText: string;
  label: string;
}

const SingleDateTimePicker: React.FC<Props> = ({
  datetime,
  label,
  onButtonPress,
  buttonText,
  onChange,
  heading,
  helperText,
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

  return (
    <div className="">
      <div>
        <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        <p className="text-sm text-gray-600 font-light pt-1">{helperText}</p>
      </div>
      <div className="pt-8 flex items-center">
        {/* <LocalizationProvider utils={DateFnsUtils}>
          <DateTimePicker
            className="max-w-md w-full"
            label={label}
            inputVariant="outlined"
            value={datetime}
            disablePast
            onChange={onChange}
          />
        </LocalizationProvider> */}
      </div>
      <div className="flex pt-4">
        <Button appearance="contained" onClick={onButtonPress}>
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SingleDateTimePicker;
