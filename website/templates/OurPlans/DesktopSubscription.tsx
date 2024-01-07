import { SbPlans } from "@models/SbPlans/interface";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { currency } from "./Plan";
import PlanV2 from "./PlanV2";
import { gradients } from "./VideoOverlay";
import CurrencyToggler from "./Components/CurrencyToggler";
import PlanTypeToggler, { planParams } from "./Components/PlanTypeToggler";
import { useRouter } from "next/router";
import clsx from "clsx";
interface Props {
  coachRef: string;
  allSbPlan: SbPlans[];
  currency: currency;
  onSinglePayRequest: (plan: SbPlans) => Promise<void>;
  setCurrency: Dispatch<SetStateAction<currency>>;
}

const DesktopSubscription: React.FC<Props> = ({
  allSbPlan,
  coachRef,
  currency,
  onSinglePayRequest,
  setCurrency,
}) => {
  const router = useRouter();
  const q = router.query as planParams;

  const planType = q.type ? q.type : "pro";
  const source = q.source;

  return (
    <>
      <div className="absolute inset-0 hidden sm:block pt-32">
        <div className="w-full h-full max-w-screen-xl mx-auto flex flex-col justify-center items-center">
          <h1 className="text-white pb-2 text-center font-popM text-xl sm:text-[28px] lg:text-4xl flex items-center gap-2">
            <span className="text-white hidden sm:flex">SocialBoat</span>
            {planType === "proPlus" ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF317B] via-[#FF8C8C] to-[#FF477D]">
                Pro Plus
              </span>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#CCA467] via-[#CCA467] to-[#CCA467]">
                Pro
              </span>
            )}
          </h1>
          {planType === "proPlus" ? (
            <p className="font-popR text-sm sm:text-base text-white/70 my-2">
              Everything in pro with{" "}
              <span className="text-[#FF6098]">LIVE yoga</span> sessions on{" "}
              <span className="text-[#61BDFF]">ZOOM</span>, 4 days a week.
            </p>
          ) : (
            <p className="font-popR text-sm sm:text-base text-white/70 my-2">
              Workout with follow along videos, weekly diet sessions and doctor
              consultations
            </p>
          )}
          <div className="w-full sm:w-4/5 lg:w-3/4 grid grid-cols-3 gap-4 my-6">
            {allSbPlan
              .filter((each) => each.planType === planType)
              ?.map((plan, index) => {
                return (
                  <Link
                    key={`${plan.id}-${index}`}
                    href={`/pay?id=${plan.id}&duration=${
                      plan.durationInDays
                    }&currency=${currency}${coachRef ? `&${coachRef}` : ""}`}
                  >
                    <PlanV2
                      plan={plan}
                      currency={currency}
                      gradient={gradients[plan.durationInDays || 30]}
                      onTap={() => onSinglePayRequest(plan)}
                    />
                  </Link>
                );
              })}
          </div>
          <CurrencyToggler currency={currency} setCurrency={setCurrency} />
          <p className="text-white text-center font-popL text-xs lg:text-sm">
            Select Currency
          </p>
        </div>
      </div>

      <div
        className={clsx(
          "absolute left-0 right-0 hidden sm:block",
          source === "joinboat"
            ? "top-14"
            : "top-[82px] bg-black/10 backdrop-blur-2xl"
        )}
      >
        <PlanTypeToggler />
      </div>
    </>
  );
};

export default DesktopSubscription;
