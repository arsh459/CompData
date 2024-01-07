import { Task } from "@models/Tasks/Task";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { withSentry } from "@sentry/nextjs";
import { EventInterface } from "@models/Event/Event";
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
    // day: query.day && typeof query.day === "string" ? parseInt(query.day) : 0,
    // level:
    //   query.level && typeof query.level === "string"
    //     ? parseInt(query.level)
    //     : 0,
    num: query.num && typeof query.num === "string" ? parseInt(query.num) : 8,
  };
};

const suggestedTasksV3 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      // console.log("req.query", req.query);
      const { uid, gameIds, num } = parseQuery(req.query);

      //   console.log("gameIds", gameIds, uid, num);

      if (uid && gameIds) {
        const firebase = (await import("@config/adminFire")).default;
        const db = firebase.firestore();

        const now_1 = Date.now() - 1 * 24 * 60 * 60 * 1000;

        const fetchedTasks: { [taskId: string]: boolean } = {};
        const filteredTasks: Task[] = [];

        for (const gameId of gameIds) {
          const game = await db.collection("sbEvents").doc(gameId).get();
          if (game.exists) {
            const gameObj = game.data() as EventInterface;

            const starts = gameObj.configuration?.starts;
            const sprints = gameObj.configuration?.sprints;
            const rounds = gameObj.configuration?.rounds;

            // console.log("gameIds", starts, sprints?.length, rounds?.length);

            let dayNumber: number = -1;
            if (starts && sprints && rounds) {
              const days = Math.floor(
                (Date.now() - starts) / (24 * 60 * 60 * 1000)
              );

              //   console.log("days", days);

              let sprintStart: number = 0;
              for (const sprint of sprints) {
                let sprintEnd: number = sprintStart + sprint.length;

                if (days >= sprintStart && days < sprintEnd) {
                  dayNumber = days - sprintStart;

                  //   console.log("dayNumber", dayNumber);
                }

                sprintStart = sprintEnd;
              }
            }

            // console.log("dayNumber 2", dayNumber);

            if (dayNumber >= 0) {
              const taskDocs = await db
                .collection("tasks")
                .where("programDays", "array-contains", dayNumber)
                .get();

              //   console.log("taskDocs 2", taskDocs.docs.length);

              for (const taskDoc of taskDocs.docs) {
                const remoteDoc = taskDoc.data() as Task;

                if (remoteDoc && remoteDoc.games?.includes(gameId)) {
                  const prevActDocs = await db
                    .collection("users")
                    .doc(uid)
                    .collection("activities")
                    .where("taskId", "==", remoteDoc.id)
                    .where("createdOn", ">=", now_1)
                    .limit(1)
                    .get();

                  //   console.log("prevActDocs 2", prevActDocs.docs.length);

                  if (
                    prevActDocs.docs.length === 0 &&
                    !fetchedTasks[remoteDoc.id] &&
                    !remoteDoc.finaleTask
                  ) {
                    filteredTasks.push(remoteDoc);
                    fetchedTasks[remoteDoc.id] = true;

                    // console.log("remoteDoc 2", remoteDoc.name);
                  }
                }
              }
            }
          }
        }

        // const tasks: Task[] = [];

        // filter
        const sorted = filteredTasks.sort((a, b) =>
          a.fitPoints && b.fitPoints ? a.fitPoints - b.fitPoints : 0
        );

        // console.log("sorted", sorted.length);

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

export default withSentry(suggestedTasksV3);
