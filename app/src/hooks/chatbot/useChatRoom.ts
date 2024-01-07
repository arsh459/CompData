import { Room } from "@models/ChatBot/interface";
import { handleNewChat } from "@modules/ChatBot/StartNewChatMain/utils";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";

export const useChatRoom = (
  uid?: string,
  roomId?: string,
  initialPrompt?: string
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useConfigContext();
  const sysPrompt = config?.sakhiAIPrompt;

  const [room, setRoom] = useState<Room>();
  // const [roomIdToFetch, _] = useState<string | undefined>(() => {
  //   if (roomId) {
  //     return roomId;
  //   } else if (uid) {
  //   }
  // });

  // create room effect
  // useEffect(() => {
  //   if (!roomId && uid) {
  //     setLoading(true);
  //     handleNewChat(uid, initialPrompt, sysPrompt).then((resp) => {
  //       // set new room id
  //       setRoomIdToFetch(resp.id);
  //     });
  //   }
  // }, [roomId, uid, initialPrompt, sysPrompt]);

  useEffect(() => {
    if (roomId && uid) {
      const listener = firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((roomDoc) => {
          if (roomDoc && roomDoc.data()) {
            setRoom(roomDoc.data() as Room);
          }
          setLoading(false);
        });

      return () => {
        listener();
      };
    } else if (uid && !roomId) {
      handleNewChat(
        uid,
        "gpt-3.5-turbo",
        // "gpt-4", // TO USE GPT-4
        initialPrompt,
        sysPrompt
      ).then((resp) => {
        const newRoomId = resp.id;

        const listener2 = firestore()
          .collection("users")
          .doc(uid)
          .collection("rooms")
          .doc(newRoomId)
          .onSnapshot((roomDoc) => {
            if (roomDoc && roomDoc.data()) {
              setRoom(roomDoc.data() as Room);
            }

            setLoading(false);
          });

        return () => {
          listener2();
        };
      });
    }
  }, [roomId, uid, initialPrompt, sysPrompt]);

  // useEffect(() => {
  //   const getRoomId = async () => {
  //     if (roomId) {
  //       const roomDoc = await firestore()
  //         .collection("users")
  //         .doc(uid)
  //         .collection("rooms")
  //         .doc(roomId)
  //         .get();

  //       if (roomDoc.data()) {
  //         setRoom(roomDoc.data() as Room);
  //       }
  //     } else {
  //       const id = uuidv4();
  //       const now = Date.now();

  //       const newRoom: Room = {
  //         id,
  //         createdOn: now,
  //         updatedOn: now,
  //       };

  //       await firestore()
  //         .collection("users")
  //         .doc(uid)
  //         .collection("rooms")
  //         .doc(id)
  //         .set(newRoom);

  //       setRoom(newRoom);
  //     }
  //     setLoading(false);
  //   };
  //   if (uid) {
  //     getRoomId();
  //   }
  // }, [uid, roomId]);

  return { room, loading, sysPrompt };
};
