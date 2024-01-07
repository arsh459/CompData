import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { subscriptionStatus } from "./useSubscription";

export const useSubscriptionModal = (
  currentStatus: subscriptionStatus,
  basePlanStatus: subscriptionStatus
  // onBack: () => void
) => {
  const [subVisible, toggleSubscreen] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (
      currentStatus === "EXPIRED"
      //  && basePlanStatus === "EXPIRED"
    ) {
      toggleSubscreen(true);
    }
  }, [currentStatus, basePlanStatus]);

  const onCloseModal = () => {
    if (
      currentStatus === "EXPIRED"
      // && basePlanStatus === "EXPIRED"
    ) {
      navigation.goBack();
    } else {
      toggleSubscreen(false);
    }
  };
  const onShowModal = () => toggleSubscreen(true);

  return {
    subVisible,
    onShowModal,
    onCloseModal,
  };
};
