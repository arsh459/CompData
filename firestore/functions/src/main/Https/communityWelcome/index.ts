import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";

import {
  //   generateParamsForLiveSession,
  generateParamsForLiveSessionV2,
  //   getParamsForWelcomeSession,
  // generateParamsForReminder,
} from "../../FirestoreTriggers/onPaymentCreate/handleWhatsappMessage";
import { sendHSM } from "../../../models/Conversations/sendHSM";
import { whatsappChannelId } from "../messagebird/constants/identifiers";
// import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { getSbEventById } from "../../../models/sbEvent/getUtils";

const corsHandler = cors({ origin: true });
export const addHocWelcomeMessageFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const meeta = "bDFdnxZsP7ZhCoKMYB4EqkkpUV42";
        // const eventName = "Meeta's free Yoga community";
        const link =
          "https://us02web.zoom.us/j/7205735459?pwd=c3I5U2NuS2JLbXhPZVg1cUUrVG5TZz09";

        const meetasYoga = "b31daf4b-f466-4a76-aada-adcdd45c3cca";
        const eventIdToUse = meetasYoga;

        // const userUID = "VtwchE1123RMdI8DVm7IXEPX6dz2";
        // const sanju = "etyofHWtswW9zL7OAM5oykUWp612";
        // const sanjuDemo = "7843de86-7f52-404d-ba38-52db392fbde4";
        // const eventIdToUse = "9e477cb3-07ad-4a18-bfd3-b6f933a8a015";
        // const mainsId = "eb13f7c9-f003-4211-99ec-928ab6b56d89";
        // const answerWriting = "9e477cb3-07ad-4a18-bfd3-b6f933a8a015";
        // const eventIdToUse = answerWriting;
        // const eventIdToUse = "e9f958d0-c6e6-4132-a16d-446d28ec40b9";
        const templateId = "live_session";
        // const welcomeTemplateId = "welcome_message";
        const templateToUse = templateId;
        // const zoomLink =
        // "https://zoom.us/j/94744780589?pwd=UlJJQUJPaFJjWDJPMkxYUC9HZ294Zz09";

        const usersSigned = await admin
          .firestore()
          .collection("users")
          .where("enrolledCommunities", "array-contains", meeta)
          .get();

        const eventObj = await getSbEventById(eventIdToUse);

        // const host = await getUserById(meeta);

        // console.log("eventObj", eventObj);

        // if (eventObj) {
        for (const registration of usersSigned.docs) {
          const signedUpUser = registration.data() as UserInterface;
          // console.log("regis", regis.eventId);

          // if (regis.eventId === eventObj.id && regis.cohortId) {
          //   const cohort = await getCohortById(regis.eventId, regis.cohortId);

          // console.log("cohort", cohort);

          if (signedUpUser.phone && eventObj) {
            // const params = getParamsForWelcomeSession(
            //   signedUpUser.name ? signedUpUser.name : "there",
            //   eventName,
            //   host?.name ? host.name : "Creator",
            //   host?.name ? host.name : "Creator",
            //   link,
            // );

            const params = generateParamsForLiveSessionV2(
              signedUpUser.name ? signedUpUser.name : signedUpUser.email,
              "Meeta",
              "Mon 8Nov 5pm IST",
              "Demo session",
              link,
            );

            // console.log("params", params);

            await sendHSM(
              signedUpUser.phone,
              //   "+919811800046",
              whatsappChannelId,
              templateToUse,
              params,
            );

            console.log(
              "guest",
              signedUpUser.phone,
              signedUpUser.name,
              // params,
            );
          }

          //   break;

          // }

          // console.log("params", [
          //   ...params.slice(0, 3),
          //   {
          //     default:
          //       "https://us02web.zoom.us/j/84933154989?pwd=MFpFeVBDNFBCQWxYNUljY0ZvNW82Zz09",
          //   },
          // ]);

          // console.log("params", params);

          // if (regis.phone === "+919920899316") {
          // console.log("regis sent", regis.email);

          // }

          // break;

          // break;
        }
        // }

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
