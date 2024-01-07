import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";
import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
import {
  getAllUserRanks,
  getUserActivityAfter,
} from "../../../models/Activity/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getEventMetricsForEventObj } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import { getAllTasksForBadge } from "../../FirestoreTriggers/onBaseTaskWrite/badgeUpdater";
import { Task } from "../../../models/Task/Task";

// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const addTaskDaysFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      const gameId = TEAM_ALPHABET_GAME;

      const badges: { [id: string]: string } = {
        "47e708aa-5045-473d-9abd-456df478d17a": "month-3",
        "85c13380-a744-4d9f-bb66-25ec7bcc9f46": "month-4",
        "911d0f8a-feea-4e00-9635-55c9bc8a423b": "month-5",
        "cf7add71-e2cf-4a1d-9378-2ba6c6188799": "month-6",
      };

      const taskMap: { [sprintId: string]: { [oldId: string]: string } } = {
        // pv sindhu warmup
        "month-3": {
          "6e5f3be9-a3d7-449e-bee5-7c803fd46f93":
            "a274f104-d497-4c7e-8fac-76cf56b9b0a7",
        },
        "month-4": {
          "6e5f3be9-a3d7-449e-bee5-7c803fd46f93":
            "8d60a9a9-2dd9-4f3f-904f-d6016ed270a9",
        },
        "month-5": {
          "6e5f3be9-a3d7-449e-bee5-7c803fd46f93":
            "723c986a-3180-4571-8015-07430cba3675",
        },
      };

      const sprintTasks: { [id: string]: { [taskId: string]: Task } } = {};
      for (const badgeId of Object.keys(badges)) {
        const allTasks = await getAllTasksForBadge(badgeId);
        sprintTasks[badges[badgeId]] = {};
        for (const task of allTasks) {
          // add tasks
          sprintTasks[badges[badgeId]][task.id] = task;
          console.log(badges[badgeId], badgeId, task.name, task.programDays);
        }

        console.log("");
        // console.log("");
      }

      for (const sprintId of Object.keys(sprintTasks)) {
        console.log(sprintId, Object.keys(sprintTasks[sprintId]).length);
      }

      //   return response.status(200).send({ status: "Success" });
      //

      const userList = await getAllUserRanks(gameId);
      const game = await getSbEventById(gameId);
      const { after, sprints } = getEventMetricsForEventObj(game);

      const userRanks = userList.sort(function (a, b) {
        if (a.authorName && b.authorName) {
          if (a.authorName < b.authorName) {
            return -1;
          }
          if (a.authorName > b.authorName) {
            return 1;
          }
        } else if (a.authorName) {
          return 1;
        } else if (b.authorName) {
          return -1;
        }

        return 0;
      });

      let i: number = 0;
      for (const userRank of userRanks) {
        const dayPts = userRank.dayPointObj;
        if (dayPts && sprints && after) {
          //   console.log("game start", new Date(after));

          const ptsSum = Object.values(dayPts).reduce((a, b) => a + b, 0);
          if (ptsSum) {
            i++;
            console.log(i, userRank.authorName);

            let started: number = after;

            for (const sprint of sprints) {
              // let day: number = 0;
              const end = started + sprint.length * 24 * 60 * 60 * 1000;

              // const dayEndUnix
              let dayStartUnix: number = started;
              for (let day: number = 0; day < sprint.length; day++) {
                const dayEndUnix = dayStartUnix + 24 * 60 * 60 * 1000;

                // console.log("started", started, end);

                //// update day for tasks
                const acts = await getUserActivityAfter(
                  userRank.uid,
                  started,
                  end,
                );

                for (const act of acts) {
                  if (act.calories) {
                    // console.log(
                    //   i,
                    //   userRank.authorName,
                    //   "day",
                    //   day,
                    //   "taskId",
                    //   act.taskId,
                    //   act.calories,
                    // );

                    // tasks done that are not in list
                    if (
                      act.taskId &&
                      sprintTasks[sprint.id] &&
                      !sprintTasks[sprint.id][act.taskId]
                    ) {
                      //   const wrongTaskId = act.taskId;

                      console.log(
                        sprint.id,
                        act.taskId,
                        `https://socialboat.live/admin/dashboard/${userRank.uid}/${act.id}`,
                      );

                      // update tasks
                      if (
                        act.id &&
                        act.taskId &&
                        taskMap[sprint.id] &&
                        taskMap[sprint.id][act.taskId]
                      ) {
                        console.log(
                          userRank.authorName,
                          taskMap[sprint.id][act.taskId],
                        );
                        await admin
                          .firestore()
                          .collection("users")
                          .doc(userRank.uid)
                          .collection("activities")
                          .doc(act.id)
                          .update({
                            taskId: taskMap[sprint.id][act.taskId],
                          });

                        // throw new Error("HI");
                      }
                    }

                    if (act.id) {
                      //   await admin
                      //     .firestore()
                      //     .collection("users")
                      //     .doc(userRank.uid)
                      //     .collection("activities")
                      //     .doc(act.id)
                      //     .update({
                      //       taskDay: day,
                      //     });
                    }
                  }
                }

                dayStartUnix = dayEndUnix;
              }

              //

              started = end;
            }

            // throw new Error("PAUSED");
            // console.log(i, userRank.authorName, ptsSum);
          }
        }
      }

      return response.status(200).send({ status: "Success" });
    });
  });
