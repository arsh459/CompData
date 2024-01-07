import { useEffect, useState } from "react";

import { Task } from "@models/Tasks/Task";
import { Activity } from "@models/Activities/Activity";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@config/firebase";
import { getTaskProgressOfList } from "./progressUtils";
import { getUnixTimestamp } from "@templates/Recommendations/utils";

export type statusTypes =
  | "locked"
  | "live"
  | "pending"
  | "pro"
  | "done"
  | "play"
  | "expired";

const dayMS = 24 * 60 * 60 * 1000;

export const useIsTaskAllowedV4 = (
  date: string,
  uid: string,
  tz: string,
  task?: Task
) => {
  //   const [taskStatus, setTaskStatus] = useState<statusTypes>();
  //   const [progress, setProgress] = useState<number>(0);
  const [earnedFP, setEarnedFP] = useState<number>(0);

  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  useEffect(() => {
    const getTaskState = async () => {
      if (task?.id && uid) {
        // future task

        const start = getUnixTimestamp(tz, date);

        // const start = new Date(
        //   parseInt(date.split("-")[0]),
        //   parseInt(date.split("-")[1]) - 1,
        //   parseInt(date.split("-")[2]),
        //   0,
        //   0,
        //   0,
        //   0
        // ).getTime();

        const userRelevantActsDocs = await getDocs(
          query(
            collection(doc(db, "users", uid), "activities"),
            where("createdOn", ">=", start),
            where("createdOn", "<=", start + dayMS),
            where("taskId", "==", task.id)
          )
        );

        const userRelevantActs: Activity[] = [];
        for (const doc of userRelevantActsDocs.docs) {
          const remoteDoc = doc.data() as Activity | null;

          if (remoteDoc) {
            userRelevantActs.push(remoteDoc);
          }
        }

        // console.log("acts", userRelevantActs.length);

        const prog = getTaskProgressOfList(
          userRelevantActs,
          task.fitPoints ? task.fitPoints : 0
        );

        if (userRelevantActs.length) {
          setEarnedFP(prog.currentPts);
          setSelectedActivity(prog.selectedAct);
        }
      }
    };

    getTaskState();
  }, [task?.id, uid, date, tz, task?.fitPoints]);

  return {
    earnedFP,
    selectedActivity,
  };
};
