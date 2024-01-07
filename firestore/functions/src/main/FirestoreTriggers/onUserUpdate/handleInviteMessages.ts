import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
import {
  updateInviteMessagesForUserObj,
  //   getUserById,
  //   updateWelcomeMessageUserObj,
} from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";

export const handleInviteMessages = async (
  eventIds: string[],
  nowUser: UserInterface,
) => {
  for (const eventId of eventIds) {
    const reminder = createReminder(
      false,
      "coach_invite",
      "",
      undefined,
      eventId,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `coach-invite-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
    );

    await saveReminderInDB(reminder);
  }

  // update pending messages
  await updateInviteMessagesForUserObj(nowUser.uid, []);
};
