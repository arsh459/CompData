import { sendCohortMessage } from "../../PubSub/notifications/signUpCohortMessage";
import {
  alternativesForTemplates,
  unpaid_noOnboarding_4Days,
  unpaid_noOnboarding_4Days_Array,
  unpaid_onboarded_4Days_pcos,
  unpaid_onboarded_4Days_Array_pcos,
  unpaid_onboarded_4Days_weightloss,
  unpaid_onboarded_4Days_Array_weightloss,
  unpaid_onboarded_4Days_keepfit,
  unpaid_onboarded_4Days_Array_keepfit,
  unpaid_onboarded_4To30Days_pcos,
  unpaid_onboarded_4To30Days_weightloss,
  unpaid_onboarded_4To30Days_keepfit,
  testCohort,
  missed_by_rest_4,
  missed_by_rest_4_30,
} from "../../PubSub/notifications/constants";

export const waCommunicationMain = async (test?: boolean) => {
  try {
    // no onboarding
    console.log("cohort: NO ONBOARDING");
    await sendCohortMessage(
      test ? testCohort : unpaid_noOnboarding_4Days,
      unpaid_noOnboarding_4Days_Array,
      alternativesForTemplates,
      test ? 0.0001 : 1,
    );
  } catch (e) {}

  try {
    console.log();
    console.log("cohort: PCOS 4 days");
    await sendCohortMessage(
      test ? testCohort : unpaid_onboarded_4Days_pcos,
      unpaid_onboarded_4Days_Array_pcos,
      alternativesForTemplates,
      test ? 0.0001 : 1,
    );
  } catch (e) {}

  try {
    console.log();
    console.log("cohort: Weightloss 4 days");
    await sendCohortMessage(
      test ? testCohort : unpaid_onboarded_4Days_weightloss,
      unpaid_onboarded_4Days_Array_weightloss,
      alternativesForTemplates,
      test ? 0.0001 : 1,
    );
  } catch (e) {}

  try {
    console.log();
    console.log("cohort: Keepfit 4 days");
    await sendCohortMessage(
      test ? testCohort : unpaid_onboarded_4Days_keepfit,
      unpaid_onboarded_4Days_Array_keepfit,
      alternativesForTemplates,
      test ? 0.0001 : 1,
    );
  } catch (e) {}

  try {
    console.log();
    console.log("cohort: PCOS 4-30 days");
    await sendCohortMessage(
      test ? testCohort : unpaid_onboarded_4To30Days_pcos,
      unpaid_onboarded_4Days_Array_pcos,
      alternativesForTemplates,
      test ? 0.0001 : 7,
    );
  } catch (e) {}

  try {
    console.log();
    console.log("cohort: Weightloss 4-30 days");
    await sendCohortMessage(
      test ? testCohort : unpaid_onboarded_4To30Days_weightloss,
      unpaid_onboarded_4Days_Array_weightloss,
      alternativesForTemplates,
      test ? 0.0001 : 7,
    );
  } catch (e) {}

  try {
    console.log();
    console.log("cohort: Keepfit 4-30 days");
    await sendCohortMessage(
      test ? testCohort : unpaid_onboarded_4To30Days_keepfit,
      unpaid_onboarded_4Days_Array_keepfit,
      alternativesForTemplates,
      test ? 0.0001 : 7,
    );
  } catch (e) {}

  // missed by rest
  try {
    console.log();
    console.log("cohort: Missed by rest");
    await sendCohortMessage(
      test ? testCohort : missed_by_rest_4,
      unpaid_onboarded_4Days_Array_pcos,
      alternativesForTemplates,
      test ? 0.0001 : 7,
    );
  } catch (e) {}

  try {
    console.log();
    console.log("cohort: Missed by rest");
    await sendCohortMessage(
      test ? testCohort : missed_by_rest_4_30,
      unpaid_onboarded_4Days_Array_pcos,
      alternativesForTemplates,
      test ? 0.0001 : 7,
    );
  } catch (e) {}
};
