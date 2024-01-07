// import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
// import { subscriptionStatus } from "./useSubscription";

export const useSubscriptionModalV2 = () =>
  // currentStatus: subscriptionStatus
  //   basePlanStatus: subscriptionStatus
  // onBack: () => void
  {
    const [subVisible, toggleSubscreen] = useState<boolean>(false);

    // const navigation = useNavigation();

    // useEffect(() => {
    //   if (
    //     currentStatus === "EXPIRED"
    //   ) {
    //     toggleSubscreen(true);
    //   } else if (currentStatus === "SUBSCRIBED") {
    //     toggleSubscreen(false);
    //   }
    // }, [currentStatus]);

    const onCloseModal = () => {
      // if (currentStatus === "EXPIRED") {
      toggleSubscreen(false);
      // setTimeout(() => toggleSubscreen(false), 100);
      // setTimeout(() => navigation.goBack(), 200);
      // } else {
      // toggleSubscreen(false);
      // }
    };
    const onShowModal = () => toggleSubscreen(true);

    return {
      subVisible,
      onShowModal,
      onCloseModal,
    };
  };
