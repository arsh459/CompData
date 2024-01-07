// import { backButton } from "@constants/icons";
// import { completedIconRedTick } from "@constants/icons/iconURLs";
import {
  affirmationType,
  subscriptionStatus,
} from "@hooks/subscription/useSubscription";
import { EventInterface } from "@models/Event/Event";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import SubscriptionAffirmation from "./SubscriptionAffirmation";
// import clsx from "clsx";
// import BackIcon from "public/icons/BackIcon";
import SubscriptionContent from "./SubscriptionContent";

interface Props {
  isOpen: boolean;
  onSubscribe: () => void;
  onFreeTrial: () => void;
  onClose: () => void;
  closeIcon: boolean;
  game: EventInterface;
  affirmation: affirmationType;
  onNext: () => void;
  subStatus: subscriptionStatus;
  isUserOnTrial: boolean;
  // trialExpired: boolean;
}

const SubscriptionModal: React.FC<Props> = ({
  onSubscribe,
  isOpen,
  onClose,
  game,
  closeIcon,
  onNext,
  affirmation,
  onFreeTrial,
  subStatus,
  isUserOnTrial,
  // trialExpired,
}) => {
  // console.log("game", game.pricing);
  return (
    <CreateModal
      isOpen={isOpen}
      heading=""
      onBackdrop={onClose}
      onButtonPress={onClose}
      onCloseModal={onClose}
      bgData="bg-black fixed inset-0 z-50 w-full h-full mx-auto"
    >
      {affirmation === "TO_BE_SHOWN" ? (
        <SubscriptionContent
          game={game}
          onSubscribe={onSubscribe}
          onFreeTrial={onFreeTrial}
          onClose={closeIcon ? onClose : undefined}
          subStatus={subStatus}
          isUserOnTrial={isUserOnTrial}
          // trialExpired={trialExpired}
        />
      ) : (
        <SubscriptionAffirmation onNext={onNext} />
      )}
    </CreateModal>
  );
};

export default SubscriptionModal;
