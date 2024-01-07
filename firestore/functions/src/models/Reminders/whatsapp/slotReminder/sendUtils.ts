import {
  toJaytiPhone,
  toSauravPhone,
} from "../../../../constants/email/contacts";
import { waTemplateNames } from "../../../../main/PubSub/notifications/constants";
import { addUserTemplateSent } from "../../../../main/PubSub/notifications/handleSend";
import { sendHSMV3 } from "../../../Conversations/sendHSMV2";
import { UserInterface } from "../../../User/User";

export const handleGynaeMessage = async (
  user: UserInterface,
  timeString: string,
  doctor?: UserInterface,
) => {
  const templateId: waTemplateNames = "slot_booking_doc_v1";

  if (user.phone) {
    try {
      await sendHSMV3(user.phone, templateId, [
        user?.name ? user.name : "there",
        doctor?.name ? doctor.name : "the doctor",
        `*${timeString}*`,
      ]);

      await addUserTemplateSent(user.uid, templateId);
    } catch (error) {
      console.log("error in sending doc slot message", error);
    }

    try {
      await sendHSMV3(toSauravPhone, templateId, [
        user?.name ? user.name : "there",
        doctor?.name ? doctor.name : "the doctor",
        `*${timeString}*`,
      ]);
    } catch (error) {
      console.log("error in whatsapp to agent", error);
    }
  }
};

export const handleNutritionistMessage = async (
  user: UserInterface,
  timeString: string,
) => {
  const templateId: waTemplateNames = "slot_booking_diet_v1";

  if (user.phone) {
    try {
      await sendHSMV3(user.phone, templateId, [
        user?.name ? user.name : "there",
        `*${timeString}*`,
      ]);

      await addUserTemplateSent(user.uid, templateId);
    } catch (error) {
      console.log("error in sending doc slot message", error);
    }

    try {
      await sendHSMV3(toJaytiPhone, templateId, [
        user?.name ? user.name : "there",
        `*${timeString}*`,
      ]);
    } catch (error) {
      console.log("error in whatsapp to agent", error);
    }
  }
};

export const handleHealthCoachMessage = async (
  user: UserInterface,
  timeString: string,
) => {
  const templateId: waTemplateNames = "slot_booking_health_v1";

  if (user.phone) {
    try {
      await sendHSMV3(user.phone, templateId, [
        user?.name ? user.name : "there",
        `*${timeString}*`,
      ]);

      await addUserTemplateSent(user.uid, templateId);
    } catch (error) {
      console.log("error in sending doc slot message", error);
    }

    try {
      await sendHSMV3(toSauravPhone, templateId, [
        user?.name ? user.name : "there",
        `*${timeString}*`,
      ]);
    } catch (error) {
      console.log("error in whatsapp to agent", error);
    }
  }
};

export const handleGenSlotMessage = async (
  user: UserInterface,
  timeString: string,
  agentPhone: string,
  agentName?: string,
  // doctor?: UserInterface,
) => {
  const templateId: waTemplateNames = "slot_booking_gen";

  if (user.phone) {
    try {
      await sendHSMV3(user.phone, templateId, [
        user?.name ? user.name : "there",
        agentName ? agentName : "SB expert",
        `*${timeString}*`,
      ]);

      await addUserTemplateSent(user.uid, templateId);
    } catch (error) {
      console.log("error in sending doc slot message", error);
    }

    try {
      await sendHSMV3(agentPhone, templateId, [
        user?.name ? user.name : "there",
        agentName ? agentName : "SB expert",
        `*${timeString}*`,
      ]);
    } catch (error) {
      console.log("error in whatsapp to agent", error);
    }
  }
};

export const handleSalesConsultation = async (
  user: UserInterface,
  timeString: string,
  agentPhone: string,
) => {
  const templateId: waTemplateNames = "slot_booking_sales_v1";

  if (user.phone) {
    try {
      await sendHSMV3(user.phone, templateId, [
        user?.name ? user.name : "there",
        `*${timeString}*`,
      ]);

      await addUserTemplateSent(user.uid, templateId);
    } catch (error) {
      console.log("error in sending doc slot message", error);
    }

    try {
      await sendHSMV3(
        agentPhone,
        "new_sales_consultation",
        [user?.name ? user.name : "there", `*${timeString}*`],
        { "0": [user.uid] },
        [user.name ? user.name : "New User"],
      );
    } catch (error) {
      console.log("error in sending doc slot message", error);
    }
  }
};
