import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Activity } from "@models/Activity/Activity";
import { UserInterface } from "@models/User/User";

export const useTaskActivityWithUser = (taskId?: string) => {
  const [taskDoneLists, setTaskDoneLists] = useState<
    { user: UserInterface; act: Activity }[]
  >([]);
  const [uniqueUsersObj, setUniqueUsersObj] = useState<{
    [uid: string]: string;
  }>({});
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  useEffect(() => {
    const getActDocs = async () => {
      if (taskId) {
        const acts = await firestore()
          .collectionGroup("activities")
          .where("taskId", "==", taskId)
          .where("calories", ">", 0)
          .orderBy("calories", "desc")
          .limit(8)
          .get();

        setLastDoc(acts.docs[acts.docs.length - 1]);
        const remoteTaskDoneLists: { user: UserInterface; act: Activity }[] =
          [];
        const remoteUniqueUsersObj: { [uid: string]: string } = {};

        for (const act of acts.docs) {
          if (act.data()) {
            const remoteAct = act.data() as Activity;
            if (!remoteUniqueUsersObj.hasOwnProperty(remoteAct.authorUID)) {
              const userDoc = await firestore()
                .collection("users")
                .doc(remoteAct.authorUID)
                .get();

              const remoteUser = userDoc.data() as UserInterface;
              if (userDoc.data()) {
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
      const acts = await firestore()
        .collectionGroup("activities")
        .where("taskId", "==", taskId)
        .where("calories", ">", 0)
        .orderBy("calories", "desc")
        .startAfter(lastDoc)
        .limit(8)
        .get();

      setLastDoc(acts.docs[acts.docs.length - 1]);
      const remoteTaskDoneLists: { user: UserInterface; act: Activity }[] = [];
      const remoteUniqueUsersObj: { [uid: string]: string } = uniqueUsersObj;

      for (const act of acts.docs) {
        if (act.data()) {
          const remoteAct = act.data() as Activity;
          if (!remoteUniqueUsersObj.hasOwnProperty(remoteAct.authorUID)) {
            const userDoc = await firestore()
              .collection("users")
              .doc(remoteAct.authorUID)
              .get();

            const remoteUser = userDoc.data() as UserInterface;
            if (userDoc.data()) {
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
