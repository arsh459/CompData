import clsx from "clsx";
import { getPrefixSuffix } from "@constants/organization";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { currency } from "./SelectPlan";
// import WaveBtn from "@components/WaveBtn";

interface Props {
  plan: AppSubscription;
  gradient: string;
  isActive?: boolean;
  currency: currency;
  onTap: (plan: AppSubscription) => void;
}

const Plan: React.FC<Props> = ({
  onTap,
  plan,
  gradient,
  isActive,
  currency,
  // trialFinished,
}) => {
  const duration = getPrefixSuffix(
    plan.durationInDays ? plan.durationInDays : 0
  );

  return (
    <div
      onClick={() => onTap(plan)}
      className={clsx(
        "bg-[#292832]/40 border relative z-0",
        "rounded-2xl overflow-hidden cursor-pointer flex flex-col",
        isActive ? "border-green-500" : "border-white/10"
      )}
    >
      <div className="flex md:flex-col justify-between items-center p-4">
        <div className="flex flex-col justify-center items-center">
          <h3
            className={clsx(
              "font-baib text-transparent text-5xl sm:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-b",
              gradient
            )}
          >
            {plan.cost === 0 ? "∞" : duration.prefix}
          </h3>
          <h5
            className={clsx(
              "font-baib text-transparent text-base sm:text-lg lg:text-xl bg-clip-text bg-gradient-to-b capitalize",
              gradient
            )}
          >
            {plan.cost === 0 ? "days" : duration.suffix}
          </h5>
        </div>
        <div className="grid gap-2 p-3">
          {plan.descList?.map((desc) => (
            <p key={desc} className={clsx("text-[#DDDFF4] text-xs")}>
              {desc}
            </p>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {plan.baseCost ? (
            <h4
              className={clsx(
                "font-baiSb text-transparent text-base sm:text-lg lg:text-xl bg-clip-text bg-gradient-to-b opacity-70 relative z-0 whitespace-nowrap",
                gradient
              )}
            >
              <span>
                @ {currency}{" "}
                {currency === "INR"
                  ? Math.round(plan.baseCost)
                  : currency === "USD"
                  ? plan.usdBaseCost
                  : "0"}
              </span>
              <hr className="absolute left-0 right-0 top-1/2" />
            </h4>
          ) : null}
          <div className="w-2 lg:w-4 aspect-1" />
          <h4
            className={clsx(
              "font-baiSb text-transparent text-base sm:text-lg lg:text-xl bg-clip-text bg-gradient-to-b whitespace-nowrap",
              gradient
            )}
          >
            {plan.cost === 0
              ? "Always Free"
              : `@ ${currency} ${
                  currency === "INR" ? Math.round(plan.cost) : plan.usdCost
                }`}
          </h4>
          <div className="w-2 lg:w-4 aspect-1" />
        </div>
      </div>
      <div className="flex-1" />
      <div className={clsx("bg-gradient-to-r p-1", gradient)}>
        <p className="text-[#10101A] text-center font-baim">
          Click Here to Get Access
        </p>
      </div>
      {plan.recommended && isActive ? (
        <img
          src={
            isActive
              ? "https://ik.imagekit.io/socialboat/Component_1__1__Ty0DCxwIA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658929139107"
              : "https://ik.imagekit.io/socialboat/Group_421_BZ2UlKMH4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658933036093"
          }
          className="absolute -top-1 -right-1 w-6 aspect-1"
          alt=""
        />
      ) : null}
    </div>
  );
};

export default Plan;
