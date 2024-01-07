// import { backButton } from "@constants/icons";
// import { completedIconRedTick } from "@constants/icons/iconURLs";
import {
  affirmationType,
  subscriptionStatus,
} from "@hooks/subscription/useSubscription";
import { basicPlanDetails } from "@hooks/subscription/useSubscriptionV2";
import { EventInterface } from "@models/Event/Event";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import SubscriptionAffirmation from "./SubscriptionAffirmation";
// import clsx from "clsx";
// import BackIcon from "public/icons/BackIcon";
// import SubscriptionContentV2 from "./SubscriptionContentV2";
import SubscriptionContentV4 from "./SubscriptionContentV4";

interface Props {
  isOpen: boolean;
  onSubscribe: () => Promise<void>;

  onSinglePayRequest: () => void;
  // onFreeTrial: () => void;
  onClose: () => void;
  onCloseAffirmation: () => void;
  closeIcon: boolean;
  game: EventInterface;
  affirmation: affirmationType;
  basicPlan?: basicPlanDetails;
  // onNext: () => void;
  // subStatus: subscriptionStatus;
  loading: boolean;
  cost: number;
  moneyBackDays?: number;
  freeAccessDays?: number;
  basePlanStatus: subscriptionStatus;
  currentStatus: subscriptionStatus;
  // trialExpired: boolean;
}

const SubscriptionModalV2: React.FC<Props> = ({
  onSubscribe,
  loading,
  isOpen,
  onClose,
  onCloseAffirmation,
  game,
  closeIcon,
  affirmation,
  cost,
  basicPlan,
  moneyBackDays,
  basePlanStatus,
  freeAccessDays,
  currentStatus,
  onSinglePayRequest,
  // trialExpired,
}) => {
  // console.log("affirmation", affirmation);
  return (
    <CreateModal
      isOpen={isOpen}
      heading=""
      onBackdrop={() => {}}
      onButtonPress={() => {}}
      onCloseModal={() => {}}
      bgData="bg-black fixed inset-0 z-50 w-full h-full max-w-md mx-auto"
    >
      {affirmation === "VISIBLE" ? (
        <SubscriptionAffirmation onNext={onCloseAffirmation} />
      ) : affirmation === "TO_BE_SHOWN" ? (
        // <SubscriptionContentV2
        //   onSubscribe={onSubscribe}
        //   onClose={closeIcon ? onClose : undefined}
        //   cost={cost}
        //   freeAccessDays={freeAccessDays}
        //   moneyBackDays={moneyBackDays}
        //   topMedia={game.media?.length ? game.media[0] : undefined}
        //   topThumbnail={game.thumbnail}
        //   topText={`${game.courseGoal} ${game.courseGoalPrimary}`}
        //   programDetails={["Lorem ipsem", "lorem ipsem", "lorem ispem"]}
        // />
        <SubscriptionContentV4
          onSubscribe={onSubscribe}
          onSinglePayRequest={onSinglePayRequest}
          onClose={closeIcon ? onClose : undefined}
          cost={cost}
          loading={loading}
          basicPlan={basicPlan}
          basePlanStatus={basePlanStatus}
          // singlePlanCost={50}
          subscriptionDuration="1 Month"
          // singlePlanDuration="3 days"
          // singlePlanFeatures={["a", "b"]}
          // freeAccessDays={freeAccessDays}
          // moneyBackDays={moneyBackDays}
          // topMedia={game.media?.length ? game.media[0] : undefined}
          // topThumbnail={game.thumbnail}
          topText={"Are you the fittest athlete?"}
          // programDetails={["Lorem ipsem", "lorem ipsem", "lorem ispem"]}
          // gameName={game?.name}
        />
      ) : (
        <SubscriptionAffirmation onNext={onCloseAffirmation} />
      )}
    </CreateModal>
  );
};

export default SubscriptionModalV2;

/**
 * Sign in with free trial.
 *
 * User needs to authorise the card.
 *
 * If authorised: Then free trial starts
 *
 * If unauthorised: Go to home. Pay per game
 *
 * GamePage
 * // if sub -> hasAccess
 * // if paidForGame -> hasAccess
 *
 */
