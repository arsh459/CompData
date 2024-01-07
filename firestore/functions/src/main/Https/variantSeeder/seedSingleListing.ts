import * as functions from "firebase-functions";
import * as cors from "cors";
import { seedListing } from "./seedPreviousVariants";
import { getDetail_brute } from "../../../models/ListingDetail/Methods";

const corsHandler = cors({ origin: true });
export const seedSingleListingFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // await updateAllListingVariants("stays")
        const result: { listingId: string } = request.body;
        const detail = await getDetail_brute(result.listingId);
        if (detail) {
          await seedListing(
            detail,
            detail.listingType === "stays" ? "stays" : "allListings",
          );
          return response.status(200).send({ status: "success" });
        }

        return response.status(200).send({ status: "Failed creation" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
