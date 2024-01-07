import clsx from "clsx";
import React from "react";
// import Image from "next/image";
// import { isMobile } from "mobile-device-detect";
import LandingPageButton from "../LandingPageButton";

import { achievements } from "../../constants";

// import classes from "./Achievement.module.css";

const achievement: React.FC = () => {
  const { mainTitle, socalBoatJoinMsg, data } = achievements;

  return (
    <>
      <div className={clsx("px-4", "text-white")}>
        <div
          className={clsx(
            "text-center pb-12 md:pt-0",
            "font-mont text-4xl md:text-5xl"
            // classes["mainTitle"]
            // "text-6xl font-bold"
          )}
        >
          {mainTitle}
        </div>
        <div className={clsx("sm:block md:flex justify-around items-center")}>
          {data.map(({ image, heading, subHeading }, idx) => (
            <div
              key={idx}
              className={clsx(
                "text-center mb-14 md:mb-0 flex items-center flex-col"
              )}
            >
              <div className="mb-8">
                <img
                  className={clsx("object-cover")}
                  alt={`socailBoat ${subHeading} image`}
                  src={image}
                />
              </div>
              <div className={clsx("pb-2 font-mont text-4xl")}>{heading}</div>
              <div className={clsx("font-montL text-2xl")}>{subHeading}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={clsx(
          // classes["achievementContainer"],
          "p-4 pt-36"
        )}
      >
        <div
          className={clsx(
            "flex flex-col justify-around items-center md:flex-row "
          )}
        >
          <div
            className={clsx(
              "text-center font-mont text-4xl md:text-7xl md:pt-2",
              "text-white"
              // "border"
            )}
          >
            {socalBoatJoinMsg}
          </div>
          <div className="md:py-0 md:pt-0">
            <LandingPageButton
              link="/start?origin=landing"
              buttonText={<b className="text-xl">Join us</b>}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default achievement;
