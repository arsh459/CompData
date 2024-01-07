import WhatsAppChat from "@components/WhatsAppChat";
import { womenGroupImg, womenKettlebell2 } from "@constants/icons/iconURLs";
import { Testimonial } from "@models/Testimonial/interface";
import FooterV3 from "@modules/footer/FooterV3";
import AppDetails from "@templates/LandingPage/V2/AppDetails";
import JoinRevolution from "@templates/LandingPage/V2/components/JoinRevolution";
import LandingHeader from "@templates/LandingPage/V2/components/LandingHeader";
import TestimonialsLanding from "@templates/LandingPage/V2/LandingTestimonials";
import TransformationLanding from "@templates/LandingPage/V2/LandingTransformation";
import { Background } from "@templates/WomenTemplate/components/Background";
import Badges from "@templates/WomenTemplate/components/Badges";
import Trainers from "@templates/WomenTemplate/components/Trainers";
import WhyCare from "@templates/WomenTemplate/components/WhyCare";
import { useRef } from "react";
import DailySteps from "./DailySteps";
import Hero from "./Hero";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const ResolutionTemplate: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const link = "/start?origin=newyearresolution";

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen scrollbar-hide relative z-0"
    >
      <Background />
      <LandingHeader refObj={parentRef} route={link} />
      <Hero link={link} />
      <WhyCare
        imgUrl={womenKettlebell2}
        imgStyle="w-full max-h-[90vh]"
        otherElements={<DailySteps />}
        alt="women Kettle bell 2"
      >
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          Steps to Follow
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

export default ResolutionTemplate;
