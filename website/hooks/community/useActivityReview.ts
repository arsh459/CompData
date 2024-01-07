import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, query, onSnapshot, collection, where } from "firebase/firestore";
import * as Sentry from "@sentry/browser";

const normaliseActivity = (actName: string) => {
  if (actName === "Terra") {
    return "custom workout";
  } else if (actName === "cycling") {
    return "community post";
  }

  return actName;
};

export const useActivityReview = (
  postId?: string,
  uid?: string,
  fetch?: boolean
) => {
  const [adminReview, setAdminReview] = useState<Activity[]>([]);
  const [fitPoints, setTotalFPoints] = useState<number>(0);
  const [activityName, setActivityNameString] = useState<string>("");
  const [selectedReview, setSelectedReview] = useState<Activity | undefined>();
  useEffect(() => {
    // const getActivityReview = async () => {
    try {
      // console.log("HERE", postId, uid, fetch);
      if (uid && postId && fetch) {
        const q = query(
          collection(doc(db, "users", uid), "activities"),
          where("postId", "==", postId)
        );
        const unsubscribe = onSnapshot(
          q,

          (docs) => {
            let calories: number = 0;
            let actString: string = "";
            const remoteActs: Activity[] = [];
            for (const remote of docs.docs) {
              const remoteAct = remote.data() as Activity;
              remoteActs.push({
                ...remoteAct,
                id: remote.id,
              });

              // console.log("re", remoteAct);

              if (!actString) {
                actString = normaliseActivity(remoteAct.activityName);
              } else if (!actString.includes(remoteAct.activityName)) {
                actString += remoteAct.activityName
                  ? `, ${normaliseActivity(remoteAct.activityName)}`
                  : "";
              }
              calories += remoteAct.calories ? remoteAct.calories : 0;
            }

            // const data = doc.data() as Activity;

            setAdminReview(remoteActs);
            setActivityNameString(actString);
            setTotalFPoints(Math.floor(calories / 300));
            //setSelectedReview(remoteActs.length > 0 ? remoteActs[0] : undefined);
          }
        );

        return () => {
          unsubscribe();
          setAdminReview([]);
          setActivityNameString("");
          setTotalFPoints(0);
        };
      }
    } catch (error) {
      console.log("error");
      Sentry.captureException(error);
    }
    // };
    // if (fetch) {
    // getActivityReview();
    // }
  }, [postId, uid, fetch]);

  return {
    adminReview,
    selectedReview,
    setSelectedReview,
    activityName,
    fitPoints,
  };
};
