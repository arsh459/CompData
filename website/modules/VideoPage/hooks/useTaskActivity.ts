import { useEffect, useState } from "react";
import {
  collection,
  doc,
  //   getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { Activity } from "@models/Activities/Activity";
import { getTaskProgressOfList } from "@hooks/tasks/progressUtils";
import { statusTypes } from "@hooks/tasks/useIsTaskAllowedV4";

export const useTaskActivity = (
  uid: string,
  taskId: string,
  maxFP: number,
  isPro: boolean,
  freeTask: boolean
) => {
  const [taskStatus, setTaskStatus] = useState<statusTypes>();
  const [progress, setProgress] = useState<number>(0);
  const [earnedFP, setEarnedFP] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  // console.log("s", selectedUnix);

  useEffect(() => {
    if (!isPro && !freeTask) {
      setTaskStatus("pro");
    } else {
      const unsub = onSnapshot(
        query(
          collection(doc(db, "users", uid), "activities"),
          where("taskId", "==", taskId),
          where("calories", ">=", 0),
          orderBy("calories", "desc"),
          limit(1)
        ),
        (docs) => {
          if (docs && docs.docs.length) {
            const acts: Activity[] = [];
            for (const remoteDoc of docs.docs) {
              acts.push(remoteDoc.data() as Activity);
            }

            // console.log("docs", docs.docs.length);

            const prog = getTaskProgressOfList(acts, maxFP);

            // console.log(prog.selectedAct?.id);

            if (prog.progress > 95) {
              setTaskStatus("done");
              setEarnedFP(prog.currentPts);
              setProgress(prog.progress / 100);
              setSelectedActivity(prog.selectedAct);
            } else if (prog.progress) {
              setTaskStatus("play");
              setEarnedFP(prog.currentPts);
              setProgress(prog.progress / 100);
              setSelectedActivity(prog.selectedAct);
            } else if (prog.selectedAct?.progress) {
              setTaskStatus("play");
              setEarnedFP(prog.currentPts);
              setProgress(prog.progress / 100);
              setSelectedActivity(prog.selectedAct);
            } else {
              setTaskStatus("play");
              setSelectedActivity(prog.selectedAct);
            }
          } else {
            setTaskStatus("play");
            setSelectedActivity(undefined);
          }
        }
      );

      return () => {
        unsub();
      };
    }
  }, [uid, taskId, maxFP, isPro, freeTask]);

  return {
    taskStatus,
    progress,
    earnedFP,
    selectedActivity,
  };
};
