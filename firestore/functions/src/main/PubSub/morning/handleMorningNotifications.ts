// import { FAT_BURNER_GAME } from "../../../constants/challenge";
import {
  // ALPHABET_GAME,
  RUNNER_GAME,
  WOMENS_GAME,
} from "../../../constants/challenge";
import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
import {
  getSbEventsInList,
  getChildEvents,
} from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";

// const activeChallenges = ["00ec36a1-6eac-4924-a0eb-c40bbe7c409b"];

export const handleDayNotification = async (
  reminderTime: "morning" | "evening",
) => {
  // get all activie challenges
  const sbEvents = await getSbEventsInList([
    // ALPHABET_GAME,
    RUNNER_GAME,
    WOMENS_GAME,
    // FAT_BURNER_GAME
  ]);
  // let after = 0;
  // if (reminderTime === "morning") {
  //   after = Date.now() - 8 * 60 * 60 * 1000;
  // } else {
  //   after = Date.now() - 20 * 60 * 60 * 1000;
  // }
  const now = Date.now();

  for (const parentEvent of sbEvents) {
    if (
      parentEvent.configuration?.starts &&
      now > parentEvent.configuration.starts
    ) {
      await handleMorningNotificationForEvent(parentEvent, reminderTime);
    }
  }
};

const handleMorningNotificationForEvent = async (
  event: sbEventInterface,
  // after: number,
  reminderTime: "morning" | "evening",
) => {
  // get child events
  const childEvents = await getChildEvents(event.id);

  for (const child of childEvents) {
    const morningReminder = createReminder(
      false,
      reminderTime === "morning"
        ? "morning_workout_reminder"
        : "evening_workout_reminder",
      undefined,
      Date.now() + 1 * 60 * 1000,
      child.id,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      event.id,
    );

    await saveReminderInDB(morningReminder);
    // await handleMorningNotificationForChildEvent(child, after, event.id, top2);
  }
};
