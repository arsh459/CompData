import { Task } from "@models/Tasks/Task";
import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import { useEffect, useState } from "react";
import { EarnedTaskInterface } from "../EarnedTaskCard";
// import { actIndex } from "./algolia";
import { useGameContext } from "@providers/game/GameProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { defaultStepTarget } from "@modules/HomeScreen/MyPlanV2/StepElement";
import { format, isToday } from "date-fns";
import { Activity } from "@models/Activity/Activity";

const algoliaFetch = async (
  uid: string,
  gameId: string,
  page: number,
  stepTaskId: string,
  userStepTarget: number
): Promise<EarnedTaskInterface[]> => {
  try {
    const fireResp = await firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .where("canFetch", "==", true)
      .orderBy("createdOn", "desc")
      .get();

    const remoteActs: Activity[] = [];
    for (const doc of fireResp.docs) {
      remoteActs.push(doc.data() as Activity);
    }

    // const response = (await actIndex.search("", {
    //   hitsPerPage: 5,
    //   filters: `authorUID:${uid} AND calories > 0`,
    //   page: page,
    // })) as AlgoliaSearchResponse;

    // const response = (
    //   await axios.get("https://socialboat.live/api/admin/search", {
    //     params: {
    //       player: uid,
    //       game: gameId,
    //       onlyPositive: "1",
    //       ...(page ? { page: page } : {}),
    //     },
    //   })
    // ).data as AlgoliaSearchResponse;

    if (remoteActs.length) {
      const remoteEarned: EarnedTaskInterface[] = [];
      for (const act of remoteActs) {
        if (act.taskId) {
          const remoteTask = await firestore()
            .collection("tasks")
            .doc(act.taskId)
            .get();

          if (remoteTask.data()) {
            const tk = remoteTask.data() as Task;
            const earnedFP = Math.round(
              (act.calories ? act.calories : 0) / 300
            );

            let progress: number = 0;
            if (act.taskId === stepTaskId) {
              progress = (earnedFP * 1000) / userStepTarget;
            } else {
              progress = earnedFP / (tk.fitPoints ? tk.fitPoints : 1);
            }

            if (progress >= 1) {
              progress = 1;
            }

            const newObj: EarnedTaskInterface = {
              name: tk.name ? tk.name : "",
              media: tk.thumbnails,
              fitPoints: earnedFP,
              taskId: tk.id,
              attemptedDate: act.date
                ? act.date
                : act.createdOn
                ? format(act.createdOn, "yyyy-MM-dd")
                : "",

              unix: act.createdOn,
              totalFP:
                act.taskId === stepTaskId
                  ? Math.round(userStepTarget / 1000)
                  : tk.fitPoints
                  ? tk.fitPoints
                  : 0,
              id: act.id ? act.id : act.postId,
              taskType: tk.taskType ? tk.taskType : "workout",
              progress,
            };

            remoteEarned.push(newObj);
          }
        }
      }

      return remoteEarned;
    }

    return [];
  } catch (error: any) {
    crashlytics().recordError(error);
    return [];
  }
};

export const useEarnedTasksAlgolia = (uid?: string) => {
  const { state } = useAuthContext();
  const [earnedTasks, setEarnedTasks] = useState<EarnedTaskInterface[]>([]);
  const [earnedTasksSectionList, setEarnedTasksSectionList] = useState<
    { day: string; data: EarnedTaskInterface[] }[]
  >([]);
  const [page, updatePage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { game } = useGameContext();

  const stepTaskId = game?.configuration?.stepTaskId;
  const { user } = useUserContext();

  const [initDone, setInitDone] = useState<boolean>(false);
  const userStepsGoal = user?.dailyStepTarget;
  //   const [init, setInit] = useState<boolean>(false);

  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [hits, setHits] = useState<AlgoliaActivity[]>([]);
  //   const [nbPages, setNbPages] = useState<number>(0);
  //   const [nbHits, setNbHits] = useState<number>(0);
  //   const [refresh, setRefresh] = useState<number>(0);

  const onNext = async () => {
    if (stepTaskId && initDone) {
      const results = await algoliaFetch(
        uid ? uid : state.uid ? state.uid : "",
        state.gameId,
        page + 1,
        stepTaskId,
        userStepsGoal ? userStepsGoal : defaultStepTarget
      );

      if (results.length) {
        setEarnedTasksSectionList((p) => mergeSection(p, results));
        setEarnedTasks((p) => [...p, ...results]);
        updatePage((p) => p + 1);
      }
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      if ((state.uid || uid) && stepTaskId) {
        const results = await algoliaFetch(
          uid ? uid : state.uid ? state.uid : "",
          state.gameId,
          0,
          stepTaskId,
          userStepsGoal ? userStepsGoal : defaultStepTarget
        );

        if (results.length) {
          setEarnedTasksSectionList(mergeSection([], results));
          setEarnedTasks(results);
        }

        setLoading(false);
        setInitDone(true);
      }
    };

    !initDone && fetchResults();
  }, [state.uid, state.gameId, uid, stepTaskId, userStepsGoal, initDone]);

  return {
    onNext,
    earnedTasks,
    earnedTasksSectionList,
    loading,
  };
};

const mergeSection = (
  previous: { day: string; data: EarnedTaskInterface[] }[],
  newDocs: EarnedTaskInterface[]
) => {
  let lastDt: string = "";
  if (previous.length) {
    lastDt = previous[previous.length - 1].day;
  }

  const mergedDocs = previous;
  for (const newDoc of newDocs) {
    const day = newDoc.unix
      ? isToday(newDoc.unix)
        ? "Today"
        : format(newDoc.unix, "do MMM")
      : lastDt;
    if (day === lastDt) {
      mergedDocs[mergedDocs.length - 1].data.push(newDoc);
    } else {
      mergedDocs.push({ day: day, data: [newDoc] });
    }
  }

  return mergedDocs;
};
