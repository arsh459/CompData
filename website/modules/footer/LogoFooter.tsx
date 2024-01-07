import clsx from "clsx";
import React from "react";
import HolidayingLogo from "components/logo/index";
import { companyDetails } from "./constants";
// import AppLogos from "@module/header/appLogos";
interface Props {
  //   heading: string;
  //   elements: {text: string; link: string; externalLink?: boolean}[];
}

const LogoFooteer: React.FC<Props> = ({}) => {
  return (
    <div className={clsx("")}>
      <div>
        <div>
          <HolidayingLogo text={true} />
        </div>

        <div className={clsx("pl-0")}>
          <p className={clsx("text-sm text-gray-500 pr-10 italic pt-2")}>
            We are on a mission to help creators around the world earn from
            their talent & knowledge. Join to know more
          </p>
          {/* <p className={clsx("text-sm text-gray-700 font-light")}> */}
          {/* All pages look better on app */}
          {/* </p> */}
        </div>
        {/* <div className={clsx("pt-2 pb-2")}><AppLogos /></div> */}

        <div className={clsx("pt-0 sm:pt-10 pl-0 hidden sm:block")}>
          <p className={clsx("text-base text-gray-700")}>Address</p>
          <p className={clsx("text-gray-700 text-xs font-light")}>
            {companyDetails.name}
          </p>
          <p className={clsx("text-gray-800 text-xs font-light")}>
            {companyDetails.address}
          </p>
          <p className={clsx("text-gray-800 text-xs font-light")}>
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
