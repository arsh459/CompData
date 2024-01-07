import React from "react";
import clsx from "clsx";
import { homeSEO } from "@constants/seo";

import Header from "@components/headerV2";
import DefaultLayout from "@layouts/DefaultLayout";
import {
  LandingLeaderboard,
  LeaderBoard,
} from "@models/LeaderBoard/Leaderboard";
import Influencers from "@templates/LandingPage/components/Influencers";
import Hero from "@templates/LandingPage/components/Hero";
import InfoCard1 from "@templates/LandingPage/components/InfoCard1";
import InfoCard2 from "@templates/LandingPage/components/InfoCard2";
import HowToPlay from "@templates/LandingPage/components/HowToPlay";
import Achievement from "@templates/LandingPage/components/Achievement";
import FooterV2 from "@templates/LandingPage/components/Footer/Footer";

// import { TeamKPI } from "server/landing/getTeamKPIs";
// import { EventInterface } from "@models/Event/Event";

interface Props {
  leaders: LandingLeaderboard[];
  leader: LeaderBoard | null;
}

const ReferralV2: React.FC<Props> = ({ leaders, leader }) => {
  // console.log("leader", leader);
  return (
    <DefaultLayout
      title={homeSEO.title}
      link={homeSEO.link}
      img={homeSEO.img}
      canonical={homeSEO.link}
      noIndex={homeSEO.noIndex}
      description={homeSEO.description}
    >
      <div className="bg-black overflow-x-hidden">
        <div
          className={clsx(
            "w-screen",
            "max-w-screen-xl mx-auto"
            // "bg-yellow-50"
            // "px-4 border-2 border-white"
          )}
        >
          <div
            className={clsx(
              "fixed left-0 right-0 top-0 z-50",
              // "border",
              // "flex justify-center items-center",
              "bg-gradient-to-b from-black to-transparent"
            )}
          >
            <Header noShadow={true} menuVisible={true} />
          </div>
        </div>
        <Hero
          referralHeading={`You have been invited by 
${leader?.name}`}
        />
        <Influencers leaders={leaders} />
        <div
          className={clsx(
            "w-screen",
            "max-w-screen-xl mx-auto",
            "pt-24 md:pt-0"
          )}
        >
          <InfoCard1 />
          {/* <InfoCard1 /> */}

          <div id="rewards" className="pt-24">
            <InfoCard2 />
          </div>

          <div className="">
            <HowToPlay />
          </div>

          <div className="pb-24">
            <Achievement />
          </div>

          <FooterV2 switchColor={true} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ReferralV2;
