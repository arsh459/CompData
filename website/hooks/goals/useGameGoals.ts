import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Task } from "@models/Tasks/Task";

// import { GoalObject } from "@models/Goals/Goal";

export const useGameGoals = (gameTasks?: string[]) => {
  const [goals, setGoals] = useState<Task[]>([]);

  useEffect(() => {
    const getGameTasks = async () => {
      if (gameTasks) {
        const remoteGames: Task[] = [];
        for (const gameTask of gameTasks) {
          const remoteTask = await getDoc(doc(db, "tasks", gameTask));
          remoteGames.push(remoteTask.data() as Task);
        }

        setGoals(remoteGames);
      } else {
        setGoals([]);
      }
    };

    getGameTasks();
  }, [gameTasks]);

  return {
    goals,
  };
};
