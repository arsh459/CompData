import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import {
  // getFormattedDateFormat2ForUnix,
  getFormattedDateForUnix,
} from "../../PubSub/activityTracker/utils";
// import { UserRecord } from "firebase-admin/auth";
// import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";

// import { getCurrentSprint } from "../../FirestoreTriggers/onActivityWrite/utils";
// import { triggerPastUpdates } from "../../PubSub/activityTracker/triggerUpdates";
// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const consoleUsersFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const listAllUsers = (nextPageToken?: string) => {
          // List batch of users, 1000 at a time.

          // const users: UserRecord[] = [];
          admin
            .auth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
              listUsersResult.users.forEach(async (userRecord) => {
                const signUpUnix = new Date(
                  userRecord.metadata.creationTime,
                ).getTime();
                const signInUnix = new Date(
                  userRecord.metadata.lastSignInTime,
                ).getTime();

                try {
                  console.log("Hi I am here");
                  // admin
                  //   .firestore()
                  //   .collection("users")
                  //   .doc(userRecord.uid)
                  //   .update({
                  //     authSignupTime: signUpUnix,
                  //     authSigninTime: signInUnix,
                  //   })
                  //   .catch(() => console.log("error"));

                  // .then(() => console.log(""))
                  // .catch(() => {});
                } catch (error) {
                  console.log("doc doesn't exist");
                }

                console.log(
                  userRecord.uid,
                  " | ",
                  signUpUnix,
                  " | ",
                  getFormattedDateForUnix(signUpUnix, "hh:mmA ddd MMM DD YYYY"),
                  " | ",
                  signInUnix,
                  " | ",
                  getFormattedDateForUnix(signInUnix),
                  " | ",
                  userRecord.displayName,
                  " | ",
                  userRecord.email,
                  " | ",
                  userRecord.phoneNumber,
                );
              });
              if (listUsersResult.pageToken) {
                // List next batch of users.
                listAllUsers(listUsersResult.pageToken);
              }
            })
            .catch((error) => {
              console.log("Error listing users:", error);
            });
        };

        listAllUsers();
        // const result: { uid: string } = request.body;

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
