import Button from "@components/button";
import { useSlotCollection } from "@hooks/slots/useSlotCollection";
import { dayTypes, slotStatus, timeLabel } from "@models/slots/Slot";
import { MenuItem, TextField } from "@mui/material";

interface Props {
  day: dayTypes;
}

const DayDashboard: React.FC<Props> = ({ day }) => {
  const {
    slotCol,
    addNewSlot,
    removeSlot,
    updateRemote,
    updateLocalTime,
    updateLocalLabel,
    updateLocalStatus,
  } = useSlotCollection(day);

  return (
    <div className="p-4">
      <div className="flex">
        <Button onClick={addNewSlot} appearance="contained">
          Add Slot
        </Button>
      </div>
      <div className="pt-8 flex flex-wrap">
        {slotCol?.slots.map((item, index) => {
          console.log({ item });
          return (
            <div className="p-4 m-4 border" key={`${item.start}-${index}`}>
              <div className="pt-2">
                <TextField
                  style={{ width: "100%" }}
                  label={"Start"}
                  onChange={(val) =>
                    updateLocalTime("start", val.target.value, index)
                  }
                  value={item?.start}
                />
              </div>
              <div className="pt-2">
                <TextField
                  style={{ width: "100%" }}
                  label={"End"}
                  onChange={(val) =>
                    updateLocalTime("end", val.target.value, index)
                  }
                  value={item?.end}
                />
              </div>
              <div className="pt-8">
                <TextField
                  select
                  style={{ width: "100%" }}
                  placeholder={"Type of label"}
                  label={"Type of label"}
                  variant="outlined"
                  onChange={(e) =>
                    updateLocalLabel(
                      "label",
                      e.target.value as timeLabel,
                      index
                    )
                  }
                  value={item.label || "NO ENTRY"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                  <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
                </TextField>
              </div>
              <div className="pt-8">
                <TextField
                  select
                  style={{ width: "100%" }}
                  placeholder={"Slot Status"}
                  label={"Slot Status"}
                  variant="outlined"
                  onChange={(e) =>
                    updateLocalStatus(
                      "status",
                      e.target.value as slotStatus,
                      index
                    )
                  }
                  value={item.status || "NO ENTRY"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                  <MenuItem value="BUSY">BUSY</MenuItem>
                  <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
                </TextField>
              </div>
              <div
                className="text-red-500 p-2 mt-4 border"
                onClick={() => removeSlot(index)}
              >
                <p>Remove</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex pt-12">
        <Button onClick={updateRemote} appearance="contained">
          Save in Database
        </Button>
      </div>
    </div>
  );
};

export default DayDashboard;
