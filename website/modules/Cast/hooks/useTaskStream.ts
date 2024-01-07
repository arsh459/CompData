import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { Activity } from "@models/Activities/Activity";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { createActivityForTask } from "./createActivityForTask";

export const MIN_FP_TH = 0.2;
export const MIN_FP_PROG_TH = 0.03;

export const calculateFPFromProgress = (storeProgress: number, fp?: number) => {
  let fpAward: number = 0;
  if (fp && storeProgress > MIN_FP_TH && storeProgress < 0.95) {
    fpAward = Math.round(storeProgress * fp);
  } else if (fp && storeProgress > 0.95) {
    fpAward = fp;
  }

  // console.log("taskFP", fp);

  return {
    fpAward,
    visibleProgress: storeProgress < MIN_FP_PROG_TH ? 0 : storeProgress,
  };
};

export const useTaskStream = (
  uid?: string,
  activityId?: string,
  createActivity?: boolean,
  taskId?: string
) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [checked, setIsChecked] = useState<boolean>(false);
  const [fpProgress, setFpProgress] = useState<number>(0);
  const { task } = useWorkoutTask(taskId ? taskId : selectedActivity?.taskId);

  //   const { state } = useAuthContext();
  //   const { user } = useUserContext();
  //   const { task } = usePlainTaskContext();

  // console.log("sel", new Date(selectedUnix), res.currentStatus);

  useEffect(() => {
    const getTaskState = async () => {
      if (activityId && uid) {
        const userRelevantDoc = await getDoc(
          doc(doc(db, "users", uid), "activities", activityId)
        );

        if (userRelevantDoc.data()) {
          const selectedAct = userRelevantDoc.data() as Activity;

          //   console.log("selectedAct", selectedAct?.progress);

          if (selectedAct) {
            setSelectedActivity(selectedAct);
          }
        }

        setIsChecked(true);
      } else if (uid && task?.id && !activityId && createActivity) {
        const newAct = await createActivityForTask(uid, task.id);
        // console.log("newAct", newAct);
        setSelectedActivity(newAct);
        setIsChecked(true);
      }
    };

    getTaskState();
  }, [uid, activityId, task?.id, createActivity]);

  // console.log("hi data is fetched", task?.id, uid, selectedActivity);

  // console.log("s", state.uid);

  const onUpdateProgress = async (progress: number, storeProgress: number) => {
    if (uid && selectedActivity?.id) {
      const fp = task?.fitPoints;
      let fpAward: number = 0;
      if (fp && storeProgress > 0.2 && storeProgress < 0.95) {
        fpAward = Math.round(storeProgress * fp);
      } else if (fp && storeProgress > 0.95) {
        fpAward = fp;
      }

      const calories = fpAward * 300;
      setFpProgress(storeProgress > 1 ? 1 : storeProgress);

      await updateDoc(
        doc(doc(db, "users", uid), "activities", selectedActivity?.id),
        {
          progress: progress,
          fpProgress: storeProgress > 1 ? 1 : storeProgress,
          ...(calories ? { calories: calories, reviewStatus: "REVIEWED" } : {}),
        }
      );
    }
  };

  return {
    selectedActivity,
    onUpdateProgress,
    fpProgress,
    checked,
    taskFP: task?.fitPoints,
  };
};
