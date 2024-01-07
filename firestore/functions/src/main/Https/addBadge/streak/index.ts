import * as functions from "firebase-functions";
import * as cors from "cors";
import { handleStreakMain } from "./main";

export type achievementPace =
  | "1_month"
  | "2_months"
  | "3_months"
  | "4_months"
  | "6_months"
  | "just_for_fun";

export type difficulty = "Easy" | "Medium" | "Not Easy" | "Hard";

const corsHandler = cors({ origin: true });
export const streakFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, type } = request.body as {
          uid?: string;
          type?: "workoutStreak" | "nutritionStreak";
        };

        if (uid && type) {
          const { status, reason } = await handleStreakMain(uid, type);

          if (status) {
            return response.status(200).send({ status: "success" });
          } else {
            return response.status(500).send({
              error: "Internal Server Error",
              reason: reason ? reason : "failed in main function",
            });
          }
        }

        return response
          .status(400)
          .send({ error: "failed", reason: "incorrect uid or type" });
      } catch (error) {
        console.log(error);
        return response.status(500).send({
          error: "Internal Server Error",
          reason: "failed in main function",
        });
      }
    });
  });

/**
 * createAchiever if not active
 *
 *
 */
