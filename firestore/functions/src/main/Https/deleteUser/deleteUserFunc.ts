import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
// import { Post } from "../../../models/Post/Post";
// import { firestore } from "firebase-admin";
// import { handleExpiringConv } from "../../PubSub/messagebird/endOfChat/handleExpiringConversation";
// import { ConversationInterface } from "../../../models/Conversations/Conversation";
// import { getContact } from "../../../models/Conversations/sendUtils";
// import { sendMessageToConversation } from "../../../models/Conversations/sendUtils";
// import {
//   //   toRahulPhone,
//   toSwapnilPhone,
//   //   toRahulPhone,
//   //   toSwapnilPhone,
//   //   toSwapnilPhone,
// } from "../../../constants/email/contacts";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";
// import { handleNewConversation } from "./handleNewConversation";
// import { newConversationMessageBird } from "../interface";
// import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const deleteUserFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      const body = request.body as { uid?: string };

      try {
        if (body.uid) {
          const batch = admin.firestore().batch();
          // batch.delete(admin.firestore().collection("users").doc(body.uid));
          batch.delete(
            admin
              .firestore()
              .collection("sbEvents")
              .doc(TEAM_ALPHABET_GAME)
              .collection("userRanks")
              .doc(`rank-${body.uid}`),
          );
          batch.delete(
            admin
              .firestore()
              .collection("sbEvents")
              .doc(TEAM_ALPHABET_GAME)
              .collection("coachRanks")
              .doc(`rank-${body.uid}`),
          );
          batch.delete(
            admin
              .firestore()
              .collection("leaderBoard")
              .doc(`leader-${body.uid}`),
          );

          const userPosts = await admin
            .firestore()
            .collectionGroup("postsV2")
            .where("creatorId", "==", body.uid)
            .get();

          // delete user posts
          for (const userPost of userPosts.docs) {
            // const post = userPost.data() as Post;
            // console.log("userPost", post.id);
            batch.delete(userPost.ref);
          }

          await batch.commit();

          await admin.auth().deleteUser(body.uid);

          return response.status(200).send({ status: "success" });
        } else {
          return response.status(400).send({ error: "Invalid request" });
        }
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
