import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { getConversationByGroupId } from "../../../models/Conversations/getUtils";
import { sendMessageToConversation } from "../../../models/Conversations/sendUtils";
import { message } from "../../../models/Messages/Message";
// import { pushMessageToGroup } from "../../../models/Messages/Methods/createUtils";
import {
  getGhostUser,
  getGroupById,
} from "../../../models/Messages/Methods/getUtils";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";
import { handleExpiredConversation } from "./handleExpiredConversation";
import { handlePrivateMessage } from "./handlePrivateMessage";
import { formatReplyMessage } from "./utils";

export const onGhostMessageReplyFunc = functions
  .region("asia-south1")
  .firestore.document("groups/{groupId}/messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onGhostMessageReplyFunc")
      ) {
        return;
      }

      const groupId: string = context.params.groupId;
      const newMessage = snapshot.data() as message;

      // prevent recursive messages
      if (newMessage.sentToGhost) {
        return;
      }

      const group = await getGroupById(groupId);
      const activeTh = new Date().getTime() - 24 * 60 * 60 * 1000;

      if (
        newMessage.text.search("@~") === -1 && // public message
        group?.ghostCustomer &&
        newMessage.uid.search("ghost") === -1 &&
        (!group.ghostLastUpdate || group.ghostLastUpdate >= activeTh)
      ) {
        const ghostUser = getGhostUser(group.members);
        // const conversation = await getConversationByGroupId(group.groupId);
        // functions.logger.log("message", newMessage);

        if (ghostUser) {
          // send message to ghost user
          await sendMessageToConversation(
            `+${ghostUser.phone}`,
            whatsappChannelId,
            formatReplyMessage(
              newMessage.text,
              group.members[newMessage.uid].name,
            ),
            group.groupId,
            newMessage.messageId,
            newMessage.image,
            newMessage.file,
          );
        }
      } else if (
        newMessage.text.search("@~") === -1 && // public message
        group?.ghostCustomer &&
        newMessage.uid.search("ghost") === -1 &&
        group.ghostLastUpdate &&
        group.ghostLastUpdate < activeTh
      ) {
        // message cannot be sent
        await handleExpiredConversation(group);
      } else if (
        newMessage.text.search("@~") !== -1 && // private message
        group?.ghostCustomer &&
        newMessage.uid.search("ghost") === -1
      ) {
        await handlePrivateMessage(newMessage, group);
      }
    } catch (error) {
      console.error(error);
    }
  });
