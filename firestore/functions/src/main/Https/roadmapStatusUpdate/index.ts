import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";
import {
  getAllAchievmentPaths,
  getCurrentAcivementGoal,
  roadmapUpdateFunc,
  saveCurrentAcivementGoal,
} from "../../../models/User/roadmap";
import { AchievementPathDataItem } from "../../../models/User/User";
import {
  getAchieverAwardStatusFromAchivementPathItemStatus,
  updateAchieverStatus,
} from "../addBadge/path/updateUtils";
import { updateUserRoadmapProgress } from "../../../models/User/updateUtils";

const corsHandler = cors({ origin: true });

export const roadmapStatusUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
        };

        if (uid) {
          const user = await getUserById(uid);
          const achievementPaths = await getAllAchievmentPaths(uid, "desc");

          if (user && achievementPaths?.length) {
            const currAchievementGoal =
              getCurrentAcivementGoal(achievementPaths);

            if (currAchievementGoal?.items?.length) {
              const { items, ...rest } = currAchievementGoal;
              const remoteItems: AchievementPathDataItem[] = [];

              for (const item of items) {
                const status = await roadmapUpdateFunc(user, item);
                const remoteItem = item;

                if (status) {
                  remoteItem.status = status;

                  const achieverStatus =
                    getAchieverAwardStatusFromAchivementPathItemStatus(
                      status,
                      rest.endTime,
                    );

                  await updateAchieverStatus(
                    user.uid,
                    achieverStatus,
                    item.type,
                    rest.startTime,
                    rest.endTime,
                  );
                }

                remoteItems.push(remoteItem);
              }

              const updatedCurrAchievementGoal = {
                ...rest,
                items: remoteItems,
              };

              await updateUserRoadmapProgress(
                user,
                achievementPaths.map((each) =>
                  each.id === updatedCurrAchievementGoal.id
                    ? updatedCurrAchievementGoal
                    : each,
                ),
              );

              await saveCurrentAcivementGoal(
                user.uid,
                updatedCurrAchievementGoal,
              );
            }
          }
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
