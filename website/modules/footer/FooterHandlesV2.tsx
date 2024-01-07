import { landingTeamUp } from "@constants/icons/iconURLs";
import LogoName from "@templates/LandingPage/V2/components/LogoName";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {
  followUsLinks,
  mobileFooterLinks,
  mobileFooterPrivacy,
} from "./constants";
import FooterColumnV2 from "./FooterColumnV2";

interface Props {
  footerImg?: string;
}

const FooterHandlesV2: React.FC<Props> = ({ footerImg }) => {
  return (
    <div
      className={clsx(
        "relative z-0 w-full max-w-[1440px] mx-auto px-4 flex items-center justify-evenly flex-wrap-reverse sm:flex-nowrap"
      )}
    >
      <img
        src={footerImg ? footerImg : landingTeamUp}
        className="w-full sm:w-1/3 max-w-sm object-contain"
        loading="lazy"
        alt={"footer image"}
      />
      <div className="py-8 flex justify-around w-full sm:hidden">
        {mobileFooterPrivacy.subHeaders.map((item) => {
          return (
            <div key={`sub-${item.text}`}>
              <Link passHref href={item.link}>
                <p
                  className={clsx(
                    "text-sm lg:text-base text-[#BCBCBC] font-bair  "
                  )}
                >
                  {item.text}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <p
        className={clsx(
          "text-white text-sm lg:text-base text-center w-full sm:w-1/3"
        )}
      >
        © 2023, SocialBoat.Live
        {/* © SocialBoat. All rights reserved */}
      </p>
      <div className="py-8 sm:hidden">
        <FooterColumnV2
          elements={mobileFooterLinks.subHeaders}
          heading={mobileFooterLinks.heading}
        />
      </div>
      <div className="flex items-center w-full sm:w-1/3 justify-center">
        {followUsLinks.subHeaders.map((socialHandle) => {
          return (
            <Link passHref href={socialHandle.link} key={socialHandle.text}>
              <img
                src={socialHandle.iconUrl}
                alt={socialHandle.text}
                className="w-[30px] h-5 object-contain mr-6 cursor-pointer"
              />
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col items-center w-full sm:w-3/4 sm:hidden py-8">
        <LogoName />
        <p className={clsx("text-sm lg:text-base text-[#F1F1F1]    font-bair")}>
          A Real Life Fitness Game
        </p>
      </div>
      <div
        className="absolute bottom-0 sm:-z-10 w-screen flex justify-center items-center bg-[#191838] mx-auto py-2 sm:py-4"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        <p className={clsx("text-[#F1F1F1] text-xs md:text-sm text-center")}>
          Made with
        </p>
        <p className="px-1">❤️</p>
        <p className={clsx("text-[#F1F1F1] text-xs md:text-sm text-center")}>
          in India
        </p>
      </div>
    </div>
  );
};

export default FooterHandlesV2;
