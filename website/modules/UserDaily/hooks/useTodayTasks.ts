import { useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { oneDayMS } from "@models/slots/utils";
import { Activity } from "@models/Activities/Activity";
import { getUnixTimestamp } from "@templates/Recommendations/utils";

export const useTodayTasks = (uid: string, date: string, tz: string) => {
  const [activities, showActivities] = useState<Activity[]>([]);
  const [fetchState, setFetchState] = useState<"FETCHING" | "DONE" | "UNKNOWN">(
    "UNKNOWN"
  );

  const getUserActs = async () => {
    setFetchState("FETCHING");

    // const nowDate = new Date(date);

    const st = getUnixTimestamp(tz, date);
    console.log(st, date);

    // const st = new Date(
    //   parseInt(date.split("-")[0]),
    //   parseInt(date.split("-")[1]) - 1,
    //   parseInt(date.split("-")[2]),
    //   0,
    //   0,
    //   0,
    //   0
    // ).getTime();

    // const st = new Date(
    //   nowDate.getFullYear(),
    //   nowDate.getMonth(),
    //   nowDate.getDate(),
    //   0,
    //   0,
    //   0,
    //   0
    // ).getTime();
    console.log("st", st, date);

    const en = st + oneDayMS;

    const userDocs = await getDocs(
      query(
        collection(doc(db, "users", uid), "activities"),
        where("createdOn", ">=", st),
        where("createdOn", "<", en),
        orderBy("createdOn", "asc")
      )
    );

    const acts: Activity[] = [];
    for (const userDoc of userDocs.docs) {
      const act = userDoc.data() as Activity;
      acts.push(act);
    }

    const sorted = acts.sort(
      (a, b) => (b.calories ? b.calories : 0) - (a.calories ? a.calories : 0)
    );

    showActivities(sorted);
    setFetchState("DONE");
  };

  return {
    activities,
    getUserActs,
    fetchState,
  };
};
