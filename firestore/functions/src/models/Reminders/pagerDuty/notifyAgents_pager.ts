import { getAllActivityById } from "../../Activity/getUtils";
// import * as functions from "firebase-functions";
// import * as sgMail from "@sendgrid/mail";
import { getFormattedDateForUnix } from "../../../main/PubSub/activityTracker/utils";
import { getUserById } from "../../User/Methods";
import { intervalToDuration } from "date-fns";

import axios from "axios";
import { getSbEventById } from "../../sbEvent/getUtils";
import { SlotBooking } from "../../slots/Slot";
import { Activity } from "../../Activity/Activity";
// console.log("SENDGRID_API_KEY", SENDGRID_API_KEY);
//   "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";

// functions.config().sendgrid.key;
// sgMail.setApiKey(SENDGRID_API_KEY ? SENDGRID_API_KEY : "");
export const notifyAgent_slotBooking = async (
  booking: SlotBooking,
  slotTime: string,
  name: string,
  link: string,
  phone: string,
) => {
  try {
    const isoTime = new Date(booking.startUnix).toISOString();

    if (process.env.PAGER_DUTY_SLOT_BOOKING)
      await sendAgentNotify_pager_general(
        isoTime,
        booking.id,
        `Slot - ${name} - ${slotTime}`,
        {
          rawString: booking.rawString,
          slotTime: slotTime,
          name: name,
          phone: phone,
        },
        link,
        "Go to booking",
        "Ticket",
        "trigger",
        process.env.PAGER_DUTY_SLOT_BOOKING,
      );
  } catch (error) {}
};

export const notifyAfents_pagerV2 = async (
  act: Activity,
  esc: boolean,
  reviewType: "new_activity" | "new_support",
) => {
  const hour = getFormattedDateForUnix(Date.now(), "HH");
  const hourNumber = parseInt(hour);

  // between 8am and 24 hours for escalation emails
  if (!esc || !(hourNumber >= 1 && hourNumber <= 9)) {
    if (act) {
      // const author = await getUserById(act.authorUID);
      const now = Date.now();
      const delSec = now - (act.createdOn ? act.createdOn : now);

      const int = intervalToDuration({ start: 0, end: delSec });

      // let gName = "No Game name";
      // if (act.games?.length) {
      //   const game = await getSbEventById(act.games[0]);
      //   if (game?.name) {
      //     gName = game.name;
      //   }
      // }

      try {
        await sendAgentNotify_pager(
          act.createdOn
            ? new Date(act.createdOn).toISOString()
            : new Date().toISOString(),
          act.id ? act.id : act.postId,
          act.activityName,
          "Main Game",
          getFormattedDateForUnix(
            act.createdOn ? act.createdOn : Date.now(),
            "dddd MMMM Do YYYY h:mm:ss a",
          ),
          "Check on page" ? "Check on page" : "No name",
          `${int.hours} : ${int.minutes} : ${int.seconds} (hh:mm:ss delay)`,
          `https://socialboat.live/admin/dashboard/${act.authorUID}/${act.id}`,
          reviewType === "new_activity" ? "New Activity" : "Ticket",
          "trigger",
        );
      } catch (error) {
        console.log("ERROR IN PAGER DUTY");
      }
    }
  }
};

