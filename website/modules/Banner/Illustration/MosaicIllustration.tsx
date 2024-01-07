import MobileInteractive from "@modules/Banner/MobileInteractive/MobileInteractive";
import clsx from "clsx";
import React from "react";

export interface pageInterface {
  name:
    | "listing"
    | "whatsapp"
    | "reviews"
    | "dashboard"
    | "inbox"
    | "live"
    | "live_to_recorded"
    | "stream";
  heading: string;
  size: "small" | "tiny" | "screen";
}

interface Props {
  screensLeft: pageInterface[];
  screensRight: pageInterface[];
  direction: "textLeft" | "textRight";
  elementRight?: JSX.Element;
}

const MosaicIllustration: React.FC<Props> = ({
  children,
  screensLeft,
  screensRight,
  direction,
  elementRight,
}) => {
  return (
    <div className="mx-auto my-auto">
      <div className={clsx("lg:hidden pb-8")}>{children}</div>
      <div className={clsx("grid grid-cols-2")}>
        {/* <div className={clsx("grid grid-cols-3")}> */}
        {direction === "textLeft" ? (
          <div className={clsx("hidden lg:block my-auto")}>{children}</div>
        ) : null}
        {screensLeft.map((item) => {
          return (
            <div
              key={item.name}
              className={clsx(
                "justify-center items-center sm:items-end",
                "pb-4"
              )}
            >
              <p className="pb-2 text-gray-700 font-semibold text-xl text-center">
                {item.heading}
              </p>

              <MobileInteractive screen={item.name} size={item.size} />
            </div>
          );
        })}

        <div
          className={clsx(
            "flex flex-col justify-center items-center sm:items-start"
          )}
        >
          {screensRight.map((item) => {
            return (
              <div
                key={item.name}
                className="pl-8 pr-8 sm:pl-4 sm:pr-4 pb-4 pt-8 sm:pt-0"
              >
                <p className="pb-2 text-gray-700 font-semibold text-xl text-center">
                  {item.heading}
                </p>
                <MobileInteractive size={item.size} screen={item.name} />
              </div>
            );
          })}
          {elementRight ? (
            <div className="pl-8 pr-8 sm:pl-4 sm:pr-4 pb-4 pt-8 sm:pt-0">
              {elementRight}
            </div>
          ) : null}
        </div>
        {direction === "textRight" ? (
          <div className={clsx("hidden lg:block my-auto")}>{children}</div>
        ) : null}
      </div>
    </div>
  );
};

export default MosaicIllustration;
