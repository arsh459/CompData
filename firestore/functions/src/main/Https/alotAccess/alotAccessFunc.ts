import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import {
  AppSubscription,
  UserAppSubscription,
  planKey,
} from "../../../models/AppSubscription/Subscription";
import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";
import { getSBPlanByKey } from "../export/paidUsers";
import { getAllUserPayments } from "../../../models/sbPayment/getPayment";
import { v4 as uuidv4 } from "uuid";

const corsHandler = cors({ origin: true });
export const alotAccessFunc = functions
  .region("asia-south1")
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, gameId, accessTill, paid, productId, store, planType } =
          request.body as {
            uid: string;
            gameId: string;
            accessTill: number;
            paid: number;
            productId?: string;
            store?: string;
            planType?: planKey;
          };

        // console.log(uid, gameId, accessTill);
        if (uid && gameId && accessTill) {
          const gameSub = await admin
            .firestore()
            .collection("appSubscriptions")
            .where("gameId", "==", gameId)
            .get();

          if (gameSub.docs.length) {
            const subObj = gameSub.docs[0].data() as AppSubscription;

            // console.log("subObj", subObj);

            const remoteUserSub = await admin
              .firestore()
              .collection("appSubscriptions")
              .doc(subObj.id)
              .collection("userSubs")
              .doc(uid)
              .get();

            // console.log("remoteUserSub", remoteUserSub);

            let previous: UserAppSubscription | undefined = undefined;
            if (remoteUserSub.exists) {
              previous = remoteUserSub.data() as UserAppSubscription;
            }

            const newAppSub: UserAppSubscription = {
              ...(previous
                ? previous
                : {
                    freeTrialStartedOn: Date.now(),
                    numPayments: 1,
                    freeTrialEndsOn: accessTill,
                  }),
              uid: uid,
              paidPeriodEndsOn: accessTill,
            };

            // console.log("newAppSub", newAppSub);

            await admin
              .firestore()
              .collection("appSubscriptions")
              .doc(subObj.id)
              .collection("userSubs")
              .doc(uid)
              .set(newAppSub);

            if (planType) {
              const remotePlan = await getSBPlanByKey(planType);

              if (remotePlan?.id) {
                // update sbplanid
                await admin.firestore().collection("users").doc(uid).update({
                  sbPlanId: remotePlan.id,
                });
              }
            }

            // check if payment exists
            const newDocs = await getAllUserPayments(uid);
            if (newDocs.length === 0 && paid) {
              const paymentObj = {
                id: uuidv4(),
                currency: "INR",
                amount: paid * 100,
                razorpay_signature: "",
                uid,
                baseOrderId: "",
                eventId: "",
                eventName: "",
                ownerUID: "",
              };

              await admin
                .firestore()
                .collection("appSubscriptions")
                .doc(subObj.id)
                .collection("userSubs")
                .doc(uid)
                .collection("payments")
                .doc(paymentObj.id)
                .set(paymentObj);
            }

            console.log("uid", uid, "done");

            // add paid conversion event
            if (paid) {
              await addPaidConv(uid, paid, "INR", productId, store);
            }
          }
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
