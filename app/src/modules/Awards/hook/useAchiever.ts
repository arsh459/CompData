import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Achiever } from "@models/Awards/interface";

export const useAchiever = (achieverId?: string) => {
  const [achiever, setAchiever] = useState<Achiever>();

  useEffect(() => {
    const getTask = async () => {
      if (achieverId) {
        const awardDoc = await firestore()
          .collection("achievers")
          .doc(achieverId)
          .get();

        if (awardDoc.data()) {
          setAchiever(awardDoc.data() as Achiever);
        }
      }
    };

    getTask();
  }, [achieverId]);

  return { achiever };
};
