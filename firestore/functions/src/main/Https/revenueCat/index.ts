import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { RevenueCatRequest } from "./interface";

export const oneMonthSBPlanID = "1d46cf40-170d-4fcb-8702-d8d4428a9e4a";
export const ThreeMonthSBPlanID = "8d680b40-f4e7-47eb-b839-69ab92cd532d";
export const oneYearSBPlanID = "434e213d-50aa-42d1-ad69-d36f3cc3f63b";

const yearlyPlans: string[] = [
  "yearly_9000_0dtrial:yearly-9000-0dtrial",
  "Yearly_9000_0dTrial",
];

const monthlyPlans: string[] = [
  "Monthly_3000_0dTrial",
  "monthly_3000_0dtrial:monthly-3000-0dtrial",
];

const threeMonthPlans: string[] = [
  "quarter_5000_0dtrial:3month-5000-0dtrial",
  "Quarter_5000_0dTrial",
];

const corsHandler = cors({ origin: true });
export const revenueCatFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const reqP = request.body as RevenueCatRequest;
        if (
          reqP.event &&
          (reqP.event.type === "INITIAL_PURCHASE" ||
            reqP.event.type === "NON_RENEWING_PURCHASE" ||
            reqP.event.type === "RENEWAL")
        ) {
          console.log(
            "PAID:",
            reqP.event?.type,
            "UID:",
            reqP.event?.app_user_id,
            "PRICE:",
            reqP.event?.price,
            "CURRENCY:",
            reqP.event?.currency,
            "productID:",
            reqP.event.product_id,
          );

          if (reqP.event.app_user_id) {
            let sbPlanId: string = oneMonthSBPlanID;
            let days: number = 0;
            if (
              reqP.event.product_id &&
              yearlyPlans.includes(reqP.event.product_id)
            ) {
              sbPlanId = oneYearSBPlanID;
              days = 365;
            } else if (
              reqP.event.product_id &&
              monthlyPlans.includes(reqP.event.product_id)
            ) {
              sbPlanId = oneMonthSBPlanID;
              days = 30;
            } else if (
              reqP.event.product_id &&
              threeMonthPlans.includes(reqP.event.product_id)
            ) {
              sbPlanId = ThreeMonthSBPlanID;
              days = 90;
            }

            // payment done on app
            await admin
              .firestore()
              .collection("users")
              .doc(reqP.event.app_user_id)
              .update({
                ["waMessageStatus.paymentDone"]: true,
                sbPlanId,
              });

            const accessTill = Date.now() + days * 24 * 60 * 60 * 1000;

            await admin
              .firestore()
              .collection("appSubscriptions")
              .doc("0cPvVrnphNJBnvvOM9Zf")
              .collection("userSubs")
              .doc(reqP.event.app_user_id)
              .set(
                {
                  uid: reqP.event.app_user_id,
                  numPayments: admin.firestore.FieldValue.increment(1),
                  paidPeriodEndsOn: accessTill,
                },
                { merge: true },
              );
          }

          // await addPaidConv(
          //   reqP.event.app_user_id ? reqP.event.app_user_id : "no_uid",
          //   reqP.event.price ? reqP.event.price : 0,
          //   reqP.event.currency ? reqP.event.currency : "USD",
          //   reqP.event.product_id ? reqP.event.product_id : "-",
          //   reqP.event.store ? reqP.event.store : "-",
          // );
        } else {
          console.log(
            "TYPE:",
            reqP.event?.type,
            "UID:",
            reqP.event?.app_user_id,
            "PRICE:",
            reqP.event?.price,
            "CURRENCY:",
            reqP.event?.currency,
          );
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
