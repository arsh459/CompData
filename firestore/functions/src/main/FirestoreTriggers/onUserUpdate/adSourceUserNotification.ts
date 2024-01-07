import { sendAgentNotify_pager_general } from "../../../models/Reminders/pagerDuty/notifyAgents_pager";
import { UserInterface } from "../../../models/User/User";

const adSourcesToMonitor: string[] = ["dramandeepkaur", "lookgoodinpcos"];

export const handleAdSourceNotification = async (
  now: UserInterface,
  prev: UserInterface,
) => {
  try {
    // send message in this condition
    if (
      process.env.PAGER_DUTY_SLOT_BOOKING &&
      prev.adSource !== now.adSource &&
      now.adSource &&
      adSourcesToMonitor.includes(now.adSource)
    ) {
      const dateObj = now.motivatedOn ? new Date(now.motivatedOn) : new Date();
      const iso = dateObj.toISOString();

      // ad ad source
      await sendAgentNotify_pager_general(
        iso,
        now.uid,
        `Sign Up - ${now.adSource} - ${now.phone ? now.phone : "NA"}`,
        {
          name: now.name ? now.name : "check link",
          phone: now.phone ? now.phone : "check link",
          adSource: now.adSource ? now.adSource : "check link",
        },
        `https://socialboat.live/admin/motivators`,
        "Open Motivators",
        "Ticket",
        "trigger",
        process.env.PAGER_DUTY_SLOT_BOOKING,
      );
    }
  } catch (error) {
    console.log("error triggering");
  }
};
