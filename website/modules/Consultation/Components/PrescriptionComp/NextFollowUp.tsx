import TextDivider from "../TextDivider";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { format } from "date-fns";
import { TextField } from "@mui/material";

interface Props {
  nextFollowupDate?: string;
  text?: string;
  currTimeValue?: number;
  noMinDate?: boolean;
  maxDate?: Date;
  pickerStyle?: "dateTime" | "date";
  setNextFollowupDate: (val: string) => void;
  setNextFollowupDateObj?: (val: Date | null) => void;
}

const NextFollowUp: React.FC<Props> = ({
  nextFollowupDate,
  currTimeValue,
  setNextFollowupDate,
  setNextFollowupDateObj,
  noMinDate,
  text,
  pickerStyle,
  maxDate,
}) => {
  const { todayUnix } = useTodayDate();
  const clearDate = () => {
    setNextFollowupDate && setNextFollowupDate("");
    setNextFollowupDateObj && setNextFollowupDateObj(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <TextDivider text={text ? text : "Next Follow up"} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {pickerStyle === "dateTime" && setNextFollowupDateObj ? (
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                {...props}
                InputProps={{
                  ...props.InputProps,
                  style: {
                    ...props.InputProps?.style,
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderRadius: "12px",
                  },
                }}
              />
            )}
            maxDate={maxDate}
            minDate={noMinDate ? undefined : new Date(todayUnix)}
            value={currTimeValue ? new Date(currTimeValue) : undefined}
            onChange={(newValue) => {
              newValue && setNextFollowupDateObj(newValue);
            }}
            className="TextInputField"
          />
        ) : (
          <>
            <DatePicker
              renderInput={(props) => (
                <TextField
                  {...props}
                  InputProps={{
                    ...props.InputProps,
                    style: {
                      ...props.InputProps?.style,
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderRadius: "12px",
                    },
                  }}
                />
              )}
              maxDate={maxDate}
              minDate={noMinDate ? undefined : new Date(todayUnix)}
              value={nextFollowupDate ? new Date(nextFollowupDate) : "-"}
              label="Select a date"
              onChange={(newValue) => {
                newValue &&
                  setNextFollowupDate(format(new Date(newValue), "yyyy-MM-dd"));
              }}
              className="TextInputField"
            />
            {nextFollowupDate ? (
              <div className="flex justify-end">
                <p
                  onClick={clearDate}
                  className="underline text-red-500 text-xs pl-2"
                >
                  Remove followup date
                </p>
              </div>
            ) : null}
          </>
        )}
      </LocalizationProvider>
    </div>
  );
};

export default NextFollowUp;
