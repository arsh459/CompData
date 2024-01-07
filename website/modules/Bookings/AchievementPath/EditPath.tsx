import { Button, MenuItem, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddItem from "./AddItem";
import { AchievementPathData, TitleInterface } from "./utils/interface";
import { icons } from "./utils/constants";

interface Props {
  uid: string;
  target: AchievementPathData;
  onDelete: (id: string) => void;
  onSave: (data: AchievementPathData) => void;
  setTarget: (target: AchievementPathData | undefined) => void;
}

const EditPath: React.FC<Props> = ({
  uid,
  target,
  onDelete,
  onSave,
  setTarget,
}) => {
  const handleSave = async () => {
    onSave(target);
    setTarget(undefined);
  };

  const handleDelete = async () => {
    if (target.id) {
      onDelete(target.id);
      setTarget(undefined);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center my-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start"
            value={target?.startTime}
            onChange={(newValue) => {
              newValue &&
                setTarget({
                  ...target,
                  startTime: new Date(newValue).getTime(),
                });
            }}
          />
        </LocalizationProvider>

        <div className="w-4 aspect-1" />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End"
            value={target?.endTime}
            onChange={(newValue) => {
              newValue &&
                setTarget({ ...target, endTime: new Date(newValue).getTime() });
            }}
          />
        </LocalizationProvider>
      </div>

      <div className="flex my-4">
        <TextField
          select
          style={{ flex: 0.25 }}
          placeholder={"Title Icon"}
          label={"Title Icon"}
          variant="outlined"
          onChange={(e) => {
            const newTitleObj: TitleInterface = {
              text: target?.title?.text ? target.title.text : "",
            };

            if (e.target.value !== "NO ENTRY") {
              newTitleObj.icon = e.target.value;
            }

            setTarget({ ...target, title: newTitleObj });
          }}
          value={target.title?.icon || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {Object.values(icons).map((item) => (
            <MenuItem key={item} value={item}>
              <img
                src={item}
                alt={item}
                className="w-5 aspect-1 object-contain"
              />
            </MenuItem>
          ))}
          <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
        </TextField>
        <div className="w-4 aspect-1" />
        <TextField
          style={{ flex: 1 }}
          placeholder={"Title Text"}
          label={"Title Text"}
          variant="outlined"
          type="string"
          onChange={(e) =>
            setTarget({
              ...target,
              title: { ...target.title, text: e.target.value },
            })
          }
          value={target.title?.text}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <AddItem target={target} setTarget={setTarget} />

      <div className="flex my-4">
        <Button variant="contained" color="success" onClick={handleSave}>
          save in DB
        </Button>

        <div className="w-4 aspect-1" />

        <Button variant="contained" color="error" onClick={handleDelete}>
          delete
        </Button>

        <div className="w-4 aspect-1" />

        <Button
          variant="contained"
          color="info"
          onClick={() => setTarget(undefined)}
        >
          cancel
        </Button>
      </div>
    </div>
  );
};

export default EditPath;
