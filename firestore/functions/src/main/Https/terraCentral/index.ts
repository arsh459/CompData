import * as functions from "firebase-functions";
import * as cors from "cors";
import { TerraWebHookBody } from "./interface";
import {
  getTerraUser,
  removeTerraUser,
  saveTerraUser,
} from "../../../models/User/terra";
import { handleTerraActivities } from "./handleTerraActivityUpdate";
import { callReconcileTerraUser } from "../reconcileTerraUser/callReconcileTerraUser";

const corsHandler = cors({ origin: true });
export const terraCentralFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const result: TerraWebHookBody = request.body;

        // console.log("result", result.type, result.status, result?.data?.length);

        // user auth failed
        if (
          result.type === "auth" &&
          result.status === "error" &&
          result.reference_id
        ) {
          await removeTerraUser(result.reference_id, result.user?.user_id);
        }

        // save terra user
        else if (result.type === "auth" && result.user && result.reference_id) {
          await saveTerraUser(result.reference_id, result.user);

          const terraUser = await getTerraUser(result.user.user_id);
          if (terraUser) await callReconcileTerraUser(terraUser.uid);
        } else if (
          result.type === "activity" &&
          result.data &&
          result.data.length > 0 &&
          result.user
        ) {
          // const formatted = getActivityTime(result.data[0]);

          // const now = getNowISTTime();
          // console.log("formatted", formatted);

          // if (formatted) {
          await handleTerraActivities(result.data, result.user);
          // }
        }

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        functions.logger.error(error);
        return response.status(400).send({ status: "failed" });
      }
    });
  });
