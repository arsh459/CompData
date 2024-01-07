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
import { getBootcamp } from "../../../models/bootcamp/getUtils";

const corsHandler = cors({ origin: true });
export const bootcampFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const {
          uid,
          badgeId,
          nutritionBadgeId,
          workoutStart,
          nutritionStart,
          bootcampId,
        } = request.body as {
          uid?: string;
          bootcampId?: string;
          badgeId?: string;
          nutritionBadgeId?: string;
          workoutStart?: number;
          nutritionStart?: number;
        };

        if (
          uid &&
          badgeId &&
          nutritionBadgeId &&
          workoutStart &&
          nutritionStart &&
          bootcampId
        ) {
          const user = await getUserById(uid);
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
            const bootcamp = await getBootcamp(bootcampId);

            await admin
              .firestore()
              .collection("users")
              .doc(uid)
              .update({
                bootcampDetails: {
                  bootcampId,
                  bootcampName: bootcamp?.name ? bootcamp.name : "",
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
                [`waMessageStatus.bootcamp`]: true,
                [`waMessageStatus.bootcampEnrolled`]: true,
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
          }

          return response.status(200).send({ status: "success" });
        }

        return response.status(400).send({ error: "Invalid request" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
