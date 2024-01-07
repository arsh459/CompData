import MobileInteractive from "@modules/Banner/MobileInteractive/MobileInteractive";
import { CommunityHomeWrapperProps } from "@templates/communityWrapper/CommunityHomeWrapper";
import { listingTemplateV1Props } from "@templates/listing/listingTemplateV1";

import clsx from "clsx";
import React from "react";

export interface pageInterface {
  name:
    | "listing"
    | "listing-template"
    | "listing-program"
    | "whatsapp"
    | "none"
    | "reviews"
    | "dashboard"
    | "inbox"
    | "live"
    | "live_to_recorded"
    | "community"
    | "whatsapp-workout"
    | "instaprofile"
    | "whatsapp-invite"
    | "community-home"
    | "leaderboard"
    | "stream";
  heading: string;
  listingProps?: listingTemplateV1Props;
  communityWrapperProps?: CommunityHomeWrapperProps;
  size: "small" | "tiny" | "screen" | "tiny-medium" | "medium";
}

interface Props {
  screensLeft: pageInterface[];
  screensRight: pageInterface[];
  direction: "textLeft" | "textRight";
  elementRight?: JSX.Element;
}

const Mosaic: React.FC<Props> = ({
  children,
  screensLeft,
  screensRight,
  direction,
  elementRight,
}) => {
  return (
    <div>
      <div className={clsx("lg:hidden pb-8")}>{children}</div>
      <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
        {/* <div className={clsx("grid grid-cols-3")}> */}
        {direction === "textLeft" ? (
          <div className={clsx("hidden lg:block my-auto")}>{children}</div>
        ) : null}
        {screensLeft.map((item) => {
          // console.log("item", item);
          return (
            <div
              key={item.name}
              className={clsx(
                "flex flex-col justify-center items-center sm:items-end",
                "pb-4"
              )}
            >
              <p className="pb-2 text-gray-700 font-semibold text-xl">
                {item.heading}
              </p>

              <MobileInteractive
                communityWrapperProps={item.communityWrapperProps}
                screen={item.name}
                listingTemplateProps={item.listingProps}
                size={item.size}
              />
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
                className=" sm:pl-4 sm:pr-4 pb-4 pt-8 sm:pt-0"
              >
                <p className="pb-2 text-gray-700 font-semibold text-xl text-center">
                  {item.heading}
                </p>
                <MobileInteractive
                  communityWrapperProps={item.communityWrapperProps}
                  listingTemplateProps={item.listingProps}
                  size={item.size}
                  screen={item.name}
                />
              </div>
            );
          })}
          {elementRight ? (
            <div className=" sm:pl-4 sm:pr-4 pb-4 pt-8 sm:pt-0">
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

export default Mosaic;
