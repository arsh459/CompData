import { db } from "@config/firebase";
import { useTaskParams } from "@hooks/tasks/useTaskParams";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { Task } from "@models/Tasks/Task";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {}

const DuplicateTaskDashboard: React.FC<Props> = ({}) => {
  const { id } = useTaskParams();
  const { task } = useWorkoutTask(id);

  const [newName, setName] = useState<string>(task?.name ? task?.name : "");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDuplicate = async () => {
    if (task) {
      setLoading(true);
      const newID = uuidv4();

      const dupTask: Task = {
        ...task,
        id: newID,
        name: newName ? newName : "",
        badgeId: "",
        badgeIds: [],
        badgeDays: [],
        badgeDayPriority: {},
      };

      await setDoc(doc(db, "tasks", newID), dupTask);

      // setLoading(false);

      router.back();
    }
  };

  return (
    <div className="p-4">
      <p className="text-lg font-medium">To Duplicate{task?.name}</p>

      <div className="flex items-center p-4">
        <label className="pr-2">New Task Name :</label>
        <input
          type="string"
          className="border rounded-md"
          name="name"
          value={newName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {loading ? null : (
        <button
          className="m-4 px-8 py-1 border bg-[#ff725c] text-lg rounded-md"
          onClick={handleDuplicate}
        >
          Duplicate Task
        </button>
      )}
    </div>
  );
};

export default DuplicateTaskDashboard;
