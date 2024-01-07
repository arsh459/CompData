import { getAppSubscription, getUserAppSubscription } from "./getEvent";
import { RazorpayPayment } from "./interface";

export const saveSubscriptionPaymentV2 = async (
  appSubId: string,
  sbPlanId: string,
  uid: string,
  companyCode: string,
  duration: number,
  payment?: RazorpayPayment,
  payment_id?: string
) => {
  const firebase = (await import("@config/adminFire")).default;

  const db = firebase.firestore();

  // const appSubscription = await getAppSubscription(appSubId);
  const userAppSubscription = await getUserAppSubscription(appSubId, uid);

  // if (appSubscription) {
  const durationUnix = duration * (24 * 60 * 60 * 1000);
  // const period = appSubscription.duration === "Monthly" ? 30 : 0;
  const now = Date.now();

  const plan_id = `${duration} days access`;

  const batch = db.batch();

  const subRef = db
    .collection("appSubscriptions")
    .doc(appSubId)
    .collection("userSubs")
    .doc(uid);

  const userSubscription = {
    ...(userAppSubscription ? userAppSubscription : {}),

    // ...(userAppSubscription?.freeTrialEndsOn
    //   ? {}
    //   : { freeTrialEndsOn: now + trialPeriod * multiplyer }),
    // ...(userAppSubscription?.freeTrialStartedOn
    //   ? {}
    //   : { freeTrialStartedOn: now }),

    uid,
    numPayments: firebase.firestore.FieldValue.increment(1),

    ...(userAppSubscription?.paidPeriodEndsOn &&
    userAppSubscription.paidPeriodEndsOn + durationUnix > now + durationUnix
      ? {
          paidPeriodEndsOn: userAppSubscription.paidPeriodEndsOn + durationUnix,
        }
      : {
          paidPeriodEndsOn: now + durationUnix,
        }),
    lastPaidUnix: Date.now(),
  };

  batch.set(subRef, userSubscription, { merge: true });

  // save sprintId
  payment_id &&
    payment &&
    batch.set(subRef.collection("payments").doc(payment_id), {
      ...payment,
      plan_id: plan_id,
    });

  // add company code
  batch.update(db.collection("users").doc(uid), {
    companyCodes: firebase.firestore.FieldValue.arrayUnion(companyCode),
    ["waMessageStatus.paymentDone"]: true,
    sbPlanId,
  });

  await batch.commit();
  // }

  // const userObjRef = subObjRef.collection("userSubs").doc(uid);
  // const userSub = await userObjRef.get();

  // await subRef.get(subRef);

  // set user subscription
};

export const saveSubscriptionPayment = async (
  appSubId: string,
  payment: RazorpayPayment,
  payment_id: string,
  uid: string,
  companyCode: string,
  duration?: number
) => {
  const firebase = (await import("@config/adminFire")).default;

  const db = firebase.firestore();

  const appSubscription = await getAppSubscription(appSubId);
  const userAppSubscription = await getUserAppSubscription(appSubId, uid);

  if (appSubscription) {
    const trialPeriod = appSubscription.freeTrialDuration
      ? appSubscription.freeTrialDuration
      : 0;
    const period = appSubscription.duration === "Monthly" ? 30 : 0;
    const now = Date.now();

    const multiplyer = 24 * 60 * 60 * 1000;

    const batch = db.batch();

    const subRef = db
      .collection("appSubscriptions")
      .doc(appSubId)
      .collection("userSubs")
      .doc(uid);

    const userSubscription = {
      ...(userAppSubscription ? userAppSubscription : {}),

      ...(userAppSubscription?.freeTrialEndsOn
        ? {}
        : { freeTrialEndsOn: now + trialPeriod * multiplyer }),
      ...(userAppSubscription?.freeTrialStartedOn
        ? {}
        : { freeTrialStartedOn: now }),

      uid,
      numPayments: firebase.firestore.FieldValue.increment(1),

      ...(userAppSubscription?.paidPeriodEndsOn
        ? {
            paidPeriodEndsOn: firebase.firestore.FieldValue.increment(
              period * multiplyer
            ),
          }
        : {
            paidPeriodEndsOn: now + period * multiplyer,
          }),
    };

    batch.set(subRef, userSubscription, { merge: true });

    // save sprintId
    batch.set(subRef.collection("payments").doc(payment_id), {
      ...payment,
    });

    // add company code
    batch.update(db.collection("users").doc(uid), {
      companyCodes: firebase.firestore.FieldValue.arrayUnion(companyCode),
    });

    await batch.commit();
  }

  // const userObjRef = subObjRef.collection("userSubs").doc(uid);
  // const userSub = await userObjRef.get();

  // await subRef.get(subRef);

  // set user subscription
};

export const savePayment = async (
  // eventId: string,
  // teamId: string,
  gameId: string,
  payment: RazorpayPayment,
  // baseOrderId: string,
  // razorpay_signature: string,
  payment_id: string,
  // cohortId: string,
  uid: string,
  sprintId?: string,
  roundId?: string
  // codeId?: string
) => {
  const firebase = (await import("@config/adminFire")).default;

  const db = firebase.firestore();

  const batch = db.batch();

  const subRef = db
    .collection("users")
    .doc(uid)
    .collection("subscriptions")
    .doc(gameId);

  batch.set(
    subRef,
    {
      gameId,
      paidOnUnix: Date.now(),
      ...(sprintId
        ? { paidSprints: firebase.firestore.FieldValue.arrayUnion(sprintId) }
        : {}),
      ...(roundId
        ? { paidRounds: firebase.firestore.FieldValue.arrayUnion(roundId) }
        : {}),
    },
    { merge: true }
  );

  // save sprintId
  batch.set(subRef.collection("payments").doc(payment_id), {
    ...payment,
    sprintId: sprintId ? sprintId : "",
  });

  await batch.commit();
  // await db
  //   .collection("users")
  //   .doc(uid)
  //   .collection("subscriptions")

  //   .doc(gameId)
  //   .set(sbSubscription);

  // if a discount code is used
  // if (codeId) {
  //   await db
  //     .collection("sbEvents")
  //     .doc(eventId)
  //     .collection("inviteCodes")
  //     .doc(codeId)
  //     .update({ timesUsed: firebase.firestore.FieldValue.increment(1) });
  // }
};

export const saveError = async (
  component: string,
  message: string,
  path: string
) => {
  const firebase = (await import("@config/adminFire")).default;

  const db = firebase.firestore();
  await db.collection("errors").doc().set({
    componentName: component,
    message: message,
    screenName: path,
    time: new Date().getTime(),
    uid: "",
  });
};

export const saveSubscription = async (
  // eventId: string,
  // teamId: string,
  // gameId: string,
  payment: RazorpayPayment,
  // baseOrderId: string,
  // razorpay_signature: string,
  payment_id: string,
  // cohortId: string,
  uid: string,
  subscriptionId: string,
  planId: string

  // codeId?: string
) => {
  const firebase = (await import("@config/adminFire")).default;

  const db = firebase.firestore();

  const batch = db.batch();

  const userRef = db.collection("users").doc(uid);
  batch.update(userRef, {
    userRazorPlans: firebase.firestore.FieldValue.arrayUnion(subscriptionId),
  });

  // add subscription
  const subRef = db
    .collection("users")
    .doc(uid)
    .collection("subscriptionsV2")
    .doc(subscriptionId);

  batch.set(subRef, {
    startedOn: Date.now(),
    planId,
  });

  batch.set(subRef.collection("payments").doc(payment_id), {
    ...payment,
  });

  await batch.commit();
};
