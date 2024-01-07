import { Group, message } from "../../../models/Messages/Message";
import {
  addUserToGroup,
  removeUserFromGroup,
} from "../../../models/Messages/Methods/createUtils";
import { getUserById } from "../../../models/User/Methods";

export const handlePrivateMessage = async (msg: message, group: Group) => {
  // add user
  if (msg.text.search("add:") !== -1) {
    const toAddUIDSubString = msg.text
      .substring(msg.text.search("add:") + 4, msg.text.length)
      .trim();

    const uid = toAddUIDSubString.substring(
      0,
      toAddUIDSubString.search(";") === -1
        ? toAddUIDSubString.length
        : toAddUIDSubString.search(";"),
    );

    const userToAdd = await getUserById(uid);

    if (userToAdd) {
      await addUserToGroup(group, userToAdd, msg.createdAt + 1000);
    }
  } else if (msg.text.search("remove:") !== -1) {
    const toRemoveUIDSubString = msg.text
      .substring(msg.text.search("remove:") + 7, msg.text.length)
      .trim();

    // console.log("toRemoveUIDSubString", toRemoveUIDSubString);

    const uid = toRemoveUIDSubString.substring(
      0,
      toRemoveUIDSubString.search(";") === -1
        ? toRemoveUIDSubString.length
        : toRemoveUIDSubString.search(";"),
    );

    // console.log("uid", uid);

    const userToRemove = await getUserById(uid);

    // console.log("userToRemove", userToRemove?.uid);

    if (userToRemove) {
      await removeUserFromGroup(group, userToRemove, msg.createdAt + 1000);
    }
  }
};
