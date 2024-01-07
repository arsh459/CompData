import { useEffect, useState } from "react";
import { subscriptionStatus } from "./useSubscription";

export const useSubscriptionModal = (
  currentStatus: subscriptionStatus,
  basePlanStatus: subscriptionStatus,
  onBack: () => void
) => {
  const [subVisible, toggleSubscreen] = useState<boolean>(false);

  useEffect(() => {
    // console.log("useSubscriptionModal");
    if (currentStatus === "EXPIRED" && basePlanStatus === "EXPIRED") {
      toggleSubscreen(true);
    }
  }, [currentStatus, basePlanStatus]);

  const onCloseModal = () => {
    if (currentStatus === "EXPIRED" && basePlanStatus === "EXPIRED") {
      onBack();
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
