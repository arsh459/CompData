import clsx from "clsx";
import React from "react";
// import Image from "next/image";
import LandingPageButton from "../LandingPageButton";

import TextLayout from "../TextLayout";
import classes from "./InfoCard2.module.css";
import InfoCard from "../InfoCard/InfoCard";
import RewardsIllustration from "./RewardsIllustration";

const { card1 } = classes;

const InfoCard2: React.FC = () => {
  const heading = "Win rewards with your team";
  return (
    <InfoCard
      leftBare={true}
      flexColDirection="flex-col-reverse"
      leftChildren={
        <div className={clsx("h-full w-full")}>
          <div className="relative flex items-center flex-col">
            <div className="z-10">
              <RewardsIllustration />
            </div>

            <div
              className={clsx(
                card1,
                "w-5/6 h-full absolute top-0 bottom-0 z-0"
              )}
            />
          </div>
        </div>
      }
      rightChildren={
        <div className="px-4 pb-12 md:pb-0 flex flex-col items-center">
          <div className="max-w-[400px]">
            <TextLayout
              headingText={heading}
              subHeadingText={""}
              fullWidth={true}
              size="medium"
            />
          </div>

          <div className="pt-8">
            <LandingPageButton
              whiteBorder={true}
              link="/start?origin=landing"
              buttonText={<b className="text-xl">Start game</b>}
            />
          </div>
        </div>
      }
    />
  );
};

export default InfoCard2;
