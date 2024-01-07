import { payRequest } from "@hooks/joinBoat/payUtils";
import { getDefaultSubscriptionId } from "@hooks/joinBoat/utils";
import {
  affirmationType,
  subscriptionStatus,
} from "@hooks/subscription/useSubscription";
import { EventInterface } from "@models/Event/Event";
import Script from "next/script";
import SubscriptionModal from "./SubscriptionModal";

interface Props {
  isOpen: boolean;
  affirmation: affirmationType;
  onSuccess: () => void;
  sprintId: string;
  onClose: () => void;
  closeIcon: boolean;
  game: EventInterface;
  userEmail?: string;
  userPhone?: string;
  uid: string;
  onNext: () => void;
  onFreeTrial: () => void;
  isUserOnTrial: boolean;
  // trialExpired: boolean;
  subStatus: subscriptionStatus;
}

const SubscriptionWidget: React.FC<Props> = ({
  //   onSubscribe,
  isOpen,
  onClose,
  game,
  closeIcon,
  userEmail,
  userPhone,
  uid,
  onNext,
  onSuccess,
  affirmation,
  onFreeTrial,
  sprintId,
  isUserOnTrial,
  // trialExpired,
  subStatus,
}) => {
  // const [affirmation, showAffirmation] = useState<boolean>(true);

  // const onShowAffirm = async () => showAffirmation(true);

  const subId = getDefaultSubscriptionId(game);

  const onSubscribe = async () => {
    if (subId)
      await payRequest(
        game.id,
        subId,
        sprintId,
        "",
        uid,
        userEmail ? userEmail : "",
        userPhone ? userPhone : "",
        undefined,
        onSuccess
      );
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        type="text/javascript"
        strategy="afterInteractive"
      />

      <SubscriptionModal
        isOpen={isOpen}
        onClose={onClose}
        game={game}
        closeIcon={closeIcon}
        onSubscribe={onSubscribe}
        affirmation={affirmation}
        onNext={onNext}
        onFreeTrial={onFreeTrial}
        isUserOnTrial={isUserOnTrial}
        // trialExpired={trialExpired}
        subStatus={subStatus}
      />
    </>
  );
};

export default SubscriptionWidget;