export const notifyAgents_pager = async (
  authorId: string,
  actId: string,
  esc: boolean,
  reviewType: "new_activity" | "new_support",
) => {
  // console.log("SENDGRID_API_KEY", SENDGRID_API_KEY);
  const hour = getFormattedDateForUnix(Date.now(), "HH");
  const hourNumber = parseInt(hour);

  // between 8am and 24 hours for escalation emails
  if (!esc || !(hourNumber >= 1 && hourNumber <= 9)) {
    const act = await getAllActivityById(authorId, actId);
    if (act) {
      const author = await getUserById(act.authorUID);
      const now = Date.now();
      const delSec = now - (act.createdOn ? act.createdOn : now);

      const int = intervalToDuration({ start: 0, end: delSec });

      let gName = "No Game name";
      if (act.games?.length) {
        const game = await getSbEventById(act.games[0]);
        if (game?.name) {
          gName = game.name;
        }
      }

      try {
        await sendAgentNotify_pager(
          act.createdOn
            ? new Date(act.createdOn).toISOString()
            : new Date().toISOString(),
          act.id ? act.id : act.postId,
          act.activityName,
          gName,
          getFormattedDateForUnix(
            act.createdOn ? act.createdOn : Date.now(),
            "dddd MMMM Do YYYY h:mm:ss a",
          ),
          author?.name ? author.name : "No name",
          `${int.hours} : ${int.minutes} : ${int.seconds} (hh:mm:ss delay)`,
          `https://socialboat.live/admin/dashboard/${act.authorUID}/${act.id}`,
          reviewType === "new_activity" ? "New Activity" : "Ticket",
          "trigger",
        );
      } catch (error) {
        console.log("ERROR IN PAGER DUTY");
      }
    }
  }
};

const sendAgentNotify_pager = async (
  isoTime: string,
  activity_id: string,
  activity_name: string,
  game_name: string,
  created_time: string,
  author_name: string,
  current_tat: string,
  link: string,
  source: "New Activity" | "Ticket",
  event_action: "trigger" | "acknowledge" | "resolve",
) => {
  try {
    await axios({
      method: "post",
      url: "https://events.pagerduty.com/v2/enqueue",
      data: {
        routing_key: process.env.PAGER_DUTY,
        event_action: event_action,
        dedup_key: activity_id,
        payload: {
          summary: `${author_name} - ${activity_name} - ${created_time}`,
          source: source,
          severity: "critical",
          timestamp: isoTime,
          custom_details: {
            game: game_name,
            time: created_time,
            current_tat: current_tat,
          },
        },
        links: [
          {
            href: link,
            text: "Review workout",
          },
        ],
      },
    });

    // console.log("res", res);
  } catch (error) {
    console.log("TYPE", "PAGER DUTY", error);
    console.log("key", process.env.PAGER_DUTY);
    console.log("activity_name", activity_name);
    console.log("created_time", created_time);
    console.log("author_name", author_name);
    console.log("current_tat", current_tat);
    console.log("link", link);

    // console.log("error", error.response.body.errors);
  }
};

export const sendAgentNotify_pager_general = async (
  isoTime: string,
  activity_id: string,
  summary: string,
  custom_details: { [key: string]: string },
  link: string,
  linkCTA: string,
  source: "New Activity" | "Ticket",
  event_action: "trigger" | "acknowledge" | "resolve",
  routing_key: string,
) => {
  try {
    await axios({
      method: "post",
      url: "https://events.pagerduty.com/v2/enqueue",
      data: {
        routing_key: routing_key,
        event_action: event_action,
        dedup_key: activity_id,
        payload: {
          summary: summary,
          source: source,
          severity: "critical",
          timestamp: isoTime,
          custom_details: custom_details,
        },
        links: [
          {
            href: link,
            text: linkCTA,
          },
        ],
      },
    });

    // console.log("res", res);
  } catch (error) {
    // console.log("error", error.response.body.errors);
  }
};

export const resolveTicket = async (
  activity_id: string,
  routing_key?: string,
) => {
  try {
    await axios({
      method: "post",
      url: "https://events.pagerduty.com/v2/enqueue",
      data: {
        routing_key: routing_key ? routing_key : process.env.PAGER_DUTY,
        event_action: "resolve",
        dedup_key: activity_id,
      },
    });
  } catch (error) {
    console.log("TYPE", "PAGER DUTY", error);
    console.log("key", process.env.PAGER_DUTY);
    console.log("activity_id", activity_id);
    // console.log("error", error.response.body.errors);
  }
};
