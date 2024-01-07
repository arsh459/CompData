import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  getPinnedCohort,
  getSbEventById,
} from "../../../models/sbEvent/getUtils";
import { paymentTest } from "./interface";
// import { getUserById } from "../../../models/User/Methods";
// import { getPaymentObj } from "../../../models/sbPayment/getPayment";
import { handleWhatsappMessage } from "../../FirestoreTriggers/onPaymentCreate/handleWhatsappMessage";
import { getUserById } from "../../../models/User/Methods";
// import { paymentTest } from "./interface";
// import { getUserById } from "../../../models/User/Methods";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
// import { getPaymentObj } from "../../../models/sbPayment/getPayment";
// import { handleWhatsappMessage } from "../../FirestoreTriggers/onPaymentCreate/handleWhatsappMessage";

// import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const onPaymentTestFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result = request.body as paymentTest;

        const user = await getUserById(result.uid);
        const eventObj = await getSbEventById(result.eventId);
        // const payObj = await getPaymentObj(result.uid, result.paymentId);

        // // functions.logger.log("user", user, eventObj, result.paymentId);
        // // console.log("user", user);
        // console.log("event", eventObj);
        // // console.log("payObj", payObj);

        if (eventObj) {
          const pinCohort = await getPinnedCohort(eventObj.id);
          await handleWhatsappMessage(
            "rahuljainnsit9@gmail.com",
            "R",
            "299",
            "+919811800046",
            eventObj,
            user,
            pinCohort,
            "student",
          );
        }

        // functions.logger.log("message", result.message);
        // functions.logger.log("conversation", result.conversation);

        // only for messages sent via user

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
