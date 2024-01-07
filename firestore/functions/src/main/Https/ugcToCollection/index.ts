import * as functions from "firebase-functions";
import * as cors from "cors";
import { ugcToCollectionRequest } from "./interface";
import { getUserById } from "../../../models/User/Methods";
import { createUGCToCollection } from "./conversionUtils";

const corsHandler = cors({ origin: true });
export const ugcToCollectionFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: ugcToCollectionRequest = request.body;
        if (result.uid) {
          const user = await getUserById(result.uid);
          if (user) {
            const collectionId = await createUGCToCollection(
              result.ugcListingIds,
              user,
              result.collectionName,
              result.collectionTagline,
              result.collectionDescription,
            );

            return response
              .status(200)
              .send({ status: "success", collectionId: collectionId });
          }

          return response
            .status(200)
            .send({ status: "success", collectionId: "" });
        }

        return response.status(200).send({ status: "Failed creation" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
