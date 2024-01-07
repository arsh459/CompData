import { getQueue } from "../../../../models/LeaderboardUpdateTask/get";
import * as admin from "firebase-admin";
import { mainUserRankFunc } from "../updateUserRankTest/main";
import { onSuccessTrasnaction } from "../../../FirestoreTriggers/onLeaderboardTaskCreate/main";
import { markTaskFailed } from "../../../../models/LeaderboardUpdateTask/create";

export const mainTaskQueue = async (): Promise<boolean> => {
  // get all tasks
  const tasks = await getQueue();
  console.log("TASKS", tasks.length);

  throw new Error("HIII");
  let i: number = 1;
  for (const task of tasks) {
    try {
      console.log();
      console.log();
      console.log();
      console.log(
        "PROCESSING",
        `${i}/${tasks.length} `,
        task.uid,
        ` ${task.fp}FP`,
        task.incTime,
        task.timestamp,
        task.status,
        `Lvl: ${task.levelId}`,
      );

      const updatedTime = task.timestamp as admin.firestore.Timestamp;
      const requestedAt = updatedTime.toMillis();

      const status = await admin
        .firestore()
        .runTransaction(async (transaction) => {
          const onSuccess = () => onSuccessTrasnaction(transaction, task.id);
          return await mainUserRankFunc(
            transaction,
            task.uid,
            task.fp,
            task.incTime ? task.incTime : requestedAt,
            // task.levelId,
            false,
            onSuccess,
          );
        });
      console.log("TASK STATUS", status);
      i++;

      if (!status) {
        console.log(
          "FAILED",
          `${i}/${tasks.length} `,
          task.uid,
          ` ${task.fp}FP`,
          task.timestamp,
          task.status,
          `Lvl: ${task.levelId}`,
        );

        await markTaskFailed(task.id);

        continue;
        // return false;
      }
    } catch (e) {
      console.log(
        "FAILED",
        `${i}/${tasks.length} `,
        task.uid,
        ` ${task.fp}FP`,
        task.timestamp,
        task.status,
        `Lvl: ${task.levelId}`,
      );

      // await sendHSMV2(toRahulPhone, "new_tech_issue", [`taskQueue:${task.id}`]);
      console.log("error", e);

      continue;
    }
  }

  return true;
};
