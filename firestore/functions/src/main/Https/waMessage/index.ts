import * as functions from "firebase-functions";
import * as cors from "cors";
// import { sendToPhoneList } from "./sendUtils";
// import { internationalUsers_may_5 } from "./constants";
// import { sendToPhoneList } from "./sendUtils";
// import { greeshaSignups } from "./cohortCreator";
// import { internationalGreeshaActive } from "./constants";
// import { greeshaSignups } from "./cohortCreator";
// import { slot_invite_june_22 } from "./constants";
import { getCohortMembers } from "../mixpanel/getUtils";
import { handleMixpanelCohortMessage } from "./handleMixpanelCohortMessage";
// import { sendToPhoneList } from "./sendUtils";

export type variableNames = "name";
export const defaultValues: Record<variableNames, string> = { name: "there" };

const corsHandler = cors({ origin: true });
export const waMessageAdHocFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // const allUserObjs = await admin
        //   .firestore()
        //   .collection("users")
        //   .where("unsubscribe", "==", true)
        //   .get();
        // let i: number = 0;
        // for (const doc of allUserObjs.docs) {
        //   const user = doc.data() as UserInterface;
        //   console.log(i, " | ", user.uid, " | ", user.name, " | ", user.phone);
        //   i++;
        // }

        // throw new Error("HI");

        const { cohortId, variables, test, templateId, image, num, numEnd } =
          request.body as {
            cohortId?: string;
            variables?: variableNames[];
            test?: boolean;
            templateId?: string;
            image?: string;
            num?: number;
            numEnd?: number;
          };

        if (
          cohortId &&
          templateId &&
          typeof num === "number" &&
          typeof numEnd === "number"
        ) {
          const members = await getCohortMembers(cohortId);

          await handleMixpanelCohortMessage(
            cohortId,
            members,
            // startIndex,
            test ? true : false,
            templateId,
            image,
            num,
            numEnd,
            variables,
          );
        } else {
          response.status(400).send({
            error: "Invalid request",
            reason: "input data is not present",
          });

          return;
        }

        console.log("request completed");
        // const greeshaSignup = await greeshaSignups();

        // // const filteredUsers = filter1FP(greeshaSignup);
        // const filteredUsers = filter0FP(greeshaSignup);

        // const date = new Date();
        // const dateToUse = new Date(date.getFullYear(), 2, 1).getTime();

        // const users = await signupAfterDate(dateToUse);

        // console.log("users", users.length);

        // const usersUnpaid = await filterNeverPaidUsers(filteredUsers);

        // await sendWAToUserList(
        //   greeshaSignup,
        //   "greesha_breathing_2",
        //   false,
        //   1005,
        //   "https://sbusermedia.s3.ap-south-1.amazonaws.com/notifications/whatsapp+(6)+(1).jpg",
        // );

        // console.log("hi I am here");
        // else if (typeof num === "number" && numEnd && templateId && image) {
        // await sendToPhoneList(
        //   diet_challenge,
        //   templateId,
        //   test ? true : false,
        //   num,
        //   image,
        //   numEnd,
        //   emptyArray,
        // );
        // }

        response.status(200).send({ status: "success" });
        return;
      } catch (error) {
        console.log(error);
        response.status(400).send({ error: "Invalid request" });
        return;
      }
    });
  });
