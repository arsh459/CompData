import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Equipment, Task } from "@models/Tasks/Task";
import { useState } from "react";
interface Props {
  task?: Task;
  addEquipment: (val: Equipment) => void;
  removeEquipment: (val: Equipment) => void;
}

const HandleEquipment: React.FC<Props> = ({
  task,
  removeEquipment,
  addEquipment,
}) => {
  const [equipmentNeeded, setEquipmentNeeded] = useState<Equipment>({
    equipmentName: "",
  });
  //   console.log(task.equipmentNeeded);

  const onHandleExerciseFields = () => {
    addEquipment(equipmentNeeded);
    setEquipmentNeeded({
      equipmentName: "",
    });
  };

  const handleInput = (value: string, key: "equipmentName") => {
    setEquipmentNeeded((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="mt-2 border-dashed border-red-500 ">
      <p className="text-lg text-gray-700">Add Equipment</p>

      <div className="pt-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"5kg dumble required"}
          label={"Equipment Name"}
          multiline={true}
          minRows={1}
          variant="outlined"
          onChange={(val) => handleInput(val.target.value, "equipmentName")}
          value={equipmentNeeded.equipmentName || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <Button>
        <div
          onClick={onHandleExerciseFields}
          className="text-black font-bold border p-2"
        >
          Add Equipments
        </div>
      </Button>
      <div className="flex w-max rounded-lg flex-col overflow-x-scroll">
        <p className="">EquipmentName:</p>
        {task?.equipmentNeeded?.map((i, index) => {
          return (
            <div
              key={`${i.equipmentName}-${index}`}
              className="m-2 relative border-2 border-red-800 p-2"
            >
              <div
                onClick={() => removeEquipment(i)}
                className="absolute    my-auto right-0 cursor-pointer"
              >
                <span>❌</span>
              </div>

              <p className="p-4">{i.equipmentName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HandleEquipment;
