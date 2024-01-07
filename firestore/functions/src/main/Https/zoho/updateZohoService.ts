import * as functions from "firebase-functions";
import * as cors from "cors";
import { getZohoData } from "../../../models/zoho/getUtils";
import { getZohoService } from "../../../models/zoho/initCals";

const corsHandler = cors({ origin: true });
export const updateZohoServiceFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // get access token
        const zoho = await getZohoData();

        console.log("zoho", zoho);

        let status = false;
        // check if token is valid
        if (zoho) {
          status = await getZohoService(zoho);
        }

        if (status) {
          return response.status(200).send({ status: "success" });
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
