import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { dailyEnergyObj } from "../../../models/dailyKPIs/interface";
import { trackMetricChange } from "../onUserUpdate/updateFPConv";
import { progressUpdateWrapper } from "../../Https/updateRoadmap/main/progressUpdateWrapper";

export const onEnergyAddFunc = functions
  .region("asia-south1")
  // .runWith({ timeoutSeconds: 360 })
  .firestore.document("users/{userId}/dailyEnergy/{weightId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onEnergyAddFunc")) {
        return;
      }

      const energy = change.after.data() as dailyEnergyObj;
      const bf_en = change.before.data() as dailyEnergyObj | undefined;
      const uid = context.params.userId;

      if (
        typeof energy.energy === "number" &&
        energy.energy !== bf_en?.energy
      ) {
        await trackMetricChange("user_energy_log", uid, {
          value: energy.energy,
        });

        await progressUpdateWrapper(uid);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
