import { mixpanel } from "../../../mixpanel/mixpanel";
import { UserInterface } from "../../../models/User/User";

export const userMixpanelFlags = async (
  userNow: UserInterface,
  userPrev: UserInterface,
) => {
  if (
    (userNow.periodTrackerObj?.inputCycleLength !==
      userPrev.periodTrackerObj?.inputCycleLength ||
      userNow.periodTrackerObj?.inputPeriodLength !==
        userPrev.periodTrackerObj?.inputPeriodLength ||
      userNow.diagnosedPeriod !== userPrev.diagnosedPeriod ||
      userNow.waMessageStatus?.paymentDone !==
        userPrev.waMessageStatus?.paymentDone ||
      userNow.waMessageStatus?.bootcamp !==
        userPrev.waMessageStatus?.bootcamp ||
      userNow.waMessageStatus?.bootcampEnrolled !==
        userPrev.waMessageStatus?.bootcampEnrolled ||
      userNow.waMessageStatus?.stepsDone !==
        userPrev.waMessageStatus?.stepsDone ||
      userNow.waMessageStatus?.joinedWellnessCommunity !==
        userPrev.waMessageStatus?.joinedWellnessCommunity ||
      userNow.waMessageStatus?.oneNutritionDone !==
        userPrev.waMessageStatus?.oneNutritionDone ||
      userNow.waMessageStatus?.oneWorkoutDone !==
        userPrev.waMessageStatus?.oneWorkoutDone ||
      userNow.waMessageStatus?.periodSync !==
        userPrev.waMessageStatus?.periodSync ||
      userNow.waMessageStatus?.recipeSeen !==
        userPrev.waMessageStatus?.recipeSeen ||
      userNow.waMessageStatus?.reelSeen !==
        userPrev.waMessageStatus?.reelSeen ||
      userNow.waMessageStatus?.triedSakhi !==
        userPrev.waMessageStatus?.triedSakhi) &&
    userNow.waMessageStatus
  ) {
    // people update
    await mixpanel.people.set(
      userNow.uid,

      {
        ...userNow.waMessageStatus,
        ...(userNow.diagnosedPeriod
          ? { diagnosedPeriod: userNow.diagnosedPeriod }
          : {}),
        ...(userNow.periodTrackerObj
          ? {
              inputCycleLength: userNow.periodTrackerObj.inputCycleLength
                ? userNow.periodTrackerObj.inputCycleLength
                : -1,
            }
          : {}),
        ...(userNow.periodTrackerObj
          ? {
              inputPeriodLength: userNow.periodTrackerObj.inputPeriodLength
                ? userNow.periodTrackerObj.inputPeriodLength
                : -1,
            }
          : {}),
      },
      { $ignore_time: true },
    );
  }
};
