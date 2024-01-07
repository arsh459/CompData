import { Room } from "@models/ChatBot/interface";
import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export const useUserRooms = (uid?: string) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  useEffect(() => {
    if (uid) {
      const ref = firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .orderBy("createdOn", "desc")
        .limit(10);

      const unsub = ref.onSnapshot((query) => {
        if (query?.docs?.length) {
          setLastDoc(query.docs[query.docs.length - 1]);

          const remoteRooms: Room[] = [];
          for (const doc of query.docs) {
            if (doc.data()) {
              const room = doc.data() as Room;
              remoteRooms.push(room);
            }
          }

          setRooms(remoteRooms);
        } else {
          setRooms([]);
        }
        setLoading(false);
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [uid]);

  const onNext = async () => {
    if (uid && lastDoc) {
      const docs = await firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .orderBy("createdOn", "desc")
        .startAfter(lastDoc)
        .limit(10)
        .get();

      if (docs?.docs?.length) {
        setLastDoc(docs.docs[docs.docs.length - 1]);

        const remoteRooms: Room[] = [];
        for (const doc of docs.docs) {
          if (doc.data()) {
            const room = doc.data() as Room;
            remoteRooms.push(room);
          }
        }

        setRooms((prev) => [...prev, ...remoteRooms]);
      }
    }
  };

  const onDelete = (roomId: string) => {
    const updatedItems = rooms.filter((each) => each.id !== roomId);
    setRooms(updatedItems);

    firestore()
      .collection("users")
      .doc(uid)
      .collection("rooms")
      .doc(roomId)
      .delete();
  };

  return { rooms, onDelete, onNext, loading };
};
