import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { Activity } from "../../../models/Activity/Activity";

const corsHandler = cors({ origin: true });

export const userActivitySearchFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
        };

        if (uid) {
          const actDocs = await admin
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("activities")
            .where("calories", ">", 299)
            .get();

          console.log("all docs", actDocs.docs.length);

          let i: number = 0;
          const acts: Activity[] = [];
          for (const actDoc of actDocs.docs) {
            const act = actDoc.data() as Activity;

            i++;
            let relevant: boolean = false;
            if (act.calories) {
              if (act.source === "nutrition") {
                act.canFetch = true;
                //   act.fetchSource = "nutrition";
                relevant = true;
              } else if (act.source === "steps") {
                act.canFetch = true;
                relevant = true;
                //   act.fetchSource = "steps";
              } else if (act.source === "task") {
                act.canFetch = true;
                relevant = true;
                act.stepsActive = act.stepsActive ? true : false;
                //   act.fetchSource = "workoutANDSteps";
              } else {
                console.log("source", act.source);
              }
            }

            if (relevant && act.id && act.authorUID) {
              console.log(
                i,
                act.activityName,
                act.calories,
                act.canFetch,
                //   act.fetchSource,
              );
              await admin
                .firestore()
                .collection("users")
                .doc(act.authorUID)
                .collection("activities")
                .doc(act.id)
                .update({
                  canFetch: true,
                  ...(act.source === "task"
                    ? {
                        stepsActive: act.stepsActive ? true : false,
                      }
                    : {}),
                });
              acts.push(act);
            }
          }
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
