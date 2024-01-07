import { womenGroupImg } from "@constants/icons/iconURLs";
import FooterV3 from "@modules/footer/FooterV3";
import { useRef } from "react";
import OurFAQ from "./components/V2/OurFAQ";
import JoinRevolutionV2 from "./components/V2/JoinRevolutionV2";
import Regime from "./components/V2/Regime";
import FeaturedCollection from "./components/V2/FeaturedCollection";
import { PostsOrPages } from "@tryghost/content-api";
import Testimonials from "./components/V2/Testimonials";
import { fundingFromV2 } from "./utils";
import { Badge } from "@models/Prizes/PrizeV2";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import HeroV3 from "./components/V3/HeroV3";
import FundingFromV2 from "./components/V3/FundingFromV2";
import LandingHeaderV2 from "./components/V3/LandingHeaderV2";
import ProvenResultV2 from "./components/V3/ProvenResultV2";
import BonusItemsNew from "./components/V3/BonusItemsNew";
import HelpYouWin from "./components/V3/HelpYouWin";
// import HowItWorkSteps from "./components/V3/HowItWorkSteps";
// import ProgramWeOffer from "./components/V3/ProgramWeOffer";
import { useScroll } from "framer-motion";
import Background from "./Background";
import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import Transformations from "./components/V2/Transformations";
import SyncSakhi from "./components/V3/SyncSakhi/SyncSakhi";
import { useAuth } from "@hooks/auth/useAuth";
import HowItWorksV3 from "./components/V4/HowItWorks/components/HowItWorksV3";
import RecommendationV4 from "./components/V4/Recommendation/components/RecommentdationV4";
import ExpertsV4 from "./components/V4/Experts/components/ExpertsV4";
import AskSakhiV4 from "./components/V4/AskSakhi/components/AskSakhiV4";
// import OurPrograms from "@templates/InfluencerTemplate/components/programs/OurPrograms";

interface Props {
  badges: Badge[];
  posts: PostsOrPages | null;
  origin: string;
}

const WomenTemplateNewV2: React.FC<Props> = ({ posts, origin, badges }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({ target: parentRef });
  const { user, authStatus } = useAuth();

  const { testimonials, videoTestimonials } = useTestimonials();

  const { coachRef } = useCoachAtt();

  const onboardingPath = `/start?origin=${origin}${
    coachRef ? `&${coachRef}` : ""
  }`;

  const route =
    authStatus === "SUCCESS" && user?.onboarded && user?.badgeId
      ? "/myProgram"
      : onboardingPath;

  const mainCTAText = route === "/myProgram" ? "My Program" : "Start Journey";
  const howItWorksText =
    route === "/myProgram" ? "Download App" : "Start Journey";
  const howItWorksURL =
    route === "/myProgram"
      ? "https://socialboat.app.link/download"
      : onboardingPath;

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen min-h-screen relative z-0 scrollbar-hide"
      onScroll={(e) => console.log(e)}
    >
      <Background scrollYProgress={scrollYProgress} />

      <LandingHeaderV2
        route={route}
        btnText="Start Journey"
        coachRef={coachRef}
      />

      <HeroV3 route={route} btnText={mainCTAText} />
      <FundingFromV2 data={fundingFromV2} />
      <SyncSakhi />
      <ProvenResultV2 scrollY={scrollY} />
      {/* <HowItWorkSteps route={howItWorksURL} btnText={howItWorksText} /> */}
      <div className="pt-10">
        <HowItWorksV3 />
      </div>
      <RecommendationV4 />
      <AskSakhiV4 />
      <ExpertsV4 />
      {/* <OurPrograms
        coachUID={coachUID ? coachUID : ""}
        heading="Treatment Programs we offer"
      /> */}
      {/* <ProgramWeOffer badges={badges} /> */}
      <HelpYouWin route={howItWorksURL} btnText={howItWorksText} />
      <BonusItemsNew />
      <Regime />

      {videoTestimonials ? (
        <Transformations videoTestimonials={videoTestimonials} />
      ) : null}

      {testimonials ? (
        <Testimonials
          testimonials={testimonials}
          bgColor={`bg-[#553CA8B2]/50 backdrop-blur-xl`}
        />
      ) : null}

      <OurFAQ />

      {posts ? <FeaturedCollection posts={posts} /> : null}

      <JoinRevolutionV2 origin="women" />
      <div className="w-32 aspect-1" />

      <div className="bg-[#FFFFFF1A] border-t border-white/30">
        <FooterV3 footerImg={womenGroupImg} />
      </div>

      {/* <WhatsAppChat
        redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I would like to know more"
        position="right-5 bottom-20"
      /> */}
    </div>
  );
};

export default WomenTemplateNewV2;
