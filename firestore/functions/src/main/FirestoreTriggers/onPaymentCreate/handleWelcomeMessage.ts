import { sbAppDL } from "../../../constants/email/contacts";
import { sendHSM } from "../../../models/Conversations/sendHSM";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";
// import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
import { onNewEventSignup } from "../utils/sendgrid";
import {
  // getParamsForWelcomeSessionV2,
  getParamsForWelcomeSessionV3,
} from "./handleWhatsappMessage";

export const handleUserWelcome = async (
  toPhone: string,
  explainer: string,
  toName?: string,
  communityName?: string,
  eventName?: string,
  leaderKey?: string,
  eventKey?: string,
) => {
  if (
    toPhone &&
    // toName &&
    // communityName &&
    // eventName &&
    leaderKey &&
    eventKey
  ) {
    try {
      await handleWelcomeMessage(
        toPhone,
        explainer,
        leaderKey,
        eventKey,
        toName,
        eventName,
        communityName,
      );
    } catch (error) {
      console.log("error in welcome whatsapp", error);
    }

    try {
      // await handleWelcomeEmail(
      //   toEmail,
      //   toName,
      //   communityName,
      //   eventName,
      //   leaderKey,
      // );
    } catch (error) {
      console.log("error in welcome email", error);
    }

    return true;
  }

  return false;
};

export const handleWelcomeMessage = async (
  toPhone: string,
  explainer: string,
  communityKey: string,
  eventKey: string,
  toName?: string,
  eventName?: string,
  communityName?: string,
) => {
  const params = getParamsForWelcomeSessionV3(
    toName,
    explainer,
    eventName,
    communityName,
    sbAppDL, // `https://socialboat.live/${encodeURI(communityKey)}/${encodeURI(eventKey)}`,
  );

  if (toPhone) {
    await sendHSM(toPhone, whatsappChannelId, "welcome_message_v4", params);
  }
};

export const handleWelcomeEmail = async (
  toEmail: string,
  toName: string,
  communityName: string,
  eventName: string,
  leaderKey: string,
) => {
  await onNewEventSignup(
    toEmail,
    toName,
    communityName,
    eventName,
    `https://${leaderKey}.socialboat.live`,
  );
};
