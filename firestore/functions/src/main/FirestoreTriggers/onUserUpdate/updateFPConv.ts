import { mixpanel } from "../../../mixpanel/mixpanel";
import { UserInterface } from "../../../models/User/User";

export const trackOptInMessage = async (
  mixpanel_distinct_id: string,
  event_name: "opt_in_requested" | "opt_in_sent" | "opt_in_failed",
) => {
  await mixpanel.track(event_name, {
    distinct_id: mixpanel_distinct_id,
  });
};

export const addMixpanelTemplateProperty = async (
  templateId: string,
  mixpanel_distinct_id: string,
) => {
  const key = `waMessage_${templateId}`;
  await mixpanel.people.increment(mixpanel_distinct_id, { [key]: 1 });
};

export const trackMarketingNotificationRequested = async (
  mixpanel_distinct_id: string,
  templateId: string,
  cohortId: string,
) => {
  await mixpanel.track("marketNotificationServer_requested", {
    distinct_id: mixpanel_distinct_id,
    notification_id: templateId,
    cohort_id: cohortId,
  });
};

export const trackMarketingNotificationDelivered = async (
  mixpanel_distinct_id: string,
  templateId: string,
  cohortId: string,
) => {
  await mixpanel.track("marketNotificationServer_delivered", {
    distinct_id: mixpanel_distinct_id,
    notification_id: templateId,
    cohort_id: cohortId,
  });
};

export const trackMarketingNotificationRead = async (
  mixpanel_distinct_id: string,
  templateId: string,
  cohortId: string,
) => {
  await mixpanel.track("marketNotificationServer_read", {
    distinct_id: mixpanel_distinct_id,
    notification_id: templateId,
    cohort_id: cohortId,
  });
};

export const trackMarketingNotificationSend = async (
  mixpanel_distinct_id: string,
  templateId: string,
  cohortId: string,
) => {
  await mixpanel.track("marketNotificationServer_sent", {
    distinct_id: mixpanel_distinct_id,
    notification_id: templateId,
    cohort_id: cohortId,
  });
};

export const trackMarketingNotificationFail = async (
  mixpanel_distinct_id: string,
  templateId: string | undefined,
  cohortId: string,
) => {
  await mixpanel.track("marketNotificationServer_fail", {
    distinct_id: mixpanel_distinct_id,
    ...(templateId
      ? { notification_id: templateId }
      : { notification_id: "NA" }),
    cohort_id: cohortId,
  });
};

export const trackCohortComplete = async (
  mixpanel_distinct_id: string,
  uid: string,
  cohortId: string,
) => {
  await mixpanel.track("marketNotificationServer_complete", {
    distinct_id: mixpanel_distinct_id,
    user_id: uid,
    cohort_id: cohortId,
  });
};

export const trackNotificationSend = async (
  mixpanel_distinct_id: string,
  templateId: string,
  templateName: string,
  title: string,
  cohortId?: string,
) => {
  await mixpanel.track("notificationServer_sent", {
    distinct_id: mixpanel_distinct_id,
    notification_id: templateId,
    template_name: templateName,
    title,
    ...(cohortId ? { cohortId } : {}),
  });
};

export const updateMixpanelCallStatus = async (
  userNow: UserInterface,
  userPrev: UserInterface,
  ignoreLastSeen: boolean,
) => {
  if (
    userNow.onboardingCallStatus &&
    userNow.onboardingCallStatus !== userPrev.onboardingCallStatus
  ) {
    if (ignoreLastSeen) {
      await mixpanel.people.set(
        userNow.uid,
        {
          onboarding_call_status: userNow.onboardingCallStatus,
        },
        {
          $ignore_time: true,
        },
      );
    } else {
      await mixpanel.people.set(userNow.uid, {
        onboarding_call_status: userNow.onboardingCallStatus,
      });
    }
  }
};

export const updateFPConv = async (
  userNow: UserInterface,
  userPrev: UserInterface,
) => {
  // fp inc
  if (
    typeof userNow.fpCredit === "number" &&
    typeof userPrev.fpCredit === "number" &&
    userNow.fpCredit > userPrev.fpCredit
  ) {
    await mixpanel.track("conv_earnFP", {
      distinct_id: userNow.uid,
      fp_inc: userNow.fpCredit - userPrev.fpCredit,
    });
  }
};

export const addSlotBooking = async (uid: string) => {
  await mixpanel.track("conv_bookSlot", {
    distinct_id: uid,
  });
};

export const addPaidConvBackDate = async (
  uid: string,
  val: number,
  currency: string,
  product_id?: string,
  store?: string,
  time?: number,
) => {
  await mixpanel.importEvents;

  await mixpanel.track("conv_paid", {
    distinct_id: uid,
    value: val,
    currency: currency,
    product_id: product_id ? product_id : "custom",
    store: store ? store : "agent",
  });
};

export const addPaidConv = async (
  uid: string,
  val: number,
  currency: string,
  product_id?: string,
  store?: string,
) => {
  await mixpanel.track("conv_paid", {
    distinct_id: uid,
    value: val,
    currency: currency,
    product_id: product_id ? product_id : "custom",
    store: store ? store : "agent",
  });
};

export const trackMetricChange = async (
  eventId: string,
  mixpanel_distinct_id: string,
  obj: { [key: string]: string | number | boolean },
) => {
  await mixpanel.track(eventId, {
    distinct_id: mixpanel_distinct_id,
    ...obj,
  });
};
