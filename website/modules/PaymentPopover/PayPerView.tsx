import clsx from "clsx";
import { payPerViewPlan } from "@models/PaymentMethods";
// import SubscriptionPlanUI from "./SubscriptionPlanUI";
// import { useState } from "react";

interface Props {
  plan: payPerViewPlan;
}

const PayPerViewHolder: React.FC<Props> = ({ plan }) => {
  //   const [selected, toggleSelected] = useState<number>(0);
  return (
    // <div className={clsx("")}>
    <div className={clsx()}>
      <div className={clsx("flex justify-between")}>
        <div>
          <p className={clsx("text-sm sm:text-xs font-medium text-gray-700")}>
            {plan.name}
          </p>
        </div>
        <div className={clsx("flex")}>
          <p className={clsx("text-sm sm:text-xs  text-orange-500")}>
            {plan.currency}
          </p>
          <p className={clsx("text-sm text-gray-700")}>{plan.amount}</p>
        </div>
      </div>
      <div className={clsx("flex justify-between")}>
        <p className={clsx("text-xs font-light text-gray-500")}>Taxes (2.5%)</p>
        <div className={clsx("flex")}>
          <p className={clsx("text-xs  text-orange-500")}>{plan.currency}</p>
          <p className={clsx("text-xs text-gray-700")}>
            {Math.round(0.25 * plan.amount) / 10}
          </p>
        </div>
      </div>
      <div className={clsx("flex justify-between")}>
        <p className={clsx("text-sm sm:text-xs font-medium text-gray-700")}>
          Total
        </p>
        <div className={clsx("flex")}>
          <p className={clsx("text-sm  text-orange-500")}>{plan.currency}</p>
          <p className={clsx("text-sm text-gray-700 font-medium")}>
            {Math.round(0.25 * plan.amount) / 10 + plan.amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayPerViewHolder;
