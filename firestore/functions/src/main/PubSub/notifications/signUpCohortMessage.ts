import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import {
  getCohortMembersToSend,
  getOffsetRange,
} from "../../Https/mixpanel/getUtils";
import { MixpanelMemberFirstore } from "../../Https/mixpanel/interface";
import {
  allReelsTemplates,
  duplicateTemplates,
  waTemplateNames,
} from "./constants";
import { canPushMarketingNotification, handleMarketSend } from "./handleSend";

export const sendCohortMessage = async (
  cohortId: string,
  templateRotationArray: waTemplateNames[],
  alternativeTemplates: Partial<Record<waTemplateNames, waTemplateNames>>,
  dayGap: number,
) => {
  const now = Date.now();
  const now_dayMinus1 = now - dayGap * 24 * 60 * 60 * 1000; // no message in last 24 hours
  const minMSInCohort = now - 1 * 60 * 60 * 1000; // at least one hour in cohort

  // console.log("now_dayMinus1", now_dayMinus1, new Date(now_dayMinus1));

  const { min, max } = getOffsetRange(11, 20, now);

  // console.log("mix", min);
  // console.log("max", max);

  // message

  // message one in dayGap days
  const eligibleMembers = await getCohortMembersToSend(
    cohortId,
    now_dayMinus1,
    min,
    max,
    minMSInCohort,
  );

  console.log("eligibleMembers", eligibleMembers.length);

  for (const member of eligibleMembers) {
    if (member.user_id) {
      // check against other cohorts
      const canPush = await canPushMarketingNotification(
        member.mixpanel_distinct_id,
        now_dayMinus1,
      );

      const user = await getUserById(member.user_id);

      console.log();
      console.log("###");
      console.log("canPush", user?.name, canPush, user?.uid);

      if (canPush && user) {
        const templateIdToSend = getTemplateIdToSend(
          member,
          templateRotationArray,
          alternativeTemplates,
          user,
        );

        console.log(
          // user.name,
          // member.mixpanel_distinct_id,
          // user.uid,
          "templateId:",
          templateIdToSend,
        );

        // throw new Error("Hi Checkpoint");

        await handleMarketSend(cohortId, templateIdToSend, member, user);
      }

      console.log("###");
      console.log();
    }
  }
};

export const getTemplateIdToSend = (
  member: MixpanelMemberFirstore,
  arrayOfRotation: waTemplateNames[],
  alternatives: Partial<Record<waTemplateNames, waTemplateNames>>,
  user: UserInterface,
): waTemplateNames | undefined => {
  if (!user.optOutSent || user.optOutSent !== "DONE") {
    return "first_message_v3"; // "opt_in_communications";
  }

  if (member.sendTemplateId) {
    // console.log("arrayOfRotation", arrayOfRotation);
    const indexBasisOrder = arrayOfRotation.indexOf(member.sendTemplateId);

    // console.log("indexBasisOrder", member.sendTemplateId, indexBasisOrder);

    const indexToSend = indexBasisOrder + 1;

    let toReturnTemplateId: waTemplateNames | undefined;
    for (
      let searched: number = 0;
      searched < arrayOfRotation.length;
      searched++
    ) {
      const toCheck = indexToSend + searched;
      const templateId = arrayOfRotation[toCheck % arrayOfRotation.length];

      // console.log("templateId", templateId);

      const fixedTemplateId = checkIfAlternateIsNeeded(
        templateId,
        user,
        alternatives,
      );

      // check we don't resend slot booking
      // const slotBookingAlreadySent = checkIfSlotBookingIsSent(
      //   user,
      //   fixedTemplateId,
      // );
      // if (slotBookingAlreadySent) {
      //   continue;
      // }
      // check we don't resend slot booking

      // console.log("fixedTemplateId", fixedTemplateId);

      // check if templates sent
      if (
        user.templatesSent &&
        fixedTemplateId &&
        user.templatesSent[fixedTemplateId]
      ) {
        continue;
      }

      // remove duplicate templateId
      if (fixedTemplateId) {
        const duplicateTemplateId = duplicateTemplates[fixedTemplateId];
        if (
          user.templatesSent &&
          duplicateTemplateId &&
          user.templatesSent[duplicateTemplateId]
        ) {
          continue;
        }
      }

      // community invite to women only
      if (
        fixedTemplateId &&
        fixedTemplateId === "yogacommunity_3" &&
        user.gender !== "female"
      ) {
        continue;
      }

      // console.log("fixedTemplateId", fixedTemplateId);

      if (fixedTemplateId) {
        toReturnTemplateId = fixedTemplateId;
        break;
      }
    }

    return toReturnTemplateId;
  }

  return arrayOfRotation[0];
};

