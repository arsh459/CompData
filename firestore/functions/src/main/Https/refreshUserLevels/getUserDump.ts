import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUsersBetween } from "../../../models/User/Methods";
import { genderType } from "../../../models/User/User";
import { difficulty } from "../addBadge/addBadgeFunc";
import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
// import {
// handleUserActivityDump,
//   handleUserReconcile,
// } from "./handleUserLevelReconcile";
// import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";

interface UserDumpInterface {
  uid: string;
  phone: string;
  email: string;
  name: string;
  signedUpTime: string;
  signedInTime: string;
  fpCredit: number;
  fpDebit: number;
  height: number;
  weight: number;
  gender: genderType;
  level: number;
  paceOfAchievementInMonth: number;
  desiredWeight: number;
  fitnessGoal: string;
  fitnessConcerns: string;
  repsCount: number;
  difficulty: difficulty | "";
  hasTeam: boolean;
  games: string;
  dailyFPTarget: number;
  dailyStepTarget: number;
  dailyKCalTarget: number;
  badgeId: string;
  nutritionBadgeId: string;
  currentBodyType: string;
  desiredBodyType: string;
}

const corsHandler = cors({ origin: true });
export const getAllUserDumpFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "2GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const { start, end, key } = request.body as {
          start?: number;
          end?: number;
          key?: "authSignupTime" | "authSigninTime";
        };

        if (start && end && key) {
          const sbUsers = await getUsersBetween(start, end, key);
          // console.log("users", sbUsers.length);
          const returnSummary: UserDumpInterface[] = [];
          for (const sbUser of sbUsers) {
            // const activities = await handleUserActivityDump(sbUser.uid);

            // for (const act of activities) {
            //   returnSummary.push({
            //     uid: sbUser.uid,
            //     name: sbUser.name,
            //     phone: sbUser.phone ? sbUser.phone : "",
            //     email: sbUser.email ? sbUser.email : "",
            //     games: act.games ? act.games.join(" | ") : "",
            //     activityId: act.id ? act.id : act.postId,
            //     postId: act.postId ? act.postId : "",
            //     calories: act.calories ? act.calories : 0,
            //     fitPoints: act.fitPointsV2 ? act.fitPointsV2 : 0,
            //     startDate:
            //       typeof act.createdOn === "number"
            //         ? getFormattedDateForUnix(act.createdOn)
            //         : "-",
            //     startUNIX: act.createdOn ? act.createdOn : 0,
            //     activityName: act.activityName ? act.activityName : "untitled",
            //     source: act.source ? act.source : "unknown",
            //     startTime:
            //       typeof act.createdOn === "number"
            //         ? getFormattedDateForUnix(
            //             act.createdOn,
            //             "hh:mma YYYY-MM-DD",
            //           )
            //         : "-",
            //   });
            // }

            returnSummary.push({
              uid: sbUser.uid,
              name: sbUser.name ? sbUser.name : "no name",
              games: sbUser.enrolledEvents
                ? sbUser.enrolledEvents?.join(" | ")
                : "",
              phone: sbUser.phone ? sbUser.phone : "",
              email: sbUser.email ? sbUser.email : "",
              signedUpTime: sbUser.authSignupTime
                ? getFormattedDateForUnix(
                    sbUser.authSignupTime,
                    "hh:mma YYYY-MM-DD",
                  )
                : "",
              signedInTime: sbUser.authSigninTime
                ? getFormattedDateForUnix(
                    sbUser.authSigninTime,
                    "hh:mma YYYY-MM-DD",
                  )
                : "",
              weight: sbUser.weight ? sbUser.weight : -1,
              height: sbUser.height ? sbUser.height : -1,
              fitnessGoal: sbUser.fitnessGoal
                ? sbUser.fitnessGoal.join(" | ")
                : "",
              fitnessConcerns: sbUser.fitnessConcerns
                ? sbUser.fitnessConcerns.join(" | ")
                : "",
              desiredWeight: sbUser.desiredWeight ? sbUser.desiredWeight : -1,
              repsCount: sbUser.repsCount ? sbUser.repsCount : -1,
              difficulty: sbUser.difficulty ? sbUser.difficulty : "",
              dailyFPTarget: sbUser.dailyFPTarget ? sbUser.dailyFPTarget : -1,
              badgeId: sbUser.badgeId ? sbUser.badgeId : "",
              nutritionBadgeId: sbUser.nutritionBadgeId
                ? sbUser.nutritionBadgeId
                : "",
              hasTeam:
                sbUser.participatingInGameWithTeam &&
                sbUser.participatingInGameWithTeam[TEAM_ALPHABET_GAME]
                  ? true
                  : false,
              paceOfAchievementInMonth: sbUser.paceOfAchievementInMonth
                ? sbUser.paceOfAchievementInMonth
                : -1,
              fpCredit: sbUser.fpCredit ? sbUser.fpCredit : 0,
              fpDebit: sbUser.fpDebit ? sbUser.fpDebit : 0,
              gender: sbUser.gender ? sbUser.gender : "notSpecified",
              level: sbUser.userLevelV2 ? sbUser.userLevelV2 : -1,
              currentBodyType: sbUser.currentBodyType
                ? sbUser.currentBodyType
                : "notSpecified",
              desiredBodyType: sbUser.desiredBodyType
                ? sbUser.desiredBodyType
                : "notSpecified",
              dailyKCalTarget: sbUser.dailyKCalTarget
                ? sbUser.dailyKCalTarget
                : -1,
              dailyStepTarget: sbUser.dailyStepTarget
                ? sbUser.dailyStepTarget
                : -1,
            });

            //   i++;
          }
          return response.status(200).send({
            status: "success",
            numResults: sbUsers.length,
            data: returnSummary,
          });
        }

        return response.status(400).send({ error: "Invalid request" });
        // let i: number = 0;
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
