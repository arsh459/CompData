import React from "react";
import clsx from "clsx";
import { homeSEO } from "@constants/seo";

import Header from "@components/headerV2";
import DefaultLayout from "@layouts/DefaultLayout";

import Hero from "./components/Hero";
import Influencers from "./components/Influencers";
import InfoCard1 from "./components/InfoCard1";
import InfoCard2 from "./components/InfoCard2";
import HowToPlay from "./components/HowToPlay";
import Achievement from "./components/Achievement";
import {
  LandingLeaderboard,
  // LeaderBoard,
} from "@models/LeaderBoard/Leaderboard";
import Footer from "./components/Footer/Footer";
import { UserInterface } from "@models/User/User";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
// import { TeamKPI } from "server/landing/getTeamKPIs";
// import { EventInterface } from "@models/Event/Event";

interface Props {
  leaders: LandingLeaderboard[];
  invitedBy?: UserInterface;
}

const LandingPageTemplate: React.FC<Props> = ({ leaders, invitedBy }) => {
  // console.log("invitedBy", leaders.length);
  const { title, link, img, canonical, desc } = useUserSEOData(invitedBy);

  // console.log("r", router.locale, router.locales);

  return (
    <DefaultLayout
      title={title && invitedBy ? title : homeSEO.title}
      link={link && invitedBy ? link : homeSEO.link}
      img={img && invitedBy ? img : homeSEO.img}
      canonical={canonical && invitedBy ? canonical : homeSEO.link}
      noIndex={false}
      description={desc && invitedBy ? desc : homeSEO.description}
    >
      <div className="bg-black overflow-x-hidden">
        <div className={clsx("w-screen", "max-w-screen-xl mx-auto")}>
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
        <Hero invitedBy={invitedBy} />
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

          <Footer switchColor={true} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LandingPageTemplate;
