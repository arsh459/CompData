// import clsx from "clsx";
import React from "react";
// import Image from "next/image";
import { howToPlayData } from "../../constants";
import LandingPageButton from "../LandingPageButton";
import AnchorLink from "react-anchor-link-smooth-scroll";

// import classes from "./HowToPlay.module.css";
// const { cardFitnessFun, cardTask, cardPoints, cardLevels } = classes;

import StepText from "./StepText";
import InfoCard from "../InfoCard/InfoCard";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepFour from "./StepFour";
import StepThree from "./StepThree";
import clsx from "clsx";
// import Link from "next/link";

const HowToPlay: React.FC = () => {
  return (
    <div className="mt-0">
      <div className="h-[90vh] min-h-[560px] flex justify-center items-center">
        <div className="relative z-0">
          <div className="relative z-10">
            <AnchorLink href="#howToPlay">
              <p className="text-gray-50 text-5xl font-mont text-center">
                How To Play?
              </p>
            </AnchorLink>
          </div>
          <div
            className={clsx(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10",
              " w-full aspect-w-1 aspect-h-1 rounded-full blur-3xl"
            )}
            style={{
              background:
                "linear-gradient(0deg, #600FF5, #D74559, #F19B38, #CCDB2C, #61C5D9)",
            }}
          />
        </div>
      </div>
      {howToPlayData.data.map(
        ({ heading, subHeading, background, buttonText, image }, idx) => (
          <div
            className="pb-36"
            key={`howToPlay-${heading}`}
            id={idx === 0 ? "howToPlay" : ""}
          >
            <InfoCard
              leftChildren={
                <div className="px-4 pb-36 md:pb-0">
                  <StepText lightText={heading} boldText={subHeading} />
                  {buttonText ? (
                    <div className="pt-4">
                      <LandingPageButton
                        link="/start?origin=landing"
                        buttonText={<b className="text-xl">{buttonText}</b>}
                      />
                    </div>
                  ) : null}
                </div>
              }
              rightChildren={
                <div>
                  {idx === 0 && image ? (
                    <StepOne image={image} />
                  ) : idx === 1 && image ? (
                    <StepTwo image={image} />
                  ) : idx === 2 ? (
                    <StepThree />
                  ) : (
                    <StepFour />
                  )}
                </div>
              }
            />
          </div>
        )
      )}
    </div>
  );
};

export default HowToPlay;
