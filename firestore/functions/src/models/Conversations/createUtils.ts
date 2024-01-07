import {
  ContactMBInterface,
  ConversationMBInterface,
  MessageMBInterface,
} from "../../main/Https/messagebird/interface";
import { ConversationInterface } from "./Conversation";
import * as admin from "firebase-admin";

const createNewConversation = (
  conversation: ConversationMBInterface,
  groupId: string,
): ConversationInterface => {
  return {
    ...conversation,
    mode: "Holidaying",
    groupId: groupId,

    updatedUnix: conversation.createdDatetime
      ? new Date(conversation.createdDatetime).getTime()
      : new Date().getTime(),
  };
};

export const saveNewConversation = async (
  conversation: ConversationMBInterface,
  groupId: string,
) => {
  const newConv = createNewConversation(conversation, groupId);

  await admin
    .firestore()
    .collection("conversations")
    .doc(newConv.id)
    .set(newConv);
};

export const saveMessage = async (
  conversationId: string,
  messageMB: MessageMBInterface,
) => {
  await admin
    .firestore()
    .collection("conversations")
    .doc(conversationId)
    .collection("messages")
    .doc(messageMB.id)
    .set({
      ...messageMB,
      unixTime: new Date(messageMB.createdDatetime).getTime(),
    });
};

export const saveNewContact = async (contact: ContactMBInterface) => {
  await admin.firestore().collection("contacts").doc(contact.id).set(contact);
};

export const updateConversationTime = async (id: string, zuluTime: string) => {
  await admin
    .firestore()
    .collection("conversations")
    .doc(id)
    .update({
      updatedDatetime: zuluTime,
      updatedUnix: new Date(zuluTime).getTime(),
    });
};
