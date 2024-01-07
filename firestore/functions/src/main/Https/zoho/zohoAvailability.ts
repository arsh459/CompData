import * as functions from "firebase-functions";
import * as cors from "cors";
import { getZohoData } from "../../../models/zoho/getUtils";
import { fetchAvailabilityMain } from "./availability/main";
// import { refreshZohoTokenRequest } from "../../../models/zoho/refreshToken";

// import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";

const corsHandler = cors({ origin: true });
export const zohoAvailabilityFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { end, start } = request.body as {
          start?: number;
          end?: number;
        };

        if (!start || !end) {
          return response.status(400).send({ error: "Invalid request" });
        }

        // get access token
        const zoho = await getZohoData();

        console.log("zoho", zoho);

        const now = Date.now();

        // check if token is valid
        if (zoho?.expiresAt && zoho?.expiresAt > now) {
          const slotAvailability = await fetchAvailabilityMain(
            zoho,
            start,
            end,
          );

          // console.log("slot", slotAvailability);

          // // if token is about to expire
          // if (zoho?.expiresAt && now + 10 * 60 * 1000 > zoho.expiresAt) {
          //   await refreshZohoTokenRequest(zoho);
          // }

          return response
            .status(200)
            .send({ status: "success", ...slotAvailability });
        }

        return response.status(400).send({ error: "Token expired" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
