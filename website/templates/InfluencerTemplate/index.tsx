import { womenGroupImg } from "@constants/icons/iconURLs";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import { Badge } from "@models/Prizes/PrizeV2";

import { UserInterface } from "@models/User/User";
import FooterV3 from "@modules/footer/FooterV3";
// import YouGet from "@templates/CourseTemplate/YouGet";
import { Background } from "@templates/WomenTemplate/components/Background";
// import DietAndWorkout from "@templates/WomenTemplate/components/V2/DietAndWorkout";
// import ImpactSteps from "@templates/WomenTemplate/components/V2/ImpactSteps";
import JoinRevolutionV2 from "@templates/WomenTemplate/components/V2/JoinRevolutionV2";
import OurFAQ from "@templates/WomenTemplate/components/V2/OurFAQ";
import Regime from "@templates/WomenTemplate/components/V2/Regime";
// import Steps from "@templates/WomenTemplate/components/V2/Steps";
import Testimonials from "@templates/WomenTemplate/components/V2/Testimonials";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import { useRef } from "react";
// import AboutInfluencer from "./AboutInfluencer";
import Hero from "./components/hero/Hero";
// import Programs from "./Programs";
import OurPrograms from "./components/programs/OurPrograms";
// import HowToParticipateSteps from "@modules/super-women-challenge/HowToParticipateSteps";
import StepsV2 from "./components/steps/StepsV2";
import OverlayButton from "@modules/super-women-challenge/OverlayButton";
import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import Transformations from "@templates/WomenTemplate/components/V2/Transformations";
import { oneDayMS } from "@models/slots/utils";

interface Props {
  influencer: UserInterface;
  // testimonials: Testimonial[];
  badges: Badge[];
}

const initCount = 1245;
const start = 1698922959000;
const now = Date.now();
const incDays = Math.floor((now - start) / oneDayMS);

const count = initCount + incDays * 3;
// console.log("incDays", incDays, count);

const InfluencerTemplate: React.FC<Props> = ({
  influencer,
  // testimonials,
  badges,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { utm_source } = useCoachAtt();

  const { testimonials, videoTestimonials } = useTestimonials();

  const route = `/start?origin=doc&coach=${influencer.uid}&utm_source=${utm_source}`;
  const coachRef = `coach=${influencer.uid}&utm_source=${utm_source}`;

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen min-h-screen scrollbar-hide relative z-0"
    >
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Rectangle_2192_1N9_WKdCM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674822458738" />

      <LandingHeaderV2
        route={route}
        btnText="Start Journey"
        coachRef={coachRef}
      />
      <Hero route={route} influencer={influencer} />
      <OurPrograms coachUID={influencer.uid} />
      {/* <HowToParticipateSteps
        route={route}
        btnText={"Start Now"}
        steps={round?.steps}
      /> */}
      {/* <Steps /> */}

      <OverlayButton
        numUsers={count}
        showImages={true}
        route={route}
        buttonTitle={"Start Now"}
        title={"Menstrual Wellness Programs"}
      />
      <StepsV2 route={route} className="" />
      {/* <YouGet /> */}
      {/* <Programs badges={badges} />  */}
      {/* <ImpactSteps /> */}
      <Regime />
      {videoTestimonials ? (
        <Transformations videoTestimonials={videoTestimonials} />
      ) : null}

      <div className="-mt-16">
        <Testimonials
          testimonials={testimonials}
          bgColor={`bg-[#553CA8B2]/50 backdrop-blur-xl`}
        />
      </div>
      {/* <AboutInfluencer influencer={influencer} /> */}
      <div className="mt-28">
        <OurFAQ />
      </div>
      <JoinRevolutionV2 origin="women" />
      <div className="w-32 aspect-1" />
      <div className="bg-[#FFFFFF1A] border-t border-white/30">
        <FooterV3 footerImg={womenGroupImg} />
      </div>
    </div>
  );
};

export default InfluencerTemplate;
