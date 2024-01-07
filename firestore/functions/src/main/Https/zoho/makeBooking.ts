import * as functions from "firebase-functions";
import * as cors from "cors";
import { getZohoData } from "../../../models/zoho/getUtils";
import { createNewBooking } from "./booking/main";
import { CategoryTypes } from "../../../models/Appointments/interface";
import { updateAppointmentInDb } from "./booking/saveAppointment";
import { zohoBookingSuccessResponse } from "../../../models/zoho/bookingCall";
import { getUserById } from "../../../models/User/Methods";
import { roundRobinMain } from "./booking/roundRobin";

// import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";

const corsHandler = cors({ origin: true });
export const makeBookingFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { staffId, time, uid, appType } = request.body as {
          staffId?: string;
          time?: number;
          uid?: string;
          appType?: CategoryTypes;
        };

        if (!staffId || !time || !uid) {
          return response.status(400).send({ error: "Invalid request" });
        }

        if (time < Date.now()) {
          return response.status(400).send({ error: "Time in past" });
        }

        // get access token
        const zoho = await getZohoData();

        console.log("zoho", zoho);

        const now = Date.now();
        const user = await getUserById(uid);

        // check if token is valid
        if (user && zoho?.expiresAt && zoho?.expiresAt > now) {
          const { updatedStaffId, agentId } = await roundRobinMain(
            zoho,
            time,
            staffId,
          );

          const status = await createNewBooking(
            zoho,
            updatedStaffId,
            time,
            user,
          );

          // console.log("status", status);

          if (status?.response?.returnvalue?.status === "failure") {
            return response.status(400).send({
              error: "failure",
              message: status.response.returnvalue.message,
            });
          } else if (status?.response?.returnvalue?.status === "upcoming") {
            // update appointment
            const id = await updateAppointmentInDb(
              user,
              status as zohoBookingSuccessResponse,
              appType ? appType : "sales",
              agentId,
            );

            return response
              .status(200)
              .send({ status: "success", appointmentId: id });
          }
        }

        return response.status(400).send({ error: "Access token expired" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
