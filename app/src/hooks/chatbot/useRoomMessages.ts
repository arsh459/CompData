import { ChatMessage, MessageResponse } from "@models/ChatBot/interface";
import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { sortMessages } from "@utils/chatbot/uttils";

export const useRoomMessages = (uid?: string, roomId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  useEffect(() => {
    if (uid && roomId) {
      const ref = firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("createdOn", "desc")
        .limit(5);

      const unsub = ref.onSnapshot((query) => {
        if (query?.docs?.length) {
          setLastDoc(query.docs[query.docs.length - 1]);

          const remoteMessages: ChatMessage[] = [];
          for (const doc of query.docs) {
            if (doc.data()) {
              const res = doc.data() as MessageResponse;
              remoteMessages.push(...sortMessages(res.messages));
            }
          }

          setMessages(remoteMessages);
        }
        setLoading(false);
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [uid, roomId]);

  const onNext = async () => {
    if (uid && roomId && lastDoc) {
      const docs = await firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("createdOn", "desc")
        .startAfter(lastDoc)
        .limit(5)
        .get();

      if (docs?.docs?.length) {
        setLastDoc(docs.docs[docs.docs.length - 1]);

        const remoteMessages: ChatMessage[] = [];
        for (const doc of docs.docs) {
          if (doc.data()) {
            const res = doc.data() as MessageResponse;
            remoteMessages.push(...sortMessages(res.messages));
          }
        }

        setMessages((prev) => [...prev, ...remoteMessages]);
      }
    }
  };

  return { messages, onNext, loading };
};
