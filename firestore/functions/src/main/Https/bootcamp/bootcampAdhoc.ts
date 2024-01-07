import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { allDays } from "../../../models/User/User";
import { mainTaskGeneratorV3 } from "../taskGenerator/taskGeneratorV2";
import { getUserById } from "../../../models/User/Methods";
import { getWorkoutDays } from "../../PubSub/recGenerator/main";
import { getRecommendationConfig } from "../taskGenerator/constants";
import { getUserTimezone } from "../taskGenerator/generateReminders";
import { getDayStartForTz_DATE } from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";
import { v4 as uuidv4 } from "uuid";
import { sendNotification } from "../../../utils/notifications";
import { getBootcamp } from "../../../models/bootcamp/getUtils";
import { updateNotificationUserDB } from "../../../models/Notifications/updateNotificationUserDB";
import { NotifeeData } from "../../../models/Notifications/interface";
import { toInviteToBootcamp } from "../../Https/bootcamp/constants2";
import { trackNotificationSend } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";
// import { handleMarketSend } from "../../PubSub/notifications/handleSend";

const corsHandler = cors({ origin: true });
export const bootcampAdhocFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // await handleMarketSend('test', 'sakhi_question_1', )

        const { bootcampId, numStart } = request.body as {
          bootcampId?: string;
          numStart: number;
        };

        const uidsToSend = toInviteToBootcamp;

        let i: number = 0;
        if (bootcampId && typeof numStart === "number") {
          const bootcamp = await getBootcamp(bootcampId);
          if (bootcamp) {
            for (const uid of uidsToSend) {
              const user = await getUserById(uid);

              i++;

              if (i <= numStart && user?.bootcampDetails?.bootcampId) {
                console.log("skipping", i, user.name, user.phone);
                continue;
              }

              const workoutStart = bootcamp.start;
              const nutritionStart = bootcamp.start;
              const badgeId = bootcamp.badgeId;
              const nutritionBadgeId = bootcamp.nutritionBadgeId;

              const tz = getUserTimezone(
                user?.recommendationConfig?.timezone?.tzString,
              );
              const wStartNeeded = getFormattedDateForUnixWithTZ(
                workoutStart,
                "Asia/Kolkata",
              );
              const nStartNeeded = getFormattedDateForUnixWithTZ(
                nutritionStart,
                "Asia/Kolkata",
              );

              const newStartWorkout = getDayStartForTz_DATE(tz, wStartNeeded);
              const newStartNutrition = getDayStartForTz_DATE(tz, nStartNeeded);

              if (user && newStartWorkout && newStartNutrition) {
                await admin
                  .firestore()
                  .collection("users")
                  .doc(uid)
                  .update({
                    bootcampDetails: {
                      bootcampId,
                      started: Date.now(),
                    },
                    badgeId,
                    nutritionBadgeId,
                    [`recommendationConfig.start`]: newStartWorkout,
                    [`recommendationConfig.nutritionStart`]: newStartNutrition,
                    [`recommendationConfig.badgeConfig.${badgeId}`]:
                      newStartWorkout,
                    [`recommendationConfig.badgeConfig.${nutritionBadgeId}`]:
                      newStartNutrition,
                    [`recommendationConfig.workoutDays`]: allDays,
                    guidedOnboardDone: true,
                    [`flags.bootcampOnboarded`]: false,
                  });

                let daysToUse = 5;

                const config = getRecommendationConfig(user);

                await mainTaskGeneratorV3(
                  user,
                  getWorkoutDays("workout", config?.workoutDays),
                  config?.primaryWorkoutCoach ? config.primaryWorkoutCoach : "",
                  newStartWorkout,
                  badgeId,
                  daysToUse,
                  "workout",
                  true,
                  true,
                );

                await mainTaskGeneratorV3(
                  user,
                  getWorkoutDays("nutrition", config?.workoutDays),
                  config?.primaryWorkoutCoach ? config.primaryWorkoutCoach : "",
                  newStartNutrition,
                  nutritionBadgeId,
                  daysToUse,
                  "nutrition",
                  true,
                  true,
                );

                const id = uuidv4();

                const notifeeData: NotifeeData = {
                  uid: uid,
                  notificationType: "text",
                  navigateTo: "Home",
                  navigateToParams: {},
                  imageUrl: "",
                  title: "You are invited!",
                  body: "You are invited to a 5 Day Bootcamp with Dr. Divya",
                  id: id,
                  subtitle: "",
                  createdOn: Date.now(),
                };

                await sendNotification(uid, notifeeData);

                await updateNotificationUserDB(uid, notifeeData);

                await trackNotificationSend(
                  uid,
                  id,
                  "bootcamp",
                  notifeeData.title,
                );

                console.log("DONE", i, user.name, user.phone);
              }
            }
          }
        }

        return response.status(200).send({ status: "success" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
