import { format, subDays } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { dailyWeightObj } from "@models/User/User";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { useEffect, useState } from "react";

export const addWeightToPreviousDay = async (
  userId?: string,
  previousWeight?: number
) => {
  if (typeof previousWeight !== "number" || !userId) {
    console.log("Invalid previousWeight or uid");
    return;
  }

  try {
    const dailyWeightRef = collection(db, `users/${userId}/dailyWeight`);
    const dailyWeightQuery = query(dailyWeightRef);
    const dailyWeightCountSnapshot = await getDocs(dailyWeightQuery);

    const numDocs = dailyWeightCountSnapshot.size;

    if (numDocs === 0) {
      const yesterday = subDays(new Date(), 1);
      const yesterdayString = format(yesterday, "yyyy-MM-dd");

      const yesterdayDocRef = query(
        dailyWeightRef,
        where("date", "==", yesterdayString),
        limit(1)
      );

      const yesterdayDocSnapshot = await getDocs(yesterdayDocRef);

      if (!yesterdayDocSnapshot.empty) {
        const docToUpdate = yesterdayDocSnapshot.docs[0].ref;
        await updateDoc(docToUpdate, { weight: previousWeight });
      } else {
        const newId = uuidv4();

        const newDailyWeight = {
          date: yesterdayString,
          id: newId,
          unix: yesterday.getTime(),
          weight: previousWeight,
        };

        const newDocRef = doc(dailyWeightRef, newId);
        await setDoc(newDocRef, newDailyWeight);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const useEarliestWeight = (uid?: string) => {
  const [weightData, setWeightData] = useState<dailyWeightObj>();
  useEffect(() => {
    if (uid) {
      const listener = onSnapshot(
        query(
          collection(db, `users/${uid}/dailyWeight`),
          orderBy("unix", "asc"),
          limit(1)
        ),
        (docs) => {
          if (docs.docs.length > 0) {
            const obj = docs.docs[0].data() as dailyWeightObj;
            setWeightData(obj);
          }
        }
      );

      return () => {
        listener();
      };
    }
  }, [uid]);

  return {
    weight: weightData,
  };
};

export const updateUserWeight = async (
  uid: string,

  weight: number
) => {
  const userDocRef = doc(db, `users/${uid}`);
  await updateDoc(userDocRef, {
    weight,
  });
};
