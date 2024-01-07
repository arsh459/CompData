import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { getEventUsers } from "../../../models/Reminders/users/getToRemindUsers";
import { getUserById } from "../../../models/User/Methods";
import { sendHSM } from "../../../models/Conversations/sendHSM";
import { whatsappChannelId } from "../messagebird/constants/identifiers";

const corsHandler = cors({ origin: true });
export const whatsappMessageFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // await handleDayNotification("morning");

        // return response.status(200).send({ status: "Success" });

        const parentEvent = await admin
          .firestore()
          .collection("sbEvents")
          .doc("c0897a45-bf7f-4a93-99df-ae3dd612924d")
          .get();
        if (parentEvent.exists) {
          const parentEventObj = parentEvent.data() as sbEventInterface;

          const childEvents = await getChildEvents(parentEventObj.id);

          for (const childEvent of childEvents) {
            const coach = await getUserById(childEvent.ownerUID);

            const eventUsers = await getEventUsers(childEvent.id);
            for (const user of eventUsers) {
              console.log(`${coach?.name} | ${user.name} | ${user.phone}`);

              // throw new Error("Paused");

              if (
                // user.phone === toSwapnilPhone &&
                user.phone &&
                coach?.name &&
                user.name &&
                coach.userKey
              ) {
                try {
                  await sendHSM(
                    user.phone,
                    whatsappChannelId,
                    "ny_resolution_run",
                    [
                      {
                        default: `${user.name.trim()}`,
                      },
                      {
                        default: `${coach?.name.trim()}`,
                      },
                      {
                        default: `https://${coach.userKey}.socialboat.live/?eventId=${childEvent.id}&nav=program`,
                      },
                      {
                        default: `${coach?.name.trim()}`,
                      },
                    ],
                  );
                } catch (error) {
                  console.log("error", error);
                }
              }
            }
          }
        }

        // console.log("socialboat", coaches.docs.length);
        // for (const user of coaches.docs) {
        // if (user.exists) {
        // const userDoc = user.data() as UserInterface;

        // if (userDoc.name && userDoc.phone) {

        // try {
        //   await sendHSM(
        //     userDoc.phone,
        //     whatsappChannelId,
        //     "live_session_update",
        //     [
        //       {
        //         default: `${userDoc.name.trim()}`,
        //       },
        //       {
        //         default: "*Partha Varanashi*",
        //       },
        //       {
        //         default: "5pm IST",
        //       },
        //       {
        //         default: "https://www.instagram.com/p/CWdBDvcvgps",
        //       },
        //     ],
        //   );
        // } catch (error) {
        //   console.log("error", error);
        // }

        // break;
        // }
        // }
        // }
        // const zoomLink =
        // "https://zoom.us/j/94744780589?pwd=UlJJQUJPaFJjWDJPMkxYUC9HZ294Zz09";

        // console.log("eventObj", eventObj);

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
