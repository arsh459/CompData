import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { getUserByPhone } from "../../../models/User/Methods";

const corsHandler = cors({ origin: true });

export const markCommunityFlagFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { phoneNumbers } = request.body as {
          phoneNumbers?: { phoneNumber: string }[];
        };

        let unmarked: string[] = [];
        let i: number = 0;
        if (phoneNumbers) {
          console.log("to mark", phoneNumbers.length);
          for (const el of phoneNumbers) {
            i++;
            if (i > 1545) {
              const users = await getUserByPhone(el.phoneNumber);

              if (users.length) {
                for (const user of users) {
                  console.log(i, el.phoneNumber, users.length, user.uid);
                  await admin
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .update({
                      [`waMessageStatus.joinedWellnessCommunity`]: true,
                    });
                }
              } else {
                console.log(i, el.phoneNumber, users.length, "NA");
                unmarked.push(el.phoneNumber);
              }
            }
          }

          return response
            .status(200)
            .send({ status: "success", unmarked: unmarked });
        }

        return response
          .status(400)
          .send({ status: "failed", reason: "no phone numbers present" });
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
