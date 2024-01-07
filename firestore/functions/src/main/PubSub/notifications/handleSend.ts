import {
  buttonValue,
  sendHSMV3,
} from "../../../models/Conversations/sendHSMV2";
import { getActiveRound } from "../../../models/Rounds/getUserRankV2";
import { getUserGoalStringV2 } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { sleep } from "../../FirestoreTriggers/onLiveWorkoutUpdate/handleLiveUpdate";
import {
  addMixpanelTemplateProperty,
  trackCohortComplete,
  trackMarketingNotificationFail,
  trackMarketingNotificationRequested,
} from "../../FirestoreTriggers/onUserUpdate/updateFPConv";
import { savePushSend } from "../../Https/mixpanel/getUtils";
import { MixpanelMemberFirstore } from "../../Https/mixpanel/interface";
import { blockedUsers } from "../../Https/waMessage/sendUtils";
import { waTemplateNames } from "./constants";
import * as admin from "firebase-admin";

export const canPushMarketingNotification = async (
  memberId: string,
  after: number,
) => {
  const docs = await admin
    .firestore()
    .collection("sends")
    .where("mixpanel_distinct_id", "==", memberId)
    .where("sentUnix", ">=", after)
    .limit(1)
    .get();

  if (docs.docs.length) {
    return false;
  }

  return true;
};

interface CallbackResponse {
  mixpanel_distinct_id?: string;
  notificationId?: string;
  cohortId?: string;
}

export const getCallbackData = (
  mixpanel_distinct_id: string,
  notificationId: string,
  cohortId: string,
): CallbackResponse => {
  return {
    mixpanel_distinct_id,
    notificationId,
    cohortId,
  };
};

export const parseCallbackData = (data: string) => {
  const parsed = JSON.parse(data) as CallbackResponse;

  return parsed;
};

export const handleMarketSend = async (
  cohortId: string,
  notificationId: waTemplateNames | undefined,
  member: MixpanelMemberFirstore,
  user: UserInterface,
) => {
  console.log("unsub", user.unsubscribe);
  if (user?.phone && notificationId) {
    if (blockedUsers.includes(user.phone)) {
      console.log("blocked user", user.phone);
      await markFailed(cohortId, member, notificationId);
    } else if (user.unsubscribe) {
      console.log("unsubscribed user", user.phone);
      await markFailed(cohortId, member, notificationId);
    } else {
      try {
        const img = getHeaderValuesBasisNotificationId(notificationId);
        // console.log("img", [img]);
        // console.log(
        // "body",
        // getBodyValuesBasisNotificationId(notificationId, user),
        // );
        // console.log(
        // "button",
        // getButtonValuesBasisNotificationId(notificationId),
        // );

        const bodyParams = await getBodyValuesBasisNotificationId(
          notificationId,
          user,
        );
        const buttonValues = await getButtonValuesBasisNotificationId(
          notificationId,
        );

        const resp = await sendHSMV3(
          user.phone,
          notificationId,
          bodyParams,
          buttonValues,
          img ? [img] : undefined,
          JSON.stringify(
            getCallbackData(
              member.mixpanel_distinct_id,
              notificationId,
              cohortId,
            ),
          ),
        );

        console.log("response", resp);
        if (resp.result === false) {
          await markFailed(cohortId, member, notificationId);
        } else {
          await markComplete(cohortId, member, user.uid, notificationId);

          await savePushSend(
            member.mixpanel_distinct_id,
            user.uid,
            notificationId,
            resp?.id,
          );

          // notification send request
          await trackMarketingNotificationRequested(
            member.mixpanel_distinct_id,
            notificationId,
            cohortId,
          );

          // increment property
          await addMixpanelTemplateProperty(
            notificationId,
            member.mixpanel_distinct_id,
          );
        }

        // sleep for rate limit
        await sleep(400);
      } catch (error: any) {
        console.log("error", error?.response?.data);
        await markFailed(cohortId, member, notificationId);
      }
    }
  } else {
    console.log("no templateIdToSend", member.user_id);
    await markFailed(cohortId, member);
    await trackCohortComplete(member.mixpanel_distinct_id, user.uid, cohortId);
  }
};

