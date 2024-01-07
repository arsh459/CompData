// import { WorkoutActivity } from "@models/Workouts/WorkoutActivity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot, query, where, collection } from "firebase/firestore";
// import { getCurrentWeek } from "@hooks/community/challengeWeekUtils/utils";
import { Activity } from "@models/Activities/Activity";

export const usePreviousActivities = (
  fetch: boolean,
  weekStartsUnix: number | undefined,
  weekEndUnix: number | undefined,
  taskId?: string,
  uid?: string,
  taskFrequency?: "weekly" | "anytime" | "daily",
  // eventStarts?: number,
  // roundLength?: number,
  // sprintLength?: number,
  gameId?: string,
  oneTimeOnly?: boolean
) => {
  const [userActivities, setUserActs] = useState<Activity[]>([]);
  const [unlocksNext, setUnlocksNext] = useState<number>(0);
  const [loadingState, setLoading] = useState<"PENDING" | "DONE" | "FAILED">(
    "PENDING"
  );

  useEffect(() => {
    // console.log(
    //   "fetch",
    //   fetch,
    //   taskId,
    //   uid,
    //   taskFrequency,
    //   sprintLength,
    //   roundLength,
    //   eventStarts
    // );
    // if (oneTimeOnly && uid) {
    //   const userRef = doc(db, "users", uid);
    //   const q = query(
    //     collection(userRef, "activities"),
    //     where("taskId", "==", taskId),
    //   );
    // } else

    if (
      // false &&
      // !oneTimeOnly &&
      fetch &&
      taskId &&
      uid &&
      taskFrequency &&
      taskFrequency !== "anytime" &&
      weekStartsUnix &&
      weekEndUnix
      // sprintLength &&
      // roundLength &&
      // eventStarts
    ) {
      const now = new Date();

      let start: number = 0;
      let unlocksNext: number = 0;
      if (taskFrequency === "daily") {
        start = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0,
          0,
          0
        ).getTime();
        unlocksNext = start + 24 * 60 * 60 * 1000;
      } else if (taskFrequency === "weekly") {
        // const { weekStartsUnix } = getCurrentWeek(
        //   sprintLength,
        //   roundLength,
        //   eventStarts
        // );

        start = weekStartsUnix;
        unlocksNext = weekEndUnix; //start + 7 * 24 * 60 * 60 * 1000;
      }

      // console.log("start", start, taskId);

      const userRef = doc(db, "users", uid);
      // frequency based check
      const q = query(
        collection(userRef, "activities"),
        where("createdOn", ">=", start),
        where("taskId", "==", taskId)
      );

      const unsub = onSnapshot(q, (docs) => {
        const acts: Activity[] = [];
        for (const doc of docs.docs) {
          const remoteDoc = doc.data() as Activity;
          // console.log(
          //   remoteDoc.reviewStatus,
          //   remoteDoc.postRef,
          //   gameId,
          //   remoteDoc.games
          // );
          if (
            remoteDoc.postRef &&
            gameId &&
            remoteDoc?.games?.includes(gameId) && // activity in right game
            remoteDoc.reviewStatus !== "TRY_AGAIN" && // user needs to try again
            remoteDoc.reviewStatus !== "NEED_MORE_DATA" // user needs to give data
          ) {
            acts.push(remoteDoc);
          }
        }

        setUserActs(acts);
        setUnlocksNext(acts.length ? unlocksNext : 0);
        setLoading("DONE");
      });

      return () => {
        unsub();

        // setUserStream(undefined);
      };
    } else {
      setLoading("DONE");
      // setUserStream(undefined);
    }
  }, [
    taskId,
    uid,
    taskFrequency,
    // eventStarts,
    // roundLength,
    // sprintLength,
    fetch,
    gameId,
    weekStartsUnix,
    weekEndUnix,
    // oneTimeOnly,
  ]);

  return {
    userActivities,
    unlocksNext,
    loadingState,
    setLoading,
  };
};

/**
 * isTaskAllowed()
 * // level check
 *
 * // frequency check
 *
 * // rank check
 *
 * // parentCheck
 *
 */
