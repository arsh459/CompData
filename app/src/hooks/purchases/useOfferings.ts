import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { getOfferingToShow } from "./utils";
import crashlytics from "@react-native-firebase/crashlytics";

export const useOfferings = (loaded: boolean) => {
  const [purchaseOffering, setPurchaseOffering] = useState<PurchasesOffering>();
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useAuthContext();

  useEffect(() => {
    const getOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        const offering = getOfferingToShow(state.gameId, offerings);

        if (offering && offering.availablePackages) {
          // const current = offerings.current;

          // current

          setPackages(offering.availablePackages);
          setPurchaseOffering(offering);
        }
      } catch (error: any) {
        console.log("error in offerings", error);
        crashlytics().recordError(error);
      }
    };

    loaded && getOfferings();
  }, [state.gameId, loaded]);

  const makePurchase = async (
    pack: PurchasesPackage
    // onSuccessPurchase: () => void
  ) => {
    try {
      console.log("pack", pack);
      setLoading(true);
      const { customerInfo } = await Purchases.purchasePackage(pack);
      setRefresh((p) => p + 1);

      weEventTrack("paywallSuccess_noClick", {
        value: pack.product.price,
        planId: pack.identifier,
        planName: pack.product.title,
      });

      // update payment done flag
      await firestore()
        .collection("users")
        .doc(state.uid)
        .update({
          ["waMessageStatus.paymentDone"]: true,
        });

      // paid convesrsion
      weEventTrack("conv_paid", {
        value: pack.product.price,
        currency: pack.product.currencyCode,
        product_id: `${pack.product.title}`,
        store: Platform.OS === "ios" ? "ios" : "android",
      });

      return customerInfo;
      //   if (typeof purchaserInfo.entitlements.active.pro !== "undefined") {
      //     // unlock feature
      //     onSuccessPurchase();
      //   }
    } catch (error: any) {
      console.log("error in make purchase", error);
      crashlytics().recordError(error);
      setLoading(false);
    }
  };

  return {
    makePurchase,
    packages,
    purchaseOffering,
    refresh,
    loading,
    setLoading,
    setRefresh,
  };
};