const markFailed = async (
  cohortId: string,
  member: MixpanelMemberFirstore,
  // uid: string,
  notificationId?: waTemplateNames,
) => {
  console.log("FAILED");
  const now = Date.now();

  // mark failed
  await admin
    .firestore()
    .collection("mixpanelCohorts")
    .doc(cohortId)
    .collection("members")
    .doc(member.mixpanel_distinct_id)
    .update({
      lastSent: now,
    });

  await trackMarketingNotificationFail(
    member.mixpanel_distinct_id,
    notificationId,
    cohortId,
  );
};

export const addUserTemplateSent = async (
  uid: string,
  notificationId: waTemplateNames,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      ...(notificationId === "opt_in_communications" ||
      notificationId === "first_message_v3"
        ? { optOutSent: "DONE" }
        : {}),
      [`templatesSent.${notificationId}`]:
        admin.firestore.FieldValue.increment(1),
    });
};

const markComplete = async (
  cohortId: string,
  member: MixpanelMemberFirstore,
  uid: string,
  notificationId?: waTemplateNames,
) => {
  const now = Date.now();

  console.log("COMPLETED");

  await admin
    .firestore()
    .collection("mixpanelCohorts")
    .doc(cohortId)
    .collection("members")
    .doc(member.mixpanel_distinct_id)
    .update({
      lastSent: now,
      ...(notificationId ? { sendTemplateId: notificationId } : {}),
    });

  // save templateId
  if (notificationId) {
    await addUserTemplateSent(uid, notificationId);
    // await admin
    //   .firestore()
    //   .collection("users")
    //   .doc(uid)
    //   .update({
    //     ...(notificationId === "opt_in_communications" ||
    //     notificationId === "first_message_v3"
    //       ? { optOutSent: "DONE" }
    //       : {}),
    //     [`templatesSent.${notificationId}`]:
    //       admin.firestore.FieldValue.increment(1),
    //   });
  }
};

const getNameParam = (user: UserInterface) => {
  return user.name ? `${user.name.trim()}` : "there";
};

const getWeightPram = (member: UserInterface) => {
  return member.weight ? `${member.weight} kgs` : "To be checked";
};

const getDesiredWeightParam = (member: UserInterface) => {
  return member.desiredWeight ? `${member.desiredWeight} kgs` : "To be checked";
};

const getGoalParam = (member: UserInterface) => {
  return member.fitnessGoal
    ? `${getUserGoalStringV2(member.fitnessGoal)}`
    : "Get fit";
};

const getBodyValuesBasisNotificationId = async (
  notificationId: waTemplateNames,
  member: UserInterface,
) => {
  if (notificationId === "first_message_v3") {
    return [];
  } else if (
    notificationId === "share_health_goals" ||
    notificationId === "share_health_goals_v1"
  ) {
    return [getNameParam(member)];
  } else if (
    notificationId === "sb_success" ||
    notificationId === "sb_success_v2"
  ) {
    return [];
  } else if (notificationId === "what_is_sb_1") {
    return [getNameParam(member)];
  } else if (notificationId === "bootcamp_invite_1") {
    return [getNameParam(member)];
  } else if (
    notificationId === "period_tracker_invite" ||
    notificationId === "period_tracker_invite_v1"
  ) {
    return [];
  } else if (notificationId === "sakhi_ai_invite") {
    return [getNameParam(member)];
  } else if (notificationId === "slot_booking_invite_v2") {
    return [getNameParam(member)];
  } else if (notificationId === "slot_booking_invite") {
    return [
      getNameParam(member),
      getWeightPram(member),
      getDesiredWeightParam(member),
      getGoalParam(member),
    ];
  } else if (
    notificationId === "free_workout" ||
    notificationId === "free_workout_v1"
  ) {
    return [
      getNameParam(member),
      getDesiredWeightParam(member),
      getGoalParam(member),
    ];
  } else if (notificationId === "yogacommunity_3") {
    return [getNameParam(member)];
  } else if (notificationId === "coach_reachout") {
    return [
      getNameParam(member),
      getDesiredWeightParam(member),
      getGoalParam(member),
    ];
  } else if (
    notificationId === "period_tracker_tip_1" ||
    notificationId === "period_tracker_tip_v2"
  ) {
    return [getNameParam(member)];
  } else if (notificationId === "sakhi_question_1") {
    return [getNameParam(member)];
  } else if (
    notificationId === "workout_done_market" ||
    notificationId === "workout_done_market_v1"
  ) {
    return [getNameParam(member)];
  } else if (notificationId === "retry_demo") {
    return [getNameParam(member)];
  } else if (notificationId.includes("reel")) {
    return [getNameParam(member)];
  } else if (
    notificationId === "try_another_workout" ||
    notificationId === "try_another_workout_v1"
  ) {
    return [getNameParam(member)];
  } else if (
    notificationId === "reel_keepfit_1_v1" ||
    notificationId === "reel_keepfit_2_v1" ||
    notificationId === "reel_keepfit_3_v1" ||
    notificationId === "reel_pcos_v1" ||
    notificationId === "reel_pcos_v2" ||
    notificationId === "reel_weightloss_1_v1" ||
    notificationId === "reel_weightloss_2_v1"
  ) {
    return [getNameParam(member)];
  } else if (notificationId === "challenge_invite_2_cw") {
    // get current round
    const round = await getActiveRound();
    return [
      getNameParam(member),
      round?.name ? `${round.name}` : "Habit Builder Challenge",
    ];
  }

  return [];
};

