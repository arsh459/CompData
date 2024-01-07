import { Activity } from "../../../models/Activity/Activity";
import { ActivityQueueItem } from "../../../models/ActivityQueue/ActivityQueue";
import { createActivityTaskObject } from "../../../models/ActivityQueue/createUtils";
import { writeOne } from "../../../utils/firestore/fetchOne";
import { getDayStartIST } from "../../PubSub/activityTracker/utils";

export const handleTaskQueue = async (
  uid: string,
  activityId: string,
  now: Activity,
  pre?: Activity,
) => {
  const nCals = now.calories ? now.calories : 0;
  const pCals = pre?.calories ? pre.calories : 0;

  const nowActUnix = now.createdOn ? getDayStartIST(now.createdOn) : null;
  const prevDateUnix = pre?.createdOn ? getDayStartIST(pre.createdOn) : null;

  const queue: ActivityQueueItem[] = [];
  // dates are present
  if (nowActUnix && now.games?.length) {
    // date change
    if (prevDateUnix && nowActUnix !== prevDateUnix) {
      queue.push(
        createActivityTaskObject(
          activityId,
          uid,
          nCals,
          0,
          nowActUnix,
          now.games[0],
        ),
      );

      queue.push(
        createActivityTaskObject(
          activityId,
          uid,
          0,
          pCals,
          prevDateUnix,
          now.games[0],
        ),
      );
    }
    // cal change on same day
    else if (nCals !== pCals && nowActUnix === prevDateUnix) {
      queue.push(
        createActivityTaskObject(
          activityId,
          uid,
          nCals,
          pCals,
          nowActUnix,
          now.games[0],
        ),
      );
    }
    // cal change with no previous date
    else if (!prevDateUnix && nCals) {
      queue.push(
        createActivityTaskObject(
          activityId,
          uid,
          nCals,
          0,
          nowActUnix,
          now.games[0],
        ),
      );
    }
  }

  for (const item of queue) {
    await writeOne("queue", item.id, item);
  }

  // await addToGCPQueue(queue);
};

// export const addToGCPQueue = async (queue: ActivityQueueItem[]) => {
//   const project: string = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;
//   const location = "asia-south1";
//   const gcpQueue = "activity-leaderboard";

//   const tasksClient = new CloudTasksClient();
//   const queuePath: string = tasksClient.queuePath(project, location, gcpQueue);
//   const url = `https://${location}-${project}.cloudfunctions.net/refreshUserLeaderboardInc`;

//   for (const item of queue) {
//     const payload = item;

//     const task = {
//       httpRequest: {
//         httpMethod: "POST",
//         url,
//         body: Buffer.from(JSON.stringify(payload)).toString("base64"),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     };

//     await tasksClient.createTask({
//       parent: queuePath,
//       task,
//     });
//   }
// };
