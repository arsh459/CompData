import { updateUserActiveStreak } from "../../../../models/Streak/Methods";
import { getUserStreak } from "../../../../models/Streak/getUserStreak";
import { getUserById } from "../../../../models/User/Methods";
import { getTimezone } from "../../../FirestoreTriggers/onActivityUpdateV2/dateBucket";

export const activeStreakMain = async (uid: string) => {
  const userActiveStreak = await getUserStreak(uid);
  const userData = await getUserById(uid);
  const usertz = userData && getTimezone(userData);

  if (usertz && userActiveStreak) {
    await updateUserActiveStreak(userActiveStreak, uid, usertz);
    return true;
  }

  return false;
};
