import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  Query,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { SortTypes } from "@hooks/tasks/useTasks";
export type SourceType = "terra" | "task" | "checkin" | "steps" | "nutrition";
export const sourceTypeArr = ["terra", "task", "checkin", "steps", "nutrition"];
export const useUserPrevActivities = (uid?: string, after?: number) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [taskType, setTaskType] = useState<SourceType | "all">("all");
  const [sortBy, setSortBy] = useState<SortTypes>("nothing");

  useEffect(() => {
    if (uid && after) {
      let ref = collection(db, "users", uid, "activities");
      const customQuery = createCustomQuery(ref, after, taskType, sortBy);

      const unsubscribe = onSnapshot(customQuery, (snapshot) => {
        const remoteActivities: Activity[] = [];

        snapshot.forEach((doc) => {
          const activity = doc.data() as Activity;
          remoteActivities.push(activity);
        });

        setActivities(remoteActivities);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, after, taskType, sortBy]);

  return {
    activities,
    setSortBy,
    setTaskType,
    taskType,
    sortBy,
  };
};

function createCustomQuery(
  ref: CollectionReference<DocumentData>,
  after: number,
  taskType: string,
  sortBy: string
): Query<DocumentData> {
  let baseQuery = query(
    ref,
    orderBy("createdOn", sortBy === "old_to_new" ? "asc" : "desc")
  );

  if (taskType !== "all") {
    baseQuery = query(baseQuery, where("source", "==", taskType));
  }

  baseQuery = query(baseQuery, where("createdOn", ">=", after));

  return baseQuery;
}
