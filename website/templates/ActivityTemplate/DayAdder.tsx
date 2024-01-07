import clsx from "clsx";
import { TextField } from "@mui/material";

interface Props {
  addDayPriority: (day: number, priority: number) => void;
  addDay: (day: number) => void;
  removeDay: (day: number) => void;
  days?: number[];
  priorityObj?: { [day: number]: number };
}
const dayArray = Array.apply(null, Array(36));

const DayAdder: React.FC<Props> = ({
  days,
  addDay,
  removeDay,
  addDayPriority,
  priorityObj,
}) => {
  // eventKey why is this needed?
  // console.log("priorityObj", priorityObj);

  return (
    <div>
      <div className="pt-2 flex flex-wrap">
        {dayArray.map((item, index) => {
          const dayNumber = index - 1;
          const included = days?.includes(dayNumber) ? true : false;
          return (
            <div
              key={`day-${dayNumber}`}
              className={clsx(
                "m-1 border p-2",
                included ? "border-green-500 border-2" : "border-gray-200"
              )}
            >
              {dayNumber >= 0 ? <p>Day {dayNumber}</p> : <p>Warmup</p>}

              <div className="w-24 py-2">
                <TextField
                  style={{ width: "100%" }}
                  label={"Priority"}
                  variant="outlined"
                  onChange={(val) => {
                    addDayPriority(dayNumber, parseInt(val.target.value));
                  }}
                  value={
                    priorityObj && priorityObj[dayNumber]
                      ? priorityObj[dayNumber]
                      : 0
                  }
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className="pt-1">
                {included ? (
                  <button
                    className="underline"
                    onClick={() => removeDay(dayNumber)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="underline"
                    onClick={() => addDay(dayNumber)}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayAdder;
