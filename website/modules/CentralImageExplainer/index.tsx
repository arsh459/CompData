import clsx from "clsx";
import React from "react";
import Message from "./Message";
import { paymentMethodsLeft, prelaunch } from "./constants";
import PaymentPopover from "@modules/PaymentPopover/PaymentPopover";
import { paymentMethodType } from "@models/PaymentMethods";
import VideoCard from "@components/cards/videoCard";
import { fundCapaign } from "@templates/profile/sector-crowd/constants";

interface Props {}

const CentralImageExplainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="">
      <div className={clsx("lg:hidden pl-8 pr-8")}>{children}</div>
      <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
        <div className={clsx("sm:flex flex-col sm:items-end")}>
          {paymentMethodsLeft.map((item) => {
            return (
              <div className="p-8 sm:p-4" key={item.heading}>
                <Message text={item.text} heading={item.heading}>
                  <PaymentPopover
                    paymentType={item.method as paymentMethodType}
                    paymentMethods={item.paymentMethod}
                    plans={item.subPlans}
                    perViewPlan={item.plan}
                    widgetHeading={item.widgetHeading}
                  />
                </Message>
              </div>
            );
          })}
        </div>

        <div
          className={clsx(
            "flex flex-col justify-center items-center sm:items-start"
          )}
        >
          {/* {paymentMethodsRight.map((item) => { */}
          {/* return ( */}
          <div className="pl-8 pr-8 sm:pl-4 sm:pr-4" key={prelaunch.heading}>
            <Message text={prelaunch.text} heading={prelaunch.heading}>
              <div className={clsx("p-8 shadow-2xl", "rounded-xl")}>
                <p className="font-semibold text-xl text-gray-700 text-center pb-1">
                  Raise for a cause
                </p>
                <VideoCard
                  name={fundCapaign.name}
                  url={fundCapaign.videoURL}
                  live={false}
                  cost={fundCapaign.pledged}
                  currency={fundCapaign.currency}
                  campaign={true}
                  funded={fundCapaign.funded}
                />
              </div>
            </Message>
          </div>
        </div>
        <div className={clsx("hidden lg:block")}>{children}</div>
      </div>
    </div>
  );
};

export default CentralImageExplainer;

// Flexible susbscriptions
// pay per view
// Tipping
// First class free
// Select free
// Discount vouchers
