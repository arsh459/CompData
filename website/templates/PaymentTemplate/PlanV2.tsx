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

const PlanV2: React.FC<Props> = ({
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
        " border relative z-0",
        "rounded-2xl lg:rounded-3xl w-full bg-gradient-to-b overflow-hidden cursor-pointer md:min-w-[200px] lg:min-w-[300px]",
        // "rounded-2xl cursor-pointer w-full min-w-[100px] sm:min-w-[140px] max-w-[200px] bg-gradient-to-b overflow-hidden",
        // "rounded-2xl overflow-hidden cursor-pointer flex flex-col  w-3/4",
        gradient,
        isActive ? "border-green-500" : "border-white/10"
      )}
    >
      <div className="flex md:flex-col justify-between items-center text-center">
        <div
          className={clsx(
            "backdrop-blur-3xl   items-center  rounded-t-xl  w-full p-4 lg:p-12"
          )}
          style={{
            backgroundColor: "#100F1A",
            opacity: 0.6,
          }}
        >
          <p
            className={clsx(
              "font-baib text-transparent text-base sm:text-lg lg:text-4xl bg-clip-text bg-gradient-to-b capitalize",
              gradient
            )}
          >
            {currency}
          </p>
          <p
            className={clsx(
              "font-baib text-transparent text-base sm:text-lg lg:text-6xl bg-clip-text bg-gradient-to-b capitalize",
              gradient
            )}
          >
            {currency === "INR" ? Math.round(plan.cost) : plan.usdCost}
          </p>
        </div>
      </div>
      <div className="flex-1" />

      <div className={clsx("bg-gradient-to-r p-2 lg:p-4", gradient)}>
        <p className="text-[#10101A] text-center lg:text-4xl font-baim">
          {duration.prefix} {duration.suffix}
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

export default PlanV2;
