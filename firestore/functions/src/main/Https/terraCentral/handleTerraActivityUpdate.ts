// import { FIT_POINT_TH } from "../../../constants/challenge";
import {
  NOISE_CANCELLATION_PHASE,
  NOISE_TH,
} from "../../../constants/challenge";
import { handleTerraActivity } from "../../../models/Activity/createActivityForTerra";
import {
  FirestoreTerra,
  TerraActivity,
  // TerraPrividers,
  TerraUser,
} from "../../../models/Terra/TerraUser";
import { getTerraUser } from "../../../models/User/terra";
// import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
import { getActivityTime, getPeriodString } from "./getActivityTime";
// import { getDayStartIST } from "../../PubSub/activityTracker/utils";

export const handleTerraActivities = async (
  terraActivities: TerraActivity[],
  user: TerraUser,
  // date: string,
) => {
  // get firestore user
  // console.log("TerraUser", user);
  const firestoreUser = await getTerraUser(user.user_id);
  console.log("firestoreUser", firestoreUser?.name);
  if (firestoreUser) {
    const bucketCals: { [dateString: string]: number } = {};
    const terraBucketed = bucketTerraActivities(terraActivities);

    for (const bucketString of Object.keys(terraBucketed)) {
      console.log("bucket string", bucketString);
      const totalCalories = summariesTerraActivities(
        terraBucketed[bucketString],
      );

      bucketCals[bucketString] = totalCalories;

      await handleTerraActivity(
        bucketString,
        bucketCals[bucketString],
        firestoreUser,
        terraBucketed[bucketString],
      );
    }
  }
};

const bucketTerraActivities = (terraActivities: TerraActivity[]) => {
  const buckets: { [dateString: string]: TerraActivity[] } = {};
  const periods: { [periodString: string]: boolean } = {};
  for (const terraActivity of terraActivities) {
    const actBucket = getActivityTime(terraActivity);
    const periodString = getPeriodString(terraActivity);

    if (actBucket && buckets[actBucket] && !periods[periodString]) {
      buckets[actBucket].push(terraActivity);
      periods[periodString] = true;
    } else if (actBucket && !periods[periodString]) {
      buckets[actBucket] = [terraActivity];
      periods[periodString] = true;
    }
  }

  return buckets;
};

const isActivityAllowed = (
  terraActivity: TerraActivity | FirestoreTerra,
): boolean => {
  if (terraActivity.metadata.name === "WEIGHTLIFTING") {
    return false;
  }

  return true;
};

const isNotNoise = (terraActivity: TerraActivity | FirestoreTerra): boolean => {
  const actUnix = new Date(
    terraActivity.metadata.start_time ? terraActivity.metadata.start_time : 0,
  ).getTime();

  if (
    terraActivity &&
    terraActivity.calories_data &&
    terraActivity.calories_data.net_activity_calories &&
    // noise cancellation
    ((terraActivity.calories_data.net_activity_calories > 0 &&
      actUnix <= NOISE_CANCELLATION_PHASE) ||
      (terraActivity.calories_data.net_activity_calories > NOISE_TH &&
        actUnix > NOISE_CANCELLATION_PHASE))
  ) {
    return true;
  }

  return false;
};

export const summariesTerraActivities = (
  terraActivities: (TerraActivity | FirestoreTerra)[],
) => {
  let totalCalories: number = 0;
  for (const terraActivity of terraActivities) {
    if (
      terraActivity.calories_data.net_activity_calories &&
      isActivityAllowed(terraActivity) &&
      isNotNoise(terraActivity)
    ) {
      console.log(
        `terra calories: ${terraActivity.calories_data.net_activity_calories} | start_time:${terraActivity?.metadata?.start_time}`,
      );
      totalCalories += terraActivity.calories_data.net_activity_calories;
    }
  }

  return totalCalories;
};

// const normaliseCalories = (totalCalories: number, provider: TerraPrividers) => {
//   // if (provider === "GOOGLE" && totalCalories > 1500) {
//   //   return totalCalories - 1000;
//   // }

//   return totalCalories;
// };
