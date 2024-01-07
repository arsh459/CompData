import crashlytics from "@react-native-firebase/crashlytics";
// import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import { Activity } from "@models/Activity/Activity";
import { useEffect, useState } from "react";
// import * as Sentry from "@sentry/browser";

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
    try {
      if (uid && postId && fetch) {
        const unsubscribe = firestore()
          .collection("users")
          .doc(uid)
          .collection("activities")
          .where("postId", "==", postId)
          .onSnapshot((docs) => {
            let calories: number = 0;
            let actString: string = "";
            const remoteActs: Activity[] = [];
            if (docs) {
              for (const remote of docs.docs) {
                const remoteAct = remote.data() as Activity;
                remoteActs.push({
                  ...remoteAct,
                  id: remote.id,
                });

                if (!actString) {
                  actString = normaliseActivity(remoteAct.activityName);
                } else if (!actString.includes(remoteAct.activityName)) {
                  actString += remoteAct.activityName
                    ? `, ${normaliseActivity(remoteAct.activityName)}`
                    : "";
                }
                calories += remoteAct.calories ? remoteAct.calories : 0;
              }
            }

            setAdminReview(remoteActs);
            setActivityNameString(actString);
            setTotalFPoints(Math.floor(calories / 300));
          });

        return () => {
          unsubscribe();
          setAdminReview([]);
          setActivityNameString("");
          setTotalFPoints(0);
        };
      }
    } catch (error: any) {
      console.log("error");
      crashlytics().recordError(error);
      // Sentry.captureException(error);
    }
  }, [postId, uid, fetch]);

  return {
    adminReview,
    selectedReview,
    setSelectedReview,
    activityName,
    fitPoints,
  };
};
