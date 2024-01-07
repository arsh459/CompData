import clsx from "clsx";
import { SubscriptionPlan } from "@models/PaymentMethods";
import SubscriptionPlanUI from "./SubscriptionPlanUI";
import { useState } from "react";

interface Props {
  plans: SubscriptionPlan[];
}

const SubscriptionHolder: React.FC<Props> = ({ plans }) => {
  const [selected, toggleSelected] = useState<number>(0);
  return (
    // <div className={clsx("")}>
    <div className={clsx("flex space-x-2 justify-center")}>
      {plans.map((plan, index) => {
        return (
          <div
            className={clsx("")}
            key={plan.name}
            onClick={() => toggleSelected(index)}
          >
            <SubscriptionPlanUI plan={plan} selected={index === selected} />
          </div>
        );
      })}
    </div>
    // </div>
  );
};

export default SubscriptionHolder;
