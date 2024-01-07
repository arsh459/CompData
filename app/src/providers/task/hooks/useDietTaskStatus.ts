import { Task } from "@models/Tasks/Task";
import { statusTypes } from "@modules/HomeScreen/MyPlan/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { dayMS } from "@providers/period/periodStore";
import { Activity } from "@models/Activity/Activity";
import { getSelectedActivityV2 } from "@utils/task/taskProgress";

export const useDietTaskStatus = (selectedUnix?: number, task?: Task) => {
  const { state } = useAuthContext();
  const [taskStatus, setTaskStatus] = useState<statusTypes>("pending");
  // const [progressStr, setProgressStr] = useState<string>("");
  // const [done, setDone] = useState<string>("");
  // const [percent, setPercent] = useState<number>(0);
  const [doneTasks, setDoneTasks] = useState<number>(0);

  const { res } = useSubscriptionContext();
  useEffect(() => {
    if (task?.id && state.uid && selectedUnix) {
      if (
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
              if (task.name === "Rajma with Chawal") {
                console.log(
                  "length of user relevant docs",
                  userRelevantActsDocs.docs.length
                );
              }
              const userRelevantActs: Activity[] = [];
              for (const doc of userRelevantActsDocs.docs) {
                const remoteDoc = doc.data() as Activity | null;

                // console.log("remote", remoteDoc?.createdOn);

                if (remoteDoc) {
                  userRelevantActs.push(remoteDoc);
                }
              }

              const selectedAct = getSelectedActivityV2(userRelevantActs);
              if (task.name === "Rajma with Chawal") {
                // console.log("Selected Activity", selectedAct);
              }
              if (selectedAct) {
                const fp =
                  (selectedAct.calories ? selectedAct.calories : 0) / 300;
                if (fp >= (task.fitPoints ? task.fitPoints : 0)) {
                  setTaskStatus("done");
                } else {
                  // const totalSubtasks = task.subTasks?.length
                  //   ? task.subTasks?.length
                  //   : 1;

                  let doneSubtasks: number = 0;
                  if (task.name === "Rajma with Chawal") {
                    console.log(
                      "Selected Activity SubtaskScore",
                      selectedAct.subTaskScore
                    );
                  }
                  if (selectedAct.subTaskScore) {
                    for (const key of Object.keys(selectedAct.subTaskScore)) {
                      const val = selectedAct.subTaskScore[key];
                      if (val) {
                        doneSubtasks++;
                      }
                    }
                  }

                  // setProgressStr(`${doneSubtasks}/${totalSubtasks} done`);
                  setTaskStatus("play");
                  setDoneTasks(doneSubtasks);
                  // setPercent(doneSubtasks / totalSubtasks);
                  // setDone(`${doneSubtasks}/${totalSubtasks}`);
                }
              } else {
                setTaskStatus("play");
              }
            }
          });

        return () => unsub();
      }
    }
  }, [
    res.currentStatus,
    task?.id,
    state.uid,
    selectedUnix,
    task?.fitPoints,
    task?.subTasks?.length,
  ]);

  return {
    taskStatus,
    doneTasks,
  };
};
