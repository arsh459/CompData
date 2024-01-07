import { useTask } from "@hooks/tasks/useTask";

interface Props {
  id: string;
}

const TaskCardAdmin: React.FC<Props> = ({ id }) => {
  const { task } = useTask("", id);
  // eventKey why is this needed?

  // console.log("task", task);

  return (
    <div className="border bg-gray-50 p-2 shadow-sm">
      <p>{task?.name}</p>
      <p>Lvl: {task?.level}</p>
      <p>FP: {task?.fitPoints}</p>
    </div>
  );
};

export default TaskCardAdmin;
