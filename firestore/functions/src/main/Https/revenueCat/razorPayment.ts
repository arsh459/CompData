import * as functions from "firebase-functions";
import * as cors from "cors";
import { RazorpayRequestInterface } from "./razorRequest";
import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
import {
  toNishaPhone,
  toSauravPhone,
  toSwapnilPhone,
} from "../../../constants/email/contacts";

const corsHandler = cors({ origin: true });
export const razorPaymentFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const reqP = request.body as RazorpayRequestInterface;

        if (reqP.event === "payment.authorized") {
          const body = [
            reqP.payload.payment?.entity?.currency &&
            reqP.payload.payment.entity.amount
              ? `*${reqP.payload.payment.entity.currency} ${
                  reqP.payload.payment.entity.amount / 100
                }*`
              : "Unknown amount",

            reqP.payload.payment?.entity?.contact
              ? reqP.payload.payment?.entity?.contact
              : "*Check phone*",
          ];

          await sendHSMV2(toSwapnilPhone, "payment_authorized", body);
          await sendHSMV2(toSauravPhone, "payment_authorized", body);
          await sendHSMV2(toNishaPhone, "payment_authorized", body);
        } else if (reqP.event === "payment.captured") {
          console.log(reqP);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
