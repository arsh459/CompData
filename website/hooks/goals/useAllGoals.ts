import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  onSnapshot,
  Query,
  query,
  where,
} from "firebase/firestore";
import { Task } from "@models/Tasks/Task";

// import { GoalObject } from "@models/Goals/Goal";

export const useAllGoals = (gameId?: string) => {
  const [goals, setGoals] = useState<Task[]>([]);

  useEffect(() => {
    let ref: Query;
    if (gameId) {
      ref = query(
        collection(db, "tasks"),
        where("gameTask", "==", true),
        where("games", "array-contains", gameId)
      );
    } else {
      ref = query(collection(db, "tasks"), where("gameTask", "==", true));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      const remoteGames: Task[] = [];
      for (const doc of snapshot.docs) {
        remoteGames.push(doc.data() as Task);
      }

      setGoals(remoteGames);
    });

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [gameId]);

  return {
    goals,
  };
};
