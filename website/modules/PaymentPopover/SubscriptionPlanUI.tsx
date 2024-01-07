import clsx from "clsx";
import { SubscriptionPlan } from "@models/PaymentMethods";

interface Props {
  plan: SubscriptionPlan;
  selected: boolean;
}

const SubscriptionPlanUI: React.FC<Props> = ({ plan, selected }) => {
  return (
    <div
      className={clsx(
        "shadow-xl hover:shadow-2xl  p-2 rounded-lg",
        selected ? "ring-2 ring-orange-500" : ""
      )}
    >
      <div className={clsx(" h-20 m-2 flex flex-col justify-center")}>
        <div>
          <p className={clsx("text-gray-600 text-sm font-medium text-center")}>
            {plan.name}
          </p>
          <div className={clsx("flex justify-center")}>
            <p className={clsx("text-orange-500 text-xs")}>{plan.currency}</p>
            <p className={clsx("text-gray-600 text-sm text-center")}>
              {plan.amount}
            </p>
          </div>
        </div>

        <div className={clsx("flex justify-center pt-2")}>
          <p className={clsx("text-sm text-gray-700 pr-1 text-center")}>
            {plan.sessions}
          </p>
          <p className={clsx("text-sm text-gray-700")}>classes</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanUI;