const checkIfAlternateIsNeeded = (
  templateId: waTemplateNames,
  user: UserInterface,
  alternatives: Partial<Record<waTemplateNames, waTemplateNames>>,
) => {
  if (allReelsTemplates.includes(templateId)) {
    return getAlternative(templateId, alternatives);
  } else if (
    templateId === "bootcamp_invite_1" &&
    user.waMessageStatus?.bootcamp
  ) {
    return getAlternative(templateId, alternatives);
  } else if (
    templateId === "free_workout" &&
    user.waMessageStatus?.oneWorkoutDone
  ) {
    return getAlternative(templateId, alternatives);
  } else if (
    templateId === "sakhi_ai_invite" &&
    user.waMessageStatus?.triedSakhi
  ) {
    return getAlternative(templateId, alternatives);
  } else if (
    templateId === "period_tracker_invite" &&
    user.waMessageStatus?.periodSync
  ) {
    return getAlternative(templateId, alternatives);
  } else if (
    (templateId === "slot_booking_invite" ||
      templateId === "slot_booking_invite_v2") &&
    (user.onboardingCallStatus === "DONE" ||
      user.onboardingCallStatus === "SCHEDULED" ||
      user.onboardingCallStatus === "RESCHEDULED" ||
      user.onboardingCallStatus === "NOT_INTERESTED")
  ) {
    return getAlternative(templateId, alternatives);
  } else if (
    templateId === "yogacommunity_3" &&
    user.waMessageStatus?.joinedWellnessCommunity
  ) {
    return getAlternative(templateId, alternatives);
  }

  return templateId;
};

const getAlternative = (
  templateId: waTemplateNames,
  alternatives: Partial<Record<waTemplateNames, waTemplateNames>>,
) => {
  // console.log("alternatives", alternatives);
  // console.log("alternative template", alternatives[templateId]);
  if (alternatives[templateId]) {
    return alternatives[templateId];
  }

  return undefined;
};

// const getReelTemplate = (user: UserInterface): waTemplateNames | undefined => {
//   let reelNumber: number = 0;
//   if (user.templatesSent) {
//     for (const templateId in Object.keys(user.templatesSent)) {
//       console.log("templateId", templateId);
//       if (templateId.includes("reel")) {
//         console.log("templateId contains reel", templateId);
//         const reelNumArray = templateId.split("_");
//         console.log("reelNumArray", reelNumArray);
//         if (reelNumArray.length === 3) {
//           const numElement = parseInt(reelNumArray[2]);

//           console.log("numElement", numElement);

//           if (reelNumber < numElement) {
//             reelNumber = numElement;
//           }
//         }
//       }
//     }
//   }

//   let userGoal: "pcos" | "weightloss" | "keepfit" = "pcos";
//   if (user.fitnessGoal?.includes("pcos_pcod")) {
//     userGoal = "pcos";
//   } else if (user.fitnessGoal?.includes("lose_weight")) {
//     userGoal = "weightloss";
//   } else {
//     userGoal = "keepfit";
//   }

//   console.log("reelNumber", reelNumber);
//   console.log("userGoal", userGoal);
//   const temp = getReelTemplateName(userGoal, reelNumber);

//   console.log("temp", temp);

//   return temp;
// };

// const getReelTemplateName = (
//   goal?: "pcos" | "weightloss" | "keepfit",
//   count?: number,
// ): waTemplateNames | undefined => {
//   if (goal && typeof count === "number" && count < 3) {
//     if (count === 0) {
//       if (goal === "pcos") {
//         return "reel_pcos_1";
//       } else if (goal === "keepfit") {
//         return "reel_keepfit_1";
//       } else {
//         return "reel_weightloss_1";
//       }
//     } else if (count === 1) {
//       if (goal === "pcos") {
//         return "reel_pcos_2";
//       } else if (goal === "keepfit") {
//         return "reel_keepfit_2";
//       } else {
//         return "reel_weightloss_2";
//       }
//     } else {
//       if (goal === "pcos") {
//         return "reel_pcos_3";
//       } else if (goal === "keepfit") {
//         return "reel_keepfit_3";
//       } else {
//         return "reel_weightloss_3";
//       }
//     }
//   }

//   return undefined;
// };