const getButtonValuesBasisNotificationId = async (
  notificationId: waTemplateNames,
): Promise<buttonValue | undefined> => {
  if (notificationId === "challenge_invite_2_cw") {
    const round = await getActiveRound();
    return {
      "0": [round?.roundKey ? `${round.roundKey}` : "habitbuilder-challenge"],
    };
  }

  return undefined;
};

export const getHeaderValuesBasisNotificationId = (
  notificationId: waTemplateNames,
): string | undefined => {
  switch (notificationId) {
    case "first_message_v3":
      return "https://sbusermedia.s3.ap-south-1.amazonaws.com/notifications/first_msg.png";
    case "share_health_goals":
    case "share_health_goals_v1":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/share_health_goals.png";
    case "sb_success":
    case "sb_success_v2":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/sb_success.png";
    case "what_is_sb_1":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/what_is_sb.png";
    case "bootcamp_invite_1":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/yogacommunity_3.png";
    case "period_tracker_invite":
    case "period_tracker_invite_v1":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/period_tracker_invite.png";
    case "sakhi_ai_invite":
    case "sakhi_ai_invite_v1":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/sakhi_ai_invite.png";
    case "slot_booking_invite":
      return undefined;
    case "slot_booking_invite_v2":
      return undefined;
    case "free_workout":
    case "free_workout_v1":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/free_workout.png";
    case "yogacommunity_3":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/yogacommunity_3.png";
    case "coach_reachout":
      return undefined;
    case "period_tracker_tip_1":
    case "period_tracker_tip_v2":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/period_tracker_tip_1.png";
    case "sakhi_question_1":
      return "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/sakhi_question_1.png";
    case "workout_done_market":
    case "workout_done_market_v1":
      return undefined;
    case "reel_keepfit_1_v1":
      return "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/whatsapp+(4)+(1).jpg";
    case "reel_keepfit_2_v1":
      return "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/whatsapp+(5)+(1).jpg";
    case "reel_keepfit_3_v1":
      return "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/whatsapp+(6)+(1).jpg";
    case "reel_weightloss_1_v1":
      return "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/whatsapp+(2)+(1).jpg";
    case "reel_weightloss_2_v1":
      return "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/whatsapp+(3)+(1).jpg";
    case "reel_pcos_v1":
      return "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/whatsapp+(7).jpg";
    case "reel_pcos_v2":
      return "https://s3.ap-south-1.amazonaws.com/www.socialboat.live/whatsapp+(1)+(1).jpg";
    case "challenge_invite_2_cw":
      return "https://sbusermedia.s3.ap-south-1.amazonaws.com/notifications/pexels-elina-fairytale-3822118.jpg";
  }

  return undefined;
};
