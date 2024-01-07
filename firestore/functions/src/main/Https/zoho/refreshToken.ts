import * as functions from "firebase-functions";
import * as cors from "cors";
import { getZohoData } from "../../../models/zoho/getUtils";
import { refreshZohoTokenRequest } from "../../../models/zoho/refreshToken";

// import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";

const corsHandler = cors({ origin: true });
export const refreshZohoTokenFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // get access token
        const zoho = await getZohoData();
        console.log("zoho", zoho);
        if (zoho) {
          await refreshZohoTokenRequest(zoho);
          return response.status(200).send({ status: "success" });
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
