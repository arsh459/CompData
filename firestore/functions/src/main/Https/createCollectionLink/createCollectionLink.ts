import * as functions from "firebase-functions";
import * as cors from "cors";
import { collectionLinkRequest } from "./interface";
import { getCollectionByCollectionId } from "../../../models/Collection/Methods/getUtils";
import { createThumbnailForCollection } from "./thumbnailCreation";
import { createCollectionDynamicLink } from "../../../models/Collection/Methods/deeplink";

const corsHandler = cors({ origin: true });
export const createCollectionLinkFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: collectionLinkRequest = request.body;

        // if image URI is absent create on demand
        let uri: string = result.imageURI;
        const collectionFromRemote = await getCollectionByCollectionId(
          result.collectionId,
        );
        if (!uri) {
          try {
            const thumbnail = await createThumbnailForCollection(
              collectionFromRemote,
              "collection",
            );
            uri = thumbnail ? thumbnail : "";
          } catch (error) {
            console.log("thumbnail creation error");
            console.log(error);
          }
        }

        const shortLink = await createCollectionDynamicLink(
          result.collectionId,
          collectionFromRemote?.collectionKey,
          result.collectionName,
          result.collectionTagline,
          uri,
          result.uid,
          result.userType,
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
