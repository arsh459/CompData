import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { createNewActivityForChallenge } from "@models/Posts/createUtils";
import { Task } from "@models/Tasks/Task";
import { Activity } from "@models/Activities/Activity";
import { UserInterface } from "@models/User/User";
export type stringKeys =
  | "activityName"
  | "authorUID"
  | "date"
  | "taskId"
  | "source";
export type numberKeys = "fitPoints" | "calories" | "date" | "createdOn";
export const useActivityData = (
  uid: string | undefined,
  activityId: string | undefined
) => {
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<UserInterface>();

  useEffect(() => {
    const fetchActivityData = () => {
      if (uid && activityId) {
        const ref = doc(db, "users", uid, "activities", activityId);

        const unsubscribe = onSnapshot(ref, (doc) => {
          const data = doc.data() as Activity | undefined;
          if (data) {
            setActivity(data);
          } else {
            setActivity(
              createNewActivityForChallenge(
                selectedTask?.name || "",
                selectedUser?.uid || "",
                selectedTask?.taskType
                  ? selectedTask?.taskType === "workout" ||
                    selectedTask?.taskType === "path" ||
                    selectedTask?.taskType === "live"
                    ? "task"
                    : selectedTask?.taskType
                  : "task",
                selectedTask?.id || "",
                "",
                0
              )
            );
          }
        });
        return () => {
          unsubscribe();
        };
      }
    };
    if (activityId) {
      fetchActivityData();
    }
  }, [
    uid,
    activityId,
    selectedUser?.uid,
    selectedTask?.name,
    selectedTask?.taskType,
    selectedTask?.id,
  ]);

  const updateActivity = (key: keyof Activity, value: string | number) => {
    setActivity((prevActivity: any) =>
      prevActivity
        ? {
            ...prevActivity!,
            [key]: value,
          }
        : prevActivity
    );
  };

  const updateSelectedTask = (task?: Task) => {
    setSelectedTask(task);
  };

  const updateSelectedAuthor = (user?: UserInterface) => {
    setSelectedUser(user);
  };

  const onSave = async (activity?: Activity) => {
    try {
      if (activity && activity?.authorUID) {
        const userRef = doc(db, "users", activity.authorUID); // Reference to the user document
        const activitiesCollectionRef = collection(userRef, "activities"); // Reference to the "activities" subcollection
        const activityRef = doc(activitiesCollectionRef, activity.id); // Reference to the activity document

        await setDoc(activityRef, activity);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStringUpdate = (key: stringKeys, newVal: string) => {
    updateActivity(key, newVal);
  };

  const handleNumberUpdate = (key: numberKeys, newVal: string) => {
    updateActivity(key, parseInt(newVal));
  };

  const handleSelectedTaskChange = (task?: Task) => {
    updateSelectedTask(task);
    handleStringUpdate(
      "source",
      (task?.taskType === "workout" ? "task" : task?.taskType) || ""
    );
  };

  const handleSelectedAuthorChange = (author?: UserInterface) => {
    updateSelectedAuthor(author);
  };

  return {
    activity,
    selectedTask,
    updateActivity,
    updateSelectedTask,
    onSave,
    setActivity,
    handleSelectedTaskChange,
    handleNumberUpdate,
    handleStringUpdate,
    updateSelectedAuthor,
    author: selectedUser,
    handleSelectedAuthorChange,
  };
};
