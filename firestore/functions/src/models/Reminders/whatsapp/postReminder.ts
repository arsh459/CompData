import {
  sbAppDL,
  toSaurav,
  toSauravPhone,
  toSwapnil,
  toSwapnilPhone,
} from "../../../constants/email/contacts";
import { getParamsForNewPostMessage } from "../../../main/FirestoreTriggers/onPaymentCreate/handleWhatsappMessage";
// import { onNewPost_email } from "../../../main/FirestoreTriggers/utils/sendgrid";
import { whatsappChannelId } from "../../../main/Https/messagebird/constants/identifiers";
import { sendHSM } from "../../Conversations/sendHSM";
import { getSbEventById } from "../../sbEvent/getUtils";
import { sbEventInterface } from "../../sbEvent/sbEvent";
import { getUserById } from "../../User/Methods";
import { UserInterface } from "../../User/User";
import { Reminder, whatsappTemplates } from "../Reminder";
import { getNewPostUsers } from "../users/getToRemindUsers";
import * as functions from "firebase-functions";
import { canMessageGo } from "./messageState";

export const newPostReminder_whatsapp = async (reminder: Reminder) => {
  const { toUsers, host, eventObj, author } = await getPostData_forMessage(
    reminder,
  );

  // if (host?.userKey === "rahul_2992" && eventObj) {
  //   await sendPostMessageToUser(host, host, reminder, eventObj, author);
  //   return true;
  // } else
  // functions.logger.log("toUser", toUsers?.length, host?.name, author?.name);

  if (toUsers && host && eventObj) {
    for (const toUser of toUsers) {
      functions.logger.log(toUser.name, toUser.phone, reminder.templateId);

      // throw new Error("HI");

      // team leader message to all
      if (
        author?.uid === host.uid &&
        toUser.uid !== author.uid &&
        !toUser.unsubscribe &&
        toUser?.communityMemberType !== "manager" && // not to manager
        canMessageGo(toUser)
      ) {
        // console.log("is author", toUser.name);
        try {
          await sendPostMessageToUser(
            toUser.phone,
            toUser.email,
            toUser.name,
            host,
            reminder,
            eventObj,
            "new_post",
            author,
          );
        } catch (error) {
          console.log("error in host message");
        }
      }
      // author is manager to all
      else if (
        // author?.uid !== host.uid && // author is not host
        author?.communityMemberType === "manager" && // author is manager
        toUser.uid !== author.uid && // to user is not author
        !toUser.unsubscribe && // to user is not unsubscribed
        canMessageGo(toUser)
      ) {
        // console.log("is manager", toUser.name, toUser.phone);
        try {
          await sendPostMessageToUser(
            toUser.phone,
            toUser.email,
            toUser.name,
            host,
            reminder,
            eventObj,
            "new_post_user",
            author,
          );
        } catch (error) {
          console.log("error in host message");
        }
      }

      // someone else in team message only to captain
      else if (
        author?.uid !== host.uid && // author is not team leader
        toUser.uid !== author?.uid && // author is not to send user
        toUser.uid === host.uid && // to send user is host
        !toUser.unsubscribe &&
        canMessageGo(toUser)
      ) {
        // console.log("is host", toUser.name, toUser.phone);
        try {
          await sendPostMessageToUser(
            toUser.phone,
            toUser.email,
            toUser.name,
            host,
            reminder,
            eventObj,
            "new_post_user",
            author,
          );
        } catch (error) {
          console.log("error", toUser.phone);
        }
      }
    }

    // for each message sent to admins
    try {
      await sendPostMessageToUser(
        toSwapnilPhone,
        toSwapnil,
        host?.name ? host.name : "there",
        host,
        reminder,
        eventObj,
        "new_post_user",
        author,
      );
    } catch (error) {
      console.log("error", toSwapnilPhone);
    }

    try {
      await sendPostMessageToUser(
        toSauravPhone,
        toSaurav,
        host?.name ? host.name : "there",
        host,
        reminder,
        eventObj,
        "new_post_user",
        author,
      );
    } catch (error) {
      console.log("error in author message");
    }

    return true;
  }

  return false;
};

export const getPostData_forMessage = async (reminder: Reminder) => {
  if (reminder.communityId && reminder.eventId) {
    const toUsers = await getNewPostUsers(reminder.eventId, reminder.cohortId);
    const host = await getUserById(reminder.communityId);
    const author = await getUserById(
      reminder.authorId ? reminder.authorId : "",
    );
    const eventObj = await getSbEventById(reminder.eventId);

    return {
      toUsers,
      host,
      eventObj,
      author,
    };
  }

  return {};
};

// export const encodeText = (str?: string) => {
//   return encodeURI(str ? str : "");
// };

const sendPostMessageToUser = async (
  toUserPhone: string | undefined,
  toUserEmail: string | undefined,
  toUserName: string | undefined,
  // toUser: UserInterface,
  host: UserInterface,
  reminder: Reminder,
  eventObj: sbEventInterface,
  templateId: whatsappTemplates,
  author?: UserInterface,
) => {
  if (toUserPhone) {
    // const link = `https://socialboat.live/${encodeURI(
    //   `${host.userKey}`,
    // )}/${encodeURI(`${eventObj.eventKey}`)}/?postId=${
    //   reminder.postId ? reminder.postId : ""
    // }`;

    const link = sbAppDL;

    // const link = `https://${host.userKey}.socialboat.live?eventId=${
    //   eventObj.id
    // }&cohortId=${reminder.cohortId ? reminder.cohortId : ""}&parentPostId=${
    //   reminder.postId ? reminder.postId : ""
    // }&nav=program`;

    const params = getParamsForNewPostMessage(
      toUserName ? toUserName : toUserEmail ? toUserEmail : "there",
      eventObj?.name,
      host.name ? host.name : "SocialBoat",
      author?.name ? author.name : "Someone",
      link,
    );

    // console.log("params", params);

    try {
      await sendHSM(
        // "+919811800046",
        toUserPhone,
        whatsappChannelId,
        templateId,
        params,
      );
    } catch (error) {
      console.log("error in post whatsapp message", toUserPhone);
    }

    if (toUserEmail && author?.name) {
      try {
        // await onNewPost_email(
        //   toUserEmail,
        //   toUserName,
        //   author.name,
        //   host.name,
        //   eventObj.name,
        //   link,
        // );
      } catch (error) {
        console.log("error in post email", toUserEmail);
      }
    }
  }
};
