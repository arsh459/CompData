import clsx from "clsx";
import React from "react";
import LogoName from "@templates/LandingPage/V2/components/LogoName";
import Link from "next/link";
// import AppLogos from "@module/header/appLogos";
interface Props {
  //   heading: string;
  //   elements: {text: string; link: string; externalLink?: boolean}[];
}

const LogoFooterV2: React.FC<Props> = ({}) => {
  return (
    <div className={clsx("")}>
      <div>
        <div>
          <Link passHref href={`/`}>
            <LogoName />
          </Link>
        </div>

        <div className={clsx("pl-0")}>
          <p
            className={clsx(
              "text-sm md:text-base text-white/75 pr-10  pt-1 font-bair"
            )}
          >
            A Health Transformation App <br />
            for women
          </p>
          {/* <p className={clsx("text-sm text-gray-700 font-light")}> */}
          {/* All pages look better on app */}
          {/* </p> */}
        </div>
        {/* <div className={clsx("pt-2 pb-2")}><AppLogos /></div> */}
      </div>
      {/* <div>
        <div></div>
        <div></div>
      </div> */}
    </div>
  );
};

export default LogoFooterV2;
