import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { getPrefixSuffix } from "@constants/organization";
import clsx from "clsx";
import { SbPlans } from "@models/SbPlans/interface";
import { percentIcon } from "@constants/icons/iconURLs";

export type currency = "USD" | "INR";

interface Props {
  plan: SbPlans;
  gradient: string;
  isActive?: boolean;
  currency: currency;
  onTap: () => void;
  loading?: AppSubscription;
}

const PlanV2: React.FC<Props> = ({
  plan,
  gradient,
  isActive,
  currency,
  onTap,
  loading,
}) => {
  const duration = getPrefixSuffix(
    plan.durationInDays ? plan.durationInDays : 0
  );

  const discountPerc = Math.round(
    (((plan?.baseCost ? plan.baseCost : 0) - plan.cost) /
      (plan?.baseCost ? plan.baseCost : 0)) *
      100
  );

  return (
    <div
      onClick={onTap}
      className={clsx(
        "w-full h-full py-5   backdrop-blur-[100px] relative z-0",
        " rounded-2xl overflow-hidden cursor-pointer flex flex-col "
        // isActive ? "border-green-500" : "border-white/25"
      )}
    >
      <p
        className={clsx(
          "text-sm sm:text-base pb-6 font-popSB whitespace-nowrap lg:text-2xl text-center  text-transparent bg-clip-text bg-gradient-to-b",
          gradient
        )}
      >
        {`${duration.prefix} ${duration.suffix}`}
      </p>

      <div className="flex-1 w-full pb-5 font-popSB text-white text-center">
        <p className="text-xl sm:text-2xl w-full lg:text-4xl whitespace-nowrap">
          {currency} {currency === "INR" ? Math.round(plan.cost) : plan.usdCost}
        </p>
        {discountPerc ? (
          <p className="text-xl text-white/40  sm:text-2xl w-full lg:text-[28px] whitespace-nowrap line-through">
            {currency}{" "}
            {currency === "INR"
              ? plan.baseCost && Math.round(plan.baseCost)
              : plan.usdBaseCost}
          </p>
        ) : null}
      </div>
      <div className="w-full px-4 md:w-4/5 mx-auto">
        {plan.mostPopular ? (
          <p
            className={clsx(
              "text-xs pb-2.5 font-popM whitespace-nowrap lg:text-sm text-center  text-transparent bg-clip-text bg-gradient-to-b",
              gradient
            )}
          >
            Most Popular
          </p>
        ) : null}
        <div
          className={clsx(
            " rounded-full bg-gradient-to-r  font-popM text-black text-center text-xs sm:text-sm lg:text-base py-2",
            gradient
          )}
        >
          Get Started
        </div>

        {discountPerc ? (
          <div className="flex items-center pt-4 flex-1 justify-center">
            <img src={percentIcon} alt="" className="w-3 lg:w-5 aspect-1" />
            <p className="text-center font-popM text-[10px] sm:text-xs lg:text-sm text-white/60 pl-1.5">
              {discountPerc}% Off on Sale
            </p>
          </div>
        ) : plan.baseText ? (
          <p className="font-popM text-[10px] sm:text-xs lg:text-sm pt-4 text-center text-white/60">
            {plan.baseText}
          </p>
        ) : null}
      </div>

      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-b backdrop-blur-[100px] rounded-2xl ",
          gradient,
          "opacity-10"
        )}
      />
    </div>
  );
};

export default PlanV2;
