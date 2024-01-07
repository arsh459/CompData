import { handleUserOptinFlag } from "../../../../main/FirestoreTriggers/onUserUpdate/optinReminder";
import { trackOptInMessage } from "../../../../main/FirestoreTriggers/onUserUpdate/updateFPConv";
import { blockedUsers } from "../../../../main/Https/waMessage/sendUtils";
import { getHeaderValuesBasisNotificationId } from "../../../../main/PubSub/notifications/handleSend";
import { sendHSMV2 } from "../../../Conversations/sendHSMV2";
import { getUserById } from "../../../User/Methods";

export const optInHandler = async (uid: string) => {
  const user = await getUserById(uid);

  let failed: boolean = false;
  if (user && user.phone) {
    if (user.unsubscribe) {
      failed = true;
    } else if (blockedUsers.includes(user.phone)) {
      failed = true;
    } else if (user.optOutSent === "DONE") {
      // user already onboarded
      return true;
    } else {
      const img = getHeaderValuesBasisNotificationId("first_message_v3");
      await sendHSMV2(
        user.phone,
        "first_message_v3", // "opt_in_communications",
        [],
        undefined,
        img ? [img] : undefined,
      );

      await handleUserOptinFlag(user.uid, "DONE");
      await trackOptInMessage(user.uid, "opt_in_sent");
      return true;
    }
  }

  if (failed && user) {
    await trackOptInMessage(user.uid, "opt_in_failed");
    await handleUserOptinFlag(user.uid, "FAILED");
  }

  return false;
};
