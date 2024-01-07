import { Activity } from "../../../models/Activity/Activity";
import { resolveTicket } from "../../../models/Reminders/pagerDuty/notifyAgents_pager";
import { handleNotifyAgentV2 } from "../onActivityWrite/handleNotify";

export const handleTicketActivity = async (now: Activity, pre?: Activity) => {
  if (
    now.id &&
    now.reviewStatus === "PENDING" &&
    pre?.reviewStatus !== "PENDING"
  ) {
    await handleNotifyAgentV2(now, "new_activity");
  } else if (
    pre &&
    now &&
    now.id &&
    pre.reviewStatus === "PENDING" &&
    now.reviewStatus !== "PENDING"
  ) {
    await resolveTicket(now.id);
  }
};
