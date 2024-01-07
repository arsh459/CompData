import WhatsAppChat from "@components/WhatsAppChat";
import { womenGroupImg } from "@constants/icons/iconURLs";
import { Testimonial } from "@models/Testimonial/interface";
import FooterV3 from "@modules/footer/FooterV3";
import AppDetails from "@templates/LandingPage/V2/AppDetails";
import JoinRevolution from "@templates/LandingPage/V2/components/JoinRevolution";
import LandingHeader from "@templates/LandingPage/V2/components/LandingHeader";
import TestimonialsLanding from "@templates/LandingPage/V2/LandingTestimonials";
import TransformationLanding from "@templates/LandingPage/V2/LandingTransformation";
import { Background } from "./components/Background";
import Badges from "./components/Badges";
import Hero from "./components/Hero";
import Stages from "./components/Stages";
import Trainers from "./components/Trainers";
import WomenSteps from "./components/WomenSteps";
import { useRef } from "react";
import Problem from "./components/Problem/Problem";
import AppSolution from "./components/AppSolution/AppSolution";
import WhyCare from "./components/WhyCare";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const WomenTemplate: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const route = `/start?origin=women&home=women`;

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen scrollbar-hide relative z-0"
    >
      <Background />
      <LandingHeader refObj={parentRef} route={route} />
      <Hero route={route} />
      <WhyCare
        imgUrl={womenGroupImg}
        imgStyle="w-[150%] max-h-[85vh]"
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
      <WomenSteps />
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

export default WomenTemplate;
