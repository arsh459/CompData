import { sevenDaySteps } from "./interface";
import * as admin from "firebase-admin";
import { createNewDoc, StepsDoc } from "../../../models/StepDoc/StepDoc";

export const addStepActivities = async (uid: string, steps: sevenDaySteps) => {
  for (const day of Object.keys(steps)) {
    const remoteDoc = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("steps")
      .where("date", "==", day)
      .get();

    if (remoteDoc.docs.length) {
      const remoteStep = remoteDoc.docs[0].data() as StepsDoc;

      // if inc steps only if more
      if (typeof steps[day] === "number" && steps[day] >= remoteStep.steps) {
        await admin
          .firestore()
          .collection("users")
          .doc(uid)
          .collection("steps")
          .doc(remoteStep.id)
          .update({
            // updatedOn: Date.now(), // dont update updatedOn
            steps: steps[day],
          });
      }
    } else {
      const unix = new Date(`${day} 00:00:00 +5:30`).getTime();
      const newDoc = createNewDoc(uid, steps[day], day, unix);
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("steps")
        .doc(newDoc.id)
        .set(newDoc);
    }
  }
};

export const updateSessionSteps = async (
  uid: string,
  steps: number,
  day: string,
  sessionId: string,
) => {
  // set session steps
  const unix = new Date(`${day} 00:00:00 +5:30`).getTime();
  const newDoc = createNewDoc(uid, steps, day, unix, sessionId);
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("sessionSteps")
    .doc(sessionId)
    .set(newDoc);

  // get steps for session
  const remoteDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("sessionSteps")
    .where("date", "==", day)
    .get();

  let stepsTotal: number = 0;
  for (const sessionStep of remoteDocs.docs) {
    const sessionStepDoc = sessionStep.data() as StepsDoc;
    stepsTotal += sessionStepDoc.steps;
  }

  await addStepActivities(uid, { [day]: stepsTotal });
};
