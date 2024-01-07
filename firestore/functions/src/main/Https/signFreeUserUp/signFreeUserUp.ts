import * as functions from "firebase-functions";
import * as cors from "cors";
import { userDetailsInterface } from "./interface";
import {
  createNewRegistration,
  saveRegistration,
} from "../../../models/Registration/createRegistration";
import {
  getCohortById,
  getSbEventById,
} from "../../../models/sbEvent/getUtils";
// import { handleRegistrationEmail } from "../../FirestoreTriggers/onPaymentCreate/handleRegistrationEmail";
// import { handleWhatsappMessage } from "../../FirestoreTriggers/onPaymentCreate/handleWhatsappMessage";
import { getUserById } from "../../../models/User/Methods";
import { handlePaymentUpdate } from "../../FirestoreTriggers/onPaymentCreate/handlePaymentUpdate";
import {
  handleEventRegistration,
  handleUserEnrollment,
} from "../../../models/sbEvent/handleEvent";
// import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const signFreeUserUpFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result = request.body as userDetailsInterface;
        // console.log("result", result);

        if (result.eventId) {
          const eventObj = await getSbEventById(result.eventId);

          if (eventObj) {
            // const pinnedCohort = await getPinnedCohort(eventObj.id);

            const pinnedCohort = await getCohortById(
              eventObj.id,
              result.cohortId,
            );

            const newRegistration = createNewRegistration(
              "free-registration",
              "no-order",
              `${result.phone}`,
              result.eventId,
              "invite",
              result.email,
              result.name,
              eventObj.name,
              eventObj.cost ? `${eventObj.cost}` : "",
              eventObj.currency,
              result.inviteCode,
              pinnedCohort?.id,
              result.userUid,
            );

            await saveRegistration(newRegistration, result.uid);

            // await handleRegistrationEmail(
            //   eventObj,
            //   result.email,
            //   `${eventObj.cost}`,
            //   eventObj.currency,
            //   `${result.phone}`,
            // );

            await handleEventRegistration(eventObj.id, pinnedCohort);

            // add customer enrollment
            if (result.userUid) {
              await handleUserEnrollment(
                result.userUid,
                result.uid,
                eventObj.id,
                result.cohortId,
              );
            }

            const user = await getUserById(result.uid);

            if (user) {
              // await handleWhatsappMessage(
              //   result.email,
              //   eventObj.currency,
              //   `${eventObj.cost}`,
              //   `${result.phone}`,
              //   eventObj,
              //   user,
              //   pinnedCohort,
              //   result.name,
              // );

              // update students
              await handlePaymentUpdate(eventObj.id, user.uid, 0);
            }

            return response
              .status(200)
              .send({ status: "success", registrationId: newRegistration.id });
          }
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
