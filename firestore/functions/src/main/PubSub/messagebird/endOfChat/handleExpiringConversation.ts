import { ConversationInterface } from "../../../../models/Conversations/Conversation";
import {
  //   getContact,
  sendMessageToConversation,
} from "../../../../models/Conversations/sendUtils";
import {
  pushMessageToGroup,
  //   pushNewGhostMessage,
} from "../../../../models/Messages/Methods/createUtils";
import {
  getGhostUser,
  getGroupById,
} from "../../../../models/Messages/Methods/getUtils";
import { whatsappChannelId } from "../../../Https/messagebird/constants/identifiers";
import {
  expireMessage,
  expireMessageToGroup,
} from "../../../Https/messagebird/newMessage/templates/newMessage";

export const handleExpiringConv = async (
  conversation: ConversationInterface,
) => {
  if (conversation.groupId) {
    const group = await getGroupById(conversation.groupId);

    if (group) {
      const ghostUser = getGhostUser(group.members);
      if (ghostUser && ghostUser.phone) {
        // console.log("ghost", ghostUser);
        // send warning message to user
        await Promise.all([
          // message sent to ghost
          sendMessageToConversation(
            `+${ghostUser.phone}`,
            whatsappChannelId,
            expireMessage(),
          ),

          // private send message to group
          pushMessageToGroup(
            group.groupId,
            expireMessageToGroup(),
            ghostUser,
            new Date().getTime(),
          ),
        ]);
      }
    }
  }
};
