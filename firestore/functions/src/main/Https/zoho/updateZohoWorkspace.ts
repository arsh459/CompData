import * as functions from "firebase-functions";
import * as cors from "cors";
import { getZohoData } from "../../../models/zoho/getUtils";
import { getZohoWorkspaces } from "../../../models/zoho/initCals";

// import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";

const corsHandler = cors({ origin: true });
export const updateZohoWorkspaceFunc = functions
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
          status = await getZohoWorkspaces(zoho);
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
