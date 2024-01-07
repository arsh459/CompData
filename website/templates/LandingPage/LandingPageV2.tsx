import React from "react";
import { homeSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import LandingHeader from "./V2/components/LandingHeader";
import TestimonialsLanding from "./V2/LandingTestimonials";
import TransformationLanding from "./V2/LandingTransformation";
import AIPowerd from "./V2/components/AIPowerd";
import RewardPrizes from "./V2/components/RewardPrizes";
import { useRef } from "react";
import FooterV3 from "@modules/footer/FooterV3";
import FeaturesComponent from "./V2/components/FeaturesComponent";
import AppDetails from "./V2/AppDetails";
import Hero from "./V2/components/Hero";
import { useLandingDataContext } from "./V2/providers/LandingDataProvider";
import { Testimonial } from "@models/Testimonial/interface";
import JoinRevolution from "./V2/components/JoinRevolution";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const LandingPageTemplateV2: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { slug } = useLandingDataContext();

  return (
    <DefaultLayout
      title={homeSEO.title}
      link={`https://socialboat.live/${slug ? slug : ""}`}
      img={homeSEO.img}
      canonical={`https://socialboat.live/${slug ? slug : ""}`}
      noIndex={false}
      description={homeSEO.description}
    >
      <div
        ref={ref}
        className="bg-[#100F1A] min-h-screen overflow-x-hidden scrollbar-hide"
      >
        <LandingHeader refObj={ref} />
        <Hero />
        <FeaturesComponent />
        <AIPowerd />
        <RewardPrizes />
        <TestimonialsLanding testimonials={testimonials} />
        <TransformationLanding videoTestimonials={videoTestimonials} />
        <AppDetails />
        <JoinRevolution origin="landing" />
        <FooterV3 />
      </div>
    </DefaultLayout>
  );
};

export default LandingPageTemplateV2;
