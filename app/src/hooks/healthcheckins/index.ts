import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
export interface CheckIn {
  id: string;
  unixStart: number;
  name?: string;
  scheduleType: "COACH" | "USER";
  // createdOn: number;
}

export const useUserHealthCheckins = (num: number, userId?: string) => {
  const [allHealthCheckins, setHealthCheckins] = useState<CheckIn[]>([]);
  const [init, setInit] = useState(false);
  const [lastDoc, setLastDoc] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >();

  const onNext = async () => {
    if (lastDoc && userId) {
      const userRef = firestore()
        .collection("users")
        .doc(userId)
        .collection("healthCheckins");
      const q = userRef
        .orderBy("unixStart", "desc")
        .startAfter(lastDoc)
        .limit(num ? num : 3);
      const snapshot = await q.get();
      const remoteCheckIn: CheckIn[] = snapshot?.docs.map(
        (doc) => doc.data() as CheckIn
      );

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHealthCheckins((prev) => [...prev, ...remoteCheckIn]);
    }
  };

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        if (userId) {
          const userRef = firestore()
            .collection("users")
            .doc(userId)
            .collection("healthCheckins");
          const q = userRef.orderBy("unixStart", "desc").limit(num ? num : 3);
          const snapshot = await q.get();
          const remoteCheckIn: CheckIn[] = snapshot?.docs?.map(
            (doc) => doc.data() as CheckIn
          );

          setHealthCheckins(remoteCheckIn);
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
          setInit(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    if (!init && userId) {
      fetchTaskList();
    }
  }, [init, userId]);

  return {
    checkins: allHealthCheckins,
    onNext,
  };
};
