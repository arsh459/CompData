import { Activity } from "../../../models/Activity/Activity";
import { changeActivityNotifyState } from "../../../models/Activity/getUtils";
import {
  createReminder,
  getReminderByActivityId,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
import { updateReminderTaskState } from "../../../models/Reminders/getUtils";
import {
  notifyAfents_pagerV2,
  notifyAgents_pager,
  resolveTicket,
} from "../../../models/Reminders/pagerDuty/notifyAgents_pager";

export const handleNotifyUser = async (
  parentId: string,
  authorId: string,
  actId: string,
  postId: string,
  taskId: string,
  templateId:
    | "try_again"
    | "need_info"
    | "workout_rejected"
    | "post_workout_finish"
    | "ticket_resolved",
) => {
  await ticketReminderCreate(
    parentId,
    authorId,
    actId,
    postId,
    taskId,
    templateId,
  );

  // change state
  await changeActivityNotifyState(authorId, actId);
};

export const ticketReminderCreate = async (
  parentId: string,
  authorId: string,
  actId: string,
  postId: string,
  taskId: string,
  templateId:
    | "try_again"
    | "need_info"
    | "workout_rejected"
    | "post_workout_finish"
    | "ticket_resolved",
) => {
  const rem = createReminder(
    true,
    templateId,
    undefined,
    Date.now() + 1 * 1000, // after 1 second
    undefined,
    undefined,
    postId,
    authorId,
    undefined,
    templateId === "ticket_resolved"
      ? `${authorId.slice(0, 8)}-${parentId.slice(0, 8)}-${actId.slice(
          0,
          8,
        )}-tick`
      : `${authorId.slice(0, 8)}-${parentId.slice(0, 8)}-${actId.slice(
          0,
          8,
        )}-wkt`,
    undefined,
    undefined,
    undefined,
    parentId,
    undefined,
    undefined,
    undefined,
    undefined,
    actId,
    taskId,
  );

  await saveReminderInDB(rem);
};

export const handleNotifyAgentV2 = async (
  act: Activity,
  reviewType: "new_activity" | "new_support",
) => {
  await notifyAfents_pagerV2(act, false, reviewType);
};

export const handleNotifyAgent = async (
  parentId: string,
  authorId: string,
  actId: string,
  reviewType: "new_activity" | "new_support",
) => {
  await notifyAgents_pager(authorId, actId, false, reviewType);

  // const rem = createReminder(
  //   true, // urgent
  //   "notify_agent_activity",
  //   undefined,
  //   Date.now() + 1 * 1000,
  //   undefined,
  //   undefined,
  //   undefined,
  //   authorId,
  //   undefined,
  //   `${authorId.slice(0, 8)}-${parentId.slice(0, 8)}-${actId.slice(
  //     0,
  //     8,
  //   )}-notifyagent`,
  //   undefined,
  //   undefined,
  //   undefined,
  //   parentId,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   actId,
  // );

  // await saveReminderInDB(rem);

  // const remEsc = createReminder(
  //   false, // urgent
  //   "notify_agent_activity_esc",
  //   undefined,
  //   Date.now() + 10 * 60 * 1000,
  //   undefined,
  //   undefined,
  //   undefined,
  //   authorId,
  //   undefined,
  //   `${authorId.slice(0, 8)}-${parentId.slice(0, 8)}-${actId.slice(
  //     0,
  //     8,
  //   )}-notifyagentEsc`,
  //   undefined,
  //   undefined,
  //   undefined,
  //   parentId,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   actId,
  // );

  // await saveReminderInDB(remEsc);

  // change state
  // await changeActivityNotifyState(authorId, actId);
};

export const removeReminderForAgent = async (actId: string) => {
  try {
    await resolveTicket(actId);
  } catch (error) {
    console.log("error", error);
  }

  const reminders_esc = await getReminderByActivityId(
    actId,
    "notify_agent_activity_esc",
  );

  const reminders = await getReminderByActivityId(
    actId,
    "notify_agent_activity",
  );

  for (const reminder of [...reminders, ...reminders_esc]) {
    await updateReminderTaskState(reminder.id, "SUCCESS");
  }
};
