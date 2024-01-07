import * as functions from "firebase-functions";
import * as cors from "cors";

// import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";

interface zapierCancelInterface {
  appointment_status: "cancel";
  booking_id: string;
  customer_name: string;
  service_id: string;
  staff_id: string;
}

const corsHandler = cors({ origin: true });
export const zohoCancelFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // get access token
        const requestData = request.body as zapierCancelInterface; //as any;
        console.log("requestData", requestData);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
