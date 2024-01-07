import * as admin from "firebase-admin";
import { ChatMessage, MessageResponse, Room } from "./Room";

export const getRoomById = async (uid: string, roomId: string) => {
  const roomObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("rooms")
    .doc(roomId)
    .get();

  if (roomObj.data()) {
    return roomObj.data() as Room;
  }

  return undefined;
};

export const getMessages = async (uid: string, roomId: string) => {
  const responses = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("rooms")
    .doc(roomId)
    .collection("messages")
    .orderBy("createdOn", "asc")
    .get();

  const chatMessages: ChatMessage[] = [];
  let lastResponse: MessageResponse | undefined;

  for (const doc of responses.docs) {
    const remoteMessage = doc.data() as MessageResponse;

    chatMessages.push(...remoteMessage.messages);
    lastResponse = remoteMessage;
  }

  return {
    lastResponse,
    chatMessages,
  };
};

export const getLastMessages = async (uid: string, roomId: string) => {
  const responses = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("rooms")
    .doc(roomId)
    .collection("messages")
    .orderBy("createdOn", "desc")
    .limit(1)
    .get();

  const chatMessages: ChatMessage[] = [];
  let lastResponse: MessageResponse | undefined;

  for (const doc of responses.docs) {
    const remoteMessage = doc.data() as MessageResponse;
    chatMessages.push(...remoteMessage.messages);
    lastResponse = remoteMessage;
  }

  return {
    lastResponse,
    chatMessages,
    lastMessage: chatMessages.length
      ? chatMessages[chatMessages.length - 1]
      : undefined,
  };
};
