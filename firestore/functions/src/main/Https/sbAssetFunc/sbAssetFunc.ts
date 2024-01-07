import * as functions from "firebase-functions";
import * as cors from "cors";
import { muxResponse } from "./interface";
import * as admin from "firebase-admin";
import { Post } from "../../../models/Post/Post";

const corsHandler = cors({ origin: true });
export const sbAssetFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const res = request.body as muxResponse;

        if (
          res.type === "video.asset.ready" &&
          res.data?.live_stream_id &&
          res.data.playback_ids
        ) {
          const posts = await admin
            .firestore()
            .collectionGroup("postsV2")
            .where("muxStreamIds", "array-contains", res.data.live_stream_id)
            .get();

          if (posts.docs.length) {
            for (const post of posts.docs) {
              const postObj = post.data() as Post;

              if (
                postObj.muxPlaybackIds &&
                postObj.muxPlaybackIds[res.data.live_stream_id]
              ) {
                continue;
              }

              await post.ref.update({
                muxPlaybackIds: {
                  ...(postObj.muxPlaybackIds ? postObj.muxPlaybackIds : {}),
                  [res.data.live_stream_id]: res.data.playback_ids,
                },
              });
            }
          }

          // get post with streamId
          // updatePostPlaybackId
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
