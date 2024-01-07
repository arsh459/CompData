import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
import {
  updateCourseMessageUserObj,
  updateTeamCreateMessages,
  updateWelcomeMessageUserObj,
} from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { handleNewUserRank } from "./handleNewUserRank";

export const handleWelcomeMessages = async (
  eventIds: string[],
  nowUser: UserInterface,
) => {
  for (const eventId of eventIds) {
    // console.log("welcome message", eventId);
    const reminder = createReminder(
      true,
      "welcome_message",
      "",
      Date.now(),
      eventId,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `welcome-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    // console.log("new reminder", reminder);
    await saveReminderInDB(reminder);

    const reminder_demo = createReminder(
      false,
      "user_demo",
      "",
      Date.now() + 2 * 60 * 60 * 1000,
      eventId,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `demo-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    await saveReminderInDB(reminder_demo);

    // const profileComplete = createReminder(
    //   false,
    //   "profile_complete",
    //   "",
    //   Date.now() + 24 * 60 * 60 * 1000,
    //   eventId,
    //   undefined,
    //   undefined,
    //   nowUser.uid,
    //   undefined,
    //   `profile-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
    //   undefined,
    //   undefined,
    //   undefined,
    //   undefined,
    // );
    // await saveReminderInDB(profileComplete);

    const wearableConnect = createReminder(
      false,
      "wearable_connect",
      "",
      Date.now() + 4 * 60 * 60 * 1000, // t+4 hours
      undefined,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `wearable-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    await saveReminderInDB(wearableConnect);

    // create base rank
    await handleNewUserRank(eventId, nowUser);
  }

  // update pending messages
  await updateWelcomeMessageUserObj(nowUser.uid, []);
};

export const handleCourseMessage = async (
  seriesIds: string[],
  nowUser: UserInterface,
  templateId: "workout_series",
) => {
  for (const seriesId of seriesIds) {
    const reminder = createReminder(
      true,
      templateId,
      "",
      undefined,
      undefined,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `serPur-${seriesId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      undefined,
      seriesId,
    );

    await saveReminderInDB(reminder);
  }

  // update pending messages
  await updateCourseMessageUserObj(nowUser.uid, []);
};

export const handleTeamCreateMessage = async (
  eventIds: string[],
  nowUser: UserInterface,
  templateId: "new_team",
) => {
  for (const eventId of eventIds) {
    const reminder = createReminder(
      true,
      templateId,
      "",
      undefined,
      eventId,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `newTeam-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    await saveReminderInDB(reminder);

    const reminder_invite = createReminder(
      false,
      "new_team_invite",
      "",
      Date.now() + 10 * 60 * 1000, // t+10 minutes
      eventId,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `newTeamInvite-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    await saveReminderInDB(reminder_invite);

    const reminder_demo = createReminder(
      false,
      "user_demo",
      "",
      Date.now() + 60 * 60 * 1000, // t+60 minutes
      eventId,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `demo-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    await saveReminderInDB(reminder_demo);

    const wearableConnect = createReminder(
      false,
      "wearable_connect",
      "",
      Date.now() + 2 * 60 * 60 * 1000, // t+2 hours
      undefined,
      undefined,
      undefined,
      nowUser.uid,
      undefined,
      `wearable-${eventId.slice(0, 8)}-${nowUser.uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    await saveReminderInDB(wearableConnect);
  }

  // update pending messages
  await updateTeamCreateMessages(nowUser.uid, []);
};
