import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainGoogleFit } from "./mainHandler";
import { getUserById } from "../../../models/User/Methods";
import { fitCheck } from "./fitCheck";

const corsHandler = cors({ origin: true });
export const googleFitFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const resp = request.body as { uid?: string };

        if (resp.uid) {
          const userObj = await getUserById(resp.uid);

          const { googleFit } = fitCheck(userObj);

          // console.log("userObj", userObj?.uid);
          // console.log("googleFit", googleFit);

          if (googleFit) {
            const finalResult = await mainGoogleFit(resp.uid, googleFit);
            if (finalResult) {
              return response.status(200).send(finalResult);
            }
          }
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
