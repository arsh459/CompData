export const unpaid_noOnboarding_4Days = "3131080";

export const unpaid_onboarded_4Days_pcos = "3131071"; // pending
export const unpaid_onboarded_4Days_weightloss = "3131067";
export const unpaid_onboarded_4Days_keepfit = "3131079";

export const unpaid_onboarded_4To30Days_pcos = "3131072";
export const unpaid_onboarded_4To30Days_weightloss = "3131068";
export const unpaid_onboarded_4To30Days_keepfit = "3131076";

export const missed_by_rest_4 = "3279457";
export const missed_by_rest_4_30 = "3279460";

export const testCohort = "2999433";

export const dayGap = 3;
export const boostDayGap = 1;
export type waTemplateNames =
  | "first_message_v3"
  | "challenge_invite_2_cw"
  | "opt_in_communications"
  | "bootcamp_invite_1"
  | "period_tracker_invite"
  | "period_tracker_invite_v1"
  | "period_tracker_tip_1"
  | "period_tracker_tip_v2"
  | "sb_success"
  | "sb_success_v2"
  | "sakhi_ai_invite"
  | "sakhi_ai_invite_v1"
  | "sakhi_question_1"
  | "share_health_goals"
  | "share_health_goals_v1"
  | "what_is_sb_1"
  | "slot_booking_invite"
  | "slot_booking_invite_v2"
  | "yogacommunity_3"
  | "free_workout"
  | "free_workout_v1"
  | "coach_reachout"
  | "reel_pcos_v1"
  | "reel_pcos_v2"
  | "reel_weightloss_1_v1"
  | "reel_weightloss_2_v1"
  | "reel_keepfit_1_v1"
  | "reel_keepfit_2_v1"
  | "reel_keepfit_3_v1"
  | "try_another_workout"
  | "try_another_workout_v1"
  | "workout_done_market"
  | "workout_done_market_v1"
  | "retry_demo"
  // slots flags for users
  | "slot_booking_doc_v1"
  | "slot_booking_diet_v1"
  | "slot_booking_health_v1"
  | "slot_booking_sales_v1"
  | "slot_booking_gen"
  | "upcoming_reminder_v2"
  | "slot_booking_reminder_v2"
  | "new_task_update";

export const allReelsTemplates: waTemplateNames[] = [
  // "reel_pcos_1",
  // "reel_pcos_2",
  // "reel_pcos_3",
  // "reel_weightloss_1",
  // "reel_weightloss_2",
  // "reel_weightloss_3",
  // "reel_keepfit_1",
  // "reel_keepfit_2",
  // "reel_keepfit_3",
];

// export const signupRotationalOrder: waTemplateNames[] = [
//   "share_health_goals",
//   "sb_success",
//   "what_is_sb_1",
//   // "bootcamp_invite_1",

//   // basis not onboarded user.
//   "sakhi_ai_invite",
//   "period_tracker_invite",
// ];

// export const onboardedRotationArray: waTemplateNames[] = [
//   "slot_booking_invite",
//   "sb_success",
//   "what_is_sb_1",
//   "free_workout",
//   // "bootcamp_invite_1",
//   "sakhi_ai_invite",
//   "period_tracker_invite",
// ];

// export const unpaid_onboarded_4To30Days_Array: waTemplateNames[] = [
//   "slot_booking_invite",
//   "yogacommunity_3",
//   "sb_success",
//   "free_workout",
//   "sakhi_ai_invite",
//   "period_tracker_invite",
// ];

export const unpaid_noOnboarding_4Days_Array: waTemplateNames[] = [
  "share_health_goals_v1",
  "sb_success_v2",
  "challenge_invite_2_cw",
  "free_workout_v1",
];

export const unpaid_onboarded_4Days_Array_pcos: waTemplateNames[] = [
  "challenge_invite_2_cw",
  "reel_pcos_v1",
  // "slot_booking_invite_v2",
  "free_workout_v1", //  workout done
  "reel_pcos_v2",
  "sakhi_question_1", // sakhi tip
  "reel_keepfit_3_v1",
  "retry_demo", // try another workout
  "reel_weightloss_2_v1",
  "reel_keepfit_1_v1",

  "period_tracker_invite_v1", // period tracker tip
  "reel_weightloss_1_v1",
  "reel_keepfit_2_v1",
];

export const unpaid_onboarded_4Days_Array_weightloss: waTemplateNames[] = [
  "challenge_invite_2_cw",
  "reel_weightloss_1_v1",
  // "slot_booking_invite_v2",
  "free_workout_v1", //  workout done
  "reel_keepfit_1_v1",
  "reel_weightloss_2_v1",
  "sakhi_question_1", // sakhi tip
  "reel_keepfit_3_v1",
  "retry_demo", // try another workout
  "reel_keepfit_2_v1",
  "period_tracker_invite_v1", // period tracker tip
];

export const unpaid_onboarded_4Days_Array_keepfit: waTemplateNames[] = [
  "challenge_invite_2_cw",
  "reel_keepfit_1_v1",
  // "slot_booking_invite_v2",
  "free_workout_v1", //  workout done
  "reel_keepfit_2_v1",
  "reel_keepfit_3_v1",

  "retry_demo", // try another workout
  "reel_weightloss_1_v1",
  "sakhi_question_1", // sakhi tip
  "reel_weightloss_2_v1",

  "period_tracker_invite_v1", // period tracker tip
];

export const duplicateTemplates: Partial<
  Record<waTemplateNames, waTemplateNames>
> = {
  free_workout_v1: "free_workout",
  sb_success_v2: "sb_success",
  workout_done_market_v1: "workout_done_market",
  period_tracker_tip_v2: "period_tracker_tip_1",
  period_tracker_invite_v1: "period_tracker_invite",
  share_health_goals_v1: "share_health_goals",
};

export const alternativesForTemplates: Partial<
  Record<waTemplateNames, waTemplateNames>
> = {
  bootcamp_invite_1: undefined,
  free_workout_v1: "workout_done_market_v1",
  sakhi_ai_invite_v1: "sakhi_question_1",
  period_tracker_invite_v1: "period_tracker_tip_v2",
  retry_demo: "try_another_workout_v1",
  slot_booking_invite_v2: undefined,
  yogacommunity_3: undefined,
  // reel_pcos_1: "reel_pcos_2",
  // reel_pcos_2: "reel_pcos_3",
  // reel_weightloss_1: "reel_weightloss_2",
  // reel_weightloss_2: "reel_weightloss_3",
  // reel_keepfit_1: "reel_keepfit_2",
  // reel_keepfit_2: "reel_keepfit_3",
};
