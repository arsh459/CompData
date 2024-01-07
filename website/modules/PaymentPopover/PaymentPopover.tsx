import clsx from "clsx";
import {
  paymentMethods,
  paymentMethodType,
  payPerViewPlan,
  SubscriptionPlan,
} from "@models/PaymentMethods";
import SubscriptionHolder from "./SubscriptionHolder";
import PayWidget from "./PayWidget";
import PayPerViewHolder from "./PayPerView";

interface Props {
  paymentType: paymentMethodType;
  paymentMethods: paymentMethods[];
  plans?: SubscriptionPlan[];
  perViewPlan?: payPerViewPlan;
  widgetHeading: string;
}

const PaymentPopover: React.FC<Props> = ({
  paymentMethods,
  paymentType,
  plans,
  perViewPlan,
  widgetHeading,
}) => {
  return (
    <div className={clsx("shadow-2xl p-4 pl-8 pr-8 rounded-lg")}>
      <p
        className={clsx("text-xl font-semibold text-gray-700 text-center pb-4")}
      >
        {widgetHeading}
      </p>
      {paymentType === "subscription" && plans ? (
        <div className={clsx("")}>
          <SubscriptionHolder plans={plans} />
        </div>
      ) : paymentType === "payPerView" && perViewPlan ? (
        <div className={clsx("")}>
          <PayPerViewHolder plan={perViewPlan} />
        </div>
      ) : null}
      {paymentMethods.length > 0 ? (
        <div className={clsx("flex justify-center pt-2")}>
          <PayWidget paymentMethods={paymentMethods} />
        </div>
      ) : null}
    </div>
  );
};

export default PaymentPopover;
