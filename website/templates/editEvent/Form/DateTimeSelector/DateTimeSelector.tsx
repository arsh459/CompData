// import React from "react";
import Button from "@components/button";
// import { formLabelValues } from "@components/drawers/constants";
// import DateFnsUtils from "@date-io/date-fns";
// import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import IconButton from "@components/button/iconButton";
import { LocalSession } from "@models/Event/Event";
import clsx from "clsx";
// import { useEffect, useState } from "react";

// import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
// import "react-datetime-picker/dist/DateTimePicker.css";

interface Props {
  dateTimeList?: LocalSession[];
  heading: string;
  helperText: string;
  buttonText: string;
  onButtonPress: () => void;
  onAddSession: () => void;
  onDeleteSession: (index: number) => void;
  onChangeSession: (newVal: Date | null, index: number) => void;
}

const DateTimeSelector: React.FC<Props> = ({
  dateTimeList,
  // setEventDateTimeList,
  onButtonPress,
  buttonText,
  onAddSession,
  onDeleteSession,
  onChangeSession,
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
        <p className="text-sm text-gray-600 font-light pt-1 hidden sm:block">
          {helperText}
        </p>
      </div>
      <div className="h-48 bg-gray-300 rounded-md shadow-inner overflow-x-auto p-2">
        {dateTimeList &&
          dateTimeList.map((session, index) => {
            return (
              <div
                key={`time-${index}`}
                className={clsx(
                  index === 0 ? "pt-4" : "pt-8",
                  "flex items-center"
                )}
              >
                {/* <LocalizationProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    className="max-w-md w-full"
                    label="Select event time"
                    inputVariant="outlined"
                    value={session.startTime}
                    disablePast
                    onChange={(newVal: Date | null) =>
                      onChangeSession(newVal, index)
                    }
                  />
                </LocalizationProvider> */}
                <div className="pl-2">
                  <IconButton
                    bgColor="bg-white"
                    onClick={() => onDeleteSession(index)}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex pt-4">
        <div className="pr-2">
          <Button appearance="control" onClick={onAddSession}>
            <div className="pl-2 pr-2">
              <p className="capitalize text-gray-700 font-medium">
                Add Session
              </p>
            </div>
          </Button>
        </div>
        <Button appearance="contained" onClick={onButtonPress}>
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DateTimeSelector;
