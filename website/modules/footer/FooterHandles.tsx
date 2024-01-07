import { landingTeamUp } from "@constants/icons/iconURLs";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { followUsLinks } from "./constants";

const FooterHandles = () => {
  return (
    <div
      className={clsx(
        "flex w-full   items-center justify-between flex-wrap md:flex-nowrap"
      )}
    >
      <div className="w-full z-10">
        <img src={landingTeamUp} className="w-1/2 md:w-full aspect-[332/261]" />
      </div>
      <p
        className={clsx(
          "text-[#9D9D9D]  text-sm md:text-base text-center  w-96 md:w-full"
        )}
      >
        © 2023, SocialBoat.Live
        {/* © SocialBoat. All rights reserved */}
      </p>
      <div className="flex items-center   w-full justify-center py-2">
        {followUsLinks.subHeaders.map((socialHandle) => {
          return (
            <>
              <Link passHref href={socialHandle.link}>
                <img
                  src={socialHandle.iconUrl}
                  alt={socialHandle.text}
                  className="w-[30px] h-5 object-contain mr-6 cursor-pointer"
                />
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default FooterHandles;
