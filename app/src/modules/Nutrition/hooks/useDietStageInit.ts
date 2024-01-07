import { useEffect } from "react";
import useDietPlanStage from "../store/useDietPlanStage";
import { shallow } from "zustand/shallow";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useUserStore } from "@providers/user/store/useUserStore";

export const useDietStageInit = () => {
  const { setPlanStage } = useDietPlanStage(
    (state) => ({
      setPlanStage: state.setPlanStage,
    }),
    shallow
  );

  const { res } = useSubscriptionContext();
  const isSubscribed = res.currentStatus === "SUBSCRIBED";

  const { hasPlan, hasFilledForm } = useUserStore((state) => {
    return {
      hasPlan: state.user?.nutritionBadgeId ? true : false,
      hasFilledForm: state.user?.flags?.dietFormFilled ? true : false,
    };
  }, shallow);

  //   console.log("hasPlan", hasPlan, hasFilledForm, isSubscribed);

  useEffect(() => {
    if (!isSubscribed) {
      setPlanStage("notSubscribed");
    } else if (!hasFilledForm) {
      setPlanStage("subscribedFormNotFilled");
    } else if (hasFilledForm && !hasPlan) {
      setPlanStage("subscribedHasNoPlan");
    } else if (hasPlan) {
      setPlanStage("subscribedHasPlan");
    }
  }, [isSubscribed, hasPlan, hasFilledForm]);
};
