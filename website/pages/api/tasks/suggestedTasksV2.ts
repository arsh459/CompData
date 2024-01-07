import { Task } from "@models/Tasks/Task";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { withSentry } from "@sentry/nextjs";
// import { checkForAvailStatus } from "@hooks/tasks/access/utils";

const parseQuery = (query: NextParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    gameIds:
      query[`gameIds[]`] && typeof query[`gameIds[]`] === "string"
        ? [query[`gameIds[]`]]
        : query[`gameIds[]`] && typeof query[`gameIds[]`] === "object"
        ? query[`gameIds[]`]
        : [],
    level:
      query.level && typeof query.level === "string"
        ? parseInt(query.level)
        : 0,
    num: query.num && typeof query.num === "string" ? parseInt(query.num) : 8,
  };
};

const suggestedTasksV2 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      // console.log("req.query", req.query);
      const { uid, gameIds, level, num } = parseQuery(req.query);

      // console.log("gameIds", gameIds);

      if (uid && gameIds) {
        const firebase = (await import("@config/adminFire")).default;
        const db = firebase.firestore();

        const now_7 = Date.now() - 7 * 24 * 60 * 60 * 1000;

        const fetchedTasks: { [taskId: string]: boolean } = {};
        const filteredTasks: Task[] = [];
        for (const gameId of gameIds) {
          const taskDocs = await db
            .collection("tasks")
            .where("games", "array-contains", gameId)
            // .orderBy("fitPoints", "desc")
            .where("level", "<=", level)
            .get();

          // const userRankObj = await db.collection('sbEvents').doc(gameId).collection('userRanks').doc('')

          for (const taskDoc of taskDocs.docs) {
            const remoteDoc = taskDoc.data() as Task;
            const taskLevel = remoteDoc.level ? remoteDoc.level : 0;

            // checkForAvailStatus(remoteDoc, level)

            if (taskLevel <= level) {
              const prevActDocs = await db
                .collection("users")
                .doc(uid)
                .collection("activities")
                .where("taskId", "==", remoteDoc.id)
                .where("createdOn", ">=", now_7)
                .limit(1)
                .get();

              if (
                remoteDoc &&
                prevActDocs.docs.length === 0 &&
                !fetchedTasks[remoteDoc.id] &&
                ((remoteDoc.onLevelOnly && remoteDoc.level === level) ||
                  !remoteDoc.onLevelOnly) &&
                !remoteDoc.finaleTask
              ) {
                filteredTasks.push(remoteDoc);
                fetchedTasks[remoteDoc.id] = true;

                // if (filteredTasks.length === num) {
                //   break;
                // }
              }
            }
          }
        }

        // const tasks: Task[] = [];

        // filter
        const sorted = filteredTasks.sort((a, b) =>
          a.fitPoints && b.fitPoints ? a.fitPoints - b.fitPoints : 0
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

export default withSentry(suggestedTasksV2);
