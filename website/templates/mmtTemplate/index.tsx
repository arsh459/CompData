import WhatsAppChat from "@components/WhatsAppChat";
import {
  womenGroupImg,
  womenKettlebell2,
  womenKettlebell3,
} from "@constants/icons/iconURLs";
import { Testimonial } from "@models/Testimonial/interface";
import FooterV3 from "@modules/footer/FooterV3";
import AppDetails from "@templates/LandingPage/V2/AppDetails";
import JoinRevolution from "@templates/LandingPage/V2/components/JoinRevolution";
import LandingHeader from "@templates/LandingPage/V2/components/LandingHeader";
import TestimonialsLanding from "@templates/LandingPage/V2/LandingTestimonials";
import TransformationLanding from "@templates/LandingPage/V2/LandingTransformation";
import AppSolution from "@templates/WomenTemplate/components/AppSolution/AppSolution";
import { Background } from "@templates/WomenTemplate/components/Background";
import Badges from "@templates/WomenTemplate/components/Badges";
import Problem from "@templates/WomenTemplate/components/Problem/Problem";
import Stages from "@templates/WomenTemplate/components/Stages";
import Trainers from "@templates/WomenTemplate/components/Trainers";
import WhyCare from "@templates/WomenTemplate/components/WhyCare";
import { useRef } from "react";
import DailySteps from "./DailySteps";
import Hero from "./Hero";
import WhatYouGet from "./WhatYouGet";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const MmtTemplate: React.FC<Props> = ({ testimonials, videoTestimonials }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen scrollbar-hide relative z-0"
    >
      <Background />
      <LandingHeader
        refObj={parentRef}
        route="/joinBoatV5?origin=mmt&teamId=6eea9ae6-56b5-4f08-a30a-e8fac3917f1f"
      />
      <Hero link="/joinBoatV5?origin=mmt&teamId=6eea9ae6-56b5-4f08-a30a-e8fac3917f1f" />
      <WhyCare
        imgUrl={womenKettlebell2}
        imgStyle="w-full max-h-[90vh]"
        otherElements={<DailySteps />}
        alt="women with kettlebell 2"
      >
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          How to Play
        </p>
      </WhyCare>
      <WhyCare
        imgUrl={womenKettlebell3}
        imgStyle="w-full max-h-[90vh]"
        otherElements={<WhatYouGet />}
        alt="women looking up"
      >
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          Additional Benefits you Get
        </p>
      </WhyCare>
      <WhyCare
        imgUrl={womenGroupImg}
        imgStyle="w-full max-h-[85vh]"
        otherElements={
          <>
            <Problem />
            <AppSolution />
          </>
        }
      >
        <span className="text-4xl sm:text-5xl lg:text-6xl font-popR">Why</span>
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Subtract_U-Hs4aqyc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668162155682"
          className="w-1/6 max-w-[150px] mx-5"
          loading="lazy"
          alt="socialboat logo"
        />
        <span className="text-4xl sm:text-5xl lg:text-6xl font-popR">
          Care?
        </span>
      </WhyCare>
      <Stages />
      <div className="h-40" />
      <Trainers />
      <Badges />
      <TransformationLanding videoTestimonials={videoTestimonials} />
      <TestimonialsLanding
        testimonials={testimonials}
        bgColor="bg-[#FFFFFF26]"
      />
      <AppDetails bgColor="bg-[#FFFFFF26]" />
      <JoinRevolution origin="women" />
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

export default MmtTemplate;
