import { handleInviteMessage } from "../../../main/FirestoreTriggers/onPaymentCreate/handleInviteMessage";
import { getSbEventById } from "../../sbEvent/getUtils";
import { getUserById } from "../../User/Methods";

export const inviteMessageToEvent = async (eventId: string, userId: string) => {
  const user = await getUserById(userId);

  if (user) {
    const eventObj = await getSbEventById(eventId);

    if (eventObj) {
      const leader = await getUserById(eventObj.ownerUID);

      if (
        user.phone &&
        user.email &&
        user.name &&
        leader?.name &&
        leader?.phone &&
        leader?.email &&
        leader?.userKey &&
        eventObj.name &&
        leader?.uid
      ) {
        // send invite
        await handleInviteMessage(
          user.phone,
          user.email,
          user.name,
          leader.name,
          eventObj.name,
          leader.userKey,
          eventObj.id,
        );

        return true;
      }
    }
  }

  return false;
};
