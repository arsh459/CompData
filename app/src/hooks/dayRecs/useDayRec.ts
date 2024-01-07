import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { useEffect, useState } from "react";
import { useAuthContext } from "@providers/auth/AuthProvider";

import { makeGeneratorCall } from "./generatorCall";
import { oneDayMS } from "@models/slots/utils";
import crashlytics from "@react-native-firebase/crashlytics";
import { AxiosError } from "axios";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export type availableStatus = "PAST" | "FUTURE" | "UNKNOWN" | "IN_PLAN";

export const useDayRec = (
  date?: string,
  type?: dayRecommendationType,
  badgeId?: string,
  dontFetch?: boolean
) => {
  const { state } = useAuthContext();
  const [error, setError] = useState<string>("");

  const [fetch, setFetch] = useState<boolean>(false);
  const [recomendation, setRecommendation] = useState<
    dayRecommendation | undefined
  >(undefined);

  const { addToRecCache } = useUserStore((state) => {
    return { addToRecCache: state.addToRecCache };
  }, shallow);

  useEffect(() => {
    if (fetch && !recomendation?.id && !dontFetch && state.uid && type) {
      makeGeneratorCall(state.uid, type, false, false, badgeId)
        .then((resp) => {
          if (resp.status === "success") {
            // to
            setTimeout(() => {
              setFetch(false);
              setError("");
            }, 2000);
          }
        })
        .catch((e: AxiosError) => {
          crashlytics().recordError(e);
          setFetch(false);

          if (e.message === "Network Error") {
            setError(
              "You are not connected to the internet. Kindly check that"
            );
            // setFetch(false);
          } else {
            setError(
              "Your plan is getting ready. Please checkout in a few minutes"
            );
            // setFetch(false);
          }
        });
    }
  }, [state.uid, fetch, type, recomendation?.id, dontFetch, badgeId, type]);

  useEffect(() => {
    if (state.uid && date && type) {
      let recsRef: FirebaseFirestoreTypes.Query;
      if (badgeId) {
        recsRef = firestore()
          .collection("users")
          .doc(state.uid)
          .collection("dayRecommendations")
          .where("type", "==", type)
          .where("badgeId", "==", badgeId)
          .where("date", "==", date);

        const unsub = recsRef.onSnapshot((recs) => {
          // console.log("data", recs.docs[0].data());
          if (recs?.docs && recs?.docs.length) {
            const doc = recs.docs[0].data() as dayRecommendation;
            // console.log("recomendation", doc.type);
            setRecommendation(doc);
            setFetch(false);
            setError("");
            addToRecCache(doc);
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
              setError(
                type === "nutrition"
                  ? "Fetching your Dietician's plan, Please Wait"
                  : "Fetching your personalised plan, Please wait"
              );
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
      } else {
        setError(
          type === "nutrition"
            ? "Fetching your Dietician's plan, Please Wait"
            : "Fetching your personalised plan, Please wait"
        );
        setFetch(true);
        setRecommendation(undefined);
      }
    }
  }, [state.uid, date, type, badgeId]);

  return {
    recomendation,
    error,
    fetch,
  };
};

export const updateNutritionRecommendations = async () => {
  const { state } = useAuthContext();

  try {
    const userDocRef = firestore()
      .collection("users")
      .doc(state.uid)
      .collection("dayRecommendations");

    // Use a query to get all documents where "type" is "nutrition"
    const querySnapshot = await userDocRef
      .where("type", "==", "nutrition")
      // .where("id", "==", "9f47313b-eb9d-4c21-8f0e-91cc5af20032")
      .get();

    // Iterate through the query results and update each document
    querySnapshot.forEach(async (doc) => {
      try {
        // Perform your update operation here
        // For example, you can update a field in the document
        const consumed = {
          consumedNutrition: {
            carbs: 25,
            fats: 36,
            fiber: 15,
            kcal: 1205,
            protein: 102,
          },
        };
        await doc.ref.update({ ...consumed });
        console.log(`Document with ID ${doc.id} updated successfully.`);
      } catch (error) {
        console.error(`Error updating document with ID ${doc.id}: ${error}`);
      }
    });
  } catch (error) {
    console.error("Error querying documents: ", error);
  }
};

export const updateAchiever = async () => {
  try {
    const userDocRef = firestore().collection("achievers");

    // Use a query to get all documents where "type" is "nutrition"
    const querySnapshot = await userDocRef
      // .where("type", "==", "nutrition")
      .where("id", "==", "248cefc3-83e4-4cb5-be0e-b07f41617fdf")
      .get();

    // Iterate through the query results and update each document
    querySnapshot.forEach(async (doc) => {
      try {
        // Perform your update operation here
        // For example, you can update a field in the document
        // const consumed = {
        //   1: {
        //     label: "Mon",
        //     container: 7,
        //     // isBadge: true,
        //     tickStatus: "HIT",
        //   },
        //   2: {
        //     label: "Tue",
        //     container: 7,
        //     // isBadge: true,
        //     tickStatus: "HIT",
        //   },
        //   3: {
        //     label: "Wed",
        //     container: 7,
        //     // isBadge: true,
        //     tickStatus: "HIT",
        //   },
        //   4: {
        //     label: "Thu",
        //     container: 7,
        //     // isBadge: true,
        //     tickStatus: "HIT",
        //   },
        //   5: {
        //     label: "Fri",
        //     container: 7,
        //     // isBadge: true,
        //     tickStatus: "HIT",
        //   },
        //   6: {
        //     label: "Sat",
        //     container: 7,
        //     // isBadge: true,
        //   },
        //   7: {
        //     label: "Sun",
        //     container: 7,
        //     isBadge: true,
        //   },
        // };
        const upd = {
          "1": { container: 7, label: "Mon", tickStatus: "HIT" },
          "2": { container: 7, label: "Tue", tickStatus: "HIT" },
          "3": { container: 7, label: "Wed", tickStatus: "HIT" },
          "4": { container: 7, label: "Thu", tickStatus: "HIT" },
          "5": { container: 7, label: "Fri", tickStatus: "HIT" },
          "6": { container: 7, label: "Sat" },
          "7": { container: 7, isBadge: true, label: "Sun" },
          "8": { container: 7, label: "Mon", tickStatus: "HIT" },
          "9": { container: 7, label: "Tue", tickStatus: "HIT" },
          "10": { container: 7, label: "Wed", tickStatus: "HIT" },
          "11": { container: 7, label: "Thu", tickStatus: "HIT" },
          "12": { container: 7, label: "Fri", tickStatus: "HIT" },
          "13": { container: 7, label: "Sat", tickStatus: "HIT" },
        };
        await doc.ref.update({ progress: upd });
        console.log(`Document with ID ${doc.id} updated successfully.`);
      } catch (error) {
        console.error(`Error updating document with ID ${doc.id}: ${error}`);
      }
    });
  } catch (error) {
    console.error("Error querying documents: ", error);
  }
};
