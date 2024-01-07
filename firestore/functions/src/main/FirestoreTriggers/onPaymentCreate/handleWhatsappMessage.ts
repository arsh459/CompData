import {
  toRahulPhone,
  toSwapnilPhone,
} from "../../../constants/email/contacts";
import { Param, sendHSM } from "../../../models/Conversations/sendHSM";
import {
  // getCohorts,
  // getPinnedCohort,
  getSessionStart,
} from "../../../models/sbEvent/getUtils";
import { LocalCohort, sbEventInterface } from "../../../models/sbEvent/sbEvent";
// import { sbEventPayment } from "../../../models/sbPayment/sbPayment";
import { UserInterface } from "../../../models/User/User";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";
import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
// import * as functions from "firebase-functions";

export const handleWhatsappMessage = async (
  toEmail: string,
  currency: string,
  amount: string,
  toPhone: string,
  eventObj: sbEventInterface,
  user: UserInterface | undefined,
  pinnedCohort: LocalCohort | undefined,
  toName: string,
) => {
  // console.log("in here", eventObj.reminderTemplate);

  if (eventObj.reminderTemplate === "event_update") {
    // console.log("here");
    await handleEventUpdate_message(toEmail, toPhone, eventObj, pinnedCohort);
  } else if (eventObj.reminderTemplate === "booking_confirmation") {
    // console.log("here now");
    await handleEventUpdate_booking_confirmation(
      user,
      toPhone,
      eventObj,
      pinnedCohort,
    );
  } else {
    const eventStarts = eventObj.eventStarts;
    if (eventStarts) {
      const formattedDate = getFormattedDateForUnix(eventStarts, "Qo MMM hmma");
      const params = getParamsForWelcomeSessionV2(
        toName,
        eventObj.name,
        user?.name ? user.name : "Creator",
        user?.name ? user.name : "Creator",
        `https://${user?.userKey}.socialboat.live`,
        formattedDate,
      );

      if (toPhone) {
        await sendHSM(toPhone, whatsappChannelId, "welcome_message_v3", params);
      }
    } else {
      const params = getParamsForWelcomeSession(
        toName,
        eventObj.name,
        user?.name ? user.name : "Creator",
        user?.name ? user.name : "Creator",
        `https://${user?.userKey}.socialboat.live`,
      );

      if (toPhone) {
        await sendHSM(toPhone, whatsappChannelId, "welcome_message", params);
      }
    }

    // const parmasForMessage = generateParamsForMessage(
    //   toEmail,
    //   currency,
    //   amount,
    //   eventObj,
    // );

    // if (toPhone) {
    //   await sendHSM(toPhone, whatsappChannelId, "welcome_message", params);
    // }
  }

  const paramsForHost = generateParamsForHost(
    user && user.name ? user.name : "there",
    toEmail,
    toPhone,
    currency,
    amount,
    eventObj,
  );

  // host message
  await sendHSM(
    toSwapnilPhone,
    whatsappChannelId,
    "host_registration_update",
    paramsForHost,
  );

  await sendHSM(
    toRahulPhone,
    whatsappChannelId,
    "host_registration_update",
    paramsForHost,
  );

  if (user && user?.phone) {
    await sendHSM(
      user.phone,
      whatsappChannelId,
      "host_registration_update",
      paramsForHost,
    );
  }
};

export const handleEventUpdate_booking_confirmation = async (
  user: UserInterface | undefined,
  toPhone: string,
  eventObj: sbEventInterface,
  pinnedCohort: LocalCohort | undefined,
) => {
  if (toPhone && pinnedCohort) {
    // const cohorts = await getCohorts(eventObj.id);
    // const pinnedCohort = getPinnedCohort(cohorts);

    const sessionStart = getSessionStart(pinnedCohort);
    // console.log("session", sessionStart);
    if (sessionStart) {
      const paramsForBookingConfirmation =
        generateParamsFor_booking_confirmation(user, eventObj, sessionStart);

      // console.log("paramsForBookingConfirmation", paramsForBookingConfirmation);

      await sendHSM(
        toPhone,
        whatsappChannelId,
        "booking_confirmation",
        paramsForBookingConfirmation,
      );
    }
  }
};

export const handleEventUpdate_message = async (
  toEmail: string,
  toPhone: string,
  eventObj: sbEventInterface,
  pinnedCohort: LocalCohort | undefined,
) => {
  if (toPhone && pinnedCohort) {
    // const cohorts = await getCohorts(eventObj.id);
    // const pinnedCohort = getPinnedCohort(cohorts);

    const sessionStart = getSessionStart(pinnedCohort);
    if (sessionStart) {
      const paramsForEventMessage = generateParamsFor_event_update(
        toEmail,
        eventObj,
        sessionStart,
      );

      await sendHSM(
        toPhone,
        whatsappChannelId,
        "event_update",
        paramsForEventMessage,
      );
    }
  }
};

