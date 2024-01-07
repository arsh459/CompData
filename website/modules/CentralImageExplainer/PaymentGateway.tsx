import clsx from "clsx";
import React from "react";

interface Props {}

const PaymentGateway: React.FC<Props> = ({}) => {
  return (
    <div className={clsx("flex justify-center")}>
      <div>
        <p
          className={clsx(
            "text-5xl lg:text-6xl font-bold  md:text-left text-gray-700"
          )}
        >
          Get paid for <p className={clsx("text-orange-500")}>your skills</p>
        </p>
        <div className="md:pt-6 pt-2">
          <p className="text-lg lg:text-xl font-medium text-gray-500  md:text-left">
            Charge for subscription,
          </p>
          <p className="text-lg lg:text-xl font-medium text-gray-500  md:text-left">
            Pay per view,
          </p>
          <p className="text-lg lg:text-xl font-medium text-gray-500  md:text-left">
            Or launch crowdfunding campaigns
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
