import { Activity } from "@models/Activity/Activity";
import { Task } from "@models/Tasks/Task";
import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { EarnedTaskInterface } from "../EarnedTaskCard";
import { getEarnedTaskQuerry } from "./uttils";
import crashlytics from "@react-native-firebase/crashlytics";

export const workoutSectionTitleFormat = (unix: number): string => {
  return format(new Date(new Date(unix)), "do MMMM");
};

const mergeSection = (
  previous: { day: string; data: EarnedTaskInterface[] }[],
  newDocs: { day: string; data: EarnedTaskInterface[] }[]
) => {
  let lastDt: string = "";
  if (previous.length) {
    lastDt = previous[previous.length - 1].day;
  }

  const mergedDocs = previous;
  for (const newDoc of newDocs) {
    if (newDoc.day === lastDt) {
      mergedDocs[mergedDocs.length - 1].data.push(...newDoc.data);
    } else {
      mergedDocs.push(newDoc);
    }
  }

  return mergedDocs;
};

const queryProcess = async (
  remoteActs: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
) => {
  const earnedObjs: { day: string; data: EarnedTaskInterface[] }[] = [];

  let lDoc: FirebaseFirestoreTypes.DocumentData | undefined;
  for (const remoteAct of remoteActs.docs) {
    const act = remoteAct.data() as Activity;

    if (act.taskId) {
      const remoteTask = await firestore()
        .collection("tasks")
        .doc(act.taskId)
        .get();

      if (remoteTask.data() && act.createdOn) {
        const tk = remoteTask.data() as Task;

        // if (tk.taskType !== "stepsss") {
        const earnedFP = Math.round((act.calories ? act.calories : 0) / 300);

        const tempDate = workoutSectionTitleFormat(act.createdOn);

        const targetIndex = earnedObjs.findIndex(
          (item) => item.day === tempDate
        );

        const targetObj: EarnedTaskInterface = {
          name: tk.name ? tk.name : "",
          media: tk.thumbnails,
          fitPoints: earnedFP,
          unix: act.createdOn,
          totalFP: tk.fitPoints ? tk.fitPoints : 0,
          id: act.id ? act.id : act.postId,
          reviewStatus: act?.reviewStatus,
          taskId: tk.id ? tk.id : "",
          taskDay: act?.taskDay ? act.taskDay : 0,
          badgeId: tk.badgeId ? tk.badgeId : "",
          taskType: tk.taskType ? tk.taskType : "workout",
          progress: earnedFP / (tk.fitPoints ? tk.fitPoints : 1),
          attemptedDate: act.date
            ? act.date
            : format(act.createdOn, "yyyy-MM-dd"),
        };
        if (targetIndex !== -1) {
          earnedObjs[targetIndex].data.push(targetObj);
        } else {
          earnedObjs.push({ day: tempDate, data: [targetObj] });
        }
        // }
      }
    }

    lDoc = remoteAct;
  }

  return {
    lDoc,
    earnedObjs,
  };
};

export const useEarnedTasksV2 = (source?: "task" | "steps" | "nutrition") => {
  const { state } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [earnedTasks, setEarnedTasks] = useState<
    {
      day: string;
      data: EarnedTaskInterface[];
    }[]
  >([]);
  const [extraData, setExtraData] = useState<number>(0);
  const [lastDoc, setLastDoc] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >(undefined);
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    const initialise = async () => {
      if (!init && state.uid) {
        setLoading(true);

        try {
          const querry = getEarnedTaskQuerry(state.uid, lastDoc, source);

          const remoteActs = await querry.get();

          // const remoteActs = firestore()
          //   .collection("users")
          //   .doc(state.uid)
          //   .collection("activities")
          //   .orderBy("createdOn", "desc")
          //   .limit(5)
          //   .get();

          const { lDoc, earnedObjs } = await queryProcess(remoteActs);
          setLastDoc(remoteActs.docs.length === 5 ? lDoc : undefined);

          setEarnedTasks((p) => mergeSection(p, earnedObjs));

          setInit(true);
        } catch (error: any) {
          crashlytics().recordError(error);
          console.log(error);
        }

        setLoading(false);
      }
    };

    initialise();
  }, [state.uid, init, source]);

  const onNext = async () => {
    if (lastDoc && state.uid) {
      setLoading(true);

      const querry = getEarnedTaskQuerry(state.uid, lastDoc, source);

      const remoteActs = await querry.get();

      // const remoteActs = await firestore()
      //   .collection("users")
      //   .doc(state.uid)
      //   .collection("activities")
      //   .orderBy("createdOn", "desc")
      //   .limit(5)
      //   .startAfter(lastDoc)
      //   .get();

      if (remoteActs) {
        const { lDoc, earnedObjs } = await queryProcess(remoteActs);

        setLastDoc(remoteActs.docs.length === 5 ? lDoc : undefined);
        setEarnedTasks((p) => mergeSection(p, earnedObjs));
        setExtraData((p) => p + 1);
      }

      setLoading(false);
    }
  };

  return {
    onNext,
    earnedTasks,
    extraData,
    loading,
  };
};
