import { Activity } from "../../../models/Activity/Activity";
import * as admin from "firebase-admin";
import { trackMetricChange } from "../onUserUpdate/updateFPConv";

export const handleSearchFix = async (uid: string, now: Activity) => {
  const flag = shouldUpdate(now);
  if (flag && now.id) {
    try {
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .doc(now.id)
        .update({
          canFetch: true,
          ...(now.source === "task"
            ? {
                stepsActive: now.stepsActive ? true : false,
              }
            : {}),
        });

      // track mixpanel

      if (
        now.source === "steps" ||
        (now.source === "task" && now.stepsActive)
      ) {
        await trackMetricChange("user_steps_track", uid, {
          name: now.activityName,
        });
      } else if (now.source === "task") {
        await trackMetricChange("user_workout_track", uid, {
          name: now.activityName,
        });
      } else if (now.source === "nutrition") {
        await trackMetricChange("user_diet_track", uid, {
          name: now.activityName,
        });
      }
    } catch (error) {
      console.log("error");
    }
  }
};

const shouldUpdate = (now: Activity) => {
  if (now.canFetch) {
    return false;
  }

  if (now.calories && !now.canFetch) {
    if (
      now.source === "nutrition" ||
      now.source === "steps" ||
      now.source === "task"
    ) {
      return true;
    }
  }

  return false;
};
