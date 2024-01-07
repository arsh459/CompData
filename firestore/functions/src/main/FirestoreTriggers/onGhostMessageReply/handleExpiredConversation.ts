import { Group } from "../../../models/Messages/Message";
import { pushMessageToGroup } from "../../../models/Messages/Methods/createUtils";
import { getAdminUser } from "../../../models/Messages/Methods/getUtils";
import { getExpiredConvMessage } from "../../Https/messagebird/newMessage/templates/newMessage";

export const handleExpiredConversation = async (group: Group) => {
  const admin = getAdminUser(group.members);

  if (admin) {
    // add user
    await pushMessageToGroup(
      group.groupId,
      getExpiredConvMessage(),
      admin,
      new Date().getTime(),
      true,
    );
  }
};
