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

const dayMS = 24 * 60 * 60 * 1000;
const hourMS = 60 * 60 * 1000;
// const freeDays = 1
export const useIsTaskAllowed = (
  uid: string,
  taskId: string,
  maxFP: number,
  selectedUnix: number
) => {
  const [taskStatus, setTaskStatus] = useState<statusTypes>();
  const [progress, setProgress] = useState<number>(0);
  const [earnedFP, setEarnedFP] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [unlocksIn, setUnlocksIn] = useState<string>("");
  // console.log("s", selectedUnix);
  const initNowDate = new Date();
  const todayUnix = new Date(
    initNowDate.getFullYear(),
    initNowDate.getMonth(),
    initNowDate.getDate(),
    0,
    0,
    0,
    0
  ).getTime();

  useEffect(() => {
    if (selectedUnix >= todayUnix + dayMS) {
      setTaskStatus("locked");
      setUnlocksIn(createUnlockInString(selectedUnix));
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
  }, [uid, taskId, maxFP, selectedUnix, todayUnix]);

  return {
    taskStatus,
    progress,
    earnedFP,
    selectedActivity,
    unlocksIn,
  };
};

const createUnlockInString = (checkUnix: number) => {
  const now = Date.now();

  const diff = checkUnix - now;
  if (diff > dayMS) {
    const days = Math.floor(diff / dayMS);
    return `${days}D ${Math.floor((diff / dayMS - days) * 24)}H`;
  } else if (diff >= 0) {
    const hours = Math.floor(diff / hourMS);
    return `${hours}H ${Math.floor((diff / hourMS - hours) * 60)}M`;
  }

  return "";
};
