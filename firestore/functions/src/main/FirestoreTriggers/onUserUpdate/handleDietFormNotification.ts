import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
import { UserInterface } from "../../../models/User/User";

export const handleDietFormNotification = async (
  nowUser: UserInterface,
  oldUser: UserInterface,
) => {
  if (nowUser.flags?.dietFormFilled && !oldUser.flags?.dietFormFilled) {
    const reminder = createReminder(
      true,
      "diet_form_filled",
      undefined,
      Date.now(),
      "",
      "",
      "",
      nowUser.uid,
      undefined,
      `dietForm-${nowUser.uid}`,
    );

    await saveReminderInDB(reminder);
  }
};
