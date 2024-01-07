import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import {
  bootcampGroup,
  // numberBadge,
  paidFlags,
  wellnessGroup,
} from "./constants";
import { mixpanel } from "../../../mixpanel/mixpanel";
import { getUserById, getUserByPhone } from "../../../models/User/Methods";

const corsHandler = cors({ origin: true });
export const seedWhatsappFlagsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // for (const numFlag of numberBadge) {
      //   if (numFlag.group !== "Female Wellness with SocialBoat") {
      //     // console.log("hi", numFlag.group);
      //     const users = await getUserByPhone(numFlag.num);
      //     for (const user of users) {
      //       await admin
      //         .firestore()
      //         .collection("users")
      //         .doc(user.uid)
      //         .update({
      //           [`bootcampDetails.bootcampName`]: numFlag.group,
      //         });
      //       console.log(
      //         "user.name",
      //         user.name,
      //         user.bootcampDetails?.bootcampId,
      //         user.bootcampDetails?.bootcampName,
      //       );
      //     }
      //   }
      //   // console.log("numFlag", numFlag);
      // }

      for (const uid of paidFlags) {
        const user = await getUserById(uid);
        if (user?.age) {
          console.log(uid);

          await mixpanel.people.set(
            user.uid,
            { age: user.age },
            { $ignore_time: true },
          );
          // await admin
          //   .firestore()
          //   .collection("users")
          //   .doc(uid)
          //   .update({
          //     [`waMessageStatus.paymentDone`]: true,
          //   });
        } else {
          console.log("uid not present", uid);
        }
      }

      throw new Error("hi");

      try {
        const startWellness = 0;
        const startBootcamp = 0;

        let i: number = 0;
        for (const phone of wellnessGroup) {
          const userList = await getUserByPhone(phone);
          console.log("well", i, phone, userList.length);
          if (i > startWellness)
            for (const user of userList) {
              await admin
                .firestore()
                .collection("users")
                .doc(user.uid)
                .update({
                  [`waMessageStatus.joinedWellnessCommunity`]: true,
                });
            }

          i++;
        }

        let j: number = 0;
        for (const phone of bootcampGroup) {
          const userList = await getUserByPhone(phone);
          console.log("boot", j, phone, userList.length);
          if (j > startBootcamp)
            for (const user of userList) {
              await admin
                .firestore()
                .collection("users")
                .doc(user.uid)
                .update({
                  [`waMessageStatus.bootcamp`]: true,
                });
            }

          j++;
        }

        return response.status(200).send({ status: "success" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
