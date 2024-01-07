import { UserInterface } from "../../../models/User/User";
import { generateRemindersAndGetRecs } from "../../Https/taskGenerator/generaterRemindersForRecs";

export const notificationTimeUpdate = async (
  nowUser: UserInterface,
  prevUser: UserInterface,
) => {
  if (
    nowUser.recommendationConfig?.workoutNotificationTime &&
    nowUser.recommendationConfig.workoutNotificationTime !==
      prevUser.recommendationConfig?.workoutNotificationTime
  ) {
    await generateRemindersAndGetRecs(nowUser.uid);
  } else if (
    nowUser.recommendationConfig?.timezone?.tzString &&
    nowUser.recommendationConfig.timezone.tzString !==
      prevUser.recommendationConfig?.timezone?.tzString
  ) {
    await generateRemindersAndGetRecs(nowUser.uid);
  }
};
