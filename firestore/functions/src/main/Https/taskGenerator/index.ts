import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";
import { getRecommendationConfig, getStartTime } from "./constants";
import { getWorkoutDays } from "../../PubSub/recGenerator/main";
import { mainTaskGeneratorV3 } from "./taskGeneratorV2";
import { getDaysToUse } from "./getDaysToUse";
import { addNutritionBadge } from "./addNutritionBadge";

// import { sendNotification } from "../../../utils/notifications";
// import { RemoteNotifeeData } from "../../../models/Notifications/interface";
// import { updateNotificationUserDB } from "../../../models/Notifications/updateNotificationUserDB";
// import { parseNotifeeData } from "../../../models/Notifications/createNotification";

const corsHandler = cors({ origin: true });

// export type notificationTypeSB = "text" | "image" | "message";

export const taskGeneratorFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, days, type, recreate, badgeId, deletePrevious } =
          request.body as {
            uid?: string;
            type: "nutrition" | "workout";
            days: number;
            startToday?: boolean; // dep
            recreate?: boolean;
            // ignoreManual?: boolean; // dep
            deletePrevious?: boolean;
            badgeId?: string;
          };

        console.log("uid", uid);
        console.log("days", days);
        console.log("type", type);
        console.log("recreate", recreate);
        console.log("badgeId", badgeId);
        console.log("deletePrevious", deletePrevious);

        // if (uid === "3oIXsFT2MneNwyFejqZ2erz2wMF2" && type === "workout") {
        //   return response.status(200).send({ status: "success" });
        // }
        // throw new Error("HII");

        if (uid) {
          // free user tracking flow
          if (type === "nutrition") {
            await addNutritionBadge(uid);
          }

          const user = await getUserById(uid);
          const config = getRecommendationConfig(user);

          const upBadgeId = badgeId
            ? badgeId
            : type === "workout"
            ? user?.badgeId
            : user?.nutritionBadgeId;

          const start = getStartTime(user, upBadgeId, type);

          console.log("user", user?.name);
          console.log("upBadgeId", upBadgeId);
          console.log("rec", config);
          console.log("start", start, start && new Date(start));

          if (user && start && upBadgeId && days) {
            // const now = Date.now();
            // const daysToNow = (now - start) / (24 * 60 * 60 * 1000);
            // let daysToUse = days;
            // if (!recreate) {
            //   daysToUse = days;
            // } else if (days - 1 > daysToNow) {
            //   daysToUse = days;
            // } else {
            //   daysToUse = Math.ceil(daysToNow) + 5;
            // }

            const daysToUse = getDaysToUse(start, days, recreate);

            const status = await mainTaskGeneratorV3(
              user,
              getWorkoutDays(type, config?.workoutDays),
              config?.primaryWorkoutCoach ? config.primaryWorkoutCoach : "",
              start,
              upBadgeId,
              daysToUse,
              type,
              recreate,
              deletePrevious,
            );
            if (status) {
              return response.status(200).send({ status: "success" });
            }
          }
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
