import { payRequest, subscriptionRequestV2 } from "@hooks/joinBoat/payUtils";
import { getDefaultSubscriptionId } from "@hooks/joinBoat/utils";
import {
  affirmationType,
  subscriptionStatus,
} from "@hooks/subscription/useSubscription";
import { basicPlanDetails } from "@hooks/subscription/useSubscriptionV2";
import { UserAppSubscription } from "@models/AppSubscription/AppSubscription";
import {
  createUserAppSubscription,
  saveUserSubscription,
} from "@models/AppSubscription/createAppSubscription";
import { EventInterface } from "@models/Event/Event";
import Script from "next/script";
import { useState } from "react";
import SubscriptionModalV2 from "./SubscriptionModalV2";

/**
 * No Sub -> Done
 * No Sub, Individual game -> Done
 * Sub, No Game -> Done
 * Sub, Individual game
 * Sub - Paused -> TBD
 * Sub - Expired -> Done
 * ExistingUser edge case
 */

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCloseAffirmation: () => void;
  onSubscribeCallback?: () => Promise<void>;
  closeIcon: boolean;
  game: EventInterface;
  userEmail?: string;
  userPhone?: string;
  uid: string;
  userName?: string;
  basicPlan?: basicPlanDetails;
  userAppSubscription?: UserAppSubscription;

  // onNext: () => void;
  // onFreeTrial: () => void;
  // isUserOnTrial: boolean;
  planId: string;
  currentStatus: subscriptionStatus;
  basePlanStatus: subscriptionStatus;

  cost: number;
  moneyBackDays?: number;
  freeAccessDays?: number;
  resetAffirmation: boolean;
}

const SubscriptionWidgetV2: React.FC<Props> = ({
  //   onSubscribe,
  isOpen,
  onClose,
  game,
  closeIcon,
  userEmail,
  userPhone,
  userName,
  userAppSubscription,
  uid,
  // onNext,
  planId,
  basicPlan,
  onSubscribeCallback,
  onCloseAffirmation,
  currentStatus,
  cost,
  moneyBackDays,
  freeAccessDays,
  basePlanStatus,
  resetAffirmation,
}) => {
  const [affirmation, showAffirmation] =
    useState<affirmationType>("TO_BE_SHOWN");
  const [loading, setLoading] = useState<boolean>(false);

  const onCloseAffirmationFinal = () => {
    onCloseAffirmation();
    resetAffirmation ? showAffirmation("TO_BE_SHOWN") : null;
  };

  // console.log("affirmation", affirmation);

  const onSubscribeRequest = async () => {
    try {
      setLoading(true);

      if (userAppSubscription?.freeTrialStartedOn) {
        await subscriptionRequestV2(
          planId,
          uid,
          userEmail ? userEmail : "",
          userPhone ? userPhone : "",
          onSubscribeCallback,
          () => showAffirmation("VISIBLE")
        );
      } else {
        const plan = createUserAppSubscription(
          uid,
          freeAccessDays ? freeAccessDays : 0
        );
        await saveUserSubscription(plan, planId);

        // callbacks
        if (onSubscribeCallback) {
          // console.log("HIII");
          await onSubscribeCallback();
        }

        showAffirmation("VISIBLE");
      }

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const onSinglePayRequest = async () => {
    const subId = getDefaultSubscriptionId(game);
    if (subId && basicPlan) {
      try {
        setLoading(true);
        await payRequest(
          game.id,
          subId,
          basicPlan.plan.appliedOn === "sprint"
            ? basicPlan.currentSprintId
            : "",
          basicPlan.plan.appliedOn === "round" ? basicPlan.currentRoundId : "",
          uid,
          userEmail ? userEmail : "",
          userPhone ? userPhone : "",
          onSubscribeCallback,
          () => showAffirmation("VISIBLE")
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  // console.log("b", basicPlan);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        type="text/javascript"
        strategy="afterInteractive"
      />

      <SubscriptionModalV2
        isOpen={isOpen}
        currentStatus={currentStatus}
        onClose={onClose}
        loading={loading}
        onCloseAffirmation={onCloseAffirmationFinal}
        game={game}
        basePlanStatus={basePlanStatus}
        basicPlan={basicPlan}
        closeIcon={closeIcon}
        onSubscribe={onSubscribeRequest}
        onSinglePayRequest={onSinglePayRequest}
        affirmation={affirmation}
        cost={cost}
        moneyBackDays={moneyBackDays}
        freeAccessDays={freeAccessDays}
      />
    </>
  );
};

export default SubscriptionWidgetV2;
