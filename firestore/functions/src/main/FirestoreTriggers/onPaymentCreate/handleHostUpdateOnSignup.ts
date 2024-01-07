import { sbAppDL } from "../../../constants/email/contacts";
import { sendHSM } from "../../../models/Conversations/sendHSM";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";
import { onNewEventSignup_creator } from "../utils/sendgrid";
import {
  //   getParamsForWelcomeSession,
  // getParamsForWelcomeSession_host,
  getParamsForWelcomeSession_host_v3,
  getParamsForWelcomeSession_host_v4,
} from "./handleWhatsappMessage";

export const handleTeamLeaderWelcome = async (
  creatorPhone: string,
  leaderKey: string,
  eventKey: string,
  // creatorEmail: string,
  creatorName?: string,
  customerName?: string,
) => {
  try {
    await handleHostUpdate_whatsappV2(
      creatorPhone,
      leaderKey,
      eventKey,
      creatorName,
      customerName,
    );
    return true;
  } catch (error) {
    console.log("error in welcome whatsapp team leader", error);
  }

  return false;
};

export const handleHostUpdateOnWelcome = async (
  creatorPhone: string,
  leaderKey: string,
  eventKey: string,
  // creatorEmail: string,
  creatorName?: string,
  customerName?: string,
  // eventName: string,

  customerPhone?: string,
  customerEmail?: string,
  // customerGoals: string,
  // customerId: string,
  // eventId: string,
) => {
  if (
    creatorPhone &&
    // creatorEmail &&
    // creatorName &&
    // customerName &&
    eventKey &&
    leaderKey
  ) {
    try {
      await handleHostUpdate_whatsapp(
        creatorPhone,
        leaderKey,
        eventKey,
        creatorName,
        customerName,
        customerPhone,
        customerEmail,
        // customerGoals,
        // leaderKey,
        // customerId,
        // eventId,
      );
    } catch (error) {
      console.log("error in welcome whatsapp host", error);
    }

    try {
      // await handleHostUpdate_email(
      //   creatorEmail,
      //   creatorName,
      //   customerName,
      //   eventName,
      //   leaderKey,
      // );
    } catch (error) {
      console.log("error in welcome email host", error);
    }

    return true;
  }

  return false;
};

export const handleHostUpdate_whatsappV2 = async (
  creatorPhone: string,
  communityKey: string,
  eventKey: string,
  creatorName?: string,
  customerName?: string,
) => {
  const params = getParamsForWelcomeSession_host_v4(
    sbAppDL,

    // `https://socialboat.live/${encodeURI(communityKey)}/${encodeURI(eventKey)}`,
    creatorName,
    customerName,
    // customerPhone,
    // customerEmail,
  );

  if (creatorPhone) {
    await sendHSM(creatorPhone, whatsappChannelId, "coach_new_user_v4", params);
  }
};

export const handleHostUpdate_whatsapp = async (
  creatorPhone: string,
  communityKey: string,
  eventKey: string,
  creatorName?: string,
  customerName?: string,
  customerPhone?: string,
  customerEmail?: string,
) => {
  const params = getParamsForWelcomeSession_host_v3(
    sbAppDL, //`https://socialboat.live/${encodeURI(communityKey)}/${encodeURI(eventKey)}`,
    creatorName,
    customerName,
    customerPhone,
    customerEmail,
  );

  if (creatorPhone) {
    await sendHSM(creatorPhone, whatsappChannelId, "coach_new_user_v2", params);
  }
};

export const handleHostUpdate_email = async (
  toEmail: string,
  toName: string,
  customerName: string,
  eventName: string,
  leaderKey: string,
) => {
  await onNewEventSignup_creator(
    toEmail,
    toName,
    customerName,
    eventName,
    `https://${leaderKey}.socialboat.live`,
  );
};
