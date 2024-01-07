import * as functions from "firebase-functions";
import * as cors from "cors";
import { MixPanelRequest, MixPanelResponse } from "./interface";
import {
  handleCreateCohort,
  handleRemoveMembers,
  handleUpdateMembers,
} from "./handleRequests";

// import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";

const corsHandler = cors({ origin: true });
export const mixpanelSyncFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 300 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      const reqP = request.body as MixPanelRequest;
      try {
        console.log(
          "reqP",
          reqP.action,
          "cohortId: ",
          reqP.parameters.mixpanel_cohort_id,
          "cohort name",
          reqP.parameters.mixpanel_cohort_name,
          "members",
          reqP.parameters.members.length,
          "page_info",
          reqP.parameters.page_info,
          "mixpanel_session_id",
          reqP.parameters.mixpanel_session_id,
        );

        if (reqP.action === "members") {
          console.log("re sync");
          await handleCreateCohort(reqP);
        } else if (reqP.action === "add_members") {
          console.log("add members");
          await handleUpdateMembers(reqP);
        } else if (reqP.action === "remove_members") {
          console.log("remove members");
          await handleRemoveMembers(reqP);
        }

        const resp: MixPanelResponse = {
          action: reqP.action,
          status: "success",
        };

        return response.status(200).send(resp);
      } catch (error) {
        console.log("error", error);
        const resp: MixPanelResponse = {
          action: reqP.action,
          status: "failure",
          error: {
            message: "an error has occured on SB server",
            code: 500,
          },
        };

        return response.status(500).send(resp);
      }
    });
  });
