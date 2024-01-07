import * as functions from "firebase-functions";
import * as cors from "cors";
import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";

const corsHandler = cors({ origin: true });
export const fireConvPaidFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, paid, productId, store, date } = request.body as {
          uid: string;
          paid: number;
          productId?: string;
          store?: string;
          date: string;
        };

        const unix = new Date(date).getTime();

        if (uid && paid) console.log(productId, store, unix, addPaidConv);
        // await addPaidConv(uid, paid, "INR", productId, store, unix);

        return response.status(200).send({ status: "success" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
