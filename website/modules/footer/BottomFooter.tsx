import clsx from "clsx";
// import Link from "next/link";
import React from "react";
// import Link from 'next/link';
// import HolidayingLogo from '@module/header/holidayingLogo';
// import AppLogos from '@module/header/appLogos';
interface Props {
  //   heading: string;
  //   elements: {text: string; link: string; externalLink?: boolean}[];
}

const BottomFooter: React.FC<Props> = ({}) => {
  return (
    <div className={clsx("")}>
      <div className={clsx("flex justify-center items-center")}>
        <p className={clsx("text-gray-700 text-base text-center")}>
          © SocialBoat. All rights reserved
        </p>
        {/* <p className={clsx("text-gray-700 text-base pl-2 pr-2")}>·</p>
        <Link href="/site-map">
          <a target="_blank">
            <p className={clsx("text-gray-700 text-base underline")}>sitemap</p>
          </a>
        </Link> */}
      </div>
      <div className="flex justify-center">
        <p className={clsx("text-gray-700 text-base text-center")}>Made with</p>
        <p className="pl-1 pr-2">❤️</p>
        <p className={clsx("text-gray-700 text-base text-center")}>in India</p>
      </div>
    </div>
  );
};

export default BottomFooter;
