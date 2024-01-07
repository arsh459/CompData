import {
  getCycleById,
  getPeriodDateForDate,
  getUserById,
} from "../../../../models/User/Methods";
import { getDateBucket } from "../../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { getUserTimezone } from "../../taskGenerator/generateReminders";
import { getQuestionToAsk } from "../questions/main";

export const getQuestionHandler = async (uid: string) => {
  const user = await getUserById(uid);
  if (user?.uid) {
    const now = Date.now();
    const tzString = getUserTimezone(
      user.recommendationConfig?.timezone?.tzString,
    );

    const date = getDateBucket(tzString, now);

    console.log("date", date);

    const todaysPeriodDate = await getPeriodDateForDate(uid, date);

    console.log("todaysPeriodDate", todaysPeriodDate);
    if (todaysPeriodDate?.cycleId) {
      const cycleObj = await getCycleById(uid, todaysPeriodDate?.cycleId);

      console.log("cycleObj", cycleObj);

      if (cycleObj) {
        return await getQuestionToAsk(
          cycleObj,
          todaysPeriodDate,
          user,
          user.noPrivateQu ? true : false,
        );
      }
    }
  }

  return [];
};
