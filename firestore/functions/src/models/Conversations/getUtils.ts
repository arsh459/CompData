import * as admin from "firebase-admin";
import { ConversationInterface } from "./Conversation";

export const getConversationById = async (id: string) => {
  const conv = await admin
    .firestore()
    .collection("conversations")
    .doc(id)
    .get();
  if (conv.exists) {
    return conv.data() as ConversationInterface;
  }

  return undefined;
};

export const getConversationByGroupId = async (id: string) => {
  const conv = await admin
    .firestore()
    .collection("conversations")
    .where("groupId", "==", id)
    .get();
  if (conv.docs.length > 0) {
    return conv.docs[0].data() as ConversationInterface;
  }

  return undefined;
};
