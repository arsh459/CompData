// import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { updateCustomerInfoDb } from "@models/User/updateUtils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import crashlytics from "@react-native-firebase/crashlytics";
// import { useUserContext } from "@providers/user/UserProvider";
// import { useAppConfiguration } from "@providers/Config/hooks/useAppConfiguration";
import { useEffect, useState } from "react";
import Purchases, { CustomerInfo } from "react-native-purchases";
import { getDuration } from "./utils";

export const usePurchaser = (
  refresh?: number,
  setLoading?: (newState: boolean) => void,
  loaded?: boolean
  // onCloseModal?: () => void
) => {
  const [purchaserInformation, setPurchaser] = useState<CustomerInfo>();
  const [planIdentifyer, setPlanIdentifyer] = useState<string>();

  const [appDaysLeft, setDaysLeft] = useState<number>(-1);
  const [msLeft, setMSLeft] = useState<number>(0);
  const [inAppPurchaseStatus, setStatus] =
    useState<subscriptionStatus>("PENDING");

  const { state } = useAuthContext();
  // const { user } = useUserContext();
  // const { config } = useAppConfiguration();

  useEffect(() => {
    const getPurchaserInfo = async () => {
      try {
        const purchaser = await Purchases.getCustomerInfo();
        const now = Date.now();

        // active subscriptions
        // for (const activeId of purchaser.activeSubscriptions) {
        // // subscriptions
        // if (
        //   config?.subIdToEntitlementId &&
        //   config.subIdToEntitlementId[activeId]
        // ) {
        // }
        // }
        const expirationDates = purchaser.allExpirationDates;
        const allExpirationDatesMillis: { [id: string]: number } = {};
        let maxEndUnix: number = -1;
        let selectedIdentifier: string = "";
        for (const key of Object.keys(expirationDates)) {
          // if (
          //   config?.subIdToEntitlementId &&
          //   config.subIdToEntitlementId[key]
          // ) {
          //   const entId = config.subIdToEntitlementId[key];
          // }

          const dtSt = expirationDates[key];
          if (dtSt) {
            const expDtUnix = new Date(dtSt).getTime();

            if (expDtUnix > maxEndUnix && expDtUnix > now) {
              maxEndUnix = expDtUnix;
              selectedIdentifier = key;
            }

            allExpirationDatesMillis[key] = expDtUnix;
          } else {
            allExpirationDatesMillis[key] = -1;
          }
        }

        // if active subscriptions

        // if (purchaser.activeSubscriptions.length) {
        //   maxEndUnix = now + 1 * 24 * 60 * 60 * 1000;
        //   selectedIdentifier = purchaser.activeSubscriptions[0];
        // }

        // check for active subscriptions

        // const entId = getEntitlementId(state.gameId);

        // const ent = purchaser.entitlements.active;

        // if (ent[entId]) {
        //   for (const entitilementKey of Object.keys(ent)) {
        //     const entInfo = ent[entitilementKey];

        //     for (const key of Object.keys(entInfo)) {
        //     }
        //     if (entInfo.expirationDate) {
        //       const expirationDateUnix = new Date(
        //         entInfo.expirationDate
        //       ).getTime();

        //       if (expirationDateUnix > now) {
        //         maxEndUnix = expirationDateUnix;
        //         selectedIdentifier = entInfo.productIdentifier;
        //         break;
        //         // selectedIdentifier = identifier;
        //       }
        //     }
        //   }

        // no subscriptions, check for day pass
        if (maxEndUnix <= 0 && purchaser?.nonSubscriptionTransactions) {
          for (const nonSubProduct of purchaser.nonSubscriptionTransactions) {
            const purchaseUnix = new Date(nonSubProduct.purchaseDate).getTime();

            const duration = getDuration(nonSubProduct.productIdentifier); // getPrefix(nonSubProduct.productIdentifier);

            if (typeof duration === "number") {
              const endUnix = purchaseUnix + duration * 24 * 60 * 60 * 1000;

              if (endUnix > now) {
                maxEndUnix = endUnix;
                selectedIdentifier = nonSubProduct.productIdentifier;
                break;
                // selectedIdentifier = identifier;
              }
            }
          }
        }
        // }

        if (maxEndUnix > 0) {
          const ms = maxEndUnix - now;
          const days = Math.ceil(ms / (24 * 60 * 60 * 1000));

          // setStatus("EXPIRED");
          // setPurchaser(purchaser);
          // setDaysLeft(0);
          // setPlanIdentifyer("");

          setMSLeft(ms);
          setStatus("SUBSCRIBED");
          setPurchaser(purchaser);
          setDaysLeft(days);
          setPlanIdentifyer(selectedIdentifier);
          setLoading && setLoading(false);
        } else {
          setStatus("EXPIRED");
          setPurchaser(purchaser);
          setDaysLeft(0);
          setPlanIdentifyer("");
          setLoading && setLoading(false);
        }

        state.uid &&
          updateCustomerInfoDb(state.uid, purchaser, allExpirationDatesMillis);
        // } else {
        //   setStatus("EXPIRED");
        //   setPurchaser(purchaser);
        //   setDaysLeft(0);
        //   setPlanIdentifyer("");
        // }
      } catch (error: any) {
        console.log("error in usePurchaser", error);
        setLoading && setLoading(false);
        crashlytics().recordError(error);
      }
    };

    loaded && getPurchaserInfo();
  }, [
    refresh,
    setLoading,
    state.gameId,
    loaded,
    // user?.allExpirationDatesMillis
  ]);

  return {
    purchaserInformation,
    appDaysLeft,
    inAppPurchaseStatus,
    planIdentifyer,
    msLeft,
  };
};
