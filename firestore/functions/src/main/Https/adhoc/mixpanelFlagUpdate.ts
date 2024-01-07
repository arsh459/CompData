import * as functions from "firebase-functions";
import * as cors from "cors";
import { getBootcampUsers } from "../../../models/User/Methods";
import * as admin from "firebase-admin";
import { mixpanel } from "../../../mixpanel/mixpanel";

const corsHandler = cors({ origin: true });
export const minxpanelFlagUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // const unix = new Date("2023-06-01").getTime();
        // console.log("unix", unix);

        const users = await getBootcampUsers();
        let i: number = 0;
        for (const user of users) {
          // invited && started
          if (
            user.bootcampDetails?.bootcampId &&
            user.bootcampDetails.started
          ) {
            console.log(i, user.uid, "INVITED_STARTED");
            await admin
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                [`waMessageStatus.bootcamp`]: true,
                [`waMessageStatus.bootcampEnrolled`]: true,
              });

            await mixpanel.people.set(
              user.uid,
              {
                ...user.waMessageStatus,
                bootcamp: true,
                bootcampEnrolled: true,
              },
              { $ignore_time: true },
            );
          }
          // invited && not started
          else if (
            user.bootcampDetails?.bootcampId &&
            !user.bootcampDetails.started
          ) {
            console.log(i, user.uid, "ONLY_INVITED");
            await admin
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                [`waMessageStatus.bootcamp`]: true,
                [`waMessageStatus.bootcampEnrolled`]: false,
              });

            await mixpanel.people.set(
              user.uid,
              {
                ...user.waMessageStatus,
                bootcamp: true,
                bootcampEnrolled: false,
              },
              { $ignore_time: true },
            );
          }

          i++;
        }

        return response.status(200).send({ status: "success" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
