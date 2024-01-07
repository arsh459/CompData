import { Activity } from "@models/Activity/Activity";
import { Task } from "@models/Tasks/Task";
import { useAuthContext } from "@providers/auth/AuthProvider";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { EarnedTaskInterface } from "../EarnedTaskCard";

const queryProcess = async (
  remoteActs: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
) => {
  const earnedObjs: EarnedTaskInterface[] = [];
  let lDoc: FirebaseFirestoreTypes.DocumentData | undefined;
  for (const remoteAct of remoteActs.docs) {
    const act = remoteAct.data() as Activity;

    if (act.taskId) {
      const remoteTask = await firestore()
        .collection("tasks")
        .doc(act.taskId)
        .get();

      if (remoteTask.data()) {
        const tk = remoteTask.data() as Task;

        const earnedFP = Math.round((act.calories ? act.calories : 0) / 300);

        earnedObjs.push({
          name: tk.name ? tk.name : "",
          media: tk.thumbnails,
          fitPoints: earnedFP,
          unix: act.createdOn,
          totalFP: tk.fitPoints ? tk.fitPoints : 0,
          id: act.id ? act.id : act.postId,
          taskType: tk.taskType ? tk.taskType : "workout",
        } as EarnedTaskInterface);
      }
    }

    lDoc = remoteAct;
  }

  return {
    lDoc,
    earnedObjs,
  };
};

export const useEarnedTasks = () => {
  const { state } = useAuthContext();
  const [earnedTasks, setEarnedTasks] = useState<EarnedTaskInterface[]>([]);
  const [lastDoc, setLastDoc] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >();
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    const initialise = async () => {
      if (!init && state.uid) {
        try {
          const remoteActs = await firestore()
            .collection("users")
            .doc(state.uid)
            .collection("activities")
            .where("calories", ">", 0)
            // .where("reviewStatus", "==", "REVIEWED")
            // .orderBy("createdOn", "desc")
            .limit(5)
            .get();

          const { lDoc, earnedObjs } = await queryProcess(remoteActs);
          setLastDoc(remoteActs.docs.length === 5 ? lDoc : undefined);
          setEarnedTasks((p) => [...p, ...earnedObjs]);
          setInit(true);
        } catch (error: any) {
          crashlytics().recordError(error);
          console.log(error);
        }
      }
    };

    initialise();
  }, [state.uid, init]);

  const onNext = async () => {
    if (lastDoc && state.uid) {
      const remoteActs = await firestore()
        .collection("users")
        .doc(state.uid)
        .collection("activities")
        .orderBy("createdOn", "desc")
        .limit(5)
        .startAfter(lastDoc)
        .get();

      if (remoteActs) {
        const { lDoc, earnedObjs } = await queryProcess(remoteActs);

        setLastDoc(remoteActs.docs.length === 5 ? lDoc : undefined);
        setEarnedTasks((p) => [...p, ...earnedObjs]);
      }
    }
  };

  return {
    onNext,
    earnedTasks,
  };
};
