import { useEffect, useState } from "react";
import { Room } from "@models/ChatBot/interface";
import firestore from "@react-native-firebase/firestore";

export const useLastChatRoom = (uid?: string) => {
  const [lastRoom, setLastRoom] = useState<Room>();

  useEffect(() => {
    if (uid) {
      const ref = firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .orderBy("updatedOn", "desc")
        .limit(1);

      const unsub = ref.onSnapshot((query) => {
        if (query?.docs && query?.docs?.length && query.docs[0].data()) {
          setLastRoom(query.docs[0].data() as Room);
        }
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [uid]);

  return { lastRoom };
};
