import { Room } from "@models/ChatBot/interface";
import { handleNewChatV2 } from "@modules/ChatBot/StartNewChatMain/utils";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useSakhiAIStore } from "./store/useSakhiAIStore";

export const useChatRoomV2 = (
  uid?: string,
  roomId?: string,
  initialPrompt?: string
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { onInit } = useSakhiAIStore(
    (state) => ({ onInit: state.onInit }),
    shallow
  );

  useEffect(() => {
    if (roomId && uid) {
      const listener = firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((roomDoc) => {
          onInit(roomDoc.data() as Room | undefined);
          setLoading(false);
        });
      return () => {
        listener();
      };
    } else if (uid && !roomId) {
      handleNewChatV2(uid, initialPrompt).then((resp) => {
        const newRoomId = resp.id;
        const listener2 = firestore()
          .collection("users")
          .doc(uid)
          .collection("rooms")
          .doc(newRoomId)
          .onSnapshot((roomDoc) => {
            onInit(roomDoc.data() as Room | undefined);
            setLoading(false);
          });

        return () => {
          listener2();
        };
      });
    }
  }, [roomId, uid, initialPrompt]);

  return { loading };
};
