import { sendHSM } from "../../../models/Conversations/sendHSM";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";
import { onCoachInviteEmail } from "../utils/sendgrid";
import { getParamsForInviteMessage } from "./handleWhatsappMessage";

export const handleInviteMessage = async (
  toPhone?: string,
  toEmail?: string,
  toName?: string,
  communityName?: string,
  eventName?: string,
  leaderKey?: string,
  eventId?: string,
) => {
  if (
    toPhone &&
    toEmail &&
    toName &&
    communityName &&
    eventName &&
    leaderKey &&
    eventId
  ) {
    try {
      await handleInviteWhatsAppMessage(
        toPhone,
        toName,
        eventName,
        communityName,
        leaderKey,
        eventId,
      );
    } catch (error) {
      console.log("error in welcome whatsapp", error);
    }

    try {
      await handleInviteEmail(
        toEmail,
        toName,
        communityName,
        eventName,
        leaderKey,
        eventId,
      );
    } catch (error) {
      console.log("error in welcome email", error);
    }

    return true;
  }

  return false;
};

export const handleInviteWhatsAppMessage = async (
  toPhone: string,
  toName: string,
  eventName: string,
  communityName: string,
  communityKey: string,
  eventId: string,
) => {
  const params = getParamsForInviteMessage(
    toName,
    communityName,
    eventName,
    `https://${communityKey}.socialboat.live?eventId=${eventId}&nav=program`,
  );

  if (toPhone) {
    await sendHSM(toPhone, whatsappChannelId, "coach_invite", params);
  }
};

export const handleInviteEmail = async (
  toEmail: string,
  toName: string,
  communityName: string,
  eventName: string,
  leaderKey: string,
  eventId: string,
) => {
  await onCoachInviteEmail(
    toEmail,
    toName,
    communityName,
    eventName,
    `https://${leaderKey}.socialboat.live?eventId=${eventId}&nav=program`,
  );
};
