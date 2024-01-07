import Divider from "@components/divider/Divider";
import clsx from "clsx";
import React from "react";
import BottomFooter from "./BottomFooter";
import { footerData } from "./constants";
import FooterColumn from "./FooterColumn";
import LogoFooteer from "./LogoFooter";

interface Props {}

// About
/*
Company
Influence
Host
Apply
Community
*/

// Discover
/*
Stays
Experiences
Trips
Offbeat stays
Classic hotels
Basic
Premium
Luxury
*/

// Privacy
/*
Terms & conditions
Privacy policy
*/

// Follow us
/**
 Instagram
 Facebook
 LinkedIn
 AngelList
 Crunchbase
 */

// Other platforms
/**
 App store
 Google plat store
 */

// address

// Copyright

const FooterV2: React.FC<Props> = ({}) => {
  return (
    <footer
      className={clsx(
        "w-full",
        "max-w-screen-xl mx-auto md:pb-4 pt-8",
        "p-4 md:p-12"
      )}
    >
      <div className={clsx("grid grid-cols-1 sm:grid-cols-6")}>
        <div className={clsx("sm:col-span-2 pr-2 md:pr-8")}>
          <LogoFooteer />
        </div>

        <div className={clsx("sm:col-span-4")}>
          <div
            className={clsx(
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8"
            )}
          >
            {footerData.map((item, index) => {
              return (
                <div
                  key={`footer-${item.heading}`}
                  className={clsx(
                    "pt-8",
                    index > 1 ? "sm:pt-8 md:pt-0" : "sm:pt-0"
                  )}
                >
                  <FooterColumn
                    heading={item.heading}
                    elements={item.subHeaders}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-8 pb-4">
        <Divider />
      </div>
      <div className={clsx("")}>
        <BottomFooter />
      </div>
    </footer>
  );
};

export default FooterV2;
