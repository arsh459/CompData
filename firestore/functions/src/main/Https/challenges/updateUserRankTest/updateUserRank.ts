import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainUserRankFunc } from "./main";
import * as admin from "firebase-admin";
import { getLevelByNumber } from "../../../../models/Level/getRelevantLevel";
import { getUserRankV2ByUID } from "../../../../models/Rounds/getUserRankV2";

const corsHandler = cors({ origin: true });

export const updateUserRankTestFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, fpDelta } = request.body as {
          uid?: string;
          fpDelta?: number;
        };

        if (uid && fpDelta) {
          const userRank = await getUserRankV2ByUID(uid);
          if (!userRank) {
            response.status(400).send({
              status: "failed",
              reason: "user rank not present",
            });
            return;
          }

          const usrLVL = userRank.lvl;
          const levelObj = await getLevelByNumber(usrLVL);

          if (!levelObj) {
            response.status(400).send({
              status: "failed",
              reason: "user level not present",
            });
            return;
          }

          const status = await admin
            .firestore()
            .runTransaction(async (transaction) => {
              return await mainUserRankFunc(
                transaction,
                uid,
                fpDelta,
                Date.now(),
                // levelObj?.id,
                true,
                async () => {
                  console.log("testing");
                },
              );
            });

          if (status) {
            response.status(200).send({ status: "success" });
            return;
          } else {
            response.status(400).send({
              status: "failed",
              reason: "user not present or implementation error",
            });
            return;
          }
        } else {
          return response
            .status(400)
            .send({ status: "failed", reason: "uid or fpDelta not present" });
        }

        // console.log("request");
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
