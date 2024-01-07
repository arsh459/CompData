import * as functions from "firebase-functions";
import * as cors from "cors";
import { refreshPrizesHandlerV2 } from "../refreshPrizes/refreshPrizesHandlerV2";
import { FAT_BURNER_GAME } from "../../../constants/challenge";
// import { TerraWebHookBody } from "./interface";

const corsHandler = cors({ origin: true });
export const rewardPostFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // refresh prizes
        await refreshPrizesHandlerV2(FAT_BURNER_GAME);

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ status: "failed" });
      }
    });
  });
