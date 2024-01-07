import * as functions from "firebase-functions";
import * as cors from "cors";
import { listingThumbnailRequest } from "./interface";
import { getDetail_UNSAFE } from "../../../models/ListingDetail/Methods";
import { createThumbURLForDetail } from "./main";

const corsHandler = cors({ origin: true });
export const addListingThumbnailFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: listingThumbnailRequest = request.body;

        const listingDetail = await getDetail_UNSAFE(
          result.listingType,
          result.listingId
        );

        const thumbnailURL = await createThumbURLForDetail(listingDetail);
        if (thumbnailURL) {
          return response.status(200).send({ link: thumbnailURL });
        }

        return response.status(400).send({ error: "URL not returned" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
