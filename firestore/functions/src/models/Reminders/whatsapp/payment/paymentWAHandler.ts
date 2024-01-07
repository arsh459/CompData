// import { sbAppDL } from "../../../../constants/email/contacts";
// import { getEventMetricsForEventObj } from "../../../../main/FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { getSprintTimeForId } from "../../../../main/FirestoreTriggers/onActivityWrite/utils";
// import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
// import { getFormattedDateForUnix } from "../../../../main/PubSub/activityTracker/utils";
// import { sendHSM } from "../../../Conversations/sendHSM";
import {
  toSauravPhone,
  toSwapnilPhone,
} from "../../../../constants/email/contacts";
import { sleep } from "../../../../main/FirestoreTriggers/onLiveWorkoutUpdate/handleLiveUpdate";
import { sendHSMV2 } from "../../../Conversations/sendHSMV2";
// import { getSbEventById } from "../../../sbEvent/getUtils";
// import { getGamePricingHandler } from "../../../sbEvent/pricing";
import { getRazorPaymentObj } from "../../../sbPayment/getPayment";
// import { getPaymentObjForGame } from "../../../sbPayment/getPayment";
import { getUserById } from "../../../User/Methods";
import { getProgressForTask, updateUIDForReminder } from "../../getUtils";

export const paymentWAHandler = async (
  id: string,
  // gameId: string,
  paymentId: string,
  authorId: string,
  // paymentId: string,
) => {
  const uidsDone = await getProgressForTask(id);
  //   console.log("uidsDone", uidsDone);

  const paymentObj = await getRazorPaymentObj(authorId, paymentId);

  // const game = await getSbEventById(gameId);
  const user = await getUserById(authorId);

  // const { sprints, after } = getEventMetricsForEventObj(game);

  //   console.log("uidsDone", game?.id, user?.name, sprints?.length, after);

  if (
    paymentObj &&
    user
    // && after && sprints
  ) {
    // const { cost } = getGamePricingHandler(game);

    // console.log("cost", cost);

    // const payObj = await getPaymentObjForGame(authorId, paymentId, game.id);

    // console.log("payObj", payObj);

    // pay obj
    // if (payObj) {
    // sprint start
    // const time = getSprintTimeForId(after, sprints, payObj.sprintId);
    // const formattedTime = getFormattedDateForUnix(time, "hh:mma DD MMM");

    if (
      user.phone &&
      // && formattedTime
      !uidsDone[user.uid]
    ) {
      // console.log(user.phone, formattedTime, !uidsDone[user.uid]);
      // console.log([
      //   { default: user.name ? `${user.name.trim()}` : "there" },
      //   { default: typeof cost === "number" ? `*${cost}*` : `game price` },
      //   { default: formattedTime },
      // ]);

      await sendHSMV2(
        user.phone,
        "game_payment_v7",
        [
          user.name ? `${user.name.trim()}` : "there",
          `${paymentObj.currency} ${paymentObj.amount / 100}`,
        ],
        undefined,
        [
          "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/sb+pro+temp+1+(1).jpg",
        ],
      );

      try {
        await sleep(400);
        await sendHSMV2(
          toSwapnilPhone,
          "game_payment_v7",
          [
            user.name ? `${user.name.trim()}` : "there",
            `${paymentObj.currency} ${paymentObj.amount / 100}`,
          ],
          undefined,
          [
            "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/sb+pro+temp+1+(1).jpg",
          ],
        );

        await sleep(400);
        await sendHSMV2(
          toSauravPhone,
          "game_payment_v7",
          [
            user.name ? `${user.name.trim()}` : "there",
            `${paymentObj.currency} ${paymentObj.amount / 100}`,
          ],
          undefined,
          [
            "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/sb+pro+temp+1+(1).jpg",
          ],
        );
      } catch (error) {
        console.log("error sending message");
      }

      // await sendHSM(user.phone, whatsappChannelId, "payment_received_v2", [
      //   { default: user.name ? `${user.name.trim()}` : "there" },
      //   { default: typeof cost === "number" ? `*${cost}*` : `game price` },
      //   { default: formattedTime },
      //   {
      //     default: sbAppDL, //  "https://socialboat.live/teams"
      //   },
      // ]);

      await updateUIDForReminder(id, user.uid);

      return true;
    }
    // }
  }

  return false;
};
