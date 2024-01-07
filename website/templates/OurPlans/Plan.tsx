import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { getPrefixSuffix } from "@constants/organization";
import clsx from "clsx";
import LoadingModal from "@components/loading/LoadingModal";

export type currency = "USD" | "INR";

interface Props {
  plan: AppSubscription;
  gradient: string;
  isActive?: boolean;
  currency: currency;
  onTap: () => void;
  loading?: AppSubscription;
}

const Plan: React.FC<Props> = ({
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

  return (
    <div
      onClick={onTap}
      className={clsx(
        "w-full h-full bg-[#292832]/10 backdrop-blur-[100px] relative z-0",
        "border rounded-2xl overflow-hidden cursor-pointer flex flex-col",
        isActive ? "border-green-500" : "border-white/25"
      )}
    >
      <h4 className="flex-1 p-6 font-baib text-white text-center">
        {plan.cost === 0 ? (
          <>
            <span className="text-sm sm:text-base lg:text-lg">Always</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">Free</span>
          </>
        ) : (
          <>
            <span className="text-sm sm:text-base lg:text-lg">{currency}</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">
              {currency === "INR" ? Math.round(plan.cost) : plan.usdCost}
            </span>
          </>
        )}
      </h4>
      <h3
        className={clsx(
          "bg-gradient-to-r font-baim text-black text-center text-base sm:text-xl lg:text-2xl px-6 py-2",
          gradient
        )}
      >
        {plan.cost === 0 ? "∞" : duration.prefix}{" "}
        {plan.cost === 0 ? "days" : duration.suffix}
      </h3>
      {plan.recommended && isActive ? (
        <img
          src={
            isActive
              ? "https://ik.imagekit.io/socialboat/tr:h-100,c-maintain_ratio,fo-auto/Component_1__1__Ty0DCxwIA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658929139107"
              : "https://ik.imagekit.io/socialboat/tr:h-100,c-maintain_ratio,fo-auto/Group_421_BZ2UlKMH4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658933036093"
          }
          className="absolute top-1 right-1 w-6 aspect-1"
          alt=""
        />
      ) : null}
      {loading === plan ? (
        <LoadingModal fill="#ff735c" width={40} height={40} fixed={false} />
      ) : null}
    </div>
  );
};

export default Plan;
