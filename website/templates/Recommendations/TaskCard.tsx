// import { useTask } from "@hooks/tasks/useTask";
import { useIsTaskAllowedV4 } from "@hooks/tasks/useIsTaskAllowedV4";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import clsx from "clsx";

interface Props {
  taskId: string;
  selectedUnix: number;
  uid: string;
  date: string;
  manual?: boolean;
  tz: string;
}

const TaskCard: React.FC<Props> = ({
  date,
  taskId,
  selectedUnix,
  uid,
  manual,
  tz,
}) => {
  const { task } = useWorkoutTask(taskId);

  const { selectedActivity, earnedFP } = useIsTaskAllowedV4(
    date,
    uid,
    tz,
    task
  );

  // console.log(task?.name, uid, earnedFP, date, tz, new Date(selectedUnix));

  return (
    <div
      className={clsx(
        selectedActivity?.id
          ? "border-green-500 bg-gray-50 border-2"
          : "bg-gray-100 border",
        "  p-1 my-1"
      )}
    >
      {manual ? <p className="text-green-500">MANUAL</p> : null}
      <p>Name: {task?.name}</p>
      {task?.mealTypes ? <p>{task?.mealTypes}</p> : null}
      <p>FP: {task?.fitPoints}</p>
      <p>EarnedFP: {earnedFP}</p>
      <p>Attempted: {selectedActivity?.id ? "YES" : "NO"}</p>
    </div>
  );
};

export default TaskCard;
