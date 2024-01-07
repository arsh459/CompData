import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainFBEvent } from "./main";
import { FBEventInterfaceRequest } from "./interface";

const corsHandler = cors({ origin: true });
export const addFBEventFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const data = request.body as FBEventInterfaceRequest;
        console.log("NEW EVENT", data.event_name, data.event_id);

        if (data.event_name) {
          const { status, reason } = await mainFBEvent(
            data,
            data.test_event_code,
          );

          if (status) {
            return response.status(200).send({ status: "success" });
          } else {
            return response.status(500).send({
              error: "Internal Server Error",
              reason: reason ? reason : "failed in main function",
            });
          }
        }

        return response
          .status(400)
          .send({ error: "failed", reason: "incorrect data" });
      } catch (error) {
        console.log(error);
        return response.status(500).send({
          error: "Internal Server Error",
          reason: "failed in main function",
        });
      }
    });
  });
