import { companyDetails } from "@templates/LandingPage/components/Footer/constants";
import clsx from "clsx";
import React from "react";
import { footerDataNew } from "./constants";
import FooterColumnV2 from "./FooterColumnV2";
import FooterHandlesV2 from "./FooterHandlesV2";
import LogoFooterV2 from "./LogoFooterV2";

interface Props {
  footerImg?: string;
}

const FooterV3: React.FC<Props> = ({ footerImg }) => {
  return (
    <>
      <footer
        className={clsx(
          "w-full max-w-[1440px] mx-auto pt-20 px-4",
          "hidden sm:grid grid-cols-1 sm:grid-cols-5"
        )}
      >
        <div className={clsx("sm:col-span-2 pr-2 md:pr-8 justify-self-center")}>
          <LogoFooterV2 />
        </div>

        <div
          className={clsx(
            "sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8"
          )}
        >
          {footerDataNew.map((item, index) => {
            return (
              <div
                key={`footer-${item.heading}`}
                className={clsx(
                  "pt-8",
                  index > 1 ? "sm:pt-8 md:pt-0" : "sm:pt-0"
                )}
              >
                <FooterColumnV2
                  heading={item.heading}
                  elements={item.subHeaders}
                />
              </div>
            );
          })}

          <div className={clsx("pt-0  hidden sm:block ")}>
            <p className={clsx("text-white text-lg md:text-xl font-baim ")}>
              Address
            </p>
            <p className={clsx("text-xs md:text-sm text-white/75 font-bail")}>
              {companyDetails.name}
            </p>
            <p
              className={clsx(
                "text-white/75 text-xs md:text-sm font-bail py-2"
              )}
            >
              {companyDetails.address}
            </p>
            <p className={clsx("text-white/75 text-xs md:text-sm font-bail")}>
              {`${companyDetails.city}, ${companyDetails.state}-${companyDetails.pin}, ${companyDetails.country}`}
            </p>
          </div>
        </div>
      </footer>
      <FooterHandlesV2 footerImg={footerImg} />
    </>
  );
};

export default FooterV3;
