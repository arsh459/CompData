import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Award } from "@models/Awards/interface";

export const useAward = (awardId?: string) => {
  const [award, setAward] = useState<Award>();

  useEffect(() => {
    const getTask = async () => {
      if (awardId) {
        const awardDoc = await firestore()
          .collection("awards")
          .doc(awardId)
          .get();

        if (awardDoc.data()) {
          setAward(awardDoc.data() as Award);
        }
      }
    };

    getTask();
  }, [awardId]);

  return { award };
};
