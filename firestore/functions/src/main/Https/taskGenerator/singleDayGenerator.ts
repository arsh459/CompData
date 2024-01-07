import { getUserById } from "../../../models/User/Methods";
import { generateWorkoutReminders } from "./generateReminders";
// import {
// getDayStartIST,
// getFormattedDateForUnix,
// } from "../../PubSub/activityTracker/utils";
// import { getWorkoutDays } from "../../PubSub/recGenerator/main";
import {
  createDayRecommendationList,
  getPreviousDayRecs,
  saveAndDeleteForDay,
  // saveDayRecommendationList,
} from "./getterSetter";
// import { isDayRestDay } from "./main";

export const singleDayGenerator = async (
  uid: string,
  date: string,
  type: "workout" | "nutrition",
  baseBadgeId?: string,
  // newTier?: number,
) => {
  const user = await getUserById(uid);

  const badgeId = baseBadgeId
    ? baseBadgeId
    : type === "workout" && user?.badgeId
    ? user.badgeId
    : type === "nutrition" && user?.nutritionBadgeId
    ? user.nutritionBadgeId
    : "";

  const previousRec = await getPreviousDayRecs(uid, date, type, badgeId);

  // let coach: string = "";
  // const primaryCoach = user?.recommendationConfig?.primaryWorkoutCoach;
  if (
    user?.uid &&
    previousRec?.overrideBadgeId &&
    typeof previousRec.overrideDay === "number"
  ) {
    // const now = Date.now();

    // const formatted = getFormattedDateForUnix(stIST, "YYYY-MM-DD");
    // const day = new Date(formatted).getDay();

    // const restDay = isDayRestDay(
    //   getWorkoutDays(type, user.recommendationConfig?.workoutDays),
    //   day,
    // );
    console.log("manual task generation");

    if (type === "workout" || type === "nutrition") {
      // updated recList
      const newRec = await createDayRecommendationList(
        user.uid,
        previousRec.badgeId,
        // previousRec.overrideBadgeId,
        previousRec.overrideDay,
        previousRec.date,
        previousRec.unix,
        type,
        previousRec,
        // previousRec.overrideBadgeId,
        // previousRec.overrideDay,
        false,
      );

      console.log("newRec", newRec);

      await saveAndDeleteForDay(newRec, uid);

      try {
        await generateWorkoutReminders(user, { [newRec.date]: newRec });
      } catch (error) {}
    }
  }
};
