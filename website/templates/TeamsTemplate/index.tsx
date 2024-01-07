import WhatsAppChat from "@components/WhatsAppChat";
import {
  womenGroupImg,
  // womenKettlebell1,
  womenKettlebell2,
} from "@constants/icons/iconURLs";
import { teamObj } from "@constants/teams";
import { Testimonial } from "@models/Testimonial/interface";
import FooterV3 from "@modules/footer/FooterV3";
import AppDetails from "@templates/LandingPage/V2/AppDetails";
import JoinRevolution from "@templates/LandingPage/V2/components/JoinRevolution";
import LandingHeader from "@templates/LandingPage/V2/components/LandingHeader";
import TestimonialsLanding from "@templates/LandingPage/V2/LandingTestimonials";
import TransformationLanding from "@templates/LandingPage/V2/LandingTransformation";
import { Background } from "@templates/WomenTemplate/components/Background";
import Badges from "@templates/WomenTemplate/components/Badges";
// import ProblemTimeline from "@templates/WomenTemplate/components/Problem/ProblemTimeline";
import Trainers from "@templates/WomenTemplate/components/Trainers";
import WhyCare from "@templates/WomenTemplate/components/WhyCare";
import { useRef } from "react";
import DailySteps from "./DailySteps";
import Hero from "./Hero";

interface Props {
  teamObj: teamObj;
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const GautamTemplate: React.FC<Props> = ({
  teamObj,
  testimonials,
  videoTestimonials,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const link = `/joinBoatV5?origin=${teamObj.teamname}&team=${teamObj.teamname}&teamId=${teamObj.teamId}`;

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen scrollbar-hide relative z-0"
    >
      <Background />
      <LandingHeader refObj={parentRef} route={link} />
      <Hero teamObj={teamObj} link={link} />
      {/* <WhyCare
        imgUrl={womenKettlebell1}
        imgStyle="w-full max-h-[90vh]"
        otherElements={<ProblemTimeline pointsArr={teamObj.points} />}
      >
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          What is the Challenge?
        </p>
      </WhyCare> */}
      <WhyCare
        imgUrl={womenKettlebell2}
        imgStyle="w-full max-h-[90vh]"
        otherElements={<DailySteps steps={teamObj.steps} />}
        alt="women with Kettle bell2"
      >
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          How to Play
        </p>
      </WhyCare>
      <Trainers />
      <Badges />
      <TransformationLanding videoTestimonials={videoTestimonials} />
      <TestimonialsLanding
        testimonials={testimonials}
        bgColor="bg-[#FFFFFF26]"
      />
      <AppDetails bgColor="bg-[#FFFFFF26]" />
      <JoinRevolution origin="teams" />
      <div className="bg-[#FFFFFF1A]">
        <FooterV3 footerImg={womenGroupImg} />
      </div>
      <WhatsAppChat
        redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I have a question"
        position="right-5 bottom-20"
      />
    </div>
  );
};

export default GautamTemplate;
