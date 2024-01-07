import { useEffect, useState } from "react";
import {
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { UserInterface } from "@models/User/User";
import { Activity } from "@models/Activities/Activity";
import { db } from "@config/firebase";

export const useTaskActivityWithUser = (taskId?: string) => {
  const [taskDoneLists, setTaskDoneLists] = useState<
    { user: UserInterface; act: Activity }[]
  >([]);
  const [uniqueUsersObj, setUniqueUsersObj] = useState<{
    [uid: string]: string;
  }>({});
  const [lastDoc, setLastDoc] = useState<any>();

  useEffect(() => {
    const getActDocs = async () => {
      if (taskId) {
        const actsQuery = query(
          collectionGroup(db, "activities"),
          where("taskId", "==", taskId),
          where("calories", ">", 0),
          orderBy("calories", "desc"),
          limit(8)
        );

        const actsSnap = await getDocs(actsQuery);
        const actsDocs = actsSnap.docs;

        setLastDoc(actsDocs[actsDocs.length - 1]);
        const remoteTaskDoneLists: { user: UserInterface; act: Activity }[] =
          [];
        const remoteUniqueUsersObj: { [uid: string]: string } = {};

        for (const act of actsDocs) {
          if (act.exists()) {
            const remoteAct = act.data() as Activity;
            if (!remoteUniqueUsersObj.hasOwnProperty(remoteAct.authorUID)) {
              const userDoc = await getDoc(
                doc(db, "users", remoteAct.authorUID)
              );
              const remoteUser = userDoc.data() as UserInterface;
              if (userDoc.exists()) {
                remoteTaskDoneLists.push({ user: remoteUser, act: remoteAct });
                remoteUniqueUsersObj[remoteAct.authorUID] =
                  remoteAct.activityName;
              }
            }
          }
        }

        setTaskDoneLists(remoteTaskDoneLists);
        setUniqueUsersObj(remoteUniqueUsersObj);
      }
    };
    getActDocs();
  }, [taskId]);

  const onNext = async () => {
    if (lastDoc) {
      const actsQuery = query(
        collectionGroup(db, "activities"),
        where("taskId", "==", taskId),
        where("calories", ">", 0),
        orderBy("calories", "desc"),
        startAfter(lastDoc),
        limit(8)
      );

      const actsSnap = await getDocs(actsQuery);
      const actsDocs = actsSnap.docs;

      setLastDoc(actsDocs[actsDocs.length - 1]);
      const remoteTaskDoneLists: { user: UserInterface; act: Activity }[] = [];
      const remoteUniqueUsersObj: { [uid: string]: string } = uniqueUsersObj;

      for (const act of actsDocs) {
        if (act.exists()) {
          const remoteAct = act.data() as Activity;
          if (!remoteUniqueUsersObj.hasOwnProperty(remoteAct.authorUID)) {
            const userDoc = await getDoc(doc(db, "users", remoteAct.authorUID));
            const remoteUser = userDoc.data() as UserInterface;
            if (userDoc.exists()) {
              remoteTaskDoneLists.push({ user: remoteUser, act: remoteAct });
              remoteUniqueUsersObj[remoteAct.authorUID] =
                remoteAct.activityName;
            }
          }
        }
      }

      setTaskDoneLists((prev) => [...prev, ...remoteTaskDoneLists]);
      setUniqueUsersObj((prev) => remoteUniqueUsersObj);
    }
  };

  return {
    taskDoneLists,
    onNext,
  };
};
