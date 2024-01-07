import { useEffect, useState } from "react";
import { Task } from "@models/Tasks/Task";
import { statusTypes } from "./useIsTaskAllowedV4";
import { Activity } from "@models/Activities/Activity";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "@config/firebase";
import { getTaskProgressOfList } from "./progressUtils";

const dayMS = 24 * 60 * 60 * 1000;
const hourMS = 60 * 60 * 1000;
const freeDays = 1;

export const useIsTaskAllowedV5 = (
  selectedUnix: number,
  doneTh: number,
  isPro: boolean,
  uid: string,
  startUnixDayStart: number,
  todayUnix: number,
  task?: Task,
  accessDueToBootcamp?: boolean
) => {
  const [taskStatus, setTaskStatus] = useState<statusTypes>();
  const [progress, setProgress] = useState<number>(0);
  const [earnedFP, setEarnedFP] = useState<number>(0);
  const [unlocksIn, setUnlocksIn] = useState<string>("");
  const [expiresIn, setExpiresIn] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  //   const { res } = useSubscriptionContext();

  const daysFromStart = (todayUnix - startUnixDayStart) / dayMS;
  const isFreeTask = daysFromStart <= freeDays;

  //   console.log("isFreeTask HI", isFreeTask);

  useEffect(() => {
    if (
      isFreeTask && // in free period
      todayUnix === selectedUnix && // today
      !isPro && // not paid
      taskStatus === "play"
    ) {
      setExpiresIn(createExpiresInString(todayUnix));
    } else {
      setExpiresIn("");
    }
  }, [todayUnix, taskStatus, selectedUnix, isPro, isFreeTask]);

  useEffect(() => {
    const getTaskState = async () => {
      if (task?.id && uid) {
        // future task
        if (selectedUnix >= todayUnix + dayMS) {
          setTaskStatus("locked");
          setUnlocksIn(createUnlockInString(selectedUnix));
        }
        // pro for all pro tasks
        else if (!isFreeTask && !isPro) {
          setTaskStatus("pro");
        } else {
          const unsub = onSnapshot(
            query(
              collection(doc(db, "users", uid), "activities"),
              where("createdOn", ">=", selectedUnix),
              where("createdOn", "<=", selectedUnix + dayMS),
              where("taskId", "==", task?.id)
            ),
            (userRelevantActsDocs) => {
              if (userRelevantActsDocs) {
                // console.log("hi I am here", userRelevantActsDocs.docs.length);
                const userRelevantActs: Activity[] = [];
                for (const doc of userRelevantActsDocs.docs) {
                  const remoteDoc = doc.data() as Activity | null;

                  // console.log("remote", remoteDoc?.createdOn);

                  if (remoteDoc) {
                    userRelevantActs.push(remoteDoc);
                  }
                }

                const prog = getTaskProgressOfList(
                  userRelevantActs,
                  task.fitPoints ? task.fitPoints : 0
                );

                // if done
                if (prog.progress > doneTh) {
                  setTaskStatus("done");
                  setEarnedFP(prog.currentPts);
                  setProgress(prog.progress / 100);
                  setSelectedActivity(prog.selectedAct);
                }
                // if running
                else if (prog.selectedAct?.progress) {
                  setTaskStatus("play");
                  setEarnedFP(prog.currentPts);
                  setProgress(prog.progress / 100);
                  setSelectedActivity(prog.selectedAct);

                  // setExpiresIn(createExpiresInString(todayUnix));
                } else if (isPro || isFreeTask || accessDueToBootcamp) {
                  if (task.taskType === "live" && task.liveLink) {
                    setTaskStatus("live");
                    setSelectedActivity(undefined);
                  } else {
                    setTaskStatus("play");
                    setSelectedActivity(undefined);
                    // setExpiresIn(createExpiresInString(todayUnix));
                  }
                } else {
                  setTaskStatus("pro");
                  setSelectedActivity(undefined);
                }
              } else {
                if (isPro || isFreeTask || accessDueToBootcamp) {
                  if (task.taskType === "live" && task.liveLink) {
                    setTaskStatus("live");
                    setSelectedActivity(undefined);
                  } else {
                    setTaskStatus("play");
                    setSelectedActivity(undefined);
                  }
                } else {
                  setTaskStatus("pro");
                  setSelectedActivity(undefined);
                }
              }
            }
          );

          // unsub
          return () => {
            unsub();
          };
        }
      }
    };

    getTaskState();
  }, [
    task?.id,
    accessDueToBootcamp,
    uid,
    selectedUnix,
    isPro,
    task?.freeTask,
    task?.fitPoints,
    todayUnix,
    task?.liveLink,
    task?.taskType,
    task?.freeTask,
    doneTh,
    isFreeTask,
  ]);

  return {
    taskStatus,
    progress,
    earnedFP,
    selectedActivity,
    unlocksIn,
    expiresIn,
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

const createExpiresInString = (todayUnix: number) => {
  const now = Date.now();
  const dayEnd = todayUnix + dayMS;

  const diff = dayEnd - now;
  if (diff > dayMS) {
    const days = Math.floor(diff / dayMS);
    return `${days}D ${Math.floor((diff / dayMS - days) * 24)}H`;
  } else if (diff >= 0) {
    const hours = Math.floor(diff / hourMS);
    return `${hours}H ${Math.floor((diff / hourMS - hours) * 60)}M`;
  }

  return "";
};
