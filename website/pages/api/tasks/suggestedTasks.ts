import { Task } from "@models/Tasks/Task";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { withSentry } from "@sentry/nextjs";

const parseQuery = (query: NextParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    gameId:
      query.gameId && typeof query.gameId === "string" ? query.gameId : "",
    level:
      query.level && typeof query.level === "string"
        ? parseInt(query.level)
        : 0,
    num: query.num && typeof query.num === "string" ? parseInt(query.num) : 8,
  };
};

const suggestedTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      // console.log("req.query", req.query);
      const { uid, gameId, level, num } = parseQuery(req.query);

      if (uid && gameId) {
        const firebase = (await import("@config/adminFire")).default;
        const db = firebase.firestore();

        const now_7 = Date.now() - 7 * 24 * 60 * 60 * 1000;

        // const prevActDocs = await db
        //   .collection("users")
        //   .doc(uid)
        //   .collection("activities")
        //   .where("createdOn", ">=", now_7)
        //   .orderBy("createdOn", "desc")
        //   .limit(100)
        //   .get();

        // const doneTasks: { [taskId: string]: boolean } = {};
        // for (const prevActDoc of prevActDocs.docs) {
        //   const remoteDoc = prevActDoc.data() as Activity;
        //   if (remoteDoc && remoteDoc.taskId && !doneTasks[remoteDoc.taskId]) {
        //     doneTasks[remoteDoc.taskId] = true;
        //   }
        // }

        const taskDocs = await db
          .collection("tasks")
          .where("games", "array-contains", gameId)
          // .orderBy("fitPoints", "desc")
          // .where("level", "<=", level)
          .get();

        // const tasks: Task[] = [];
        const filteredTasks: Task[] = [];
        for (const taskDoc of taskDocs.docs) {
          const remoteDoc = taskDoc.data() as Task;
          const taskLevel = remoteDoc.level ? remoteDoc.level : 0;

          if (taskLevel <= level) {
            const prevActDocs = await db
              .collection("users")
              .doc(uid)
              .collection("activities")
              .where("taskId", "==", remoteDoc.id)
              .where("createdOn", ">=", now_7)
              .limit(1)
              .get();

            if (remoteDoc && prevActDocs.docs.length === 0) {
              filteredTasks.push(remoteDoc);

              // if (filteredTasks.length === num) {
              //   break;
              // }
            }
          }
        }

        // filter
        const sorted = filteredTasks.sort((a, b) =>
          a.fitPoints && b.fitPoints ? b.fitPoints - a.fitPoints : 0
        );

        // console.log("sorted", sorted);

        res.status(200).json({
          tasks: sorted.slice(0, num),
        });
        return;
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: err });
  }
};

export default withSentry(suggestedTasks);
