import { toSwapnilPhone } from "../../../../constants/email/contacts";
import {
  saveMessage,
  saveNewContact,
  saveNewConversation,
  updateConversationTime,
} from "../../../../models/Conversations/createUtils";
import { getConversationById } from "../../../../models/Conversations/getUtils";
import { sendMessageToConversation } from "../../../../models/Conversations/sendUtils";
import {
  createNewGroup_Ghost,
  pushNewGhostMessage,
} from "../../../../models/Messages/Methods/createUtils";
import { whatsappChannelId } from "../constants/identifiers";
import {
  ConversationMBInterface,
  ContactMBInterface,
  MessageMBInterface,
} from "../interface";
import {
  createNewTicket,
  newConversationAutoMessage,
  newHolidayingMessage,
} from "./templates/newMessage";

export const handleNewMessage = async (
  conversation: ConversationMBInterface,
  contact: ContactMBInterface,
  message: MessageMBInterface,
) => {
  // check conversation exists
  const conv = await getConversationById(conversation.id);
  //   console.log("conv", conv);
  if (conv && conv.groupId) {
    // push message to required group
    await Promise.all([
      // send message to group
      pushNewGhostMessage(
        message.content.text ? message.content.text : "",
        contact,
        conv.groupId,
        new Date(message.createdDatetime).getTime(),
        message.content.image,
        message.content.file,
      ),

      // save message for record
      saveMessage(conv.id, message),

      // update conv time for expiry message
      updateConversationTime(conv.id, message.createdDatetime),
    ]);
  } else {
    const [groupId] = await Promise.all([
      // create group chat with new user && Holidaying && push messages
      createNewGroup_Ghost(
        contact,
        createNewTicket(message), // not to be sent to user
        newConversationAutoMessage(contact), // not to be sent to user
        new Date(message.createdDatetime).getTime(),
        message.content.image,
        message.content.file,
      ),

      // send notification to Holidaying agent
      sendMessageToConversation(
        toSwapnilPhone,
        whatsappChannelId,
        newHolidayingMessage(message, contact),
      ),

      // save contact
      saveNewContact(contact),
    ]);

    if (groupId) {
      // create conversation with status
      await saveNewConversation(conversation, groupId);
      await saveMessage(conversation.id, message);
    }
  }
};
