import { Task } from "@models/Tasks/Task";

interface Props {
  tasks: Task[];
}

const TaskBank: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="flex flex-wrap p-4 border">
      {tasks.map((item) => {
        return (
          <div key={item.id} className="border p-2 m-2">
            <p>{item.name}</p>
            <p>MEAL type:{item.mealTypes}</p>
            <p className="text-red-500 text-xs underline pt-1">DELETE</p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskBank;
