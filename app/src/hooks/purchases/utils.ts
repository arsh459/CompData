import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { appSubPlanId } from "@modules/ProScreenMain/GetAccessMain";
import firestore from "@react-native-firebase/firestore";
import { PACKAGE_TYPE, PurchasesOfferings } from "react-native-purchases";

// export const getPrefix = (name: string) => {
//   const namePrefixes = name.split("_");
//   if (namePrefixes.length) {
//     const duration = PrefixDurations[namePrefixes[0].toLowerCase()];

//     if (duration) {
//       return duration;
//     }
//   }

//   return undefined;
// };
export const getEntitlementId = (gameId: string): string => {
  if (gameId === TEAM_ALPHABET_GAME) {
    return "pro";
  } else {
    return gameId;
  }
};

const getRequiredOffering = (
  offerings: PurchasesOfferings,
  needOfferingId: string
) => {
  for (const offeringId of Object.keys(offerings.all)) {
    if (offeringId === needOfferingId) {
      return offerings.all[offeringId];
    }
  }
};

export const getOfferingToShow = (
  gameId: string,
  offerings: PurchasesOfferings
) => {
  if (gameId === TEAM_ALPHABET_GAME) {
    return getRequiredOffering(offerings, "sb_monthly");
  }

  return getRequiredOffering(offerings, gameId);
};

export const getDurationString = (id: PACKAGE_TYPE, productId: string) => {
  if (id === PACKAGE_TYPE.MONTHLY) {
    return "1 month";
  } else if (id === PACKAGE_TYPE.SIX_MONTH) {
    return "6 months";
  } else if (id === PACKAGE_TYPE.ANNUAL) {
    return "1 year";
  } else if (id === PACKAGE_TYPE.LIFETIME) {
    return "Lifetime";
  } else if (id === PACKAGE_TYPE.THREE_MONTH) {
    return "3 months";
  } else if (id === PACKAGE_TYPE.TWO_MONTH) {
    return "2 months";
  } else if (id === PACKAGE_TYPE.UNKNOWN) {
    return "";
  } else if (id === PACKAGE_TYPE.WEEKLY) {
    return "1 Week";
  } else if (id === PACKAGE_TYPE.CUSTOM) {
    const idFormat = productId.toLowerCase();
    const isMonthly = idFormat.includes("monthly");
    if (isMonthly) {
      return "1 month";
    }

    const isWeekly = idFormat.includes("weekly");
    if (isWeekly) {
      return "1 Week";
    }

    const isDaily = idFormat.includes("daily");
    if (isDaily) {
      return "1 Day";
    }

    const daysFormat = idFormat.split("daypass");
    if (daysFormat.length > 1) {
      const days = parseInt(daysFormat[0]);
      if (!isNaN(days)) {
        return `${days} Days`;
      }
    }
  }

  return "";
};

export const getDuration = (id: string) => {
  const idFormat = id.toLowerCase();
  const isMonthly = idFormat.includes("monthly");
  if (isMonthly) {
    return 7;
  }
  const isWeekly = idFormat.includes("weekly");
  if (isWeekly) {
    return 7;
  }
  const isDaily = idFormat.includes("daily");
  if (isDaily) {
    return 1;
  }

  const daysFormat = idFormat.split("daypass");
  if (daysFormat.length > 1) {
    const days = parseInt(daysFormat[0]);
    if (!isNaN(days)) {
      return days;
    }
  }

  return 1;
};

export const updateInAppSubscription = async (
  uid: string,
  paidPeriodEndsOn: number
) => {
  await firestore()
    .collection("appSubscriptions")
    .doc(appSubPlanId)
    .collection("userSubs")
    .doc(uid)
    .set(
      {
        uid,
        numPayments: firestore.FieldValue.increment(1),
        paidPeriodEndsOn: paidPeriodEndsOn,
      },
      { merge: true }
    );
};