export const generateParamsForReminder = (
  toEmail: string | undefined | null,
  timeString: string | undefined | null,
  eventObj: sbEventInterface,
): Param[] => {
  return [
    {
      default: toEmail ? toEmail.trim() : "there",
    },
    {
      default: eventObj.name ? `*${eventObj.name}*`.trim() : "",
    },
    {
      default: timeString ? `*${timeString.trim()}*` : "designated time",
    },
    {
      default: eventObj.joinURL ? eventObj.joinURL.trim() : "",
    },
  ];
};

export const getParamsForNewPostMessage = (
  toName: string,
  eventName: string,
  hostName: string,
  authorName: string,
  link: string,
): Param[] => {
  return [
    {
      default: toName ? toName.trim() : "there",
    },
    {
      default: authorName ? `*${authorName.trim()}*` : "Someone",
    },
    {
      default: eventName ? `*${eventName.trim()}*` : "SocialBoat",
    },
    {
      default: link ? link.trim() : "",
    },
    {
      default: hostName ? hostName.trim() : "SocialBoat",
    },
    {
      default: eventName ? `${eventName.trim()}` : "community",
    },
  ];
};

export const getParamsForWelcomeSession = (
  toName: string,
  eventName: string,
  communityName: string,
  coachName: string,
  link: string,
): Param[] => {
  return [
    {
      default: toName ? toName.trim() : "there",
    },
    {
      default: eventName ? `*${eventName.trim()}*` : "",
    },
    {
      default: communityName,
    },
    {
      default: link ? link.trim() : "",
    },
    {
      default: coachName,
    },
  ];
};

export const getParamsForWelcomeSessionV2 = (
  toName: string,
  eventName: string,
  communityName: string,
  coachName: string,
  link: string,
  startsOn: string,
): Param[] => {
  return [
    {
      default: toName ? toName.trim() : "there",
    },
    {
      default: eventName ? `*${eventName.trim()}*` : "",
    },
    {
      default: communityName ? `*${communityName.trim()}*` : "",
    },
    {
      default: startsOn,
    },
    {
      default: link ? link.trim() : "",
    },
    {
      default: coachName,
    },
  ];
};

export const getParamsForWelcomeSessionV3 = (
  toName: string | undefined,
  explainer: string,
  eventName: string | undefined,
  coachName: string | undefined,
  link: string,
): Param[] => {
  return [
    {
      default: toName ? toName.trim() : "there",
    },
    {
      default: coachName ? `*${coachName.trim()}*` : "Coach",
    },
    {
      default: eventName ? `*${eventName.trim()}*` : "team",
    },
    {
      default: link ? link.trim() : "https://socialboat.live/teams",
    },
    {
      default: explainer,
    },
  ];
};

export const getParamsForInviteMessage = (
  toName: string,
  communityName: string,
  eventName: string,
  link: string,
): Param[] => {
  return [
    {
      default: toName ? toName.trim() : "there",
    },
    {
      default: communityName ? `*${communityName.trim()}*` : "Coach",
    },
    {
      default: eventName ? `*${eventName.trim()}*` : "",
    },
    {
      default: link ? link.trim() : "",
    },
    {
      default: communityName ? `${communityName.trim()}` : "Creator",
    },
    {
      default: communityName ? `${communityName.trim()}` : "Creator",
    },
  ];
};

export const getParamsForWelcomeSession_host = (
  creatorName: string,
  customerName: string,
  eventName: string,
  link: string,
): Param[] => {
  return [
    {
      default: creatorName ? creatorName.trim() : "there",
    },
    {
      default: customerName ? `*${customerName.trim()}*` : "",
    },
    {
      default: eventName ? `*${eventName.trim()}*` : "",
    },
    {
      default: link ? link.trim() : "",
    },
    {
      default: creatorName,
    },
  ];
};

export const getParamsForWelcomeSession_host_v4 = (
  link: string,
  creatorName?: string,
  customerName?: string,
  // customerPhone?: string,
  // customerEmail?: string,
): Param[] => {
  return [
    {
      default: creatorName ? creatorName.trim() : "there",
    },
    {
      default: customerName ? `*${customerName.trim()}*` : "-",
    },
    {
      default: link ? link.trim() : "",
    },
  ];
};

export const getParamsForWelcomeSession_host_v3 = (
  link: string,
  creatorName?: string,
  customerName?: string,
  customerPhone?: string,
  customerEmail?: string,
): Param[] => {
  return [
    {
      default: creatorName ? creatorName.trim() : "there",
    },
    {
      default: customerName ? `*${customerName.trim()}*` : "-",
    },
    {
      default: customerPhone ? `*${customerPhone.trim()}*` : "-",
    },
    {
      default: customerEmail ? `*${customerEmail.trim()}*` : "-",
    },
    {
      default: link ? link.trim() : "",
    },
  ];
};

