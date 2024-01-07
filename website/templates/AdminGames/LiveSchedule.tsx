import { Badge } from "@models/Prizes/PrizeV2";
import { dayTypes, days } from "@models/slots/Slot";
import { MenuItem, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";
import { useState } from "react";

interface Props {
  badge: Badge;
  setBadge: (data: Badge) => void;
}

const LiveSchedule: React.FC<Props> = ({ badge, setBadge }) => {
  const [target, setTarget] = useState<{ key: dayTypes; val: number }>();

  const onAdd = () => {
    if (target && target.val) {
      setBadge({
        ...badge,
        schedule: {
          ...badge.schedule,
          [target.key]: format(new Date(target.val), "hh:mm a"),
        },
      });
    }
    setTarget(undefined);
  };

  const onDelete = (key: dayTypes) => {
    const { schedule, ...rest } = badge;
    if (schedule) {
      delete schedule[key];

      setBadge(
        Object.keys(schedule).length
          ? {
              ...rest,
              schedule,
            }
          : rest
      );
    }
    setTarget(undefined);
  };

  const onEdit = (key: dayTypes) => {
    setTarget({ key, val: Date.now() });
  };

  return (
    <div className="w-max border m-2 p-4">
      <div className="w-full flex items-center">
        <TextField
          select
          style={{ flex: 1, marginRight: 16 }}
          placeholder={"Week Day"}
          label={"Week Day"}
          variant="outlined"
          onChange={(e) => {
            if (e.target.value !== "NO ENTRY") {
              setTarget({ key: e.target.value as dayTypes, val: Date.now() });
            } else {
              setTarget(undefined);
            }
          }}
          value={target?.key || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {days.map((each) =>
            !Object.keys(badge.schedule || {}).includes(each) ||
            each === target?.key ? (
              <MenuItem key={each} value={each}>
                {each}
              </MenuItem>
            ) : null
          )}
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>

        {target ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Time"
              value={target.val}
              onChange={(newValue) =>
                newValue &&
                setTarget({
                  key: target.key,
                  val: newValue,
                })
              }
            />
          </LocalizationProvider>
        ) : null}

        <button
          onClick={onAdd}
          className="bg-red-500 text-white ml-2 px-4 py-1 cursor-pointer"
        >
          {typeof "" === "number" ? "Save" : "Add"}
        </button>
      </div>
      <div className="w-full flex flex-col mt-4">
        {days.map((each, index) =>
          Object.keys(badge.schedule || {}).includes(each) ? (
            <div
              key={each}
              className="border flex px-3 py-1 m-1"
              style={{
                display: each === target?.key ? "none" : undefined,
              }}
            >
              <p className="flex-1">{`${each}: ${
                (badge.schedule || {})[each]
              }`}</p>
              <p onClick={() => onEdit(each)} className="cursor-pointer mx-4">
                🖍
              </p>
              <p onClick={() => onDelete(each)} className="cursor-pointer">
                ❌
              </p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default LiveSchedule;
