import React from "react";

import { InfluencersData } from "../../constants";

import TextLayout from "../TextLayout";
import LandingPageButton from "../LandingPageButton";
import InfluencerList from "../InfluencerList";

// import classes from "./Influencers.module.css";
import { LandingLeaderboard } from "@models/LeaderBoard/Leaderboard";

interface Props {
  leaders: LandingLeaderboard[];
}

// const { influencerContainer } = classes;

const Influencers: React.FC<Props> = ({ leaders }) => {
  const { heading, subHeading } = InfluencersData;

  return (
    <>
      <div
        id="teams"
        className={`flex flex-col items-center justify-center h-[100vh]`}
      >
        <div className="px-4">
          <TextLayout
            headingText={heading}
            subHeadingText={subHeading}
            size="medium"
            // halfWidth={true}
          />
        </div>

        {/* <br /> */}
        <div className="py-10">
          <InfluencerList leaders={leaders} />
        </div>
        <div className="w-full">
          <LandingPageButton
            link="/start?origin=landing"
            buttonText="Get started"
          />
        </div>
      </div>
    </>
  );
};

export default Influencers;
