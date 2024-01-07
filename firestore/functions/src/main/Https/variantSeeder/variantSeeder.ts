import * as functions from "firebase-functions";
import * as cors from "cors";
import { seedAllListings } from "./seedPreviousVariants";

const corsHandler = cors({ origin: true });
export const variantSeederFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // await updateAllListingVariants("stays");
        await seedAllListings("allListings");
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
