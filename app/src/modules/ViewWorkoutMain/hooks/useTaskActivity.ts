import { Activity } from "@models/Activity/Activity";
import { statusTypes } from "@modules/HomeScreen/MyPlan/utils";
import { getTaskProgressOfList } from "@utils/task/taskProgress";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";

export const useTaskActivity = (
  uid: string,
  taskId: string,
  maxFP: number,
  freeTask?: boolean,
  isLiveTask?: boolean
) => {
  const [taskStatus, setTaskStatus] = useState<statusTypes>();
  const [progress, setProgress] = useState<number>(0);
  const [earnedFP, setEarnedFP] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  const { res, sbplan } = useSubscriptionContext();

  useEffect(() => {
    if (
      isLiveTask &&
      (res.currentStatus !== "SUBSCRIBED" || sbplan?.planType !== "proPlus")
    ) {
      setTaskStatus("proPlus");
    } else if (
      res.currentStatus !== "SUBSCRIBED" &&
      res.currentStatus !== "PENDING" &&
      !freeTask
    ) {
      setTaskStatus("pro");
    } else {
      const ref = firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .where("taskId", "==", taskId)
        .where("calories", ">=", 0)
        .orderBy("calories", "desc")
        .limit(1);

      const unsub = ref.onSnapshot((docs) => {
        if (docs && docs.docs.length) {
          const acts: Activity[] = [];
          for (const remoteDoc of docs.docs) {
            acts.push(remoteDoc.data() as Activity);
          }

          const prog = getTaskProgressOfList(acts, maxFP);

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
      });

      return () => {
        unsub();
      };
    }
  }, [uid, taskId, maxFP, res.currentStatus, freeTask]);

  return {
    taskStatus,
    progress,
    earnedFP,
    selectedActivity,
  };
};
