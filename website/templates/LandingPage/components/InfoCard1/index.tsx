import clsx from "clsx";
import React from "react";
// import Image from "next/image";
import {
  fitnessFun,
  fitnessFunImg,
  fitnessFunImgBackdrop,
} from "../../constants";
import LandingPageButton from "../LandingPageButton";

import TextLayout from "../TextLayout";
import classes from "./InfoCard1.module.css";
import InfoCard from "../InfoCard/InfoCard";

const { card1 } = classes;

interface Props {
  // leftChildren: React.FC;
  // rightChildren: React.FC;
}

const InfoCard1: React.FC<Props> = ({}) => {
  const { heading, subHeading } = fitnessFun;

  return (
    <>
      <InfoCard
        leftChildren={
          <div className="px-4 pb-12 md:pb-0">
            <TextLayout
              headingText={heading}
              subHeadingText={subHeading}
              fullWidth={true}
              size="medium"
            />
            {/* <br /> */}
            <div className="pt-8">
              <LandingPageButton
                whiteBorder={true}
                link="/start?origin=landing"
                buttonText={<b className="text-xl">Join us</b>}
              />
            </div>
          </div>
        }
        rightChildren={
          <div
            className={clsx(
              card1,
              "flex justify-center items-center",
              "relative"
              // "max-w-lg"
            )}
          >
            <img
              className={clsx("z-10")}
              alt="socailBoat fitnessfun with ball"
              src={fitnessFunImg}
            />
            <div className="absolute top-1/4">
              <img
                className={clsx("w-full h-full")}
                alt="circular background"
                src={fitnessFunImgBackdrop}
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default InfoCard1;
