import { getUserById } from "../../../models/User/Methods";
import { dayRecommendation } from "../../../models/User/User";
import { generateWorkoutReminders } from "./generateReminders";
import { getPreviousDayRecsBetween } from "./getterSetter";

export const generateRemindersAndGetRecs = async (uid: string) => {
  const user = await getUserById(uid);
  if (user) {
    const now = Date.now();
    const nowEnd = now + 7 * 24 * 60 * 60 * 1000;
    const nowStart = now - 24 * 60 * 60 * 1000;
    const previousRecs = await getPreviousDayRecsBetween(
      user.uid,
      nowStart,
      nowEnd,
    );

    const previousWorkoutRecs = previousRecs.filter(
      (item) => item.type === "workout",
    );

    const dayRecs: { [date: string]: dayRecommendation } = {};
    for (const previousRec of previousWorkoutRecs) {
      dayRecs[previousRec.date] = previousRec;
    }

    await generateWorkoutReminders(user, dayRecs);
  }
};
