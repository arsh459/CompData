import { db } from "@config/firebase";
import { Award } from "@models/awards/interface";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useAward = (awardId?: string) => {
  const [award, setAward] = useState<Award>();

  useEffect(() => {
    const getTask = async () => {
      if (awardId) {
        const awardDoc = await getDoc(doc(db, "awards", awardId));

        if (awardDoc.data()) {
          setAward(awardDoc.data() as Award);
        }
      }
    };

    getTask();
  }, [awardId]);

  return { award };
};
