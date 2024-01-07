import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Task } from "@models/Tasks/Task";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getTaskProgressOfList } from "@utils/task/taskProgress";
import { Activity } from "@models/Activity/Activity";
import { statusTypes } from "@modules/HomeScreen/MyPlan/utils";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useDayContext } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { useConfigContext } from "@providers/Config/ConfigProvider";

const dayMS = 24 * 60 * 60 * 1000;
const hourMS = 60 * 60 * 1000;

export const useIsTaskAllowedV4 = (
  selectedUnix: number,
  doneTh: number,
  task?: Task,
  accessDueToBootcamp?: boolean
) => {
  const [taskStatus, setTaskStatus] = useState<statusTypes>();
  const [progress, setProgress] = useState<number>(0);
  const [earnedFP, setEarnedFP] = useState<number>(0);
  const [unlocksIn, setUnlocksIn] = useState<string>("");
  const [expiresIn, setExpiresIn] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const { res, sbplan } = useSubscriptionContext();
  const { state, todayUnix } = useAuthContext();

  const { startUnixDayStart } = useDayContext();
  const { config } = useConfigContext();
  const freeDays = config?.freeDays ? config.freeDays : 0;

  const daysFromStart = (todayUnix - startUnixDayStart) / dayMS;
  const isFreeTask = daysFromStart <= freeDays;

  const planAccessType = sbplan?.planType;

  useEffect(() => {
    if (
      isFreeTask && // in free period
      todayUnix === selectedUnix && // today
      res.currentStatus !== "SUBSCRIBED" && // not paid
      taskStatus === "play"
    ) {
      setExpiresIn(createExpiresInString(todayUnix));
    } else {
      setExpiresIn("");
    }
  }, [todayUnix, taskStatus, selectedUnix, res.currentStatus, isFreeTask]);

  useEffect(() => {
    const getTaskState = async () => {
      if (task?.id && state.uid) {
        // future task
        if (
          (planAccessType !== "proPlus" ||
            res.currentStatus !== "SUBSCRIBED") &&
          task.taskType === "live"
        ) {
          setTaskStatus("proPlus");
        } else if (
          task.liveLink &&
          task.liveOn &&
          task.taskType === "live" &&
          res.currentStatus === "SUBSCRIBED"
        ) {
          setTaskStatus("live");
          setUnlocksIn(createUnlockInString(task.liveOn));
        } else if (
          selectedUnix >= todayUnix + dayMS &&
          task.taskType !== "live"
        ) {
          setTaskStatus("locked");
          setUnlocksIn(createUnlockInString(selectedUnix));
        }
        // pro for all pro tasks
        else if (
          !isFreeTask &&
          res.currentStatus !== "SUBSCRIBED" &&
          res.currentStatus !== "PENDING"
        ) {
          setTaskStatus("pro");
        } else {
          const unsub = firestore()
            .collection("users")
            .doc(state.uid)
            .collection("activities")
            .where("createdOn", ">=", selectedUnix)
            .where("createdOn", "<=", selectedUnix + dayMS)
            .where("taskId", "==", task?.id)
            .onSnapshot((userRelevantActsDocs) => {
              if (userRelevantActsDocs) {
                const userRelevantActs: Activity[] = [];
                for (const doc of userRelevantActsDocs.docs) {
                  const remoteDoc = doc.data() as Activity | null;

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
                } else if (
                  res.currentStatus === "SUBSCRIBED" ||
                  isFreeTask ||
                  accessDueToBootcamp
                ) {
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

                // past incomplete task
                // if (prog.progress > 0) {
                //   setTaskStatus("done");
                //   setEarnedFP(prog.currentPts);
                //   setProgress(prog.progress / 100);
                //   setSelectedActivity(prog.selectedAct);
                // } else if (prog.selectedAct?.reviewStatus === "PENDING") {
                //   setTaskStatus("pending");
                //   setSelectedActivity(undefined);
                // } else if (
                //   res.currentStatus === "SUBSCRIBED" ||
                //   isFreeTask
                // ) {

                // } else {
                //   setTaskStatus("pro");
                //   setSelectedActivity(undefined);
                // }

                // else if (selectedUnix < todayUnix) {
                //   setTaskStatus("play"); // play for now
                //   setSelectedActivity(undefined);
                // } else if (
                //   selectedUnix >= todayUnix &&
                //   (task.freeTask || res.currentStatus === "SUBSCRIBED")
                // ) {
                //   if (task.taskType === "live" && task.liveLink) {
                //     setTaskStatus("live");
                //     setSelectedActivity(undefined);
                //   } else {
                //     setTaskStatus("play");
                //     setSelectedActivity(undefined);
                //   }
                // } else if (selectedUnix >= todayUnix && !task.freeTask) {
                //   setTaskStatus("pro");
                //   setSelectedActivity(undefined);
                // } else {
                //   setSelectedActivity(undefined);
                // }
              } else {
                if (
                  res.currentStatus === "SUBSCRIBED" ||
                  isFreeTask ||
                  accessDueToBootcamp
                ) {
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
            });

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
    state.uid,
    selectedUnix,
    res.currentStatus,
    task?.freeTask,
    task?.fitPoints,
    todayUnix,
    task?.liveLink,
    task?.taskType,
    task?.freeTask,
    doneTh,
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
