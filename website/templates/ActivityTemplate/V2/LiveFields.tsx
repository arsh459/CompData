import { numberKeys, stringKeys } from "@hooks/tasks/useTask";
import { Task } from "@models/Tasks/Task";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface Props {
  task?: Task;
  onStringUpdate: (key: stringKeys, newVal: string) => void;
  onNumberUpdate: (key: numberKeys, newVal: string) => void;
}

const LiveFields: React.FC<Props> = ({
  task,
  onStringUpdate,
  onNumberUpdate,
}) => {
  return (
    <>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"https://meet.google.com/{id}"}
          label={"Link for the activity"}
          variant="outlined"
          onChange={(val) => onStringUpdate("liveLink", val.target.value)}
          value={task?.liveLink}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        {!task?.liveOn && onNumberUpdate("liveOn", Date.now().toString())}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={task?.liveOn || 0}
            onChange={(newValue) => {
              newValue &&
                onNumberUpdate("liveOn", newValue.valueOf().toString());
            }}
          />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default LiveFields;
