import clsx from "clsx";
import React from "react";
// import HolidayingLogo from "components/logo/index";
import { companyDetails } from "./constants";
import HolidayingLogoV2 from "@components/logoV2";
// import AppLogos from "@module/header/appLogos";
interface Props {
  switchColor?: boolean;
  //   heading: string;
  //   elements: {text: string; link: string; externalLink?: boolean}[];
}

const LogoFooteer: React.FC<Props> = ({ switchColor }) => {
  return (
    <div className={clsx("")}>
      <div>
        <div>
          <HolidayingLogoV2 text={true} />
        </div>

        <div className={clsx("pl-0")}>
          <p
            className={clsx(
              "text-sm  pr-10 italic pt-2",
              switchColor ? "text-white" : "text-white"
            )}
          >
            Real life game that combines competitiveness of sports with fun of
            video games
          </p>
          {/* <p className={clsx("text-sm text-white font-light")}> */}
          {/* All pages look better on app */}
          {/* </p> */}
        </div>
        {/* <div className={clsx("pt-2 pb-2")}><AppLogos /></div> */}

        <div className={clsx("pt-0 sm:pt-10 pl-0 hidden sm:block")}>
          <p className={clsx("text-base text-white")}>Address</p>
          <p className={clsx("text-white text-xs font-light")}>
            {companyDetails.name}
          </p>
          <p className={clsx("text-white text-xs font-light")}>
            {companyDetails.address}
          </p>
          <p className={clsx("text-white text-xs font-light")}>
            {`${companyDetails.city}, ${companyDetails.state}-${companyDetails.pin}, ${companyDetails.country}`}
          </p>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LogoFooteer;
