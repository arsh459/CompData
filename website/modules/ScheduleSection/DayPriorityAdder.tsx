import { TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
// import { useState } from "react";

interface Props {
  badgeId: string;
  taskId: string;
  day: number;
  dayPriorityObj?: { [badgeDay: string]: number };
}

const DayPriorityAdder: React.FC<Props> = ({
  taskId,
  badgeId,
  day,
  dayPriorityObj,
}) => {
  const keyStr = `${badgeId}_${day}`;
  //   const [priority, setPriority] = useState<number>(
  //     dayPriorityObj && dayPriorityObj[keyStr] ? dayPriorityObj[keyStr] : 0
  //   );

  const updateTaskPriority = async (newValue: number) => {
    await updateDoc(doc(db, "tasks", taskId), {
      [`badgeDayPriority.${`${badgeId}_${day}`}`]: newValue,
    });
  };

  return (
    <div className="border p-4">
      <div className="flex">
        <TextField
          style={{ width: "50%" }}
          label={"Priority"}
          variant="outlined"
          onChange={(e) => {
            updateTaskPriority(parseInt(e.target.value));
          }}
          type="number"
          value={
            dayPriorityObj && dayPriorityObj[keyStr]
              ? dayPriorityObj[keyStr]
              : 0
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      {/* <p className="text-blue-500" onClick={updateTaskPriority}>
        Save
      </p> */}
    </div>
  );
};

export default DayPriorityAdder;
