import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { makeGeneratorCall } from "./generatorCall";
import { oneDayMS } from "@models/slots/utils";
import { db } from "@config/firebase";

export type availableStatus = "PAST" | "FUTURE" | "UNKNOWN" | "IN_PLAN";

export const useDayRecom = (
  date: string,
  type: dayRecommendationType,
  uid?: string,
  badgeId?: string,
  dontFetch?: boolean
) => {
  const [error, setError] = useState<string>("");

  const [fetch, setFetch] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<
    dayRecommendation | undefined
  >(undefined);

  useEffect(() => {
    if (fetch && !recommendation?.id && !dontFetch && uid) {
      makeGeneratorCall(uid, type, true, false, badgeId)
        .then((resp) => {
          if (resp.status === "success") {
            // to
            setTimeout(() => {
              setFetch(false);
              setError("");
            }, 2000);
          }
        })
        .catch((e) => {
          console.log("error here", e);

          setFetch(false);
          setError(
            "Your plan is getting ready. Please checkout in a few minutes"
          );
        });
    }
  }, [uid, fetch, recommendation?.id, dontFetch, badgeId, type]);

  useEffect(() => {
    if (uid && date && type) {
      let recsRef = null;
      if (badgeId) {
        recsRef = query(
          collection(db, "users", uid, "dayRecommendations"),
          where("type", "==", type),
          where("badgeId", "==", badgeId),
          where("date", "==", date)
        );
      } else {
        recsRef = query(
          collection(db, "users", uid, "dayRecommendations"),
          where("type", "==", type),
          where("date", "==", date)
        );
      }

      const unsub = onSnapshot(recsRef, (snapshot) => {
        if (snapshot?.docs.length) {
          setRecommendation(snapshot.docs[0].data() as dayRecommendation);
          setFetch(false);
          setError("");
        } else {
          const now = Date.now();
          const requestedTime = new Date(date).getTime();

          if (requestedTime - now > oneDayMS * 7) {
            setError(
              "Plan for this date will be generated soon. Please message us if you seek assistance"
            );
            setFetch(false);
            setRecommendation(undefined);
          } else {
            setError("SocialBoat AI is generating your plan. Please Wait");
            setFetch(true);
            setRecommendation(undefined);
          }
        }
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [uid, date, type, badgeId]);

  return {
    recommendation,
    error,
    fetch,
  };
};
