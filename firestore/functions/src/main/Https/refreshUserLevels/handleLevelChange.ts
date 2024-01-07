import { FAT_BURNER_GAME } from "../../../constants/challenge";
import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";

export const handleLevelChange = async (
  uid: string,
  prev: number,
  now: number,
  sendMessageLater: boolean,
) => {
  // 2 < 1
  if (prev > now) {
    const rem = createReminder(
      false,
      "level_downgrade",
      undefined,
      sendMessageLater ? Date.now() + 9 * 60 * 60 * 1000 : Date.now(),
      undefined,
      undefined,
      undefined,
      uid,
      undefined,
      `${Math.round(Date.now() / 100000)}-lvl-dg-${uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      FAT_BURNER_GAME,
    );

    await saveReminderInDB(rem);
  }
  // 1 < 2
  else if (now < prev) {
    const rem = createReminder(
      false,
      "level_upgrade",
      undefined,
      Date.now() + 9 * 60 * 60 * 1000,
      undefined,
      undefined,
      undefined,
      uid,
      undefined,
      `${Math.round(Date.now() / 100000)}-lvl-up-${uid.slice(0, 8)}`,
      undefined,
      undefined,
      undefined,
      FAT_BURNER_GAME,
    );

    await saveReminderInDB(rem);
  }
};
