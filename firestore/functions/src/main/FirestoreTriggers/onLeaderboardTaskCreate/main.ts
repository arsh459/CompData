import * as admin from "firebase-admin";

import { mainUserRankFunc } from "../../Https/challenges/updateUserRankTest/main";
import { LeaderboardUpdateTask } from "../../../models/LeaderboardUpdateTask/LeaderboardUpdateTask";
import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
import { toRahulPhone } from "../../../constants/email/contacts";
import { markTaskFailed } from "../../../models/LeaderboardUpdateTask/create";

export const leaderboardQueueHandler = async () => {
  await admin.firestore().runTransaction(async (transaction) => {
    const taskRef = admin.firestore().collection("taskQueue");

    const query = taskRef
      .where("status", "==", "pending")
      .orderBy("timestamp", "asc")
      .limit(1);

    const pendingSnapshot = await transaction.get(query);
    console.log("PENDING TASKS:", pendingSnapshot.docs.length);

    if (!pendingSnapshot.empty) {
      const taskDoc = pendingSnapshot.docs[0];
      const taskData = taskDoc.data() as LeaderboardUpdateTask;

      console.log(
        "PROCESSING",
        taskData.uid,
        ` ${taskData.fp}FP`,
        taskData.timestamp,
        taskData.incTime, // inc time
        taskData.status,
        taskData.levelId,
      );

      const updatedTime = taskData.timestamp as admin.firestore.Timestamp;
      const requestedAt = updatedTime.toMillis();

      const status = await mainUserRankFunc(
        transaction,
        taskData.uid,
        taskData.fp,
        taskData.incTime ? taskData.incTime : requestedAt,
        // taskData.levelId,
        false,
        () => onSuccessTrasnaction(transaction, taskData.id),
      );

      console.log("FINAL STATUS", status);

      if (!status) {
        await markTaskFailed(taskData.id);
        await sendHSMV2(toRahulPhone, "new_tech_issue", [
          `taskQueue:${taskData.id}`,
        ]);
      }
    }
  });
};

export const onSuccessTrasnaction = async (
  transaction: admin.firestore.Transaction,
  id: string,
) => {
  // update transaction
  transaction.update(admin.firestore().collection("taskQueue").doc(id), {
    status: "completed",
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });
};