export const getParamsForWelcomeSession_host_v2 = (
  creatorName: string,
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  fitnessGoal: string,
  link: string,
): Param[] => {
  return [
    {
      default: creatorName ? creatorName.trim() : "there",
    },
    {
      default: customerName ? `*${customerName.trim()}*` : "-",
    },
    {
      default: customerPhone ? `*${customerPhone.trim()}*` : "-",
    },
    {
      default: customerEmail ? `*${customerEmail.trim()}*` : "-",
    },
    {
      default: fitnessGoal ? `*${fitnessGoal.trim()}*` : "-",
    },
    {
      default: link ? link.trim() : "",
    },
    {
      default: customerName ? `*${customerName.trim()}*` : "-",
    },
  ];
};

export const generateParamsForLiveSessionV2 = (
  toName: string | undefined | null,
  hostName: string | undefined | null,
  timeString: string | undefined | null,
  sessionName: string,
  joinURL: string,
): Param[] => {
  return [
    {
      default: toName ? toName.trim() : "there",
    },
    {
      default: hostName ? hostName.trim() : "creator",
    },
    {
      default: sessionName,
    },
    {
      default: timeString ? `*${timeString.trim()}*` : "designated time",
    },
    {
      default: sessionName,
    },
    {
      default: joinURL ? joinURL.trim() : "",
    },
    {
      default: hostName ? hostName.trim() : "creator",
    },
  ];
};

export const generateParamsForLiveSession = (
  toEmail: string | undefined | null,
  timeString: string | undefined | null,
  eventObj: sbEventInterface,
  sessionName: string,
  userName: string,
  joinURL: string,
): Param[] => {
  return [
    {
      default: toEmail ? toEmail.trim() : "there",
    },
    {
      default: eventObj.name ? `*${eventObj.name.trim()}*` : "",
    },
    {
      default: sessionName,
    },
    {
      default: timeString ? `*${timeString.trim()}*` : "designated time",
    },
    {
      default: joinURL ? joinURL.trim() : "",
    },
    {
      default: userName,
    },
  ];
};

export const generateParamsFor_event_update = (
  toEmail: string | undefined | null,
  eventObj: sbEventInterface,
  start: Date,
): Param[] => {
  return [
    {
      default: toEmail ? toEmail.trim() : "there",
    },
    {
      default: eventObj.name ? `*${eventObj.name}*`.trim() : "",
    },
    {
      default: start
        ? `*${start.toLocaleString("default", {
            month: "short",
            day: "2-digit",
          })}*`.trim()
        : `*Given time*`.trim(),
    },
    {
      default: start
        ? `*${start.toLocaleString("default", {
            hour: "numeric",
            hour12: true,
            minute: "2-digit",
          })}*`.trim()
        : `*Given time*`.trim(),
    },
    {
      default: eventObj.joinURL ? eventObj.joinURL.trim() : "",
    },
  ];
};

export const generateParamsForMessage = (
  toEmail: string | undefined | null,
  currency: string,
  amount: string | undefined | null,
  eventObj: sbEventInterface,
): Param[] => {
  return [
    {
      default: toEmail ? toEmail.trim() : "there",
    },
    {
      default: eventObj.name ? `*${eventObj.name}*`.trim() : "",
    },
    {
      default:
        amount && currency
          ? `*${currency} ${amount}*`.trim()
          : `*${eventObj.currency}${eventObj.cost}*`.trim(),
    },
    {
      default: eventObj.joinURL ? eventObj.joinURL.trim() : "",
    },
  ];
};

const generateParamsForHost = (
  userName: string,
  toEmail: string | undefined | null,
  customerPhone: string | undefined | null,
  currency: string,
  amount: string | undefined | null,
  eventObj: sbEventInterface,
): Param[] => {
  return [
    { default: userName },
    { default: eventObj.name ? `*${eventObj.name.trim()}*` : "your event" },
    {
      default:
        amount && currency
          ? `*${currency} ${amount}*`.trim()
          : `*${eventObj.currency}${eventObj.cost}*`.trim(),
    },
    {
      default: toEmail ? toEmail.trim() : "No user email",
    },
    {
      default: customerPhone ? customerPhone.trim() : "No user contact",
    },
  ];
};

export const generateParamsFor_booking_confirmation = (
  user: UserInterface | undefined,
  eventObj: sbEventInterface,
  start: Date,
): Param[] => {
  return [
    {
      default: eventObj.name ? `*${eventObj.name}*`.trim() : "",
    },
    {
      default: start
        ? `*${start.toLocaleString("default", {
            month: "short",
            day: "2-digit",
            hour: "numeric",
            hour12: true,
            minute: "2-digit",
          })}*`.trim()
        : `*Given time*`.trim(),
    },
    {
      default: user?.name ? user.name : "Course host",
    },
  ];
};

export const getParamsForReplyPost = (
  repliedToName: string | undefined,
  authorName: string | undefined,
  eventName: string | undefined,
  link: string,
  creatorName: string | undefined,
): Param[] => {
  return [
    {
      default: repliedToName ? repliedToName.trim() : "there",
    },
    {
      default: authorName ? `*${authorName.trim()}*` : "Coach",
    },
    {
      default: eventName ? `*${eventName.trim()}*` : "Game",
    },
    {
      default: link ? link.trim() : "",
    },
    {
      default: creatorName ? creatorName : "SocialBoat",
    },
  ];
};
