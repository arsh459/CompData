import { sbAppDL } from "../../../constants/email/contacts";
import { UserRank } from "../../../models/Activity/Activity";
import { sendHSM } from "../../../models/Conversations/sendHSM";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { UserInterface } from "../../../models/User/User";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";
import {
  // createParamsForWorkoutReminder,
  createParamsForWorkoutUpdate,
} from "./paramGenerator";

// export const sendWorkoutUpdateNotification = async (
//   coachEvent: sbEventInterface,
//   toUser: UserInterface,
//   userRank1: UserRank,
//   userRank2: UserRank,
//   toUserRank: UserRank | undefined,
//   coachKey?: string,
//   coachName?: string,
// ) => {
//   if (
//     toUser.name &&
//     coachEvent.name &&
//     coachName &&
//     toUser.phone &&
//     toUserRank
//   ) {
//     const msgParams = createParamsForWorkoutUpdate(
//       toUser.name,
//       coachEvent.name,
//       userRank1,
//       userRank2,
//       `https://socialboat.live/${coachKey}/${coachEvent.eventKey}/workout`,
//       coachName,
//       toUserRank,
//     );

//     try {
//       await sendHSM(
//         toUser.phone,
//         whatsappChannelId,
//         "workout_update_msg",
//         msgParams,
//       );
//     } catch (error) {
//       console.log("error in workout update", toUser.phone);
//     }
//   }
// };

export const sendWorkoutCreateNotification = async (
  coachEvent: sbEventInterface,
  parentEventName: string,
  toUser: UserInterface,
  userRank1: UserRank,
  userRank2: UserRank,
  toUserRank: UserRank | undefined,
  week: string,
  coachKey?: string,
  coachName?: string,
) => {
  if (toUser.phone) {
    const msgParams = createParamsForWorkoutUpdate(
      week,
      parentEventName,
      toUser.name,
      coachEvent.name,
      userRank1,
      userRank2,
      sbAppDL,
      // `https://socialboat.live/${encodeURI(
      //   coachKey ? coachKey : "",
      // )}/${encodeURI(coachEvent.eventKey ? coachEvent.eventKey : "")}/workout`,
      coachName,
      toUserRank,
    );

    // console.log("msgParams", msgParams);

    // throw new Error();

    try {
      await sendHSM(
        toUser.phone,
        // "+919811800046",
        whatsappChannelId,
        "new_workout_message",
        msgParams,
      );
    } catch (error) {
      console.log("error in workout create", toUser.phone);
    }
  }
};

// export const sendMissingYouNotification = async (
//   coachEvent: sbEventInterface,
//   toUser: UserInterface,
//   userRank1: UserRank,
//   userRank2: UserRank,
//   toUserRank: UserRank | undefined,
//   coachKey?: string,
//   coachName?: string,
// ) => {
//   if (toUser.name && coachEvent.name && coachName && toUser.phone) {
//     const msgParams = createParamsForWorkoutReminder(
//       toUser.name,
//       coachEvent.name,
//       userRank1,
//       userRank2,
//       `https://${coachKey}.socialboat.live`,
//       coachName,
//       toUserRank,
//     );

//     try {
//       await sendHSM(
//         toUser.phone,
//         whatsappChannelId,
//         "workout_reminder_msg",
//         msgParams,
//       );
//     } catch (error) {
//       console.log("error in workout reminder", toUser.phone);
//     }
//   }
// };
