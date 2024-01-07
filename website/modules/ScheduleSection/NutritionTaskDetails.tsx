import { Task } from "@models/Tasks/Task";
import { getMacroString } from "./utils";
// import { getMacroString } from "./utils";

interface Props {
  task: Task;
}

const NutritionTaskDetails: React.FC<Props> = ({ task }) => {
  return (
    <>
      <p className="text-blue-500 text-xs">{task.mealTypes}</p>
      <p className="text-red-500 text-xs font-bold">{getMacroString(task)}</p>
    </>
  );
};

export default NutritionTaskDetails;
