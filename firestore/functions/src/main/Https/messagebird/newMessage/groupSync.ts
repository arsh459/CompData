import { ConversationMBInterface, MessageMBInterface } from "../interface";
import * as admin from "firebase-admin";
import { getConversationById } from "../../../../models/Conversations/getUtils";
import { message } from "../../../../models/Messages/Message";
// import * as functions from "firebase-functions";

export const groupSync = async (
  messageMB: MessageMBInterface,
  conversation: ConversationMBInterface,
) => {
  const conv = await getConversationById(conversation.id);

  // functions.logger.log("conv", conv);

  if (conv && conv.groupId) {
    // functions.logger.log("groupId", conv.groupId, messageMB.id);
    const relevantMessage = await admin
      .firestore()
      .collection("groups")
      .doc(conv.groupId)
      .collection("messages")
      .where("messageBirdId", "==", messageMB.id)
      .get();

    // functions.logger.log("relevantMessage.docs", relevantMessage.docs);

    // if more than 0 messages
    if (relevantMessage.docs.length > 0) {
      const messageFromGroup = relevantMessage.docs[0].data() as message;

      // functions.logger.log("messageFromGroup", messageFromGroup);

      // update message time
      await admin
        .firestore()
        .collection("groups")
        .doc(conv.groupId)
        .collection("messages")
        .doc(messageFromGroup.messageId)
        .update({
          whatsappSync: true,
          createdAt: new Date(messageMB.createdDatetime).getTime(),
        });
    }
  }
};
