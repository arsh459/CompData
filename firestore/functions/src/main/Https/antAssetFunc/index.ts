import * as functions from "firebase-functions";
import * as cors from "cors";
import { antResponse } from "./interface";
// import * as admin from "firebase-admin";
import {
  addMediaToStream,
  createAWSMedia,
  getAntStream,
} from "../../../models/AntStream/AntStream";
// import { Post } from "../../../models/Post/Post";

const corsHandler = cors({ origin: true });
export const antAssetFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const res = request.body as antResponse;
        console.log("res action", res.action);
        console.log("res id", res.id);
        console.log("vodId", res.vodId);
        console.log("vodName", res.vodName);

        if (res.action === "vodReady" && res.vodName && res.id) {
          const antStream = await getAntStream(res.id);

          if (antStream) {
            const media = createAWSMedia(res.vodName);
            await addMediaToStream(res.id, media);
          }
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
