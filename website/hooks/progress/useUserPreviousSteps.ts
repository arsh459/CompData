import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@config/firebase";

export interface DayStepDoc {
  id: string;
  date: string;
  uid: string;
  steps: number;
  updatedOn: number;
  unix: number;
}

export const useUserPreviousSteps = (
  uid: string,
  start: number,
  end: number
) => {
  // const { state } = useAuthContext();
  const [dayStepDocs, setDayDocs] = useState<{ [date: string]: DayStepDoc }>(
    {}
  );

  // const { game } = useGameContext();

  useEffect(() => {
    if (uid) {
      const listener = onSnapshot(
        query(
          collection(doc(db, "users", uid), "steps"),
          where("unix", ">=", start),
          where("unix", "<=", end)
        ),
        (docs) => {
          const stepDocs: { [date: string]: DayStepDoc } = {};
          for (const doc of docs.docs) {
            const remoteStepDoc = doc.data() as DayStepDoc;
            if (remoteStepDoc.steps) {
              stepDocs[remoteStepDoc.date] = remoteStepDoc;
            }
          }

          setDayDocs(stepDocs);
        }
      );

      return () => {
        listener();
      };
    }
  }, [uid, start, end]);

  return {
    dayStepDocs,
  };
};
