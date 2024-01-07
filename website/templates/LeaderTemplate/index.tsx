import WhatsAppChat from "@components/WhatsAppChat";
import {
  superwomenImg,
  womenGroupImg,
  womenKettlebell3,
  womenKettlebellOnShoulder,
} from "@constants/icons/iconURLs";
import { Testimonial } from "@models/Testimonial/interface";
import { UserInterface } from "@models/User/User";
import FooterV3 from "@modules/footer/FooterV3";
import AppDetails from "@templates/LandingPage/V2/AppDetails";
import LandingHeader from "@templates/LandingPage/V2/components/LandingHeader";
import TestimonialsLanding from "@templates/LandingPage/V2/LandingTestimonials";
import TransformationLanding from "@templates/LandingPage/V2/LandingTransformation";
import { Background } from "@templates/WomenTemplate/components/Background";
import Problem from "@templates/WomenTemplate/components/Problem/Problem";
import ProblemTimeline from "@templates/WomenTemplate/components/Problem/ProblemTimeline";
import WhyCare from "@templates/WomenTemplate/components/WhyCare";
import Partners from "@templates/WomenTemplate/Partners";
import { useRef } from "react";
import HeroLeader from "./Component/HeroLeader";
import WhyApply from "./Component/WhyApply";
import { pointsArr, superWomenArr, whyApplyArr } from "./utils";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
  user?: UserInterface;
}

const LeaderTemplate: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
  user,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen scrollbar-hide relative z-0"
    >
      <Background />
      <LandingHeader
        refObj={parentRef}
        route="https://jyd2yygo.paperform.co/"
        btnText="Apply Now"
      />
      <HeroLeader />

      <WhyCare
        imgUrl={womenGroupImg}
        imgStyle="w-[150%] max-h-[85vh]"
        otherElements={<Problem />}
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

      <WhyCare
        imgUrl={superwomenImg}
        imgStyle="w-full max-h-[90vh]"
        otherElements={
          <>
            <WhyApply
              whyApplyArr={superWomenArr}
              gridStyle="mx-auto grid grid-cols-1 md:grid-cols-3 auto-cols-max justify-center items-center p-4 gap-8 py-8 md:py-16"
              imgStyle="object-contain mx-auto max-w-[190px] py-5 aspect-1"
              textChild={
                <p className="text-white font-baim text-2xl md:text-3xl text-center w-4/5">
                  You can
                  <span className="text-[#ABFF69]  "> motivate women </span>
                  around you to lead fitter lives
                </p>
              }
            />
          </>
        }
      >
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          You&apos;re a
          <span className="text-[#FF33A1] font-baib uppercase">
            {" "}
            superwoman{" "}
          </span>
          if
        </p>
      </WhyCare>

      <WhyCare
        imgUrl={womenKettlebellOnShoulder}
        imgStyle="w-full max-h-[90vh]"
        otherElements={<ProblemTimeline pointsArr={pointsArr} />}
      >
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          How to Join?
        </p>
      </WhyCare>

      <WhyCare
        imgUrl={womenKettlebell3}
        imgStyle="w-full max-h-[90vh]"
        otherElements={
          <WhyApply
            whyApplyArr={whyApplyArr}
            imgStyle="object-contain mx-auto max-w-[100px] p-4 aspect-1"
            cardStyle="bg-[#0000004D] w-full rounded-3xl flex-1 p-4 flex md:flex-col items-center"
            textStyle="font-bair text-center text-sm sm:text-base lg:text-lg w-4/5 md:w-full lg:w-3/5 md:pt-4 text-[#E7E7E7]"
          />
        }
      >
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          Why should you apply?
        </p>
      </WhyCare>

      <TransformationLanding videoTestimonials={videoTestimonials} />
      <TestimonialsLanding
        testimonials={testimonials}
        bgColor="bg-[#FFFFFF26]"
      />
      <AppDetails bgColor="bg-[#FFFFFF26]" />
      <Partners />
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

export default LeaderTemplate;
