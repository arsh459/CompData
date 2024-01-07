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

const PlanV2Mobile: React.FC<Props> = ({
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
  const isOneMonth =
    plan?.durationInDays && plan.durationInDays === 30 ? true : false;
  const discountPerc = Math.round(
    (((plan?.baseCost ? plan.baseCost : 0) - plan.cost) /
      (plan?.baseCost ? plan.baseCost : 0)) *
      100
  );
  return (
    <div
      className={clsx(
        "h-32 relative z-0  rounded-2xl flex flex-col justify-between",
        !isOneMonth && "rounded-t-none  "
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 -z-10 bg-gradient-to-b backdrop-blur-[100px] rounded-2xl ",
          gradient,
          "opacity-[.24] ",
          !isOneMonth && "rounded-t-none border-b-2"
        )}
      />
      <div
        className={clsx(
          "absolute left-0 right-0 -top-6  -z-10 bg-gradient-to-b rounded-t-2xl  flex items-center  flex-1 justify-center",
          gradient,
          "opacity-[.24]",
          isOneMonth && "hidden"
        )}
      >
        <p className="text-center font-popR text-xs line-through text-white py-1 z-20">
          {currency}{" "}
          {currency === "INR"
            ? plan.baseCost && Math.round(plan.baseCost)
            : plan.usdBaseCost}
        </p>
      </div>

      <p className="text-[22px] font-popSB px-4 pt-2.5 leading-tight">
        <span> {currency}</span> <br />
        <span>{currency === "INR" ? Math.round(plan.cost) : plan.usdCost}</span>
      </p>
      {duration.nbMonth > 1 ? (
        <p className="text-[10px] text-white/30 text-center ">
          {currency}{" "}
          {currency === "INR"
            ? plan.durationInDays && Math.round(plan.cost / duration.nbMonth)
            : Math.round(plan.usdCost / duration.nbMonth)}
          /month
        </p>
      ) : null}

      <p
        className={clsx(
          "text-center font-nunitoB text-sm relative z-0 py-2 text-black",
          gradient,
          "bg-gradient-to-b backdrop-blur-[100px] rounded-b-2xl -z-10"
        )}
      >
        {plan.cost === 0 ? "∞" : duration.prefix}{" "}
        {plan.cost === 0 ? "days" : duration.suffix.split(" ")[0]}
      </p>

      {/* <div
        className={clsx(
          "absolute inset-0 -z-10 bg-gradient-to-b backdrop-blur-[100px] rounded-b-2xl ",
          gradient,
          // "opacity-30 ",
          ""
        )}
      /> */}

      {discountPerc && !plan.mostPopular ? (
        <div className="absolute left-0 right-0 -bottom-6 -z-10 flex items-center pt-4 flex-1 justify-center">
          <img src={percentIcon} alt="" className="w-3 lg:w-5 aspect-1" />
          <p className="text-center font-popR text-xs  text-white/60 pl-1.5">
            {discountPerc}% Off
          </p>
        </div>
      ) : null}
      {plan.mostPopular ? (
        <div className="absolute left-0 right-0 -bottom-6 -z-10 flex items-center pt-4 flex-1 justify-center">
          <p
            className={clsx(
              "text-center font-popR text-xs   pl-1.5 text-transparent bg-clip-text bg-gradient-to-r",
              gradient
            )}
          >
            Popular
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default PlanV2Mobile;
