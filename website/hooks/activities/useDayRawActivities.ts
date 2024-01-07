import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, collection, query, orderBy, getDocs } from "firebase/firestore";
import { FirestoreTerra } from "@models/Terra/TerraUser";
import { Activity } from "@models/Activities/Activity";

export const useDayRawActivities = (uid: string, activities?: Activity[]) => {
  const [rawActivities, setRawActivities] = useState<FirestoreTerra[]>([]);

  useEffect(() => {
    const getAllRawActivities = async () => {
      const allDayRawActivities: FirestoreTerra[] = [];
      if (activities)
        for (const activity of activities) {
          const q = query(
            collection(
              doc(
                collection(doc(db, "users", uid), "activities"),
                activity.id ? activity.id : activity.postId
              ),
              "raw"
            ),
            orderBy("createdOnUnix", "asc")
          );

          const rawActivitiesForId = await getDocs(q);
          for (const rawAct of rawActivitiesForId.docs) {
            allDayRawActivities.push(rawAct.data() as FirestoreTerra);
          }
        }

      setRawActivities(allDayRawActivities);
    };

    getAllRawActivities();
  }, [uid, activities]);

  return {
    rawActivities,
  };
};
