import { createContext, useContext } from "react";
import {
  SubscriptionContextProps,
  SubscriptionContextInterface,
} from "./interface";
import { useUserContext } from "@providers/user/UserProvider";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useSubscription } from "./hooks/useSubscription";
// import { getFreeTierDays } from "./hooks/utils";
// import { useUserPlanStatus } from "@hooks/subscription/useUserPlanStatus";
// import { useSubscriptionV2 } from "@hooks/subscription/useSubscriptionV2";
// import { usePurchaser } from "@hooks/purchases/usePurchaser";
import { useOfferings } from "@hooks/purchases/useOfferings";
// import { useSubscriptionModal } from "@hooks/subscription/useSubscriptionModal";
import { useUserPlanStatusV2 } from "@hooks/subscription/useUserPlanStatusV2";
import { useSubscriptionModalV2 } from "@hooks/subscription/useSubscriptionModalV2";
import { useIsPro } from "@hooks/mixpanel/useIsPro";
import { useSbPlan } from "@hooks/purchases/useSbPlan";
// import { usePurchaser } from "@hooks/purchases/usePurchaser";

const SubscriptionContext = createContext<
  SubscriptionContextInterface | undefined
>(undefined);

function SubscriptionProvider({ children, loaded }: SubscriptionContextProps) {
  const { user } = useUserContext();

  // const { game, selectedGameId } = useGameContext();

  const { subVisible, onShowModal, onCloseModal } = useSubscriptionModalV2();
  const { sbplan } = useSbPlan(user?.sbPlanId);
  // res.currentStatus
  // res.basePlanStatus
  // () => {}
  const { packages, setRefresh, makePurchase, refresh, loading, setLoading } =
    useOfferings(loaded);
  const res = useUserPlanStatusV2(
    // user?.userRazorPlans,
    user?.uid,
    refresh,
    setLoading,
    loaded
  );

  // const { purchaserInformation } = usePurchaser();

  const value = {
    subStatus: res.currentStatus,
    // subStatus: "EXPIRED",
    sbplan,
    // onHideSub,
    // onSuccessSub,
    setRefresh,
    subVisible,
    onShowModal,
    onCloseModal,
    res,
    packages,
    makePurchase,
    loading,
  };

  useIsPro(res.currentStatus);

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

function useSubscriptionContext() {
  const context = useContext(SubscriptionContext);

  if (context === undefined) {
    throw new Error(
      "useSubscriptionContext must be used within SubscriptionProvider"
    );
  }

  return context;
}

export { SubscriptionProvider, useSubscriptionContext };
