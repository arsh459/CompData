import * as functions from "firebase-functions";
import * as cors from "cors";
import { listingLinkRequest } from "./interface";
import { createListingDeepLink } from "../../../models/ListingDetail/deeplink";
import { getDetail_UNSAFE } from "../../../models/ListingDetail/Methods";
import { createThumbURLForDetail } from "../addListingThmbnail/main";

const corsHandler = cors({ origin: true });
export const addListingLinkFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: listingLinkRequest = request.body;

        // if image URI is absent create on demand
        let uri: string = result.imageURI;
        const detail = await getDetail_UNSAFE(
          result.listingType,
          result.listingId,
        );
        if (!uri && detail) {
          try {
            const thumbnail = await createThumbURLForDetail(detail);
            uri = thumbnail ? thumbnail : "";
          } catch (error) {
            console.log("thumbnail creation error");
            console.log(error);
          }
        }

        const shortLink = await createListingDeepLink(
          result.listingId,
          result.listingType,
          result.listingName,
          result.listingDescription,
          uri,
          detail?.listingKey,
          result.uid,
          result.userType,
          result.variantId,
          result.qty,
          result.startDate,
          result.endDate,
        );

        if (shortLink) {
          return response.status(200).send({ link: shortLink });
        } else {
          return response.status(400).send({ error: "URL not returned" });
        }
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
