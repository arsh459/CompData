import * as functions from "firebase-functions";
import * as cors from "cors";
import { appointmentGetterFunc } from "./main";

const corsHandler = cors({ origin: true });
export const getAllAppointmentsFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        await appointmentGetterFunc();
        response.status(200).send({ status: "success" });
        return;
      } catch (error) {
        console.log(error);
        return response.status(500).send({
          error: "Internal Server Error",
          reason: "failed in main function",
        });
      }
    });
  });
