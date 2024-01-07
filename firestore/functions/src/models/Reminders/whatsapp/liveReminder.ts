import { generateParamsForLiveSessionV2 } from "../../../main/FirestoreTriggers/onPaymentCreate/handleWhatsappMessage";
import { onNewPost_email } from "../../../main/FirestoreTriggers/utils/sendgrid";
import { whatsappChannelId } from "../../../main/Https/messagebird/constants/identifiers";
import { sendHSM } from "../../Conversations/sendHSM";
import { sbEventInterface } from "../../sbEvent/sbEvent";
import { UserInterface } from "../../User/User";
import { Reminder } from "../Reminder";
import { getPostData_forMessage } from "./postReminder";

export const liveReminder_whatsapp = async (reminder: Reminder) => {
  const { toUsers, host, eventObj, author } = await getPostData_forMessage(
    reminder,
  );

  const timeString = new Date(
    reminder.meetingTime ? reminder.meetingTime : Date.now(),
  ).toLocaleDateString("default", {
    day: "2-digit",
    month: "short",
    hour12: true,
    minute: "2-digit",
    hour: "numeric",
    weekday: "short",
  });

  // if (host?.userKey === "rahul_2992" && eventObj) {
  //   await sendLiveMessageToUser(host, host, reminder, timeString, eventObj.id);
  //   return true;
  // } else

  if (toUsers && host && eventObj) {
    for (const toUser of toUsers) {
      if (toUser.uid !== author?.uid && !toUser.unsubscribe) {
        await sendLiveMessageToUser(
          toUser,
          host,
          reminder,
          timeString,
          eventObj,
          author,
        );
      }
    }

    return true;
  }

  return false;
};

const sendLiveMessageToUser = async (
  toUser: UserInterface,
  host: UserInterface,
  reminder: Reminder,
  timeString: string,
  eventObj: sbEventInterface,
  author?: UserInterface,
) => {
  if (toUser.phone) {
    const link = `https://${host.userKey}.socialboat.live?eventId=${
      eventObj.id
    }&cohortId=${reminder.cohortId ? reminder.cohortId : ""}&parentPostId=${
      reminder.postId ? reminder.postId : ""
    }&nav=program`;

    const params = generateParamsForLiveSessionV2(
      toUser.name ? toUser.name : toUser.email ? toUser.email : "there",
      host.name ? host.name : host.email ? host.email : "creator",
      timeString,
      "Live session",
      link,
    );

    // console.log("params", params);
    try {
      await sendHSM(
        toUser.phone,
        whatsappChannelId,
        reminder.templateId,
        params,
      );
    } catch (error) {
      console.log("error in live whatsapp message", error);
    }

    if (toUser.email && author?.name) {
      try {
        await onNewPost_email(
          toUser.email,
          toUser.name,
          author.name,
          host.name,
          eventObj.name,
          link,
        );
      } catch (error) {
        console.log("error in post email", error);
      }
    }
  }
};
