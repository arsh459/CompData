import { Task } from "@models/Tasks/Task";
import TaskSearch from "@templates/AdminDashboard/FilterModal/TaskModal";
import TaskCardAdmin from "./TaskCardAdmin";

interface Props {
  addParentId: (id: string) => void;
  removeParentId: (id: string) => void;
  selectedIds?: string[];
}

const ParentTaskAdder: React.FC<Props> = ({
  selectedIds,
  addParentId,
  removeParentId,
}) => {
  // eventKey why is this needed?

  // console.log("task", task);

  return (
    <div>
      <TaskSearch
        onClose={() => {}}
        onOverrideSelect={(task?: Task) => addParentId(task?.id ? task.id : "")}
      />
      <div className="pt-2 flex flex-wrap">
        {selectedIds?.map((item) => {
          return (
            <div key={item} className="m-2">
              <TaskCardAdmin id={item} />
              <button onClick={() => removeParentId(item)}>Remove</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParentTaskAdder;
