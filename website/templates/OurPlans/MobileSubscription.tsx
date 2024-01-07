import { SbPlans } from "@models/SbPlans/interface";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { currency } from "./Plan";
import PlanV2Mobile from "./PlanV2Mobile";
import { gradients } from "./VideoOverlay";
import { useRouter } from "next/router";
import PlanTypeToggler, { planParams } from "./Components/PlanTypeToggler";

interface Props {
  coachRef: string;
  allSbPlan: SbPlans[];
  currency: currency;
  onSinglePayRequest: (plan: SbPlans) => Promise<void>;
  setCurrency: Dispatch<SetStateAction<currency>>;
}
const MobileSubscription: React.FC<Props> = ({
  allSbPlan,
  coachRef,
  currency,
  onSinglePayRequest,
  setCurrency,
}) => {
  const router = useRouter();
  const q = router.query as planParams;

  const planType = q.type ? q.type : "pro";

  return (
    <div className="h-full sm:hidden backdrop-blur-lg flex flex-col justify-between pt-20">
      <div className="px-4">
        <PlanTypeToggler />
      </div>
      <div className="w-full p-4">
        <div className="flex justify-between w-full pb-2">
          <h1 className="text-white text-center capitalize font-popR text-xl sm:text-[28px] lg:text-4xl">
            Select your Plan
          </h1>
        </div>
        <div className="pb-4">
          {planType === "proPlus" ? (
            <p className="font-popR text-sm sm:text-base text-white/70">
              Everything in pro with{" "}
              <span className="text-[#FF6098]">LIVE yoga</span> sessions on{" "}
              <span className="text-[#61BDFF]">ZOOM</span>, 4 days a week.
            </p>
          ) : (
            <p className="font-popR text-sm sm:text-base text-white/70">
              Workout with follow along videos, weekly diet sessions and doctor
              consultations
            </p>
          )}
        </div>
        <div className="w-full lg:w-3/4 grid grid-cols-3 auto-cols-fr gap-3 my-8">
          {allSbPlan
            .filter((each) => each.planType === planType)
            ?.map((plan, index) => {
              const trialFinished = false;
              return trialFinished ? null : (
                <Link
                  key={`${plan.id}-${index}`}
                  href={`/pay?id=${plan.id}&duration=${
                    plan.durationInDays
                  }&currency=${currency}${coachRef ? `&${coachRef}` : ""}`}
                >
                  <PlanV2Mobile
                    plan={plan}
                    currency={currency}
                    gradient={gradients[plan.durationInDays || 30]}
                    onTap={() => onSinglePayRequest(plan)}
                    // loading={loading}
                  />
                </Link>
              );
            })}
        </div>
        <button
          disabled
          aria-hidden
          className="w-full bg-white rounded-2xl py-4 my-4 opacity-0 pointer-events-none"
        >
          <p className="text-[#003747] text-sm font-popSB  text-center">
            Book FREE consultation
          </p>
        </button>
      </div>
    </div>
  );
};

export default MobileSubscription;
