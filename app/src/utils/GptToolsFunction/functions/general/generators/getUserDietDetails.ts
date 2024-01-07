import { useUserStore } from "@providers/user/store/useUserStore";
import { format, getTime, startOfDay } from "date-fns";
import { checkFutureRecs } from "./checkFutureRecs";

export const getUserDietDetails = async (date: string) => {
  let nutritionBadgeId = useUserStore.getState().user?.nutritionBadgeId;
  let nutritionStart =
    useUserStore.getState().user?.recommendationConfig?.nutritionStart;
  const uid = useUserStore.getState().user?.uid;

  if (!nutritionBadgeId) {
    return "Please contact our support team, they will assign diet plan for you.";
  }

  if (!nutritionStart) {
    return "Please contact our support team, they will assign diet plan for you.";
  }

  const dayStartUnix = getTime(startOfDay(new Date(date)));
  const minStartUnix = getTime(startOfDay(new Date(nutritionStart)));
  const minDate = format(new Date(nutritionStart), "dd-MM-yyyy");

  if (dayStartUnix < minStartUnix) {
    return (
      "Your diet plan starts on " +
      minDate +
      " I can only access diet plan for dates more than that."
    );
  }
  if (uid) {
    let futureStatus = await checkFutureRecs(
      uid,
      nutritionBadgeId,
      dayStartUnix
    );

    return futureStatus;
  }
};
