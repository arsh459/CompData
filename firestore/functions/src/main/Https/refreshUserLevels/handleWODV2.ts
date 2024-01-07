import { sendHSM } from "../../../models/Conversations/sendHSM";
import { whatsappChannelId } from "../messagebird/constants/identifiers";
import {
  getChildEvents,
  getSbEventById,
} from "../../../models/sbEvent/getUtils";
import { getTask } from "../../../models/Task/getUtils";
import { getUserById, getUsersForEvent } from "../../../models/User/Methods";
import {
  levelPointObjInterface,
  levelStrings,
  levelTaskObjInterface,
} from "../../../models/Reminders/Reminder";
import {
  getProgressForTask,
  updateUIDForReminder,
} from "../../../models/Reminders/getUtils";
import { sbAppDL } from "../../../constants/email/contacts";
import { canMessageGo } from "../../../models/Reminders/whatsapp/messageState";

export const handleWODV2 = async (
  taskObj: levelTaskObjInterface,
  gameId: string,
  id: string,
) => {
  const uidsDone = await getProgressForTask(id);
  // console.log("u", uidsDone);

  const game = await getSbEventById(gameId);
  const levelLinks: levelTaskObjInterface = {
    level0: "",
    level1: "",
    level2: "",
    level3: "",
    level4: "",
    level5: "",
  };
  const levelPoints: levelPointObjInterface = {
    level0: 5,
    level1: 5,
    level2: 5,
    level3: 5,
    level4: 5,
    level5: 5,
  };

  for (const level of Object.keys(taskObj)) {
    const taskId = taskObj[level as levelStrings];
    const task = await getTask(taskId);

    const fitPoints = task?.fitPoints ? task.fitPoints : 5;

    let summaryType = task?.labels ? task.labels[0] : "";
    const taskLevel = task?.level ? task.level : 0;
    if (game?.configuration?.taskGroups) {
      if (taskLevel <= 2) {
        summaryType = "beginner";
      } else if (taskLevel === 3) {
        summaryType = "intermediate";
      } else if (taskLevel === 4) {
        summaryType = "advanced";
      } else if (taskLevel === 5) {
        summaryType = "master";
      }
    }

    levelLinks[level as levelStrings] = summaryType;
    levelPoints[level as levelStrings] = fitPoints;
  }

  if (levelLinks && levelPoints) {
    const allTeams = await getChildEvents(gameId);

    // let i: number = 0;
    for (const remTeam of allTeams) {
      // console.log("remTeam", remTeam);
      const users = await getUsersForEvent(remTeam.id);

      const captain = await getUserById(remTeam.ownerUID);

      // const msgPromises: Promise<void>[] = [];
      for (const user of users) {
        // i++;
        if (
          // i >= 443 &&
          user.phone &&
          captain &&
          captain.userKey &&
          remTeam.eventKey &&
          !user.unsubscribe &&
          !uidsDone[user.uid] &&
          user.invitedPageId !== "AIESEC Delhi University" &&
          user.invitedPageId !== "PECFEST" &&
          canMessageGo(user)
          // user.phone === "+919811800046"
        ) {
          // console.log("here");
          const userLevel = user.userLevelV2 ? user.userLevelV2 : 0;
          const levelString = `level${userLevel}`;
          // const summary = levelLinks[levelString as levelStrings];
          const fitPointsRem = levelPoints[levelString as levelStrings];
          // const taskRem = taskObj[levelString as levelStrings];

          // console.log(
          //   user.name,
          //   user.phone,
          //   user.userKey,
          //   summary,
          //   fitPointsRem,
          //   taskRem,
          // );

          try {
            await sendHSM(user.phone, whatsappChannelId, "task_of_day_v2", [
              { default: `${user.name ? user.name.trim() : "there"}` },
              {
                default: `*${fitPointsRem}*`,
              },
              {
                default: sbAppDL,
                // `https://socialboat.live/${encodeURI(
                // captain.userKey,
                // )}/${encodeURI(
                // remTeam.eventKey,
                // )}/workout?tab=task_preview&summary_type=${summary}&taskId=${taskRem}`,
              },
              {
                default: `${remTeam.name ? remTeam.name : "SocialBoat"}`,
              },
            ]);
          } catch (error) {
            console.log("FAILED for", user.name, user.phone, remTeam.name);
          }

          await updateUIDForReminder(id, user.uid);
          // );

          //   throw new Error("Hi");
        }
      }

      // send messages to all users
      // await Promise.all(msgPromises);
    }
  }

  return true;
};
