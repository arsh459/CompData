import { getAllActivityById } from "../../Activity/getUtils";
// import * as functions from "firebase-functions";
import * as sgMail from "@sendgrid/mail";
import {
  // toRahul,
  toSaurav,
  toSwapnil,
} from "../../../constants/email/contacts";
import { getFormattedDateForUnix } from "../../../main/PubSub/activityTracker/utils";
import { getUserById } from "../../User/Methods";
import { intervalToDuration } from "date-fns";

const SENDGRID_API_KEY = process.env.SENDGRID_SB;
// console.log("SENDGRID_API_KEY", SENDGRID_API_KEY);
//   "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";

// functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY ? SENDGRID_API_KEY : "");

export const notifyAgents = async (
  authorId: string,
  actId: string,
  esc: boolean,
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

      [
        toSaurav,
        toSwapnil,
        // toRahul,
      ].map(async (item) => {
        await sendAgentNotify(
          item,
          esc
            ? "d-eeb4cb268e65418aae8cf9aa8d338b41"
            : "d-25b507d81cd645b6ad06012d775e4dbe",
          act.activityName,
          getFormattedDateForUnix(
            act.createdOn ? act.createdOn : Date.now(),
            "dddd MMMM Do YYYY h:mm:ss a",
          ),
          author?.name ? author.name : "No name",
          `${int.hours} : ${int.minutes} : ${int.seconds} (hh:mm:ss delay)`,
          `https://socialboat.live/admin/dashboard/${act.authorUID}/${act.id}`,
        );
      });
    }
  }
};

const sendAgentNotify = async (
  email: string,
  templateId: string,
  activity_name: string,
  created_time: string,
  author_name: string,
  current_tat: string,
  link: string,
) => {
  try {
    await sgMail.send({
      to: email,
      from: "hello@socialboat.live",
      templateId: templateId,
      replyTo: "hello@socialboat.live",
      dynamicTemplateData: {
        activity_name: activity_name,
        created_time: created_time,
        author_name: author_name,
        current_tat: current_tat,
        link: link,
      },
    });
  } catch (error) {
    console.log("activity_name", activity_name);
    console.log("created_time", created_time);
    console.log("author_name", author_name);
    console.log("current_tat", current_tat);
    console.log("link", link);

    // console.log("error", error.response.body.errors);
  }
};
